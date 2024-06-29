import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Journal from './Journal';
import Friends from './Friends';
import Profile from './Profile';
import LoadingScreen from './LoadingScreen';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="tab-bar">
          <Link to="/" className="tab">Journal</Link>
          <Link to="/friends" className="tab">Friends</Link>
          <Link to="/profile" className="tab">Profile</Link>
          <Link to="/loading" className="tab">Loading</Link>
        </nav>
        <Routes>
          <Route exact path="/" element={<Journal />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/loading" element={<LoadingScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
