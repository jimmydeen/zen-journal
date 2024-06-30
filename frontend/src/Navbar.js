import React, { useContext } from "react"
import { AuthContext } from "./AuthContext"
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from "./Supabase"

function Navbar() {
  const {ac, setAc} = useContext(AuthContext)
  const navigate = useNavigate()
  function logOutHandler() {
    let { error } = supabase.auth.signOut()
    if (!error) {
      setAc({isLoggedIn: false})
      navigate('')
    } else {
      console.log(error)
    }
  }
  return (
      <nav className="tab-bar">
        <button className="logout-button" onClick={logOutHandler}>Log Out</button>
        <Link to="/journal" className="tab">Journal</Link>
        <Link to="/friends" className="tab">Friends</Link>
        <Link to="/profile" className="tab">Profile</Link>
      </nav>
  )
}
export default Navbar