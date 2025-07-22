import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Outlet /> {/* Nested routes like /post, /create, etc. */}
      </main>
    </div>
  );
};

export default Dashboard;
