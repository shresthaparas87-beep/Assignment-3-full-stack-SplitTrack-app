import React from 'react';
import './PaymentConfirmationScreen.css';

function PaymentConfirmationScreen({ navigateTo, confirmationData }) {
  if (!confirmationData) {
    navigateTo('dashboard');
    return null;
  }

  return (
    <div className="screen-container">
      <div className="screen-content confirmation-screen">
        <div className="success-icon">✓</div>
        
        <h1 className="confirmation-title">Payment Recorded Successfully</h1>
        
        <div className="confirmation-summary">
          <div className="summary-row">
            <span className="summary-label-text">Item</span>
            <span className="summary-value-text">{confirmationData.item}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label-text">Amount</span>
            <span className="summary-value-text">${confirmationData.amount.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label-text">Paid By</span>
            <span className="summary-value-text">{confirmationData.paidBy}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label-text">Date</span>
            <span className="summary-value-text">{confirmationData.date}</span>
          </div>
        </div>

        <div className="confirmation-actions">
          <button 
            className="btn btn-primary"
            onClick={() => navigateTo('dashboard')}
          >
            Back to Dashboard
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => navigateTo('addExpense')}
          >
            Add Another Expense
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentConfirmationScreen;
