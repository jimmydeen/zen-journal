import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import UserPage from './UserPage';
import supabase from '../../services/Supabase';


describe("User Page", () => {
  beforeEach(() => {
    supabase.auth.getUser = jest.fn().mockResolvedValue({
      data: {
        user: {
          id: 'q03ur03'
        }
      }
    })
    // mock the call to get the last entry made and subsequently update the user
    const today = new Date()
    const {date, month, year } = {date: today.getDate(), month: today.getMonth(), year: today.getFullYear()}
    const mockData = { last_entry_made: `${year}-${month}-${date}`}; // will make the mock data for the last_entry_made the same as today
    supabase.from = jest.fn(() => {
      return {
        select: jest.fn(() => {
          return {
            eq: jest.fn()
                .mockResolvedValueOnce({data: [mockData], error: null})
          }
        }),
        update: jest.fn(() => {
          return {
            eq: jest.fn()
                .mockResolvedValueOnce({error: null})
          }
        })
      } 
    })
  })
  test("Has tab bar above with buttons for each tab", async () => {
    // mock the call to get the user
    render(<MemoryRouter><UserPage/></MemoryRouter>)

    // nav bar
    const navBar = await screen.findByTestId("userNavBar")
    expect(navBar).toBeInTheDocument()
    expect(navBar).toHaveAttribute("role", "tablist")

    // tab buttons
    const journalTabButton = screen.getByText("Journal")
    expect(journalTabButton).toBeInTheDocument()
    expect(journalTabButton).toHaveAttribute("role", "tab")
    const profileTabButton = screen.getByText("Profile")
    expect(profileTabButton).toBeInTheDocument()
    expect(profileTabButton).toHaveAttribute("role", "tab")
    const friendsTabButton = screen.getByText("Friends")
    expect(friendsTabButton).toBeInTheDocument()
    expect(friendsTabButton).toHaveAttribute("role", "tab")
  })
  test("Has logout button", async () => {
    // mock the call to get the user
    render(<MemoryRouter><UserPage/></MemoryRouter>)
    expect(await screen.findByTestId("userNavBar")).toBeInTheDocument()
    expect(screen.getByText(/logout|log out/i)).toBeInTheDocument()
  })
})