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

  const [hasSignedUp, setHasSignedUp] = useState(0) // ternary value: 0 meaning false, 1 meaning in the process of, 2 meaning has signed up
  const navigate = useNavigate()

  // later on, use ac to determine if there is already a person signed in and if so skip the sign in page
  const handleSubmit = async (event) => {
    setHasSignedUp(1)
    event.preventDefault();
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

  const handleClick = (event) => {
    navigate("/")
  }
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/user')
    }
  }, [isLoggedIn, navigate])

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

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className={buttonStyle.button}>Sign Up</button>
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
          <button onClick={handleClick} className={buttonStyle.button}>Go back</button>
        </>
      }
    </div>
  );
};

export default SignUp;

