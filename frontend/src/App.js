import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Journal from './Journal';
import Friends from './Friends';
import Profile from './Profile';
import Login from './Login';
import SignUp from './SignUp';
import LoadingScreen from './LoadingScreen';
import Navbar from './Navbar';

function App() {
  const aC = useContext(AuthContext)

  return (
    <BrowserRouter>
      {aC?.isLoggedIn && <Navbar/>}
      <Routes>
        <Route exact path="" element={<LoadingScreen />} />
        <Route exact path="/journal" element={<Journal />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
