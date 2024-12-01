import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../slices/authSlice';
import { useTheme } from '../contexts/ThemeContext';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    // Mock login
    dispatch(login(email));
    navigate('/dashboard');
  };

  return (
    <div className='flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300'>
      <div className='w-full max-w-3xl overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg sm:flex'>
        <div
          className='m-2 w-full rounded-2xl bg-gray-400 bg-cover bg-center text-white sm:w-2/5'
          style={{
            backgroundImage:
              'url(https://media.istockphoto.com/id/1133420240/vector/online-payment-concept-laptop-with-electronic-invoice.jpg?s=612x612&w=0&k=20&c=ViZpTMdPIvGnRDpixi-sw-Wp3nye8SGRSTUi9TOaFlM=)',
          }}
        ></div>
        <div className='w-full sm:w-3/5'>
          <div className='p-8'>
            <div className='flex justify-between items-center mb-4'>
              <h1 className='text-3xl font-black text-slate-700 dark:text-white'>
                Welcome to BillEase
              </h1>
              <button
                onClick={toggleTheme}
                className='p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                aria-label={
                  isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
                }
              >
                {isDarkMode ? (
                  <SunIcon className='h-5 w-5' />
                ) : (
                  <MoonIcon className='h-5 w-5' />
                )}
              </button>
            </div>
            <h2 className='text-3xl font-black text-slate-700 dark:text-white'>
              Login
            </h2>
            <p className='mt-2 mb-5 text-base leading-tight text-gray-600 dark:text-gray-400'>
              Create an account to Simplify Your Finances, Anytime, Anywhere
            </p>
            <form className='mt-8' onSubmit={handleSubmit}>
              <div className='relative mt-2 w-full'>
                <input
                  type='text'
                  id='email'
                  placeholder=' '
                  required
                  className='border-1 peer block w-full appearance-none rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-600 focus:outline-none focus:ring-0'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label
                  htmlFor='email'
                  className='absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white dark:bg-gray-800 px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:peer-focus:text-blue-400'
                >
                  Enter Your Email
                </label>
              </div>
              <div className='relative mt-2 w-full'>
                <input
                  type={visible ? 'text' : 'password'}
                  id='password'
                  required
                  className='border-1 peer block w-full appearance-none rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-600 focus:outline-none focus:ring-0'
                  placeholder=' '
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <label
                  htmlFor='password'
                  className='absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white dark:bg-gray-800 px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:peer-focus:text-blue-400'
                >
                  Enter Your Password
                </label>
                <div
                  className='absolute right-3 top-3 cursor-pointer'
                  onClick={() => setVisible(!visible)}
                >
                  {' '}
                  {visible ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width={20}
                      height={20}
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='lucide lucide-eye'
                    >
                      <path d='M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0' />
                      <circle cx={12} cy={12} r={3} />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width={20}
                      height={20}
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='lucide lucide-eye-off'
                    >
                      <path d='M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49' />
                      <path d='M14.084 14.158a3 3 0 0 1-4.242-4.242' />
                      <path d='M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143' />
                      <path d='m2 2 20 20' />
                    </svg>
                  )}
                </div>
              </div>
              {error && (
                <p className='text-red-500 dark:text-red-400 text-xs italic mt-2'>
                  {error}
                </p>
              )}
              <button
                className='mt-4 w-full cursor-pointer rounded-lg bg-blue-600 pt-3 pb-3 text-white shadow-lg hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300'
                type='submit'
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
