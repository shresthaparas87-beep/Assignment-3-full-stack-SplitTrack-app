import React from 'react';

function BottomNav({ currentScreen, navigateTo }) {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: '🏠' },
    { id: 'addExpense', label: 'Expenses', icon: '💰' },
    { id: 'subscriptions', label: 'Subscriptions', icon: '🔄' },
    { id: 'reminders', label: 'Reminders', icon: '🔔' },
    { id: 'profile', label: 'Profile', icon: '👤' }
  ];

  return (
    <div className="bottom-nav">
      {navItems.map(item => (
        <button
          key={item.id}
          className={`nav-item ${currentScreen === item.id ? 'active' : ''}`}
          onClick={() => navigateTo(item.id)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}

export default BottomNav;
