import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useTheme } from '../contexts/ThemeContext';
import {
  UserGroupIcon,
  DocumentTextIcon,
  ArrowRightOnRectangleIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline';

function Sidenav() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className='bg-white dark:bg-gray-800 h-full flex flex-col'>
      <div className='p-4 border-b border-gray-200 dark:border-gray-700'>
        <h1 className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
          BillEase
        </h1>
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          Simplify Your Billing
        </p>
      </div>
      <div className='flex-grow px-2 py-4 space-y-2'>
        <Link
          to='/dashboard'
          className={`${
            location.pathname === '/dashboard'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
          } group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors duration-150 ease-in-out`}
        >
          <UserGroupIcon
            className='mr-4 flex-shrink-0 h-6 w-6'
            aria-hidden='true'
          />
          Customers List
        </Link>
        <Link
          to='/bill-generator'
          className={`${
            location.pathname === '/bill-generator'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
          } group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors duration-150 ease-in-out`}
        >
          <DocumentTextIcon
            className='mr-4 flex-shrink-0 h-6 w-6'
            aria-hidden='true'
          />
          Bill Generator
        </Link>
      </div>
      <div className='px-2 py-4 border-t border-gray-200 dark:border-gray-700'>
        <button
          onClick={handleLogout}
          className='w-full text-left text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors duration-150 ease-in-out'
        >
          <ArrowRightOnRectangleIcon
            className='mr-4 flex-shrink-0 h-6 w-6'
            aria-hidden='true'
          />
          Logout
        </button>
        <button
          onClick={toggleTheme}
          className='mt-2 w-full text-left text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors duration-150 ease-in-out'
        >
          {isDarkMode ? (
            <SunIcon
              className='mr-4 flex-shrink-0 h-6 w-6'
              aria-hidden='true'
            />
          ) : (
            <MoonIcon
              className='mr-4 flex-shrink-0 h-6 w-6'
              aria-hidden='true'
            />
          )}
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </nav>
  );
}

export default Sidenav;
