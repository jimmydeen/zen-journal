import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/Supabase";

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const navigate = useNavigate()

  // later on, use ac to determine if there is already a person signed in and if so skip the sign in page
  const handleSubmit = async (event) => {
    event.preventDefault();
    let {data, error} = await supabase.auth.resetPasswordForEmail({
      email,
    })
    if (error) {
      alert(error.message)
    } else {
      navigate('/')
    }
  };

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

        <button type="submit" className="signup-button">Send email</button>
      </form>
    </div>
  );
}
export default ForgotPassword