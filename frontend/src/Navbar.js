import React from "react"
import { Link } from 'react-router-dom'
import { AuthContext } from "./AuthContext"
import { useContext } from "react"

function Navbar() {
  return (
      <nav className="tab-bar">
        <Link to="/" className="tab">Journal</Link>
        <Link to="/friends" className="tab">Friends</Link>
        <Link to="/profile" className="tab">Profile</Link>
        <Link to="/loading" className="tab">Loading</Link>
      </nav>
  )
}
export default Navbar