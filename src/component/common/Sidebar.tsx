import React from 'react';
import { useLocation } from 'react-router-dom';
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
      { icon: BarChart2, label: 'Analytics', link: '/dashboard/analytics' },
      { icon: FileText, label: 'Reports', link: '/dashboard/reports' },
    ]
  };

  const items = menuItems[userRole as keyof typeof menuItems] || menuItems.student;

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;