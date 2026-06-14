import { useEffect, useState } from 'react';
import './App.css';
import { api } from './api';

// Import all screen components
import WelcomeScreen from './components/WelcomeScreen';
import SignUpScreen from './components/SignUpScreen';
import HouseholdSetupScreen from './components/HouseholdSetupScreen';
import DashboardScreen from './components/DashboardScreen';
import AddExpenseScreen from './components/AddExpenseScreen';
import ExpenseSplitSummaryScreen from './components/ExpenseSplitSummaryScreen';
import AddSubscriptionScreen from './components/AddSubscriptionScreen';
import SubscriptionTrackerScreen from './components/SubscriptionTrackerScreen';
import RemindersScreen from './components/RemindersScreen';
import PaymentConfirmationScreen from './components/PaymentConfirmationScreen';
import ProfileScreen from './components/ProfileScreen';

function App() {
  // Application state
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [user, setUser] = useState(null);
  const [household, setHousehold] = useState(null);
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      name: 'Internet Bill',
      amount: 75.00,
      category: 'Utilities',
      dueDate: '2026-03-25',
      paidBy: 'You',
      splitMethod: 'Equal Split'
    },
    {
      id: 2,
      name: 'Rent Share',
      amount: 450.00,
      category: 'Rent',
      dueDate: '2026-04-01',
      paidBy: 'Alex',
      splitMethod: 'Equal Split'
    }
  ]);
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      name: 'Spotify',
      cost: 15.99,
      billingCycle: 'Monthly',
      renewalDate: '2026-03-28',
      shared: true
    },
    {
      id: 2,
      name: 'Netflix',
      cost: 17.99,
      billingCycle: 'Monthly',
      renewalDate: '2026-03-25',
      shared: true
    },
    {
      id: 3,
      name: 'Gym',
      cost: 30.00,
      billingCycle: 'Monthly',
      renewalDate: '2026-04-05',
      shared: false
    }
  ]);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [confirmationData, setConfirmationData] = useState(null);
  const [backendStatus, setBackendStatus] = useState('Connecting to backend...');

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        await api.health();
        setBackendStatus('Connected to Python backend and Supabase');
        const [storedExpenses, storedSubscriptions] = await Promise.all([
          api.listExpenses(),
          api.listSubscriptions()
        ]);
        if (storedExpenses.length > 0) setExpenses(storedExpenses);
        if (storedSubscriptions.length > 0) setSubscriptions(storedSubscriptions);
      } catch (error) {
        console.warn('Backend unavailable. Using local starter data only.', error);
        setBackendStatus('Backend unavailable - showing local starter data');
      }
    };
    loadStoredData();
  }, []);

  // Navigation function
  const navigateTo = (screen, data = null) => {
    setCurrentScreen(screen);
    if (data) {
      if (data.expense) setCurrentExpense(data.expense);
      if (data.subscription) setCurrentSubscription(data.subscription);
      if (data.confirmation) setConfirmationData(data.confirmation);
    }
  };

  // User registration
  const registerUser = async (userData) => {
    setUser(userData);
    try {
      const savedUser = await api.createUser(userData);
      setUser(savedUser);
    } catch (error) {
      console.warn('Could not save user to Supabase', error);
    }
  };

  // Household setup
  const setupHousehold = async (householdData) => {
    setHousehold(householdData);
    try {
      const savedHousehold = await api.createHousehold(householdData);
      setHousehold(savedHousehold);
    } catch (error) {
      console.warn('Could not save household to Supabase', error);
    }
  };

  // Add expense
  const addExpense = async (expense) => {
    const optimisticExpense = {
      ...expense,
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now()
    };
    setExpenses((previous) => [...previous, optimisticExpense]);
    setCurrentExpense(optimisticExpense);

    try {
      const savedExpense = await api.createExpense(expense);
      setExpenses((previous) => previous.map((item) => item.id === optimisticExpense.id ? savedExpense : item));
      setCurrentExpense(savedExpense);
    } catch (error) {
      console.warn('Could not save expense to Supabase', error);
    }
  };

  // Add subscription
  const addSubscription = async (subscription) => {
    const optimisticSubscription = {
      ...subscription,
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now()
    };
    setSubscriptions((previous) => [...previous, optimisticSubscription]);
    setCurrentSubscription(optimisticSubscription);

    try {
      const savedSubscription = await api.createSubscription(subscription);
      setSubscriptions((previous) => previous.map((item) => item.id === optimisticSubscription.id ? savedSubscription : item));
      setCurrentSubscription(savedSubscription);
    } catch (error) {
      console.warn('Could not save subscription to Supabase', error);
    }
  };

  // Render current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen navigateTo={navigateTo} />;
      case 'signup':
        return <SignUpScreen navigateTo={navigateTo} registerUser={registerUser} />;
      case 'household':
        return <HouseholdSetupScreen navigateTo={navigateTo} setupHousehold={setupHousehold} />;
      case 'dashboard':
        return <DashboardScreen navigateTo={navigateTo} household={household} expenses={expenses} subscriptions={subscriptions} />;
      case 'addExpense':
        return <AddExpenseScreen navigateTo={navigateTo} addExpense={addExpense} household={household} />;
      case 'expenseSummary':
        return <ExpenseSplitSummaryScreen navigateTo={navigateTo} expense={currentExpense} household={household} setConfirmationData={setConfirmationData} />;
      case 'addSubscription':
        return <AddSubscriptionScreen navigateTo={navigateTo} addSubscription={addSubscription} />;
      case 'subscriptions':
        return <SubscriptionTrackerScreen navigateTo={navigateTo} subscriptions={subscriptions} />;
      case 'reminders':
        return <RemindersScreen navigateTo={navigateTo} expenses={expenses} subscriptions={subscriptions} setConfirmationData={setConfirmationData} />;
      case 'confirmation':
        return <PaymentConfirmationScreen navigateTo={navigateTo} confirmationData={confirmationData} />;
      case 'profile':
        return <ProfileScreen navigateTo={navigateTo} user={user} household={household} />;
      default:
        return <WelcomeScreen navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="App">
      <div className="backend-status">{backendStatus}</div>
      {renderScreen()}
    </div>
  );
}

export default App;
