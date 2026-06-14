import React, { useState } from 'react';
import './SignUpScreen.css';

function SignUpScreen({ navigateTo, registerUser }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    hasHousemates: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
    
    // Register user and navigate to household setup
    registerUser(formData);
    navigateTo('household');
  };

  return (
    <div className="screen-container">
      <div className="screen-content signup-screen">
        <div className="signup-header">
          <h1>Create Account</h1>
          <p>Join SplitTrack to manage shared expenses</p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label className="form-label" htmlFor="fullName">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="form-input"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && (
              <div className="form-error">{errors.fullName}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="form-error">{errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="form-error">{errors.password}</div>
            )}
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              id="hasHousemates"
              name="hasHousemates"
              checked={formData.hasHousemates}
              onChange={handleChange}
            />
            <label htmlFor="hasHousemates">
              I live with housemates
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            Continue
          </button>

          <div className="signup-footer">
            <span 
              className="link"
              onClick={() => navigateTo('signup')}
            >
              Already have an account? Log In
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpScreen;
