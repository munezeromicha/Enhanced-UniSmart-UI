import React, { useState } from 'react';
import { BarChart2, Users, Clock, Download, BookOpen, ChevronDown, QrCode } from 'lucide-react';
import { AttendanceRecord } from '../../../types/attendance.types';
import AttendanceChart from '../../features/dashboard/AttendanceChart';
import QRGenerator from '../../features/attendance/QRGenerator';
import { ErrorBoundary } from 'react-error-boundary';

interface LecturerData {
  id: string;
  name: string;
  department: string;
  school: string;
}

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = () => {
  return (
    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
      <p className="text-red-600 dark:text-red-400">Error generating QR code. Please try again.</p>
    </div>
  );
};

const LecturerDashboard = () => {
  const [selectedModule, setSelectedModule] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [isQRReady, setIsQRReady] = useState<boolean>(false);

  const lecturerData: LecturerData = {
    id: '123',
    name: 'Dr. John Doe',
    department: 'Computer Science',
    school: 'School of Computing',
  };

  const modules = [
    { id: 'MOD1', name: 'Web Programming' },
    { id: 'MOD2', name: 'Database Systems' },
  ];

  const classes = [
    { id: 'CS101', name: 'Year 1 Computer Science' },
    { id: 'CS102', name: 'Year 2 Computer Science' },
  ];

  const stats = [
    {
      title: 'Total Students',
      value: '150',
      icon: Users,
      color: 'bg-[#00628b]',
      trend: '+5% from last semester'
    },
    {
      title: 'Average Attendance',
      value: '85%',
      icon: BarChart2,
      color: 'bg-emerald-600',
      trend: '+2.5% this week'
    },
    {
      title: 'Classes Today',
      value: '3',
      icon: Clock,
      color: 'bg-violet-600',
      trend: '2 remaining'
    },
  ];

  const handleModuleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModule(e.target.value);
    setIsQRReady(false);
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(e.target.value);
    setIsQRReady(false);
  };

  // Check if all required data is available before showing QR
  const canShowQR = () => {
    return Boolean(
      selectedModule && 
      selectedClass && 
      lecturerData?.id &&
      modules.find(m => m.id === selectedModule) &&
      classes.find(c => c.id === selectedClass)
    );
  };

  // Effect to update QR readiness
  React.useEffect(() => {
    setIsQRReady(canShowQR());
  }, [selectedModule, selectedClass]);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Lecturer Info Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#00628b] dark:text-cyan-400 mb-2">
          Welcome, {lecturerData.name}
        </h1>
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <BookOpen className="h-4 w-4 mr-2" />
          <span>{lecturerData.department}, {lecturerData.school}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.trend}</span>
            </div>
            <div>
              <h3 className="text-gray-600 dark:text-gray-300 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* QR Code Generator Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
          <h2 className="text-xl font-bold text-[#00628b] dark:text-cyan-400 mb-6 flex items-center">
            <QrCode className="w-6 h-6 mr-2" />
            Generate QR Code
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Select Module
              </label>
              <div className="relative">
                <select
                  value={selectedModule}
                  onChange={handleModuleChange}
                  className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-[#00628b] focus:border-[#00628b] focus:ring-2 focus:ring-[#00628b]/20 transition-colors duration-200"
                >
                  <option value="">Select a module...</option>
                  {modules.map((module) => (
                    <option key={module.id} value={module.id}>
                      {module.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Select Class
              </label>
              <div className="relative">
                <select
                  value={selectedClass}
                  onChange={handleClassChange}
                  className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-[#00628b] focus:border-[#00628b] focus:ring-2 focus:ring-[#00628b]/20 transition-colors duration-200"
                >
                  <option value="">Select a class...</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>
            {isQRReady && (
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  {selectedModule && selectedClass && lecturerData && (
                    <QRGenerator
                      lecturerData={lecturerData}
                      selectedClass={selectedClass}
                      selectedModule={selectedModule}
                    />
                  )}
                </div>
              </ErrorBoundary>
            )}
          </div>
        </div>

        {/* Attendance Overview Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#00628b] dark:text-cyan-400 flex items-center">
              <BarChart2 className="w-6 h-6 mr-2" />
              Attendance Overview
            </h2>
            <button className="flex items-center space-x-2 text-[#00628b] dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 bg-cyan-50 dark:bg-cyan-900/30 px-4 py-2 rounded-lg transition-colors duration-200">
              <Download size={20} />
              <span className="font-medium">Export CSV</span>
            </button>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <AttendanceChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerDashboard;