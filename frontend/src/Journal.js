import React, { useState } from 'react';
import { supabase } from './supabase'; // Import Supabase client
import './App.css';

function Journal() {
  const [entry, setEntry] = useState('');
  const prompt = "What are you grateful for today?";

  const handleSave = async () => {
    if (entry.trim()) {
      try {
        const user = supabase.auth.user();
        const wordCount = entry.split(/\s+/).filter((word) => word).length;

        // Insert entry into the Entry table
        const { data: entryData, error: entryError } = await supabase
          .from('Entry')
          .insert([
            { person_id: user.id, prompt, body: entry },
          ]);

        if (entryError) throw entryError;

        // Update the Person table
        const { data: personData, error: personError } = await supabase
          .from('Person')
          .update({
            words_written: supabase.rpc('increment_word_count', { increment: wordCount }),
            entries_made: supabase.rpc('increment_count', { increment: 1 }),
            days_active: supabase.rpc('increment_count', { increment: 1 }),
          })
          .eq('id', user.id);

        if (personError) throw personError;

        console.log('Entry saved:', entryData);
        alert('Your journal entry has been saved!');
        setEntry('');
        document.getElementById('journal-entry').innerText = '';
      } catch (error) {
        console.error('Error saving entry:', error.message);
        alert('Error saving entry. Please try again.');
      }
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
