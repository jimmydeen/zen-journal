import React, { useEffect, useState } from 'react';
import fire from './fire-1-svgrepo-com-cropped.svg'
import quill from './7830805_tool_quill_design_icon(2).png'
import './App.css';

function Profile() {
  const [dogImage, setDogImage] = useState()
  const [wordsWritten, setWordsWritten] = useState(4000)
  const [entries, setEntries] = useState(173)
  const [wordsOfEncouragement, setWordsOfEncouragement] = useState(50)
  const [activeDays, setActiveDays] = useState(123)
  const [membersSince, setMembersSince] = useState('12/03/2023')
  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random")
    .then(response => response.json())
    .then(data => setDogImage(data.message))
  },[])

  return (
    <div className="container">
      <div className="profile-header">
        <div className="profile-pic"><img src={dogImage} alt="profile-pic"/></div>
        <div className='profile-details'>
          <div className='profile-name'><b>Edward</b></div>
          <div className="profile-streak">
            <img src={quill} alt="quill"/>
            <p><b>12</b> days journalled</p>
          </div>
        </div>
      </div>
      <div className='stats'>
        <div className='stat'>
          <p>Words written</p>
          <p>{wordsWritten}</p>
        </div>
        <div className='stat'>
          <p>Entries</p>
          <p>{entries}</p>
        </div>
        <div className='stat'>
          <p>Words of Encouragements</p>
          <p>{wordsOfEncouragement}</p>
        </div>
        <div className='stat'>
          <p>Active Days</p>
          <p>{activeDays}</p>
        </div>
        <div className='stat'>
          <p>Member Since</p>
          <p>{membersSince}</p>
        </div>

      </div>
    </div>
  );
}

export default Profile;
