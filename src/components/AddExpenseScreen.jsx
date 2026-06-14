import React, { useState } from 'react';
import './AddExpenseScreen.css';

function AddExpenseScreen({ navigateTo, addExpense, household }) {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: 'Utilities',
    dueDate: '',
    splitMethod: 'Equal Split',
    paidBy: 'You'
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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Expense name is required';
    }
    
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
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
    
    // Add expense and navigate to summary
    addExpense({
      ...formData,
      amount: parseFloat(formData.amount)
    });
    navigateTo('expenseSummary');
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
        <h2>Add Shared Expense</h2>
        <div style={{ width: '24px' }}></div>
      </div>

      <div className="screen-content">
        <form onSubmit={handleSubmit} className="expense-form">
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Expense Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              placeholder="e.g., Internet Bill, Groceries"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <div className="form-error">{errors.name}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="amount">
              Total Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              className="form-input"
              placeholder="0.00"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
            />
            {errors.amount && (
              <div className="form-error">{errors.amount}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Utilities">Utilities</option>
              <option value="Rent">Rent</option>
              <option value="Groceries">Groceries</option>
              <option value="Internet">Internet</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="dueDate">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              className="form-input"
              value={formData.dueDate}
              onChange={handleChange}
            />
            {errors.dueDate && (
              <div className="form-error">{errors.dueDate}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="splitMethod">
              Split Method
            </label>
            <select
              id="splitMethod"
              name="splitMethod"
              className="form-select"
              value={formData.splitMethod}
              onChange={handleChange}
            >
              <option value="Equal Split">Equal Split</option>
              <option value="Custom Split">Custom Split</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="paidBy">
              Paid By
            </label>
            <select
              id="paidBy"
              name="paidBy"
              className="form-select"
              value={formData.paidBy}
              onChange={handleChange}
            >
              <option value="You">You</option>
              <option value="Alex">Alex</option>
              <option value="Jamie">Jamie</option>
            </select>
          </div>

          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              Calculate Split
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

export default AddExpenseScreen;
