import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from './contexts/ThemeContext';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import BillGenerator from './components/BillGenerator';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <ThemeProvider>
      <div className='min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300'>
        <Router>
          <Routes>
            <Route path='/' element={<LoginForm />} />
            <Route
              path='/dashboard'
              element={isAuthenticated ? <Dashboard /> : <Navigate to='/' />}
            />
            <Route
              path='/bill-generator'
              element={
                isAuthenticated ? <BillGenerator /> : <Navigate to='/' />
              }
            />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
