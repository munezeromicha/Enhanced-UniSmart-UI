import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import QRScanner from '../../features/attendance/QRScanner';

const StudentDashboard: React.FC = () => {
  const studentData = {
    id: 'STD001',
    name: 'John Doe',
    registrationNumber: 'REG001',
    program: 'Computer Science',
  };

  const attendanceStats = [
    {
      title: 'Overall Attendance',
      value: '85%',
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      title: 'Classes Today',
      value: '3',
      icon: Clock,
      color: 'bg-blue-500',
    },
    {
      title: 'Missed Classes',
      value: '2',
      icon: AlertCircle,
      color: 'bg-red-500',
    },
  ];

  const moduleAttendance = [
    {
      module: 'Web Programming',
      attendance: 90,
    },
    {
      module: 'Database Systems',
      attendance: 85,
    },
    {
      module: 'Software Engineering',
      attendance: 80,
    },
    {
      module: 'Computer Networks',
      attendance: 88,
    },
  ];

  return (
    <div className="p-6 dark:bg-gray-900">
      <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {attendanceStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex items-center"
          >
            <div className={`${stat.color} p-4 rounded-lg mr-4`}>
              <stat.icon className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-gray-600 dark:text-gray-300 text-sm">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-primary dark:text-blue-400 mb-6">Scan Attendance</h2>
          <QRScanner 
            studentId={studentData.id}
            onScanSuccess={(data) => {
              console.log('QR Scan successful:', data);
              // Handle attendance submission
            }}
          />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-primary dark:text-blue-400 mb-6">Attendance by Module</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moduleAttendance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="module" 
                  stroke="#6B7280"
                  tick={{ fill: '#6B7280' }}
                />
                <YAxis 
                  stroke="#6B7280"
                  tick={{ fill: '#6B7280' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#3B82F6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-primary dark:text-blue-400 mb-6">Recent Attendance</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Module
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Lecturer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {/* Add attendance history rows here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDashboard;