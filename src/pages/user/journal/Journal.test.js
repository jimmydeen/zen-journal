import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import Journal from './Journal';
import supabase from '../../../services/Supabase';


describe("Journal Tab", () => {
  beforeEach(() => {
    jest.mock('../../../services/Supabase')
    supabase.auth.getUser = jest.fn().mockResolvedValue({
      data: {
        user: {
          id: 'q03ur03'
        }
      }
    })
    const mockData = { daily_entry_made: true }
    supabase.from = jest.fn(() => {
      return {
        select: jest.fn(() => {
          return {
            eq: jest.fn()
                .mockResolvedValueOnce({data: [mockData], error: null})
          }
        }),
        insert: jest.fn(() => {
          return {
            select: jest.fn()
              .mockResolvedValueOnce({data: [{
                prompt_id: '1290bo'
              }], error: null})
          }
        })
      } 
    })
  })
  test("should be a question that is the first of three attempting to gauge your welbeing for today", async () => {
    render(<MemoryRouter><Journal/></MemoryRouter>)
    expect(screen.getByText("How are you feeling today?")).toBeInTheDocument()
  })
  test("should be a series of questions each with their own set of answers", async () => {
    render(<MemoryRouter><Journal/></MemoryRouter>)
    expect(screen.getByText(/great/i)).toBeInTheDocument()
    expect(screen.getByText(/alright/i)).toBeInTheDocument()
    const firstAnswerButton = screen.getByText(/poor/i)
    expect(firstAnswerButton).toBeInTheDocument()
    // trigger the first answer
    fireEvent.click(firstAnswerButton)

    expect(screen.getByText("How much energy did you have?")).toBeInTheDocument()
    expect(screen.getByText(/high/i)).toBeInTheDocument()
    expect(screen.getByText(/average/i)).toBeInTheDocument()
    const secondAnswerButton = screen.getByText(/low/i)
    expect(secondAnswerButton).toBeInTheDocument()
    // trigger the second answer
    fireEvent.click(secondAnswerButton)
    
    expect(screen.getByText("Did you feel stressed at all today?")).toBeInTheDocument()
    expect(screen.getByText(/yes/i)).toBeInTheDocument()
    expect(screen.getByText(/no/i)).toBeInTheDocument()
  })
  test("should be a prompt after the questions", async () => {
    // has to mock a one time value
    const message = "If you could give one message to the world today, what would it be?" 
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
          message
        }),
      })
    );
    render(<MemoryRouter><Journal/></MemoryRouter>)
    fireEvent.click(screen.getByText(/alright/i))
    fireEvent.click(screen.getByText(/average/i))
    fireEvent.click(screen.getByText(/yes/i))

    // expect prompt
    const prompt = await screen.findByTestId("prompt", undefined, { timeout: 10000})
    expect(prompt).toBeInTheDocument()
    expect(prompt.textContent.trim().length).toBeGreaterThan(0)
    expect(prompt).toHaveTextContent(message)

    // expect input area
    const entryArea = await screen.findByRole("textbox")
    expect(entryArea).toBeInTheDocument()
    // focus on the input area
    fireEvent.click(entryArea)
    const response = "I had a caeser salad. Also I don't 100% know how to spell caesar."
    fireEvent.input(entryArea, {target: { textContent: response }})
    const answerArea = screen.getByText(response)
    expect(answerArea).toBeInTheDocument()

    // expect save button
    const saveButton = await screen.findByText(/save/i)
    expect(saveButton).toBeInTheDocument()

  }, 60000)
  // test("after answering the last question there should be a prompt of some kind")
})