// src/layouts/DashboardLayout.jsx

import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

/**
 * Layout component for all authenticated dashboard routes.
 * It combines the fixed Header and Sidebar, and correctly spaces the main content.
 */
const DashboardLayout = ({ title, children }) => {
  const { profile } = useAuth();
  const role = profile?.role;
  console.log(profile);
  

  // We rely on ProtectedRoute in App.jsx to ensure the user is logged in before this renders.
  
  return (
    <>
      <Header />
      <Sidebar role={role} />
      <main className="pt-16 md:ml-64 transition-all duration-300 min-h-screen">
        <div className="p-4 md:p-6">
          {title && (
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              {title}
            </h1>
          )}
          {children}
        </div>
      </main>
    </>
  );
};

export default DashboardLayout;