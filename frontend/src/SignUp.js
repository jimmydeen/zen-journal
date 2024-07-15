import React, { useEffect, useState } from 'react';
import './SignUp.css';
import { supabase } from './Supabase';
import { useNavigate } from 'react-router-dom';
import useIsLoggedInStatus from './useLoggedInStatus';

const SignUp = () => {
  const isLoggedIn = useIsLoggedInStatus()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  // later on, use ac to determine if there is already a person signed in and if so skip the sign in page
  const handleSubmit = async (event) => {
    event.preventDefault();
    let {data, error} = await supabase.auth.signUp({
      email,
      password
    })
    if (error) {
      alert(error.message)
    } else {
      navigate('/user')
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/user')
    }
  }, [isLoggedIn, navigate])

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
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

        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
