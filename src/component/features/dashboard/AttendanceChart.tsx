import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import Card from '../../common/Card';
import { formatPercentage } from '../../../utils/formatters';
import { useTheme } from '../../../context/ThemeContext';

interface AttendanceData {
  module: string;
  present: number;
  partial: number;
  absent: number;
}

const AttendanceChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'semester'>('week');
  const { theme } = useTheme();

  // Mock data - replace with real data from API
  const attendanceData: AttendanceData[] = [
    {
      module: 'Web Programming',
      present: 85,
      partial: 10,
      absent: 5,
    },
    {
      module: 'Database Systems',
      present: 75,
      partial: 15,
      absent: 10,
    },
    {
      module: 'Software Engineering',
      present: 90,
      partial: 5,
      absent: 5,
    },
  ];

  return (
    <Card>
      <div className="p-6 dark:bg-gray-800">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Attendance Overview
          </h2>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-2 border dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="semester">This Semester</option>
          </select>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attendanceData}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={theme === 'dark' ? '#374151' : '#E5E7EB'}
              />
              <XAxis 
                dataKey="module" 
                tick={{ fontSize: 12, fill: theme === 'dark' ? '#9CA3AF' : '#374151' }}
                interval={0}
                height={60}
                angle={-45}
                textAnchor="end"
              />
              <YAxis 
                tickFormatter={formatPercentage}
                tick={{ fill: theme === 'dark' ? '#9CA3AF' : '#374151' }}
              />
              <Tooltip
                formatter={(value: number) => formatPercentage(value)}
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: theme === 'dark' ? '#F3F4F6' : '#111827'
                }}
              />
              <Legend 
                wrapperStyle={{
                  color: theme === 'dark' ? '#F3F4F6' : '#111827'
                }}
              />
              <Bar dataKey="present" name="Present" fill="#22c55e" stackId="stack" />
              <Bar dataKey="partial" name="Partial" fill="#eab308" stackId="stack" />
              <Bar dataKey="absent" name="Absent" fill="#ef4444" stackId="stack" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          {Object.entries({
            Present: '#22c55e',
            Partial: '#eab308',
            Absent: '#ef4444',
          }).map(([status, color]) => (
            <div
              key={status}
              className="flex items-center justify-center p-2 rounded-md dark:bg-gray-700/50"
              style={{ backgroundColor: theme === 'dark' ? undefined : color + '10' }}
            >
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default AttendanceChart;