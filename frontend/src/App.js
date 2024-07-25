import React from 'react';
import './assets/styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserPage from './pages/UserPage';
import Journal from './pages/Journal';
import Friends from './pages/Friends';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import LoadingScreen from './pages/LoadingScreen';
import WelcomeBack from './pages/WelcomeBack';

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
