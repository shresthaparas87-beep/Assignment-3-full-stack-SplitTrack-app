import React, { useState } from 'react';
import BottomNav from './BottomNav';
import './ProfileScreen.css';

function ProfileScreen({ navigateTo, user, household }) {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <div className="screen-container">
      <div className="screen-header">
        <button 
          className="back-button"
          onClick={() => navigateTo('dashboard')}
        >
          ←
        </button>
        <h2>Profile</h2>
        <div style={{ width: '24px' }}></div>
      </div>

      <div className="screen-content">
        <div className="profile-avatar-section">
          <div className="profile-avatar-large">👤</div>
          <h2 className="profile-name">{user?.fullName || 'User Name'}</h2>
          <p className="profile-email">{user?.email || 'user@example.com'}</p>
        </div>

        <div className="section">
          <h3 className="section-title">Household Information</h3>
          <div className="card">
            <div className="profile-info-row">
              <span className="profile-label">Household Name</span>
              <span className="profile-value">{household?.name || 'My Household'}</span>
            </div>
            <div className="profile-info-row">
              <span className="profile-label">Members</span>
              <span className="profile-value">{household?.memberCount || 3} people</span>
            </div>
            <div className="profile-info-row">
              <span className="profile-label">Your Role</span>
              <span className="profile-value">Member</span>
            </div>
          </div>
        </div>

        <div className="section">
          <h3 className="section-title">About SplitTrack</h3>
          <div className="card">
            <p className="about-text">
              <strong>Our Goal:</strong> Helping shared households reduce missed payments, 
              forgotten renewals, and confusion over who owes what.
            </p>
          </div>
        </div>

        <button 
          className="btn btn-secondary"
          onClick={() => setShowPrivacy(!showPrivacy)}
        >
          {showPrivacy ? 'Hide' : 'View'} Privacy & Ethics
        </button>

        {showPrivacy && (
          <div className="privacy-section">
            <div className="card">
              <h3 className="privacy-title">Privacy & Ethics</h3>
              
              <div className="privacy-content">
                <h4>Data Collection</h4>
                <p>
                  SplitTrack only collects the minimum information needed for this MVP prototype. 
                  We do not collect bank account details or payment information.
                </p>

                <h4>What We Don't Collect</h4>
                <ul>
                  <li>Bank account numbers or credentials</li>
                  <li>Credit card or payment details</li>
                  <li>Personal financial history</li>
                  <li>Location data beyond what you manually enter</li>
                </ul>

                <h4>How It Works</h4>
                <p>
                  Users manually enter expenses and subscriptions. All data is stored locally 
                  in your browser for this MVP version. No data is sent to external servers.
                </p>

                <h4>Consent & Transparency</h4>
                <ul>
                  <li>Only share household information with consent from all housemates</li>
                  <li>Financial information is transparent to all household members</li>
                  <li>All members can see shared expenses and subscriptions</li>
                </ul>

                <h4>Future Considerations</h4>
                <p>
                  Future versions of SplitTrack will include:
                </p>
                <ul>
                  <li>Secure cloud storage with encryption</li>
                  <li>User control over data sharing</li>
                  <li>Ability to delete all data at any time</li>
                  <li>Clear privacy policies and terms of service</li>
                  <li>Compliance with data protection regulations</li>
                </ul>

                <h4>MVP Disclaimer</h4>
                <p>
                  <strong>Important:</strong> This is a prototype MVP application for educational 
                  purposes. It does not collect real payment data or connect to financial institutions. 
                  All data is stored locally and will be lost when you close the browser.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <BottomNav currentScreen="profile" navigateTo={navigateTo} />
    </div>
  );
}

export default ProfileScreen;
