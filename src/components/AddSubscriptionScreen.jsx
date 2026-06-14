import React, { useState } from 'react';
import './AddSubscriptionScreen.css';

function AddSubscriptionScreen({ navigateTo, addSubscription }) {
  const [formData, setFormData] = useState({
    name: '',
    cost: '',
    billingCycle: 'Monthly',
    renewalDate: '',
    shared: true
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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Subscription name is required';
    }
    
    if (!formData.cost) {
      newErrors.cost = 'Cost is required';
    } else if (parseFloat(formData.cost) <= 0) {
      newErrors.cost = 'Cost must be greater than 0';
    }
    
    if (!formData.renewalDate) {
      newErrors.renewalDate = 'Renewal date is required';
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
    
    // Add subscription and navigate to subscription tracker
    addSubscription({
      ...formData,
      cost: parseFloat(formData.cost)
    });
    navigateTo('subscriptions');
  };

  return (
    <div className="screen-container">
      <div className="screen-header">
        <button 
          className="back-button"
          onClick={() => navigateTo('dashboard')}
        >
          ←
        </button>
        <h2>Add Subscription</h2>
        <div style={{ width: '24px' }}></div>
      </div>

      <div className="screen-content">
        <form onSubmit={handleSubmit} className="subscription-form">
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Subscription Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              placeholder="e.g., Netflix, Spotify, Gym"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <div className="form-error">{errors.name}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="cost">
              Cost
            </label>
            <input
              type="number"
              id="cost"
              name="cost"
              className="form-input"
              placeholder="0.00"
              step="0.01"
              value={formData.cost}
              onChange={handleChange}
            />
            {errors.cost && (
              <div className="form-error">{errors.cost}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="billingCycle">
              Billing Cycle
            </label>
            <select
              id="billingCycle"
              name="billingCycle"
              className="form-select"
              value={formData.billingCycle}
              onChange={handleChange}
            >
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="renewalDate">
              Renewal Date
            </label>
            <input
              type="date"
              id="renewalDate"
              name="renewalDate"
              className="form-input"
              value={formData.renewalDate}
              onChange={handleChange}
            />
            {errors.renewalDate && (
              <div className="form-error">{errors.renewalDate}</div>
            )}
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              id="shared"
              name="shared"
              checked={formData.shared}
              onChange={handleChange}
            />
            <label htmlFor="shared">
              Shared with household
            </label>
          </div>

          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              Save Subscription
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigateTo('dashboard')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSubscriptionScreen;
