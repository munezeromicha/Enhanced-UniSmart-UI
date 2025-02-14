import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Users, Clock, BarChart2, QrCode } from 'lucide-react';
import StatisticsCard from '../../features/dashboard/StatisticsCard';
import AttendanceChart from '../../features/dashboard/AttendanceChart';
import RecentActivity from '../../features/dashboard/RecentActivity';
import Card from '../../common/Card';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Students',
      value: '150',
      icon: Users,
      change: { value: 12, trend: 'up' },
      color: 'primary',
    },
    {
      title: 'Today\'s Classes',
      value: '4',
      icon: Clock,
      color: 'green',
    },
    {
      title: 'Average Attendance',
      value: '85%',
      icon: BarChart2,
      change: { value: 5, trend: 'up' },
      color: 'blue',
    },
    {
      title: 'QR Codes Generated',
      value: '24',
      icon: QrCode,
      change: { value: 8, trend: 'up' },
      color: 'purple',
    },
  ];

  const upcomingClasses = [
    {
      id: '1',
      module: 'Web Programming',
      time: '10:00 AM',
      class: 'CS101',
      students: 45,
    },
    // Add more classes...
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name}
        </h1>
        <p className="mt-2 text-gray-600">
          Here's what's happening with your classes today
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatisticsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AttendanceChart />
        </div>
        <div>
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Upcoming Classes
              </h2>
              <div className="space-y-4">
                {upcomingClasses.map((cls) => (
                  <div
                    key={cls.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {cls.module}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {cls.class} • {cls.students} students
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {cls.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <RecentActivity />
      </div>
    </div>
  );
};

export default DashboardPage;