import React, { useState } from 'react';
import './ExpenseSplitSummaryScreen.css';

function ExpenseSplitSummaryScreen({ navigateTo, expense, household, setConfirmationData }) {
  const [reminderSent, setReminderSent] = useState(false);

  if (!expense) {
    navigateTo('dashboard');
    return null;
  }

  const memberCount = household?.memberCount || 3;
  const splitAmount = expense.amount / memberCount;
  const members = household?.members || ['You', 'Alex', 'Jamie'];

  const handleSaveExpense = () => {
    setConfirmationData({
      item: expense.name,
      amount: expense.amount,
      paidBy: expense.paidBy,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    });
    navigateTo('confirmation');
  };

  const handleSendReminder = () => {
    setReminderSent(true);
    setTimeout(() => setReminderSent(false), 3000);
  };

  return (
    <div className="screen-container">
      <div className="screen-header">
        <button 
          className="back-button"
          onClick={() => navigateTo('addExpense')}
        >
          ←
        </button>
        <h2>Expense Split Summary</h2>
        <div style={{ width: '24px' }}></div>
      </div>

      <div className="screen-content">
        <div className="summary-card-large">
          <div className="summary-row">
            <span className="summary-label-text">Expense Name</span>
            <span className="summary-value-text">{expense.name}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label-text">Total Amount</span>
            <span className="summary-value-text">${expense.amount.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label-text">Split Per Person</span>
            <span className="summary-value-text highlight">${splitAmount.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label-text">Due Date</span>
            <span className="summary-value-text">
              {new Date(expense.dueDate).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
          <div className="summary-row">
            <span className="summary-label-text">Category</span>
            <span className="summary-value-text">{expense.category}</span>
          </div>
        </div>

        <div className="section">
          <h3 className="section-title">Split Between</h3>
          {members.map((member, index) => (
            <div key={index} className="card member-card">
              <div className="member-info">
                <div className="member-avatar">
                  {member === 'You' ? '👤' : member.charAt(0)}
                </div>
                <div className="member-name">{member}</div>
              </div>
              <div className="member-amount">${splitAmount.toFixed(2)}</div>
            </div>
          ))}
        </div>

        {reminderSent && (
          <div className="reminder-notification">
            ✓ Reminder sent to household members
          </div>
        )}

        <div className="button-group">
          <button 
            className="btn btn-primary"
            onClick={handleSaveExpense}
          >
            Save Expense
          </button>
          <button 
            className="btn btn-secondary"
            onClick={handleSendReminder}
          >
            Send Reminder
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpenseSplitSummaryScreen;
