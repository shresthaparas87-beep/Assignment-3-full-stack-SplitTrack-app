import React, { useState } from 'react';
import BottomNav from './BottomNav';
import './SubscriptionTrackerScreen.css';

function SubscriptionTrackerScreen({ navigateTo, subscriptions }) {
  const [filter, setFilter] = useState('all');

  const filteredSubscriptions = subscriptions.filter(sub => {
    if (filter === 'all') return true;
    if (filter === 'shared') return sub.shared;
    if (filter === 'personal') return !sub.shared;
    return true;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
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
        <h2>Subscriptions</h2>
        <div style={{ width: '24px' }}></div>
      </div>

      <div className="screen-content">
        <div className="filter-tabs">
          <button
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-tab ${filter === 'shared' ? 'active' : ''}`}
            onClick={() => setFilter('shared')}
          >
            Shared
          </button>
          <button
            className={`filter-tab ${filter === 'personal' ? 'active' : ''}`}
            onClick={() => setFilter('personal')}
          >
            Personal
          </button>
        </div>

        <div className="subscriptions-list">
          {filteredSubscriptions.map((subscription) => (
            <div key={subscription.id} className="card subscription-card">
              <div className="subscription-header">
                <div className="subscription-info">
                  <div className="subscription-icon">🔄</div>
                  <div>
                    <div className="subscription-name">{subscription.name}</div>
                    <div className="subscription-cycle">{subscription.billingCycle}</div>
                  </div>
                </div>
                <div className="subscription-cost">${subscription.cost.toFixed(2)}</div>
              </div>
              <div className="subscription-footer">
                <span className={`badge ${subscription.shared ? 'badge-shared' : 'badge-personal'}`}>
                  {subscription.shared ? 'Shared' : 'Personal'}
                </span>
                <span className="subscription-renewal">
                  Next Renewal: {formatDate(subscription.renewalDate)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button 
          className="btn btn-primary add-subscription-btn"
          onClick={() => navigateTo('addSubscription')}
        >
          + Add Subscription
        </button>
      </div>

      <BottomNav currentScreen="subscriptions" navigateTo={navigateTo} />
    </div>
  );
}

export default SubscriptionTrackerScreen;
