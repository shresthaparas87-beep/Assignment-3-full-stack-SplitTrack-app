const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }
  return response.json();
}

export const api = {
  health: () => request('/api/health'),
  listExpenses: () => request('/api/expenses'),
  createExpense: (expense) => request('/api/expenses', {
    method: 'POST',
    body: JSON.stringify(expense)
  }),
  listSubscriptions: () => request('/api/subscriptions'),
  createSubscription: (subscription) => request('/api/subscriptions', {
    method: 'POST',
    body: JSON.stringify(subscription)
  }),
  createUser: (user) => request('/api/users', {
    method: 'POST',
    body: JSON.stringify(user)
  }),
  createHousehold: (household) => request('/api/households', {
    method: 'POST',
    body: JSON.stringify(household)
  })
};
