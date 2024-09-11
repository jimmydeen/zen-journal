import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/Supabase";
import buttonStyle from '../../assets/styles/button.module.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [successfulEmailSent, setSuccesfulEmailSent] = useState(null)

  const navigate = useNavigate()

  // later on, use ac to determine if there is already a person signed in and if so skip the sign in page
  const handleSubmit = async (event) => {
    event.preventDefault();
    let {error} = await supabase.auth.resetPasswordForEmail(email)
    if (error) {
      setSuccesfulEmailSent(false)
    } else {
      setSuccesfulEmailSent(true)
    }
  };

  const retryEmail = (event) => {
    event.preventDefault()
    setEmail('')
    setSuccesfulEmailSent(null)
  }

  const handleGoBack = (event) => {
    event.preventDefault()
    navigate('/') 
  }

  let validEmailText
  if (!/\S+@\S+\.\S+/.test(email)) {
    validEmailText = <span style={{color: "red"}} role="alert">You've input an invalid email</span>
  } else {
    validEmailText = <></>// is valid email
  }

  if (successfulEmailSent !== null) {
    if (successfulEmailSent) {
      return (
        <>
          <div className="signup-container">
            <h2>Reset Password</h2>
            <p>An email has been sent to your account to reset your password. Please check your email.</p>
            <button onClick={handleGoBack} className={buttonStyle.button}>Go back</button>
          </div>
        </>
      )
    } else {
      return (
        <div className="signup-container">
          <h2>Reset Password</h2>
          <p>An error occurred trying to send an email to your account. Please ensure you've input an email that has an account with us.</p>
          <button onClick={retryEmail} className={buttonStyle.button}>Retry</button>
        </div>
      )
    }
  }
  return (
    <div className="signup-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {validEmailText}
        <button type="submit" className={buttonStyle.button}>Send email</button>
      </form>
    </div>
  );
}
export default ForgotPassword