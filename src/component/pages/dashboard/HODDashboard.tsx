import React, { useState } from 'react';
import { Users, Upload, BarChart2, School } from 'lucide-react';
import AttendanceChart from '../../features/dashboard/AttendanceChart';
import { read, utils } from 'xlsx';

const HODDashboard: React.FC = () => {
  const [uploading, setUploading] = useState(false);

  const stats = [
    {
      title: 'Total Students',
      value: '450',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Lecturers',
      value: '15',
      icon: School,
      color: 'bg-green-500',
    },
    {
      title: 'Average Attendance',
      value: '82%',
      icon: BarChart2,
      color: 'bg-purple-500',
    },
  ];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const data = await file.arrayBuffer();
      const workbook = read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json(worksheet);
      
      // Process student data
      console.log('Uploaded student data:', jsonData);
      
      // TODO: Send to API
      
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {stats.map((stat, index) => (
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
          <h2 className="text-xl font-bold text-primary mb-6">Upload Student List</h2>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload size={48} className="text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-500">Excel files only</p>
              </label>
            </div>
            {uploading && (
              <div className="text-center text-gray-600">
                Processing file...
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-primary mb-6">Department Attendance Overview</h2>
          <AttendanceChart />
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-primary mb-6">Recent Reports</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Lecturer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Module
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Attendance Rate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {/* Add mock data rows here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HODDashboard;