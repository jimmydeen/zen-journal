import React from 'react';
import './App.css';
import { AuthContext } from './AuthContext';
import AppRouter from './AppRouter';


function App() {
  return (
  <AuthContext.Provider>
    <AppRouter/>
  </AuthContext.Provider>
  );
}

export default App;
