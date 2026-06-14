import React from 'react';
import './WelcomeScreen.css';

function WelcomeScreen({ navigateTo }) {
  return (
    <div className="screen-container welcome-screen">
      <div className="welcome-content">
        <div className="logo-container">
          <div className="logo">💰</div>
        </div>
        
        <h1 className="app-title">SplitTrack</h1>
        <p className="app-tagline">Track shared bills and subscriptions in one place</p>
        
        <div className="welcome-illustration">
          <div className="illustration-card">
            <span className="illustration-icon">🏠</span>
            <p>Manage household expenses</p>
          </div>
          <div className="illustration-card">
            <span className="illustration-icon">📊</span>
            <p>Split bills fairly</p>
          </div>
          <div className="illustration-card">
            <span className="illustration-icon">🔔</span>
            <p>Never miss a payment</p>
          </div>
        </div>
        
        <div className="welcome-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => navigateTo('signup')}
          >
            Get Started
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => navigateTo('signup')}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;
