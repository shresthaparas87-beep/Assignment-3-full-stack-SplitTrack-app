import React from 'react';
import BottomNav from './BottomNav';
import './DashboardScreen.css';

function DashboardScreen({ navigateTo, household, expenses, subscriptions }) {
  // Calculate summary data
  const upcomingCount = 3;
  const sharedBillsTotal = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const subscriptionsTotal = subscriptions
    .filter(sub => sub.shared)
    .reduce((sum, sub) => sum + sub.cost, 0);
  const youOwe = 87.25;

  // Get next payments (combine expenses and subscriptions)
  const nextPayments = [
    ...expenses.map(exp => ({
      ...exp,
      type: 'expense',
      date: exp.dueDate
    })),
    ...subscriptions.filter(sub => sub.shared).map(sub => ({
      ...sub,
      type: 'subscription',
      date: sub.renewalDate,
      amount: sub.cost
    }))
  ].sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 3);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  return (
    <div className="screen-container">
      <div className="screen-header">
        <h2>Dashboard</h2>
        <button 
          className="profile-button"
          onClick={() => navigateTo('profile')}
        >
          👤
        </button>
      </div>

      <div className="screen-content">
        <div className="household-info">
          <h3>{household?.name || 'My Household'}</h3>
          <p>{household?.memberCount || 3} members</p>
        </div>

        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-label">Upcoming This Week</div>
            <div className="summary-value">{upcomingCount} items</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Shared Bills Due</div>
            <div className="summary-value">${sharedBillsTotal.toFixed(2)}</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Subscriptions Due</div>
            <div className="summary-value">${subscriptionsTotal.toFixed(2)}</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">You Owe</div>
            <div className="summary-value text-danger">${youOwe.toFixed(2)}</div>
          </div>
        </div>

        <div className="section">
          <div className="section-header">
            <h3 className="section-title">Next Payments</h3>
          </div>

          {nextPayments.map((payment, index) => (
            <div key={index} className="card payment-card">
              <div className="payment-info">
                <div className="payment-icon">
                  {payment.type === 'expense' ? '💳' : '🔄'}
                </div>
                <div className="payment-details">
                  <div className="payment-name">{payment.name}</div>
                  <div className="payment-date">Due {formatDate(payment.date)}</div>
                </div>
              </div>
              <div className="payment-amount">${payment.amount.toFixed(2)}</div>
            </div>
          ))}
        </div>

        <div className="quick-actions">
          <button 
            className="btn btn-primary"
            onClick={() => navigateTo('addExpense')}
          >
            + Add Shared Expense
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => navigateTo('addSubscription')}
          >
            + Add Subscription
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => navigateTo('reminders')}
          >
            🔔 View Reminders
          </button>
        </div>
      </div>

      <BottomNav currentScreen="dashboard" navigateTo={navigateTo} />
    </div>
  );
}

export default DashboardScreen;
