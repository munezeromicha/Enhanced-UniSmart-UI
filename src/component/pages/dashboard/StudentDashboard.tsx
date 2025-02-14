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
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {attendanceStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 flex items-center"
          >
            <div className={`${stat.color} p-4 rounded-lg mr-4`}>
              <stat.icon className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-gray-600 text-sm">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-primary mb-6">Scan Attendance</h2>
          <QRScanner 
            studentId={studentData.id}
            onScanSuccess={(data) => {
              console.log('QR Scan successful:', data);
              // Handle attendance submission
            }}
          />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-primary mb-6">Attendance by Module</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moduleAttendance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="module" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#00457E"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-primary mb-6">Recent Attendance</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Module
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Lecturer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {/* Add attendance history rows here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDashboard;