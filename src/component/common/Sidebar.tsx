import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Calendar, 
  BarChart2, 
  FileText, 
  QrCode,
  School,
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  userRole?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, userRole = 'student' }) => {
  const location = useLocation();
  const normalizedRole = userRole.toLowerCase();

  const menuItems = {
    lecturer: [
      { icon: Home, label: 'Dashboard', link: '/dashboard/lecturer' },
      { icon: QrCode, label: 'Generate QR', link: '/dashboard/attendance/generate' },
      { icon: Users, label: 'Attendance List', link: '/dashboard/attendance/list' },
      { icon: BarChart2, label: 'Statistics', link: '/dashboard/statistics' },
      { icon: FileText, label: 'Reports', link: '/dashboard/reports' },
    ],
    hod: [
      { icon: Home, label: 'Dashboard', link: '/dashboard/hod' },
      { icon: School, label: 'Department', link: '/dashboard/department' },
      { icon: Users, label: 'Lecturers', link: '/dashboard/lecturers' },
      { icon: BarChart2, label: 'Statistics', link: '/dashboard/statistics' },
      { icon: FileText, label: 'Reports', link: '/dashboard/reports' },
    ],
    student: [
      { icon: Home, label: 'Dashboard', link: '/dashboard/student' },
      { icon: QrCode, label: 'Scan QR', link: '/dashboard/attendance/scan' },
      { icon: Calendar, label: 'My Attendance', link: '/dashboard/attendance/my' },
      { icon: BarChart2, label: 'Statistics', link: '/dashboard/statistics' },
    ],
    dean: [
      { icon: Home, label: 'Dashboard', link: '/dashboard/admin' },
      { icon: School, label: 'Schools', link: '/dashboard/schools' },
      { icon: Users, label: 'Students', link: '/dashboard/students' },
      { icon: Users, label: 'Staff', link: '/dashboard/staff' },
      { icon: BarChart2, label: 'Analytics', link: '/dashboard/analytics' },
      { icon: FileText, label: 'Reports', link: '/dashboard/reports' },
    ]
  };

  const items = menuItems[normalizedRole as keyof typeof menuItems];
  
  if (!items) {
    console.error(`No menu items found for role: ${normalizedRole}`);
    return null;
  }

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-30 h-full w-64 bg-white dark:bg-gray-800 transform transition-transform duration-200 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 bg-primary dark:bg-gray-900">
            <h1 className="text-xl font-bold text-white">UniSmart</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {items.map((item, index) => {
              const isActive = location.pathname === item.link;
              return (
                <Link
                  key={index}
                  to={item.link}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary dark:bg-cyan-600 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${
                    isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'
                  }`} />
                  <span className="ml-3">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;