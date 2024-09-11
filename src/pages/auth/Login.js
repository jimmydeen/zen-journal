import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/Supabase";
import useIsLoggedInStatus from "../../hooks/useLoggedInStatus";
import buttonStyle from '../../assets/styles/button.module.css';

function Login() {
  const isLoggedIn = useIsLoggedInStatus()
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(null)
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  // later on, use ac to determine if there is already a person signed in and if so skip the sign in page
  const handleSubmit = async (event) => {
    event.preventDefault();
    let {error} = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      alert(error.message)
    } else {
      navigate('/user/')
    }
  };

  const onChangeEmail = (e) => {
    e.preventDefault()
    setEmail(e.target.value)
    if (!/\S+@\S+\.\S+/.test(e.target.value)) {
      setIsValidEmail(false)
    } else {
      setIsValidEmail(true)
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/user/')
    }
  }, [isLoggedIn, navigate])

  return (
    <div className="signup-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={onChangeEmail}
          required
        />
        {isValidEmail === false && <span style={{color: "red"}} role="alert">You've input an invalid email</span>}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className={buttonStyle.button}>Login</button>
        <button onClick={()=>{navigate('/forgot-password')}} className={buttonStyle.button}>Forgot your password?</button>
      </form>
    </div>
  );
}
export default Login