import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Sidebar } from '../components/common/Sidebar';
import { DemoBanner } from '../components/common/DemoBanner';

export const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF8]">
      <DemoBanner />
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto min-h-[calc(100vh-4.5rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
