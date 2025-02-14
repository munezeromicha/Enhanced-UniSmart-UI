import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  GraduationCap, 
  BarChart2, 
  Download, 
  FileText,
  PieChart as PieChartIcon
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const AdminDashboard = () => {
  const [selectedSchool, setSelectedSchool] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');

  const stats = [
    {
      title: 'Total Schools',
      value: '5',
      icon: Building2,
      color: 'bg-[#00628b]',
      trend: '+1 this year'
    },
    {
      title: 'Total Departments',
      value: '15',
      icon: GraduationCap,
      color: 'bg-emerald-600',
      trend: '+2 this semester'
    },
    {
      title: 'Total Students',
      value: '2,500',
      icon: Users,
      color: 'bg-violet-600',
      trend: '+150 new enrollments'
    },
    {
      title: 'Average Attendance',
      value: '83%',
      icon: BarChart2,
      color: 'bg-amber-500',
      trend: '+5% this month'
    },
  ];

  const attendanceData = [
    { name: 'Present', value: 75, color: '#22c55e' },
    { name: 'Partial', value: 15, color: '#eab308' },
    { name: 'Absent', value: 10, color: '#ef4444' },
  ];

  const departmentPerformance = [
    {
      department: 'Computer Science',
      attendanceRate: 88,
      totalStudents: 450,
      totalClasses: 245,
      trend: 'up'
    },
    {
      department: 'Information Technology',
      attendanceRate: 85,
      totalStudents: 380,
      totalClasses: 230,
      trend: 'up'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8 lg:p-10">
      {/* Header Section */}
      <div className="mb-10">
        <div className="flex items-center space-x-4 mb-4">
          <img src="/images/logo.png" alt="UR Logo" className="h-12 w-12" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600 mt-1">Welcome to the admin dashboard</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`${stat.color} p-4 rounded-xl`}>
                <stat.icon className="text-white" size={28} />
              </div>
              <span className="text-sm font-medium text-gray-500">{stat.trend}</span>
            </div>
            <div>
              <h3 className="text-gray-600 text-base font-medium mb-2">{stat.title}</h3>
              <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        {/* Attendance Chart */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <PieChartIcon className="text-[#00628b]" size={28} />
              <h2 className="text-2xl font-bold text-gray-900">Overall Attendance</h2>
            </div>
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="p-3 border-2 border-gray-200 rounded-xl focus:border-[#00628b] focus:ring-2 focus:ring-[#00628b]/20 transition-colors duration-200 text-base"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="semester">This Semester</option>
            </select>
          </div>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={150}
                  dataKey="value"
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Performance */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <BarChart2 className="text-[#00628b]" size={28} />
              <h2 className="text-2xl font-bold text-gray-900">Department Performance</h2>
            </div>
            <button className="flex items-center space-x-3 text-[#00628b] hover:text-[#00628b]/80 bg-[#00628b]/10 px-6 py-3 rounded-xl transition-colors duration-200">
              <Download size={20} />
              <span className="font-medium">Export Report</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-8 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider rounded-l-lg">
                    Department
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Attendance Rate
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Students
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider rounded-r-lg">
                    Classes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {departmentPerformance.map((dept, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-8 py-6 whitespace-nowrap font-medium text-gray-900">
                      {dept.department}
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="flex items-center space-x-4">
                        <span className="text-emerald-600 font-medium text-lg">
                          {dept.attendanceRate}%
                        </span>
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                            style={{ width: `${dept.attendanceRate}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-gray-700 text-lg">
                      {dept.totalStudents.toLocaleString()}
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-gray-700 text-lg">
                      {dept.totalClasses.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0 mb-8">
          <div className="flex items-center space-x-4">
            <FileText className="text-[#00628b]" size={28} />
            <h2 className="text-2xl font-bold text-gray-900">Detailed Analytics</h2>
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
            <select
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              className="p-3 border-2 border-gray-200 rounded-xl focus:border-[#00628b] focus:ring-2 focus:ring-[#00628b]/20 transition-colors duration-200 text-base min-w-[200px]"
            >
              <option value="all">All Schools</option>
              <option value="SCH1">School of Computing</option>
              <option value="SCH2">School of Engineering</option>
            </select>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="p-3 border-2 border-gray-200 rounded-xl focus:border-[#00628b] focus:ring-2 focus:ring-[#00628b]/20 transition-colors duration-200 text-base min-w-[200px]"
            >
              <option value="all">All Departments</option>
              <option value="DEP1">Computer Science</option>
              <option value="DEP2">Information Technology</option>
            </select>
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-8">
          <p className="text-gray-600 text-center text-lg">Select filters to view detailed analytics</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;