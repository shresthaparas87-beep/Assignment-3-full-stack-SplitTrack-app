import React, { useState } from 'react';
import BottomNav from './BottomNav';
import './RemindersScreen.css';

function RemindersScreen({ navigateTo, expenses, subscriptions, setConfirmationData }) {
  const [reminderSent, setReminderSent] = useState(null);

  // Create reminder items from expenses and subscriptions
  const reminders = [
    {
      id: 1,
      name: 'Internet Bill',
      amount: 75.00,
      dueText: 'Due tomorrow',
      status: 'pending',
      type: 'expense'
    },
    {
      id: 2,
      name: 'Netflix',
      amount: 17.99,
      dueText: 'Renews in 3 days',
      status: 'pending',
      type: 'subscription'
    },
    {
      id: 3,
      name: 'Rent Share',
      amount: 450.00,
      dueText: 'Overdue',
      status: 'overdue',
      type: 'expense',
      note: 'Alex has not paid'
    },
    {
      id: 4,
      name: 'Spotify',
      amount: 15.99,
      dueText: 'Renews in 6 days',
      status: 'pending',
      type: 'subscription'
    }
  ];

  const handleMarkAsPaid = (reminder) => {
    setConfirmationData({
      item: reminder.name,
      amount: reminder.amount,
      paidBy: 'You',
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    });
    navigateTo('confirmation');
  };

  const handleRemindHousemate = (reminderId) => {
    setReminderSent(reminderId);
    setTimeout(() => setReminderSent(null), 3000);
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
        <h2>Upcoming Reminders</h2>
        <div style={{ width: '24px' }}></div>
      </div>

      <div className="screen-content">
        {reminderSent && (
          <div className="reminder-notification">
            ✓ Reminder sent to housemate
          </div>
        )}

        <div className="reminders-list">
          {reminders.map((reminder) => (
            <div key={reminder.id} className="card reminder-card">
              <div className="reminder-header">
                <div className="reminder-info">
                  <div className="reminder-icon">
                    {reminder.type === 'expense' ? '💳' : '🔄'}
                  </div>
                  <div>
                    <div className="reminder-name">{reminder.name}</div>
                    {reminder.note && (
                      <div className="reminder-note">{reminder.note}</div>
                    )}
                    <div className="reminder-due">
                      {reminder.dueText} • ${reminder.amount.toFixed(2)}
                    </div>
                  </div>
                </div>
                <span className={`badge ${reminder.status === 'overdue' ? 'badge-overdue' : 'badge-pending'}`}>
                  {reminder.status === 'overdue' ? 'Overdue' : 'Pending'}
                </span>
              </div>
              <div className="reminder-actions">
                <button 
                  className="btn btn-small btn-success"
                  onClick={() => handleMarkAsPaid(reminder)}
                >
                  Mark as Paid
                </button>
                <button 
                  className="btn btn-small btn-secondary"
                  onClick={() => handleRemindHousemate(reminder.id)}
                >
                  Remind Housemate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav currentScreen="reminders" navigateTo={navigateTo} />
    </div>
  );
}

export default RemindersScreen;
