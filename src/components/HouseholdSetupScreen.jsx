import React, { useState } from 'react';
import './HouseholdSetupScreen.css';

function HouseholdSetupScreen({ navigateTo, setupHousehold }) {
  const [mode, setMode] = useState('create'); // 'create' or 'join'
  const [formData, setFormData] = useState({
    householdName: '',
    memberCount: '3',
    inviteCode: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (mode === 'create') {
      if (!formData.householdName.trim()) {
        newErrors.householdName = 'Household name is required';
      }
      if (!formData.memberCount || formData.memberCount < 2) {
        newErrors.memberCount = 'Must have at least 2 members';
      }
    } else {
      if (!formData.inviteCode.trim()) {
        newErrors.inviteCode = 'Invite code is required';
      }
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Setup household
    const householdData = mode === 'create' 
      ? {
          name: formData.householdName,
          memberCount: parseInt(formData.memberCount),
          members: ['You', 'Alex', 'Jamie'].slice(0, parseInt(formData.memberCount))
        }
      : {
          name: 'Shared House',
          memberCount: 3,
          members: ['You', 'Alex', 'Jamie'],
          joinedViaCode: formData.inviteCode
        };
    
    setupHousehold(householdData);
    navigateTo('dashboard');
  };

  return (
    <div className="screen-container">
      <div className="screen-content household-setup-screen">
        <div className="household-header">
          <h1>Set Up Household</h1>
          <p>Create a new household or join an existing one</p>
        </div>

        <div className="mode-selector">
          <button
            className={`mode-button ${mode === 'create' ? 'active' : ''}`}
            onClick={() => setMode('create')}
          >
            Create New
          </button>
          <button
            className={`mode-button ${mode === 'join' ? 'active' : ''}`}
            onClick={() => setMode('join')}
          >
            Join Existing
          </button>
        </div>

        <form onSubmit={handleSubmit} className="household-form">
          {mode === 'create' ? (
            <>
              <div className="form-group">
                <label className="form-label" htmlFor="householdName">
                  Household Name
                </label>
                <input
                  type="text"
                  id="householdName"
                  name="householdName"
                  className="form-input"
                  placeholder="e.g., Campus Apartment, Beach House"
                  value={formData.householdName}
                  onChange={handleChange}
                />
                {errors.householdName && (
                  <div className="form-error">{errors.householdName}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="memberCount">
                  Number of Members
                </label>
                <select
                  id="memberCount"
                  name="memberCount"
                  className="form-select"
                  value={formData.memberCount}
                  onChange={handleChange}
                >
                  <option value="2">2 members</option>
                  <option value="3">3 members</option>
                  <option value="4">4 members</option>
                  <option value="5">5 members</option>
                  <option value="6">6 members</option>
                </select>
                {errors.memberCount && (
                  <div className="form-error">{errors.memberCount}</div>
                )}
              </div>
            </>
          ) : (
            <div className="form-group">
              <label className="form-label" htmlFor="inviteCode">
                Invite Code
              </label>
              <input
                type="text"
                id="inviteCode"
                name="inviteCode"
                className="form-input"
                placeholder="Enter 6-digit code"
                value={formData.inviteCode}
                onChange={handleChange}
              />
              {errors.inviteCode && (
                <div className="form-error">{errors.inviteCode}</div>
              )}
              <p className="form-hint">
                Ask your housemate for the invite code
              </p>
            </div>
          )}

          <button type="submit" className="btn btn-primary">
            Enter Household
          </button>
        </form>
      </div>
    </div>
  );
}

export default HouseholdSetupScreen;
