import { render, screen } from '@testing-library/react';
import App from './App';

// this component test really only tests loading screen, we'll need to have e2e testing for better depth of testing
// but we can also extend the tests with user interactions
test('has relevant auth buttons', () => {
  render(<App />);
  const login = screen.getByTestId("login-button");
  const signUp = screen.getByTestId("signup-button");
  expect(login).toBeInTheDocument();
  expect(signUp).toBeInTheDocument();
  expect(login.href).toMatch(/login/i)
  expect(signUp.href).toMatch(/signup/i)
});
