import { Navigate, RouteObject } from 'react-router-dom';

import DashboardLayout from './component/layout/DashboardLayout';

import LandingPage from './component/pages/LandingPage';
import LoginPage from './component/pages/LoginPage';
import LecturerDashboard from './component/pages/dashboard/LecturerDashboard';
import HODDashboard from './component/pages/dashboard/HODDashboard';
import StudentDashboard from './component/pages/dashboard/StudentDashboard';
import AdminDashboard from './component/pages/dashboard/AdminDashboard';
import AttendanceScanner from './component/pages/attendance/ScannerPage';
import AttendanceGenerator from './component/pages/attendance/GeneratorPage';
import ReportsPage from './component/pages/reports/ReportsPage';
import StatisticsPage from './component/pages/reports/StatisticsPage';
import ResetPasswordPage from './component/pages/ResetPasswordPage';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="lecturer" replace />
      },
      {
        path: 'lecturer',
        element: <LecturerDashboard />
      },
      {
        path: 'hod',
        element: <HODDashboard />
      },
      {
        path: 'student',
        element: <StudentDashboard />
      },
      {
        path: 'admin',
        element: <AdminDashboard />
      },
      {
        path: 'attendance',
        children: [
          {
            path: 'scan',
            element: <AttendanceScanner />
          },
          {
            path: 'generate',
            element: <AttendanceGenerator />
          }
        ]
      },
      {
        path: 'reports',
        element: <ReportsPage />
      },
      {
        path: 'statistics',
        element: <StatisticsPage />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
] as const;

export { routes };