import React from 'react';
import './App.css';

function Friends() {
  const friends = [
    { id: 1, name: 'Alice', streak: 5 },
    { id: 2, name: 'Bob', streak: 10 },
    { id: 3, name: 'Charlie', streak: 3 },
    { id: 4, name: 'Daniel', streak: 3 },
    { id: 5, name: 'Edward', streak: 3 },
    { id: 6, name: 'Fred', streak: 3 },
    { id: 7, name: 'Grant', streak: 3 },
    { id: 8, name: 'Hugh', streak: 3 },
    { id: 9, name: 'Idris', streak: 3 },
    { id: 10, name: 'Jack', streak: 3 },
    { id: 11, name: 'Luna', streak: 3 },
    { id: 12, name: 'Mina', streak: 3 },
    { id: 13, name: 'Nina', streak: 3 },
    { id: 14, name: 'Opal', streak: 3 },
    { id: 15, name: 'Patty', streak: 3 },
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
