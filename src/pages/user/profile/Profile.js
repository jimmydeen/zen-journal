import React, { useEffect, useState } from 'react';
import { supabase } from '../../../services/Supabase';
import quill from '../../../assets/images/7830805_tool_quill_design_icon(2).png'
import '../../../assets/styles/App.css';
import containerStyle from '../../../assets/styles/container.module.css';
import profileStyle from '../../../assets/styles/profile.module.css';

function Profile() {
  const [isLoading, setIsLoading] = useState(true)
  const [dogImage, setDogImage] = useState()
  const [wordsWritten, setWordsWritten] = useState(4000)
  const [entries, setEntries] = useState(173)
  const [wordsOfEncouragement, setWordsOfEncouragement] = useState(50)
  const [activeDays, setActiveDays] = useState(123)
  const [membersSince, setMembersSince] = useState('12/03/2023')
  const [streak, setStreak] = useState('0')
  const [email, setEmail] = useState()
  useEffect(() => {
    let ignore = false
    // race condition
    async function fetchData() {
      const dogResponse = await fetch("https://dog.ceo/api/breeds/image/random")
      const dogData = await dogResponse.json()

      const { data: { user } } = await supabase.auth.getUser()
      const id = user.id
      const { data, error } = await supabase.from('users').select(
        `
        created_at,
        days_active,
        entries_made,
        words_written,
        encouragements,
        daily_entry_made,
        streak,
        email
        `
      ).eq('id', id)

      if (error) {
        alert(error)
      } else {
        if (!ignore) {
          setDogImage(dogData.message)
          if (data.length === 1) {
            const ourUser = data[0]
            setWordsWritten(ourUser.words_written)
            setEntries(ourUser.entries_made)
            setWordsOfEncouragement(ourUser.encouragements)
            setActiveDays(ourUser.days_active)
            setEmail(ourUser.email) 
            setStreak(ourUser.streak)
            const date = new Date(ourUser.created_at)
            const options = {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            };
            setMembersSince(date.toLocaleDateString('en-US', options))
            
            setIsLoading(false)
          } else {
            console.error("Either 0 or more than 1 user found pertaining to id.")
          }
        }
      }
    } 
    fetchData()
    return () => {
      ignore = true
      setIsLoading(true)
    }
  }, [])

  return (
    isLoading ? 
    <div className={containerStyle.container} role="tabpanel">
      <div className={profileStyle['profile-header']}>
        <div className={`${profileStyle['profile-pic']} ${profileStyle.skeleton}`}/>
        <div className={profileStyle['profile-details']}>
          <div className={`${profileStyle['profile-name-skeleton']} ${profileStyle.skeleton}`}/>
          <div className={`${profileStyle['skeleton-streak']} ${profileStyle.skeleton}`}/>
        </div>
      </div>
      <div className={profileStyle.stats}>
        <div className={profileStyle.stat}>
          <p>Words written</p>
          <div className={`${profileStyle['skeleton-text']} ${profileStyle.skeleton}`}/>
        </div>
        <div className={profileStyle.stat}>
          <p>Entries</p>
          <div className={`${profileStyle['skeleton-text']} ${profileStyle.skeleton}`}/>
        </div>
        <div className={profileStyle.stat}>
          <p>Words of Encouragements</p>
          <div className={`${profileStyle['skeleton-text']} ${profileStyle.skeleton}`}/>
        </div>
        <div className={profileStyle.stat}>
          <p>Active Days</p>
          <div className={`${profileStyle['skeleton-text']} ${profileStyle.skeleton}`}/>
        </div>
        <div className={profileStyle.stat}>
          <p>Member Since</p>
          <div className={`${profileStyle['skeleton-text']} ${profileStyle.skeleton}`}/>
        </div>
      </div>
    </div>
    :
    <div className={containerStyle.container} role="tabpanel">
      <div className={profileStyle['profile-header']}>
        <div className={profileStyle['profile-pic']}><img src={dogImage} alt="profile-pic"/></div>
        <div className={profileStyle['profile-details']}>
          <div className={profileStyle['profile-name']}><b>{email}</b></div>
          <div className={profileStyle['profile-streak']}>
            <img src={quill} alt="quill"/>
            <p><b>{streak}</b> day{streak > 1 ? 's' : ''} journalled</p>
          </div>
        </div>
      </div>
      <div className={profileStyle.stats}>
        <div className={profileStyle.stat}>
          <p>Words written</p>
          <p data-testid="wordsWritten">{wordsWritten}</p>
        </div>
        <div className={profileStyle.stat}>
          <p>Entries</p>
          <p data-testid="entries">{entries}</p>
        </div>
        <div className={profileStyle.stat}>
          <p>Words of Encouragements</p>
          <p data-testid="wordsOfEncouragement">{wordsOfEncouragement}</p>
        </div>
        <div className={profileStyle.stat}>
          <p>Active Days</p>
          <p data-testid="activeDays">{activeDays}</p>
        </div>
        <div className={profileStyle.stat}>
          <p>Member Since</p>
          <p data-testid="memberSince">{membersSince}</p>
        </div>

      </div>
    </div>
  );
}

export default Profile;
