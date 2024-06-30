import React, { useContext } from "react"
import { AuthContext } from "./AuthContext"
import { Link } from 'react-router-dom'
import { supabase } from "./Supabase"

function Navbar() {
  const {ac, setAc} = useContext(AuthContext)
  function logOutHandler() {
    let { error } = supabase.auth.signOut()
    if (!error) {
      setAc({isLoggedIn: false})
    }
    console.log(error)
    alert('Youre logged out now.')
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