import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const AttendanceChart: React.FC = () => {
  const data = [
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
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="module" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="present" name="Present" fill="#22c55e" />
          <Bar dataKey="partial" name="Partial" fill="#eab308" />
          <Bar dataKey="absent" name="Absent" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;