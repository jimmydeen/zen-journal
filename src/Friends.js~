import React from 'react';
import './App.css';

function Friends() {
  const friends = [
    { id: 1, name: 'Alice', streak: 5 },
    { id: 2, name: 'Bob', streak: 10 },
    { id: 3, name: 'Charlie', streak: 3 },
  ];

  const sendReminder = (name) => {
    alert(`Reminder sent to ${name}!`);
  };

  return (
    <div className="container">
      <h2>Friends Leaderboard</h2>
      <div className="leaderboard">
        {friends.map(friend => (
          <div key={friend.id} className="friend-row">
            <div className="friend-avatar">{friend.name.charAt(0)}</div>
            <div className="friend-name">{friend.name}</div>
            <div className="friend-streak">{friend.streak} days</div>
            <button className="reminder-button" onClick={() => sendReminder(friend.name)}>Send Reminder</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Friends;
