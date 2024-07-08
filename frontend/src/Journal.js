import React, { useCallback, useEffect, useState } from 'react';
import { supabase } from './Supabase.js'; // Import Supabase client
import './App.css';
import QuestionAndAnswer from './questionAndAnswer.js';

function Journal() {
  const [stage, setStage] = useState(0)
  const [userState, setUserState] = useState({})
  const [entry, setEntry] = useState('');
  const test_prompt = "What are you grateful for today?";
  const test_prompt_id = "e3967550-0977-4a7e-9cd1-9189564988e1";

  const handleSave = async () => {
    if (entry.trim()) {
      try {
        const { data: { user }} = await supabase.auth.getUser();
        const wordCount = entry.split(/\s+/).filter((word) => word).length;

        // Insert entry into the Entry table
        const { data: entryData, error: entryError } = await supabase
          .from('Entry')
          .insert([
            { person_id: user.id, prompt_id: test_prompt_id , body: entry },
          ]);

        if (entryError) throw entryError;

        const wcUpdated = await supabase.rpc('increment_word_count', { increment: wordCount })
        console.log(wcUpdated)

        // Update the users table
        /* 
          invoke the rpc user_makes_entry(user_id, words_delta)
          if (daily_entry_made) {
            days_active will increment
          }
          entries_made will increment
          words_written will increment by the delta
        */
        let {data, error} = await supabase.rpc('user_makes_entry', { user_id: user.id, word_count: wordCount})

        if (error) throw error
        else console.log(data)

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

  useEffect(() => {
    console.log(userState)
    console.log(stage)
  }, [userState, stage])

  const handleResponse = useCallback((response, stage) => {
    return () => {
      const stageStrings = ['overall', 'energy', 'isStressed']
      setUserState(prevState => ({...prevState, [stageStrings[stage]]: response}))
      setStage(prev => prev + 1)
    }
  }, [])

  return (
    <div className="container">
      {/* First Question */}
      {stage === 0 &&
        <QuestionAndAnswer stage={0} question="How are you feeling today?" answers={['Great', 'Alright', 'Poor']} handleResponse={handleResponse}/>
      }
      {stage === 1 &&
        <QuestionAndAnswer stage={1} question="How much energy did you have?" answers={['High', 'Average', 'Low']} handleResponse={handleResponse}/>
      }
      {stage === 2 &&
        <QuestionAndAnswer stage={2} question="Did you feel stressed at all today?" answers={['Yes', 'No']} handleResponse={handleResponse}/>
      }
      {stage === 3 &&
        <div>
          <div className="prompt">
            <p>{test_prompt}</p>
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
      }
    </div>
  );
}

export default Journal;
