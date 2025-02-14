import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  Bell, 
  User, 
  LogOut, 
  X,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'info' | 'success' | 'warning';
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick, sidebarOpen }) => {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  // Sample notifications data
  const notifications: Notification[] = [
    {
      id: 1,
      title: 'New Attendance Record',
      message: 'Web Programming class attendance has been recorded',
      time: '5 minutes ago',
      isRead: false,
      type: 'success'
    },
    {
      id: 2,
      title: 'System Update',
      message: 'The attendance system will undergo maintenance tonight',
      time: '1 hour ago',
      isRead: false,
      type: 'warning'
    },
    {
      id: 3,
      title: 'Class Reminder',
      message: 'Database Systems class starts in 30 minutes',
      time: '2 hours ago',
      isRead: true,
      type: 'info'
    }
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (notificationCount > 0) {
      setNotificationCount(0);
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      default:
        return 'text-[#00628b]';
    }
  };

  return (
    <nav className="bg-white shadow-lg h-16 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <button
              onClick={onMenuClick}
              className="px-4 text-gray-500 hover:text-[#00628b] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#00628b] transition-colors duration-200 md:hidden"
            >
              <Menu size={24} />
            </button>
            
            <div className="flex-shrink-0 flex items-center">
              <img
                className="h-10 w-auto hover:opacity-90 transition-opacity duration-200"
                src="/images/logo.png"
                alt="College Logo"
              />
              <span className="ml-3 text-xl font-bold text-[#00628b] hidden md:block">
                College of Science and Technology
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={toggleNotifications}
                className="p-2 text-gray-400 hover:text-[#00628b] focus:outline-none focus:ring-2 focus:ring-[#00628b] rounded-full transition-colors duration-200 relative"
              >
                <Bell size={20} />
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>

              {/* Notification Modal */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-[#00628b]">Notifications</h3>
                      <button 
                        onClick={toggleNotifications}
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors duration-200 ${
                          !notification.isRead ? 'bg-blue-50/30' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`mt-1 ${getNotificationColor(notification.type)}`}>
                            <CheckCircle size={18} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-900">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <div className="flex items-center mt-2 text-xs text-gray-500">
                              <Clock size={12} className="mr-1" />
                              {notification.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-gray-50">
                    <button className="w-full text-sm text-[#00628b] hover:text-cyan-700 font-medium transition-colors duration-200">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {user?.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-[#00628b] rounded-full focus:outline-none focus:ring-2 focus:ring-[#00628b] transition-colors duration-200">
                  <User size={20} />
                </button>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-500 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;