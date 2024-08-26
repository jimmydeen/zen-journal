import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import ForgotPassword from './ForgotPassword';
import supabase from '../../services/Supabase'

// mock the supabase client
jest.mock('../../services/Supabase')

describe("ForgotPassword Page", () => {
  describe("Static Page Test", () => {
    test('should have relevant email input field', () => {
      render(<MemoryRouter><ForgotPassword/></MemoryRouter>)
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    })
    test('should have (accessible) send email button', () => {
      render(<MemoryRouter><ForgotPassword/></MemoryRouter>)
      expect(screen.getByRole("button", { name: /send email/i })).toBeInTheDocument()
    })
  })
  describe("UI tests", () => {
    test('should be able to input', () => {
      render(<MemoryRouter><ForgotPassword/></MemoryRouter>)
      const fooEmail = 'john.smith@email.com'
      const emailInput = screen.getByLabelText(/email/i)
      fireEvent.change(emailInput, {target: {value: fooEmail}})
      expect(emailInput).toHaveValue(fooEmail)
    })
    test('should have warning concerning invalid emails', () => {
      render(<MemoryRouter><ForgotPassword/></MemoryRouter>)
      const invalidEmail = 'john.smith'
      const emailInput = screen.getByLabelText(/email/i)
      fireEvent.change(emailInput, {target: {value: invalidEmail}})
      expect(screen.getByRole("alert")).toBeInTheDocument()
    })
    test('should provide detail about whether an email has been sent or not', () => {
      supabase.auth.resetPasswordForEmail.mockResolvedValue({data: {status: 200}, error: null})
      render(<MemoryRouter><ForgotPassword/></MemoryRouter>)

      // fill in the email
      const emailInput = screen.getByLabelText(/email/i)
      fireEvent.change(emailInput, {target: {value: "fakeEmail@domain.com"}})

      // submit the form
      const submitButton = screen.getByText(/send email/i) 
      fireEvent.click(submitButton)

      // check that the page has changed appropriately to indicate that the email to reset password has been sent
      return screen.findByText(/.*has been sent.*/)
        .then(element => expect(element).toBeInTheDocument())
    })
  })
})