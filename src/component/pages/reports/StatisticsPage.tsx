// src/pages/reports/StatisticsPage.tsx
import React, { useState } from 'react';
import { BarChart2, TrendingUp, Users, Calendar } from 'lucide-react';
import Card from '../../common/Card';
import AttendanceChart from '../../features/dashboard/AttendanceChart';
import { PieChart } from '../../common/Charts/PieChart';
import { LineChart } from '../../common/Charts/LineChart';
import Button from '../../components/common/Button';

const StatisticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'semester'>('week');
  const [selectedModule, setSelectedModule] = useState<string>('all');

  const attendanceStats = {
    total: 150,
    present: 120,
    partial: 20,
    absent: 10,
  };

  const trendData = [
    { date: '2024-01', attendance: 85 },
    { date: '2024-02', attendance: 88 },
    { date: '2024-03', attendance: 92 },
  ];

  const moduleList = [
    { id: 'all', name: 'All Modules' },
    { id: 'WEB101', name: 'Web Programming' },
    { id: 'DB101', name: 'Database Systems' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Statistics</h1>
          <p className="mt-2 text-gray-600">
            Detailed attendance analytics and trends
          </p>
        </div>
        
        <div className="flex space-x-4">
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            {moduleList.map((module) => (
              <option key={module.id} value={module.id}>
                {module.name}
              </option>
            ))}
          </select>

          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="border rounded-md px-3 py-2"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="semester">This Semester</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">Present</h3>
              <Users className="text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {Math.round((attendanceStats.present / attendanceStats.total) * 100)}%
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {attendanceStats.present} students
            </p>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">Partial</h3>
              <Calendar className="text-yellow-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {Math.round((attendanceStats.partial / attendanceStats.total) * 100)}%
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {attendanceStats.partial} students
            </p>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">Absent</h3>
              <Users className="text-red-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {Math.round((attendanceStats.absent / attendanceStats.total) * 100)}%
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {attendanceStats.absent} students
            </p>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">Total Classes</h3>
              <BarChart2 className="text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">24</p>
            <p className="text-sm text-gray-500 mt-2">This semester</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Attendance Distribution
            </h2>
            <PieChart
              data={[
                { name: 'Present', value: attendanceStats.present, color: '#22c55e' },
                { name: 'Partial', value: attendanceStats.partial, color: '#eab308' },
                { name: 'Absent', value: attendanceStats.absent, color: '#ef4444' },
              ]}
              height={300}
            />
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Attendance Trend
            </h2>
            <LineChart
              data={trendData}
              xAxisKey="date"
              lines={[
                { key: 'attendance', color: '#00457E', name: 'Attendance Rate' },
              ]}
              height={300}
            />
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Attendance by Module
          </h2>
          <AttendanceChart />
        </div>
      </Card>
    </div>
  );
};

export default StatisticsPage;