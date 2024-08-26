import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/LoadingScreen.css';
import buttonStyle from '../assets/styles/button.module.css'
import supabase from '../services/Supabase';

function LoadingScreen() {
  const text = "Journal more with us";
  const [showButtons, setShowButtons] = useState(false);

  const [isResettingPassword, setIsResettingPassword] = useState(false)
  const [password, setPassword] = useState()
  const [successfulReset, setSuccessfulReset] = useState(null)

  // if we came from the password reset email link 
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
     if (event === "PASSWORD_RECOVERY") {
      setIsResettingPassword(true)
     }
    })
  }, [])

  const handlePasswordChange = (event) => {
    event.preventDefault()
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { data, error } = await supabase.auth
      .updateUser({ password })

    if (data) setSuccessfulReset(true)
    if (error) setSuccessfulReset(false)
  }

  const navigate = useNavigate()
  const handleLogin = (event) => {
    navigate("/login")
  }

  // this is untested, we need to mock supabase call to updateUser in ForgotPassword.test.js
  const handleRetry = (event) => {
    event.preventDefault()
    setIsResettingPassword(true)
    setPassword()
    setSuccessfulReset(null)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, text.length * 100 + 1000); // Extra delay after text animation

    return () => clearTimeout(timer);
  }, [text.length]);

  if (successfulReset !== null) {
    if (successfulReset === true) {
      return (
        <div className="signup-container">
          <h2>Reset Password</h2>
          <p>You have successfully reset your password.</p>
          <button className={buttonStyle.button} onClick={handleLogin}>Login</button>
        </div>
      )
    } else {
      return (
        <div className="signup-container">
          <h2>Reset Password</h2>
          <p>An error occurred when trying to reset your password. Please try again.</p>
          <button className={buttonStyle.button} onClick={handleRetry}>Retry</button>
        </div>
      )
    }
  }

  if (isResettingPassword) return (
      <div className="signup-container">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button type="submit" className={buttonStyle.button}>Reset</button>
        </form>
      </div> 
  )

  return (
    <div className="loading-screen">
      <h1 className="loading-text">
        {text.split("").map((char, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
      <div className={`button-container ${showButtons ? 'fade-in' : ''}`}>
        <Link to="/signup" data-testid="signup-button"><button className={buttonStyle.button}>Sign Up</button></Link>
        <Link to="/login" data-testid="login-button"><button className={buttonStyle.button}>Login</button></Link>
      </div>
    </div>
  )
}

export default LoadingScreen;
