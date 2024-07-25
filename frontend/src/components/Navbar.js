import React from "react"
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from "../services/Supabase"

function Navbar() {
  const navigate = useNavigate()
  function logOutHandler() {
    let { error } = supabase.auth.signOut()
    if (!error) {
      navigate('/')
    } else {
      console.log(error)
    }
  }
  return (
      <nav className="tab-bar">
        <button className="logout-button" onClick={logOutHandler}>Log Out</button>
        <Link to="/user/journal" className="tab">Journal</Link>
        <Link to="/user/friends" className="tab">Friends</Link>
        <Link to="/user/profile" className="tab">Profile</Link>
      </nav>
  )
}
export default Navbar