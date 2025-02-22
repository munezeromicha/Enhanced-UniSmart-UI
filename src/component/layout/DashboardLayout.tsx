import React, { useState, useEffect } from 'react';
import { Outlet, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }

    // Handle initial dashboard routing
    if (location.pathname === '/dashboard') {
      const correctPath = getDashboardPath(user.role);
      navigate(correctPath);
      return;
    }

    // Prevent accessing wrong dashboard
    const userRole = user.role.toLowerCase();
    const currentPath = location.pathname;
    const allowedPaths = [
      `/dashboard/${userRole}`,
      '/dashboard/attendance',
      '/dashboard/reports',
      '/dashboard/statistics'
    ];

    const isAllowedPath = allowedPaths.some(path => currentPath.startsWith(path));
    if (!isAllowedPath) {
      navigate(getDashboardPath(userRole));
    }
  }, [user, isAuthenticated, navigate, location.pathname]);

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  const getDashboardPath = (role: string) => {
    switch (role.toLowerCase()) {
      case 'student':
        return '/dashboard/student';
      case 'lecturer':
        return '/dashboard/lecturer';
      case 'hod':
        return '/dashboard/hod';
      case 'dean':
        return '/dashboard/admin';
      default:
        return '/login';
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        userRole={user.role.toLowerCase()}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar 
          sidebarOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(true)} 
          userName={user.name}
          userRole={user.role}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;