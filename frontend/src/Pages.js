import React from "react"
import { Route, Routes } from 'react-router-dom';

import Journal from './Journal';
import Friends from './Friends';
import Profile from './Profile';
import Login from "./Login";
import SignUp from "./SignUp";

function Pages() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/journal" element={<Journal />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </div>
  )
}
export default Pages