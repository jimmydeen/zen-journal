import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/LoadingScreen.css';
import buttonStyle from '../assets/styles/button.module.css'

function LoadingScreen() {
  const text = "Journal more with us";
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, text.length * 100 + 1000); // Extra delay after text animation

    return () => clearTimeout(timer);
  }, [text.length]);

  return (
    <div className="loading-screen">
      <h1 className="loading-text">
        {text.split("").map((char, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
      <div className={`button-container ${showButtons ? 'fade-in' : ''}`}>
        <Link to="/signup"><button className={buttonStyle.button}>Sign Up</button></Link>
        <Link to="/login"><button className={buttonStyle.button}>Login</button></Link>
      </div>
    </div>
  );
}

export default LoadingScreen;
