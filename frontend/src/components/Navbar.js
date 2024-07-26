import React from "react"
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from "../services/Supabase"
import styles from '../assets/styles/tabs.module.css'
import buttonStyle from '../assets/styles/button.module.css'

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
      <nav className={styles['tab-bar']}>
        <button className={`${styles['logout-button']} ${buttonStyle.button}`} onClick={logOutHandler}>Log Out</button>
        <Link to="/user/journal" className={styles.tab}>Journal</Link>
        <Link to="/user/friends" className={styles.tab}>Friends</Link>
        <Link to="/user/profile" className={styles.tab}>Profile</Link>
      </nav>
  )
}
export default Navbar