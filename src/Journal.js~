import React, { useState } from 'react';
import './App.css';

function Journal() {
  const [entry, setEntry] = useState('');
  const prompt = "What are you grateful for today?";

  const handleSave = () => {
    if (entry.trim()) {
      console.log('Prompt:', prompt);
      console.log('Entry:', entry);
      alert('Your journal entry has been saved!');
      setEntry('');
      document.getElementById('journal-entry').innerText = '';
    } else {
      alert('Please write something before saving.');
    }
  };

  const handleInput = (e) => {
    setEntry(e.target.innerText);
  };

  return (
    <div className="container">
      <div className="prompt">
        <p>{prompt}</p>
      </div>
      <div
        id="journal-entry"
        className="entry"
        contentEditable="true"
        onInput={handleInput}
        placeholder="Write your thoughts here..."
      ></div>
      <button onClick={handleSave}>Save Entry</button>
    </div>
  );
}

export default Journal;
