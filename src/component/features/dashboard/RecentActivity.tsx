import React from 'react';
import { Clock, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Card from '../../common/Card';
import { formatDate, formatTime } from '../../../utils/formatters';

interface Activity {
  id: string;
  type: 'attendance' | 'report' | 'qr_generated';
  status: 'success' | 'failed' | 'pending';
  timestamp: Date;
  details: {
    studentName?: string;
    module?: string;
    action?: string;
  };
}

const RecentActivity: React.FC = () => {
  // Mock data - replace with real data from API
  const activities: Activity[] = [
    {
      id: '1',
      type: 'attendance',
      status: 'success',
      timestamp: new Date(),
      details: {
        studentName: 'John Doe',
        module: 'Web Programming',
      },
    },
    // Add more activities...
  ];

  const getStatusIcon = (status: Activity['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getActivityMessage = (activity: Activity) => {
    switch (activity.type) {
      case 'attendance':
        return `${activity.details.studentName} marked attendance for ${activity.details.module}`;
      case 'report':
        return `Generated attendance report for ${activity.details.module}`;
      case 'qr_generated':
        return `Generated QR code for ${activity.details.module}`;
      default:
        return '';
    }
  };

  return (
    <Card>
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>

        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start p-3 rounded-lg hover:bg-gray-50"
            >
              <div className="flex-shrink-0">
                {getStatusIcon(activity.status)}
              </div>
              
              <div className="ml-3 flex-1">
                <p className="text-sm text-gray-900">
                  {getActivityMessage(activity)}
                </p>
                <div className="mt-1 flex items-center text-xs text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{formatTime(activity.timestamp)}</span>
                  <span className="mx-1">•</span>
                  <span>{formatDate(activity.timestamp)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {activities.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No recent activity
          </div>
        )}
      </div>
    </Card>
  );
};

export default RecentActivity;