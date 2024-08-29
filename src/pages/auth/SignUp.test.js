import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import SignUp from './SignUp';
import supabase from '../../services/Supabase'

// mock the supabase client
jest.mock('../../services/Supabase')
// mock the result of getSession

describe("ForgotPassword Page", () => {
  describe("Static Page Test", () => {
    test('Should have email, password and confirm password input', () => {
      supabase.auth.getSession.mockResolvedValue({data: {session: null}, error: null})
      render(<MemoryRouter><SignUp/></MemoryRouter>)
      const emailInput = screen.getByLabelText(/email:/i)
      const passwordInput = screen.getByLabelText(/^password:/i)
      const confirmPasswordInput = screen.getByLabelText(/^confirm password:/i)
      expect(emailInput).toBeInTheDocument()
      expect(passwordInput).toBeInTheDocument()
      expect(confirmPasswordInput).toBeInTheDocument()
    })
    test('Should have sign up button', () => {
      supabase.auth.getSession.mockResolvedValue({data: {session: null}, error: null})
      render(<MemoryRouter><SignUp/></MemoryRouter>)
      const submitButton = screen.getByTestId("signup-button")
      expect(submitButton).toBeInTheDocument()
      expect(submitButton).toHaveAttribute("type", "submit")
    })
    // oauth
    /*
    test('Should have oauth options', () => {
    })
    */
  })
  describe("UI tests", () => {
    test('should be able to input', () => {
      supabase.auth.getSession.mockResolvedValue({data: {session: null}, error: null})
      render(<MemoryRouter><SignUp/></MemoryRouter>)
      
      // email
      const fooEmail = 'john.smith@email.com'
      const emailInput = screen.getByLabelText(/email/i)
      fireEvent.change(emailInput, {target: {value: fooEmail}})
      expect(emailInput).toHaveValue(fooEmail)

      // password
      const fooPassword = 'paparazzi'
      const passwordInput = screen.getByLabelText(/^password/i)
      fireEvent.change(passwordInput, {target: {value: fooPassword}})
      expect(passwordInput).toHaveValue(fooPassword)

      // confirm password
      const fooConfirmPassword = 'hectic'
      const confirmPasswordInput = screen.getByLabelText(/^confirm password/i)
      fireEvent.change(confirmPasswordInput, {target: {value: fooConfirmPassword}})
      expect(confirmPasswordInput).toHaveValue(fooConfirmPassword)
    })
    test('should inform us of invalid email', () => {
      supabase.auth.getSession.mockResolvedValue({data: {session: null}, error: null})
      render(<MemoryRouter><SignUp/></MemoryRouter>)

      // email
      const fooEmail = 'john.smith.com'
      const emailInput = screen.getByLabelText(/email/i)
      fireEvent.change(emailInput, {target: {value: fooEmail}})
      expect(emailInput).toHaveValue(fooEmail)

      const invalidEmailAlert = screen.getByRole("alert")
      expect(invalidEmailAlert).toBeInTheDocument()
      expect(invalidEmailAlert).toHaveTextContent(/invalid email/i)
    })
    test('should inform of us non-matching passwords', () => {
      supabase.auth.getSession.mockResolvedValue({data: {session: null}, error: null})
      render(<MemoryRouter><SignUp/></MemoryRouter>)

      // password
      const fooPassword = 'password123'
      const passwordInput = screen.getByLabelText(/^password/i)
      fireEvent.change(passwordInput, {target: {value: fooPassword}})

      // confirm password
      const fooConfirmPassword = 'wildly different'
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i)
      fireEvent.change(confirmPasswordInput, {target: {value: fooConfirmPassword}})

      const mismatchedPasswordAlert = screen.getByRole("alert")
      expect(mismatchedPasswordAlert).toBeInTheDocument()
      expect(mismatchedPasswordAlert).toHaveTextContent(/passwords don't match/i)
    })
    test('should inform us of insecure passwords', () => {
      supabase.auth.getSession.mockResolvedValue({data: {session: null}, error: null})
      render(<MemoryRouter><SignUp/></MemoryRouter>)

      // insecure password
      let fooPassword = 'food'
      const passwordInput = screen.getByLabelText(/^password/i)
      fireEvent.change(passwordInput, {target: {value: fooPassword}})

      // insecure confirmPassword
      const confirmPasswordInput = screen.getByLabelText(/^confirm password/i)
      fireEvent.change(confirmPasswordInput, {target: {value: fooPassword}})
      
      // insecure alert
      const insecurePasswordAlert = screen.getByRole("alert")
      expect(insecurePasswordAlert).toBeInTheDocument()
      expect(insecurePasswordAlert).toHaveTextContent(/short|isn't long enough/i)
      
      // less insecure
      fooPassword = "sixcha"
      fireEvent.change(passwordInput, {target: {value: fooPassword}})
      fireEvent.change(confirmPasswordInput, {target: {value: fooPassword}})

      const notThatSecurePasswordAlert = screen.getByRole("alert")
      expect(notThatSecurePasswordAlert).toBeInTheDocument()
      expect(notThatSecurePasswordAlert).toHaveTextContent(/could be more secure/i)

      // minimum standard secure
      fooPassword = "eightcha"
      fireEvent.change(passwordInput, {target: {value: fooPassword}})
      fireEvent.change(confirmPasswordInput, {target: {value: fooPassword}})

      const nistMinSecurePasswordAlert = screen.getByRole("alert")
      expect(nistMinSecurePasswordAlert).toBeInTheDocument()
      expect(nistMinSecurePasswordAlert).toHaveTextContent(/nist's minimum security requirement/i)

      // decently secure
      fooPassword = "twelvecharsa"
      fireEvent.change(passwordInput, {target: {value: fooPassword}})
      fireEvent.change(confirmPasswordInput, {target: {value: fooPassword}})

      const decentlySecure = screen.queryByRole("alert")
      expect(decentlySecure).not.toBeInTheDocument()
    })
  })

  /*
    better unit test ideas (also integration tests)
    * mock the call to supabase.auth.signUp and test the case in which an email has already been signed up
  */
})