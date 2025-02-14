import React, { useState } from 'react';
import { Download, Search, Filter } from 'lucide-react';
import { AttendanceRecord } from '../types/attendance.types';

interface AttendanceListProps {
  moduleId: string;
  date: Date;
}

const AttendanceList: React.FC<AttendanceListProps> = ({ moduleId, date }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'present' | 'partial' | 'absent'>('all');

  // Mock data - replace with actual API call
  const attendanceRecords: AttendanceRecord[] = [
    {
      id: '1',
      studentId: 'STD001',
      studentName: 'John Smith',
      registrationNumber: 'REG001',
      moduleId: 'MOD1',
      moduleName: 'Web Programming',
      date: new Date(),
      firstScan: true,
      secondScan: true,
      status: 'present',
      location: { latitude: 0, longitude: 0 },
    },
    // Add more mock data...
  ];

  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesSearch =
      record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const exportToCSV = () => {
    // Implementation for CSV export
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-primary">Attendance Records</h2>
        <button
          onClick={exportToCSV}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
        >
          <Download size={20} />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>

        <div className="flex items-center space-x-4">
          <Filter size={20} className="text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="p-2 border rounded-md"
          >
            <option value="all">All Status</option>
            <option value="present">Present</option>
            <option value="partial">Partial</option>
            <option value="absent">Absent</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Registration No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                First Scan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Second Scan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRecords.map((record) => (
              <tr key={record.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {record.registrationNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{record.studentName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {record.firstScan ? '✓' : '✗'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {record.secondScan ? '✓' : '✗'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      record.status === 'present'
                        ? 'bg-green-100 text-green-800'
                        : record.status === 'partial'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceList;