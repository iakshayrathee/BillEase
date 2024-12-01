import React from 'react';
import Sidenav from './Sidenav';
import CustomerTable from './CustomerTable';

function Dashboard() {
  return (
    <div className='flex h-screen bg-gray-100 dark:bg-gray-900'>
      <div className='w-64'>
        <Sidenav />
      </div>
      <div className='flex-1 p-10'>
        <h1 className='text-2xl font-semibold mb-6 text-gray-800 dark:text-white'>
          Customer List
        </h1>
        <CustomerTable />
      </div>
    </div>
  );
}

export default Dashboard;
