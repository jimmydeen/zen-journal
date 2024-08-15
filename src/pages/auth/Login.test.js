import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import Login from './Login';
import { userInfo } from 'os';

/*
 don't like the current use of router to simply nest the component we're
 testing. Seems like a kludge and smells of potentially missing out on testing
 routing. Adopt it for now.
*/
// in integration tests we'll mock the call to supabase and return a response based on valid matching email and password
describe("Login Page", () => {
  describe("Static Page Test", () => {
    test('should have relevant input fields', () => {
      render(
        <MemoryRouter>
          <Login/>
        </MemoryRouter>
      )
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    })
    test('should have (accessible) login button', () => {
      render(
        <MemoryRouter>
          <Login/>
        </MemoryRouter>
      )
      expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument()
    })
    test('should have (accessible) forgot password button', () => {
      render(
        <MemoryRouter>
          <Login/>
        </MemoryRouter>
      )
      expect(screen.getByRole("button", { name: /forgot/i })).toBeInTheDocument() // a test that will last across versions and changes to the app
    })
  })
  describe("UI tests", () => {
    test('should be able to input', () => {
      render(
        <MemoryRouter>
          <Login/>
        </MemoryRouter>
      )
      const fooEmail = 'john.smith@email.com'
      const emailInput = screen.getByLabelText(/email/i)
      fireEvent.change(emailInput, {target: {value: fooEmail}})
      expect(emailInput).toHaveValue(fooEmail)

      const fooPassword = 'password'
      const passwordInput = screen.getByLabelText(/password/i)
      fireEvent.change(passwordInput, {target: {value: fooPassword}})
      expect(passwordInput).toHaveValue(fooPassword)
    })
    test('should have warning concerning invalid emails', () => {
      render(
        <MemoryRouter>
          <Login/>
        </MemoryRouter>
      )
      const invalidEmail = 'john.smith'
      const emailInput = screen.getByLabelText(/email/i)
      fireEvent.change(emailInput, {target: {value: invalidEmail}})
      expect(screen.getByRole("alert")).toBeInTheDocument()
    })
  })
  // looking to add test that will check that we route to relevant locations for
})