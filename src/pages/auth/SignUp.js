import React, { useEffect, useState } from 'react';
import '../../assets/styles/SignUp.css';
import { supabase } from '../../services/Supabase';
import { useNavigate } from 'react-router-dom';
import Eclipse from '../../assets/images/Eclipse.gif'
import useIsLoggedInStatus from '../../hooks/useLoggedInStatus';
import buttonStyle from '../../assets/styles/button.module.css'

const SignUp = () => {
  const isLoggedIn = useIsLoggedInStatus()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [hasSignedUp, setHasSignedUp] = useState(0) // ternary value: 0 meaning false, 1 meaning in the process of, 2 meaning has signed up
  const navigate = useNavigate()

  // later on, use ac to determine if there is already a person signed in and if so skip the sign in page
  const handleSubmit = async (event) => {
    setHasSignedUp(1)
    event.preventDefault();

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("You've input an invalid email.")
      setHasSignedUp(0)
      return
    }

    if (password !== confirmPassword) {
      alert("You're passwords don't match.")
      setHasSignedUp(0)
      return
    }

    if (password.length < 6) {
      alert("Your password is too short. Please make it at least 6 characters.")
      setHasSignedUp(0)
      return
    }

    let {error} = await supabase.auth.signUp({
      email,
      password
    })
    if (error) {
      alert(error.message)
      setHasSignedUp(0)
    } else {
      setHasSignedUp(2)
    }
  };

  // isLoggedIn hook used
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/user')
    }
  }, [isLoggedIn, navigate])

  let passwordAdvice
  if (password === confirmPassword && password !== "") {
    if (password.length < 6) {
      passwordAdvice = <span style={{color: "red"}} role="alert">Your passwords isn't long enough. Please make it at least 6 characters.</span>
    } else if (password.length < 8) {
      passwordAdvice = <span style={{color: "orange"}} role="alert">Your passwords meets our minimum requirements but could be more secure by making it at least 8 characters.</span>
    } else if (password.length < 12) {
      passwordAdvice = <span style={{color: "yellow"}} role="alert">Your password meets NIST's minimum security requirement. Extend it to at least 12 characters to be really secure.</span>
    } else {
      passwordAdvice = <></>
    }
  }
  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {hasSignedUp === 0 &&
        <form onSubmit={handleSubmit} className="signup-form">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {email !== "" && !/\S+@\S+\.\S+/.test(email) && <span style={{color: "red"}} role="alert">You've input an invalid email.</span>}
          <span className='password-security-requirement'>Password Requirement:</span>
          <ul className='password-security-requirement'>
            <li>6 characters long</li>
          </ul>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {password !== confirmPassword && <span style={{color: "red"}} role="alert">You're passwords don't match.</span>}
          {passwordAdvice}
          <button type="submit" data-testid="signup-button" className={buttonStyle.button}>Sign Up</button>
        </form>
      }
      {hasSignedUp === 1 &&
        <>
          <img src={Eclipse} alt="loading-icon"/>
        </>
      }
      {hasSignedUp === 2 &&
        <>
          <p>You've signed up for Journal More, please check your email in order to confirm your sign up and to log in.</p>
          <button onClick={() => {navigate("/")}} className={buttonStyle.button}>Go back</button>
        </>
      }
    </div>
  );
};

export default SignUp;

