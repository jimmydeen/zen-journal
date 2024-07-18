import { useEffect, useState } from "react";
import { supabase } from "./Supabase";
export function WelcomeBack() {
  // state how many days they've been journalling consecutively (streak)
  const [text, setText] = useState(['welcome back'])
  const [textIndex, setTextIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [streak, setStreak] = useState()
  const [dailyEntryMade, setDailyEntryMade] = useState()

  // fetch the streak and daily entry made
  useEffect(() => {
    let ignore = false
    async function getData() {
      // fetch the streak and daily_entry_made
      const { data: { user } } = await supabase.auth.getUser()
      const id = user.id
      const { data, error } = await supabase.from('users').select(
        `
        daily_entry_made,
        streak
        `
      ).eq('id', id)
      if (error) {
        console.error(error)
      } else {
        if (!ignore) {
          if (data.length !== 1) console.error("There is either more than one user with the same user id or none.")
          else {
            setStreak(data[0].streak)
            setDailyEntryMade(data[0].daily_entry_made)
          }
        }
      }
    }

    getData()
    return () => {
      ignore = true
    }
  }, [])

  // as soon as streak and daily entry made are both defined, adjust the bank of text and wait some time to then delete the currently shown text
  useEffect(() => {
    console.log(streak, dailyEntryMade)
    if (streak !== undefined && dailyEntryMade !== undefined) {
      // if they've journalled today, congratulate them for it and then update them with their streak
      if (dailyEntryMade) {
        setText(['welcome back', `another day journalled, "Documenting little details of your everyday life becomes a celebration of who you are." — Carolyn V. Hamilton`, `you've journalled for ${streak} days continuously`])
      // if they haven't journalled today
      } else {
        // if they haven't journalled in a while (no streak)
        if (streak === 0) {
          setText(["welcome back", "you can start getting into the habit of journalling today", "just take it one day at a time"])
        // if they have a streak they can uphold
        } else {
          setText(["welcome back", "make an entry today to extend your streak", `you've journalled for ${streak} days continuously`])
        }
      }
      const timer = setTimeout(() => {
        setIsTyping(false)
      }, 5000)
      clearTimeout(timer)
    }
  }, [streak, dailyEntryMade])


  // when its deleting, wait some time, change the text index and set typing
  useEffect(() => {
    if (!isTyping) {
      const timer = setTimeout(() => {
        setTextIndex(prev => (prev + 1) % text.length)
        setIsTyping(true)
      }, 2500)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [isTyping, text])

  return (
    <div id="welcome-back-page">
      <div id="welcoming-text" >
        <h1 className={isTyping ? "typing" : "deleting"} style={{animationTimingFunction: `steps(${text[textIndex].length})`}}>{text[textIndex]}</h1>
      </div>
    </div>
  );

}
export default WelcomeBack