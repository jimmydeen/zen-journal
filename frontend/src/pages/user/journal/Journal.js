import React, { useCallback, useEffect, useState } from 'react';
import { supabase } from '../../../services/Supabase.js'; // Import Supabase client
import LoadingText from '../../../components/loading-text.js';
import '../../../assets/styles/App.css';
import QuestionAndAnswer from '../../../components/questionAndAnswer.js';
import { backendApiUrl, portionOfTimesToFetchFromBackend }  from '../../../services/backendApi.js';

function Journal() {
  const [stage, setStage] = useState(0)
  const [userState, setUserState] = useState({})
  const [entry, setEntry] = useState('');
  const [prompt, setPrompt] = useState('')
  const [promptId, setPromptId] = useState(null)

  const [dailyEntryMade, setDailyEntryMade] = useState()
  // const test_prompt = "What are you grateful for today?";
  // const test_prompt_id = "e3967550-0977-4a7e-9cd1-9189564988e1";

  const handleSave = useCallback(async () => {
    if (entry.trim()) {
      try {
        const { data: { user }} = await supabase.auth.getUser();
        const wordCount = entry.split(/\s+/).filter((word) => word).length;

        // Insert entry into the Entry table
        const { data: entryData, error: entryError } = await supabase
          .from('Entry')
          .insert([
            { person_id: user.id, prompt_id: promptId , body: entry },
          ]);

        if (entryError) throw entryError;
        console.log("User ID:", user.id)
        console.log("Promp ID:", promptId)

        // Update the users table
        /* 
          invoke the rpc update_user_and_prompt(user_id, words_delta)
          if (daily_entry_made) {
            days_active will increment
          }
          Entry
          entries_made will increment
          words_written will increment by the delta
          Prompt
          updates row corresponding to the prompt
        */
        let newStreak
        let {data, error} = await supabase.rpc('update_user_and_prompt', { user_id: user.id, word_count: wordCount, prompt_id_argument: promptId})
        if (error) {console.error(error); throw error;}
        else {
          newStreak = data.new_streak_value
        }

        setEntry('');
        document.getElementById('journal-entry').innerText = '';
        if (dailyEntryMade) {
          alert("Another entry made for today.")
        } else {
          if (newStreak === 1) {
            alert(`You've started a new streak. Keep journalling daily to increase your streak.`)
          } else {
            alert(`You've extended your streak to ${newStreak} days.`)
          }
        }
        setStage(0)
      } catch (error) {
        console.error('Error saving entry:', error.message);
        alert('Error saving entry. Please try again.');
      }
    } else {
      alert('Please write something before saving.');
    }
  }, [promptId, entry, dailyEntryMade]);

  const handleInput = (e) => {
    setEntry(e.target.innerText);
  };

  const handleResponse = useCallback((response, stage) => {
    return () => {
      const stageStrings = ['overall', 'energy', 'isStressed']
      setUserState(prevState => ({...prevState, [stageStrings[stage]]: response}))
      setStage(prev => prev + 1)
    }
  }, [])

  // determine whether the person has already made their daily entry or not
  useEffect(() => {
    async function fetchDailyEntryMadeStatus() {
      const { data: { user } } = await supabase.auth.getUser()
      const id = user.id
      const { data, error } = await supabase.from('users').select(
        `
        daily_entry_made,
        `
      ).eq('id', id)

      if (data.length !== 1) {
        console.error("There should only be one user for this id.")
      }

      const ourUser = data[0]
      setDailyEntryMade(ourUser.daily_entry_made)
    }
  }, [])

  // if we're at the loading stage fetch the prompt
  useEffect(() => {
    let ignore = false
    // we must fetch the prompt
    if (stage === 3) {
      // randomly determine if we'll get a prompt from the database or from the backend api
      // if (Math.random() * 10 < portionOfTimesToFetchFromBackend) {
        // we'll fetch from the backend
        const fetchFromBackend = async function () {
          const params = new URLSearchParams(userState)
          try {
            // get the generated prompt
            const response = await fetch(`${backendApiUrl}?${params.toString()}`, {
              method: 'GET'
            })
            if (!response.ok) throw new Error(response.status)
            const backendData = await response.json()
            console.log(response)
            console.log(backendData)
            if (!ignore) {
              setPrompt(backendData.message)
            }

            // write this new prompt to the database
            const { data, error } = await supabase
              .from('Prompt')
              .insert(
                {
                  category_flag: 42, // needs to be computed based on user state but for now use this stub
                  number_entries: 0, 
                  prompt_text: backendData.message
                }
              )
              .select()
            if (error) throw new Error(error)
            else if (!ignore) {
              setPromptId(data[0].prompt_id)
              setStage(4)
            }
          } catch(error) {
            console.error(error)
            alert(error)
          }
        }
        fetchFromBackend()
      // } else {
      //   // we'll get from our database (random atm)
      //   supabase.
      // }
    }

    return () => {
      ignore = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage])

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
      {/* loading screen to indicate we're either fetching or generating the prompt*/}
      {stage === 3 &&
        <div className='question'>
          <LoadingText/>
        </div>
      }
      {stage === 4 && 
        <div className='question'>
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
      }
    </div>
  );
}

export default Journal;
