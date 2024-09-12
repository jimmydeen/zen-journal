import React from 'react';
import './assets/styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserPage from './pages/user/UserPage';
import WelcomeBack from './pages/user/WelcomeBack';
import Journal from './pages/user/journal/Journal';
import Friends from './pages/user/friends/Friends';
import Profile from './pages/user/profile/Profile';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import LoadingScreen from './pages/LoadingScreen';

function App() {

  return (
    <BrowserRouter basename={`/${process.env.REACT_APP_PUBLIC_URL}`}>
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
