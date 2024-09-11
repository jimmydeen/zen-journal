import { fireEvent, prettyDOM, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import Profile from './Profile';
import supabase from '../../../services/Supabase';


describe("Profile Tab", () => {
  beforeEach(() => {
    jest.mock('../../../services/Supabase')
    supabase.auth.getUser = jest.fn().mockResolvedValue({
      data: {
        user: {
          id: 'q03ur03'
        }
      }
    })
    const mockData = {
      created_at: '2024-08-30T12:34:56.789Z',
      days_active: 2,
      entries_made: 2,
      words_written: 30,
      encouragements: 0,
      daily_entry_made: false,
      streak: 2,
      email: "john.smith@email.com",
    }
    supabase.from = jest.fn(() => {
      return {
        select: jest.fn(() => {
          return {
            eq: jest.fn()
              .mockResolvedValueOnce({data: [mockData], error: null})
          }
        })
      } 
    })
  })
  test("should show the user's email", async () => {
    render(<MemoryRouter><Profile/></MemoryRouter>)
    expect(await screen.findByText("john.smith@email.com", undefined, { timeout: 10000})).toBeInTheDocument()
  }, 10000)
  test("should show the number of words written by the user", async () => {
    render(<MemoryRouter><Profile/></MemoryRouter>)
    expect(screen.getByText(/words written/i)).toBeInTheDocument()
    const wordsWritten = await screen.findByTestId("wordsWritten", undefined, {timeout: 10000})
    expect(wordsWritten).toBeInTheDocument()
    expect(wordsWritten.textContent).toBe("30")
  }, 10000)
  test("should show the number of entries made by the user", async () => {
    render(<MemoryRouter><Profile/></MemoryRouter>)
    expect(screen.getByText(/entries/i)).toBeInTheDocument()
    const entries = await screen.findByTestId("entries", undefined, { timeout: 10000 })
    expect(entries).toBeInTheDocument()
    expect(entries.textContent).toBe("2")
  }, 10000)
  test("should show the number of encouragements made by the user to friends", async () => {
    render(<MemoryRouter><Profile/></MemoryRouter>)
    expect(screen.getByText(/words of encouragement/i)).toBeInTheDocument()
    const wordsOfEncouragement = await screen.findByText("0", undefined, { timeout: 10000 })
    expect(wordsOfEncouragement).toBeInTheDocument()
    expect(wordsOfEncouragement.textContent).toBe("0")
  }, 10000)
  test("should show the user's member since date", async () => {
    render(<MemoryRouter><Profile/></MemoryRouter>)
    expect(screen.getByText(/member since/i)).toBeInTheDocument()
    const memberSince = await screen.findByTestId("memberSince", undefined, {timeout: 10000})
    expect(memberSince).toBeInTheDocument()
    expect(memberSince.textContent).toBe("August 30, 2024")
  }, 10000)
  test("should show the number of days active", async () => {
    render(<MemoryRouter><Profile/></MemoryRouter>)
    expect(screen.getByText(/days active|active days/i)).toBeInTheDocument()
    const activeDays = await screen.findByTestId("activeDays", undefined, {timeout: 10000})
    expect(activeDays).toBeInTheDocument()
    expect(activeDays.textContent).toBe("2")
  }, 10000)
  // should look into using dl, dt, dd for better semantic representation
})