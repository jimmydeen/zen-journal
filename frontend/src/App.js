import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserPage from './UserPage';
import Journal from './Journal';
import Friends from './Friends';
import Profile from './Profile';
import Login from './Login';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import LoadingScreen from './LoadingScreen';
import WelcomeBack from './WelcomeBack';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="" element={<LoadingScreen />} />
        <Route path="/user" element={<UserPage/>}>
          <Route index element={<WelcomeBack/>}/>
          <Route path="journal" element={<Journal/>}/>
          <Route path="friends" element={<Friends />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route exact path="/journal" element={<Journal />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
