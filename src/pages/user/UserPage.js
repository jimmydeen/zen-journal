import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { Outlet } from 'react-router-dom'
import { supabase } from '../../services/Supabase'
import Eclipse from '../../assets/images/Eclipse.gif'

export function UserPage() {
  const [isInitialising, setIsInitialising] = useState(true)
  useEffect(() => {
    /* 
      get the user's last entry made
      convert it to the same timezone that they're currently in
      if its more than one day ago (date) (according to their timezone)
        reset their streak and daily_entry_made = false
      else if its one day ago (date) (according to their timezone)
        daily_entry_made = false
      else do nothing
    */ 
   console.log("Just mounted User Page.")
    let ignore = false
    async function init() {
      try {
        // get the last entry made for this user
        const { data: { user } } = await supabase.auth.getUser()
        const id = user.id
        const { data, error } = await supabase.from('users').select(
          `
          last_entry_made
          `
        ).eq('id', id)

        if (error) throw new Error("Unable to fetch last_entry_made")
        else {
          if (!ignore) {
            // convert the last entry made to their current timezone
            if (data.length === 1) {
              const intermediateLastEntryMade = new Date(data[0].last_entry_made)
              const lastEntryMade = new Date(intermediateLastEntryMade.getFullYear(), intermediateLastEntryMade.getMonth(), intermediateLastEntryMade.getDate())
              const intermediateNow = new Date()
              const now = new Date(intermediateNow.getFullYear(), intermediateNow.getMonth(), intermediateNow.getDate())
              const diffTime = Math.abs(now - lastEntryMade)
              const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
              console.log(diffDays)

              if (diffDays > 1) {
                // the date in which they last made an entry was more than one day ago
                // reset the streak and set daily_entry_made to false
                const { error } = await supabase
                  .from('users')
                  .update({streak: 0, daily_entry_made: false})
                  .eq('id', id)
                console.log("Successfully reset the streak to 0 and the daily entry made to false")
                if (error) throw new Error("Unable to reset the streak and daily_entry_made (the user has been inactive for at least one day).")
              } else if (diffDays === 1) {
                const { error } = await supabase
                  .from('users')
                  .update({daily_entry_made: false})
                  .eq('id', id)
                console.log("Successfully reset the daily_entry_made to false")
                if (error) throw new Error("Unable to reset daily_entry_made (the user has logged in the day after their last login).")
              } else {
                console.log("Logging in the same day that they made their last entry.")
              }
              setIsInitialising(false)
            } else {
              throw new Error("More than one user to the same user id.")
            }
          }
        }
        console.log("Successfully updated their streak status and daily_entry_made status.")
      }
      catch (error) {
        // may have to reinvoke function
        console.error(error)
      }
    }

    init()
    return () => {ignore = true}
  }, [])

  return (
    <>
      {isInitialising ? <img src={Eclipse} alt="loading-icon"/> : <><Navbar/><Outlet/></>}
    </>
  )
}
export default UserPage