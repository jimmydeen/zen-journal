import { supabase } from "../services/Supabase";
import { useEffect, useState } from "react";

export function useIsLoggedInStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    let ignore = false
    async function getLoggedInStatus() {
      const {data, error} = await supabase.auth.getSession()

      if (error) throw error
    
      if (!ignore) {
        if (data.session !== null) {
          console.log('they are logged in, now setting true')
          setIsLoggedIn(true)
        } else {
          console.log('they are not logged in, now setting false')
          setIsLoggedIn(false)
        }
      }
    }
    getLoggedInStatus()
    return () => {ignore = true}
  }, [])

  return isLoggedIn
}

export default useIsLoggedInStatus