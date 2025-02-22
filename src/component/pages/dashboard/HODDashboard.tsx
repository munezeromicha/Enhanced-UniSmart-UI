import React, { useState } from 'react';
import { Users, Upload, BarChart2, School, QrCode, X, FileSpreadsheet, FileText } from 'lucide-react';
import AttendanceChart from '../../features/dashboard/AttendanceChart';
import QRGeneratorForm from '../../forms/QRGeneratorForm';
import { read, utils, write } from 'xlsx';
import Card from '../../common/Card';

interface RecentClass {
  id: string;
  module: string;
  className: string;
  date: string;
  time: string;
  attendanceRate: number;
  status: 'completed' | 'ongoing' | 'upcoming';
}

interface Student {
  registrationNumber: string;
  name: string;
  level: number;
  department: string;
  status: 'present' | 'absent';
  scanTime?: string;
}

interface ClassAttendance {
  id: string;
  module: string;
  className: string;
  level: number;
  department: string;
  school: string;
  lecturer: string;
  date: string;
  time: string;
  students: Student[];
}

interface AttendanceReport {
  id: string;
  lecturer: string;
  module: string;
  className: string;
  date: string;
  time: string;
  attendanceRate: number;
  totalStudents: number;
  presentStudents: number;
  department: string;
  school: string;
  level: number;
}

const HODDashboard: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'hod' | 'lecturer'>('hod');
  const [selectedClass, setSelectedClass] = useState<ClassAttendance | null>(null);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<'today' | 'month' | 'semester'>('today');
  const [selectedReport, setSelectedReport] = useState<AttendanceReport | null>(null);

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

  const recentClasses: RecentClass[] = [
    {
      id: '1',
      module: 'Web Programming',
      className: 'Year 2 Computer Science',
      date: '2024-03-18',
      time: '09:00 AM',
      attendanceRate: 92,
      status: 'completed'
    },
    {
      id: '2',
      module: 'Database Systems',
      className: 'Year 1 Computer Science',
      date: '2024-03-18',
      time: '11:00 AM',
      attendanceRate: 88,
      status: 'completed'
    },
    {
      id: '3',
      module: 'Web Programming',
      className: 'Year 2 Information Technology',
      date: '2024-03-19',
      time: '02:00 PM',
      attendanceRate: 0,
      status: 'upcoming'
    },
    {
      id: '4',
      module: 'Database Systems',
      className: 'Year 1 Information Technology',
      date: '2024-03-19',
      time: '10:00 AM',
      attendanceRate: 85,
      status: 'completed'
    },
    {
      id: '5',
      module: 'Web Programming',
      className: 'Year 2 Computer Science',
      date: '2024-03-19',
      time: '03:30 PM',
      attendanceRate: 0,
      status: 'upcoming'
    }
  ];

  const classAttendanceData: ClassAttendance = {
    id: '1',
    module: 'Web Programming',
    className: 'Year 2 Computer Science',
    level: 2,
    department: 'Computer Science',
    school: 'School of Computing',
    lecturer: 'Dr. John Doe',
    date: '2024-03-18',
    time: '09:00 AM',
    students: [
      {
        registrationNumber: '222013063',
        name: 'Alice Johnson',
        level: 2,
        department: 'Computer Science',
        status: 'present',
        scanTime: '09:05 AM'
      },
      {
        registrationNumber: '222013063',
        name: 'Bob Smith',
        level: 2,
        department: 'Computer Science',
        status: 'present',
        scanTime: '09:02 AM'
      },
      {
        registrationNumber: '222013063',
        name: 'Charlie Brown',
        level: 2,
        department: 'Computer Science',
        status: 'absent'
      },
    ]
  };

  const recentReports: AttendanceReport[] = [
    {
      id: 'REP1',
      lecturer: 'Dr. Sarah Johnson',
      module: 'Web Programming',
      className: 'Year 2 Computer Science',
      date: '2024-03-19',
      time: '09:00 AM',
      attendanceRate: 92,
      totalStudents: 45,
      presentStudents: 41,
      department: 'Computer Science',
      school: 'School of Computing',
      level: 2
    },
    {
      id: 'REP2',
      lecturer: 'Prof. Michael Chen',
      module: 'Database Systems',
      className: 'Year 1 Information Technology',
      date: '2024-03-19',
      time: '11:00 AM',
      attendanceRate: 88,
      totalStudents: 50,
      presentStudents: 44,
      department: 'Information Technology',
      school: 'School of Computing',
      level: 1
    },
    {
      id: 'REP3',
      lecturer: 'Dr. James Wilson',
      module: 'Software Engineering',
      className: 'Year 3 Computer Science',
      date: '2024-03-18',
      time: '02:00 PM',
      attendanceRate: 95,
      totalStudents: 38,
      presentStudents: 36,
      department: 'Computer Science',
      school: 'School of Computing',
      level: 3
    },
    {
      id: 'REP4',
      lecturer: 'Dr. Emily Brown',
      module: 'Artificial Intelligence',
      className: 'Year 4 Computer Science',
      date: '2024-03-18',
      time: '10:00 AM',
      attendanceRate: 85,
      totalStudents: 42,
      presentStudents: 36,
      department: 'Computer Science',
      school: 'School of Computing',
      level: 4
    },
    {
      id: 'REP5',
      lecturer: 'Prof. David Lee',
      module: 'Network Security',
      className: 'Year 3 Information Technology',
      date: '2024-03-17',
      time: '03:30 PM',
      attendanceRate: 90,
      totalStudents: 40,
      presentStudents: 36,
      department: 'Information Technology',
      school: 'School of Computing',
      level: 3
    }
  ];

  const filteredReports = recentReports.filter(report => {
    const reportDate = new Date(report.date);
    const today = new Date();
    
    switch (selectedTimeFilter) {
      case 'today':
        return reportDate.toDateString() === today.toDateString();
      case 'month':
        return reportDate.getMonth() === today.getMonth() && 
               reportDate.getFullYear() === today.getFullYear();
      case 'semester':
        // Assuming a semester is 6 months
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(today.getMonth() - 6);
        return reportDate >= sixMonthsAgo;
      default:
        return true;
    }
  });

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

  const handleClassClick = (cls: RecentClass) => {
    // In real implementation, fetch attendance data from API
    setSelectedClass(classAttendanceData);
  };

  const handleExport = (format: 'excel' | 'csv') => {
    if (!selectedClass) return;

    const headers = [
      ['UNIVERSITY OF RWANDA'],
      ['School of Computing'],
      ['Computer Science Department'],
      [''],
      ['Attendance Report'],
      [''],
      [`Module: ${selectedClass.module}`],
      [`Class: ${selectedClass.className}`],
      [`Level: ${selectedClass.level}`],
      [`Lecturer: ${selectedClass.lecturer}`],
      [`Date: ${selectedClass.date}`],
      [`Time: ${selectedClass.time}`],
      [''],
      ['Registration Number', 'Student Name', 'Level', 'Department', 'Status', 'Scan Time']
    ];

    const data = selectedClass.students.map(student => [
      student.registrationNumber,
      student.name,
      student.level,
      student.department,
      student.status,
      student.scanTime || 'N/A'
    ]);

    if (format === 'excel') {
      const ws = utils.aoa_to_sheet([...headers, ...data]);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, 'Attendance');
      
      // Add some styling to the header
      const range = utils.decode_range(ws['!ref'] || 'A1');
      for (let i = 0; i <= 13; i++) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const cell = ws[utils.encode_cell({ r: i, c: C })];
          if (cell) cell.s = { font: { bold: true } };
        }
      }

      write(wb, `${selectedClass.module}_attendance_${selectedClass.date}.xlsx`);
    } else {
      // CSV Export
      const csv = [...headers, ...data]
        .map(row => row.join(','))
        .join('\n');
      
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${selectedClass.module}_attendance_${selectedClass.date}.csv`;
      link.click();
    }
  };

  // Add this modal component to show attendance details
  const AttendanceModal = () => {
    if (!selectedClass) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="p-6 border-b dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedClass.module} - Attendance Details
              </h2>
              <button
                onClick={() => setSelectedClass(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-600 dark:text-gray-300">Class: {selectedClass.className}</p>
                <p className="text-gray-600 dark:text-gray-300">Level: {selectedClass.level}</p>
                <p className="text-gray-600 dark:text-gray-300">Department: {selectedClass.department}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300">Date: {selectedClass.date}</p>
                <p className="text-gray-600 dark:text-gray-300">Time: {selectedClass.time}</p>
                <p className="text-gray-600 dark:text-gray-300">Lecturer: {selectedClass.lecturer}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mb-6">
              <button
                onClick={() => handleExport('excel')}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <FileSpreadsheet size={20} className="mr-2" />
                Export Excel
              </button>
              <button
                onClick={() => handleExport('csv')}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FileText size={20} className="mr-2" />
                Export CSV
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Reg. Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Scan Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  {selectedClass.students.map((student) => (
                    <tr key={student.registrationNumber}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                        {student.registrationNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                        {student.level}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                        {student.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium
                          ${student.status === 'present'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                          }`}
                        >
                          {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                        {student.scanTime || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 dark:bg-gray-900">
      {/* Role Switch Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('hod')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 
            ${activeTab === 'hod' 
              ? 'bg-primary dark:bg-blue-600 text-white' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
        >
          HOD View
        </button>
        <button
          onClick={() => setActiveTab('lecturer')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 
            ${activeTab === 'lecturer' 
              ? 'bg-primary dark:bg-blue-600 text-white' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
        >
          Lecturer View
        </button>
      </div>

      {activeTab === 'hod' ? (
        <>
          <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">HOD Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {stats.map((stat, index) => (
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
              <h2 className="text-xl font-bold text-primary dark:text-blue-400 mb-6">Upload Registered Student List</h2>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
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
                    <Upload size={48} className="text-gray-400 dark:text-gray-500 mb-4" />
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Excel files only</p>
                  </label>
                </div>
                {uploading && (
                  <div className="text-center text-gray-600 dark:text-gray-300">
                    Processing file...
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-primary dark:text-blue-400 mb-6">Department Attendance Overview</h2>
              <AttendanceChart />
            </div>
          </div>

          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-primary dark:text-blue-400">Recent Reports</h2>
              <div className="flex space-x-4">
                <select
                  value={selectedTimeFilter}
                  onChange={(e) => setSelectedTimeFilter(e.target.value as 'today' | 'month' | 'semester')}
                  className="px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                    focus:border-primary dark:focus:border-blue-400"
                >
                  <option value="today">Today</option>
                  <option value="month">This Month</option>
                  <option value="semester">This Semester</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Lecturer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Module
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Class
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Attendance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  {filteredReports.map((report) => (
                    <tr 
                      key={report.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                        {report.lecturer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                        {report.module}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                        {report.className}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                        {new Date(report.date).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })} - {report.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-green-600 dark:text-green-400 font-medium">
                            {report.attendanceRate}%
                          </span>
                          <span className="text-gray-500 dark:text-gray-400 ml-2">
                            ({report.presentStudents}/{report.totalStudents})
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => {
                            setSelectedClass({
                              ...classAttendanceData,
                              module: report.module,
                              className: report.className,
                              level: report.level,
                              department: report.department,
                              school: report.school,
                              lecturer: report.lecturer,
                              date: report.date,
                              time: report.time
                            });
                          }}
                          className="text-primary dark:text-blue-400 hover:text-primary/80 dark:hover:text-blue-500 font-medium"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Lecturer Dashboard</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* QR Code Generator */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-primary dark:text-blue-400 mb-6">
                Generate Attendance QR Code
              </h2>
              <QRGeneratorForm
                lecturerData={{
                  id: 'HOD_ID', // Replace with actual HOD ID
                  name: 'HOD Name', // Replace with actual HOD name
                  department: 'Computer Science', // Replace with actual department
                  school: 'School of Computing', // Replace with actual school
                }}
                onGenerate={(data) => {
                  console.log('Generated QR data:', data);
                  // Handle QR code generation
                }}
              />
            </div>

            {/* Recent Classes */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-primary dark:text-blue-400 mb-6">Recent Classes</h2>
              <div className="space-y-4">
                {recentClasses.map((cls) => (
                  <div 
                    key={cls.id}
                    onClick={() => handleClassClick(cls)}
                    className="border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{cls.module}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium
                        ${cls.status === 'completed' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : cls.status === 'ongoing'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {cls.status.charAt(0).toUpperCase() + cls.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                      {cls.className}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-gray-500 dark:text-gray-400">
                        {new Date(cls.date).toLocaleDateString('en-GB', { 
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })} - {cls.time}
                      </div>
                      {cls.status === 'completed' && (
                        <div className="flex items-center">
                          <span className="text-gray-600 dark:text-gray-300 mr-2">Attendance:</span>
                          <span className="font-medium text-green-600 dark:text-green-400">
                            {cls.attendanceRate}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Add the modal */}
      {selectedClass && <AttendanceModal />}
    </div>
  );
};

export default HODDashboard;