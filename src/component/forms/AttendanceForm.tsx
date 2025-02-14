import React, { useState } from 'react';
import { useAttendance } from '../../hooks/useAttendance';
import Button from '../common/Button';
import Card from '../common/Card';
import { AttendanceRecord } from '../../types/attendance.types';
import { QrCode } from 'lucide-react';

interface AttendanceFormProps {
  moduleId: string;
  studentId: string;
  onSuccess?: (record: AttendanceRecord) => void;
}

const AttendanceForm: React.FC<AttendanceFormProps> = ({
  moduleId,
  studentId,
  onSuccess
}) => {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const { markAttendance, loading } = useAttendance(moduleId);
  const [error, setError] = useState<string | null>(null);

  const handleSubmitAttendance = async () => {
    if (!location) {
      setError('Location is required for attendance');
      return;
    }

    try {
      const attendanceData = {
        moduleId,
        studentId,
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        timestamp: new Date(),
      };

      const record = await markAttendance(attendanceData);
      if (onSuccess) {
        onSuccess(record);
      }
    } catch (err) {
      setError('Failed to submit attendance');
    }
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
        setError(null);
      },
      (error) => {
        setError('Error getting location: ' + error.message);
      }
    );
  };

  return (
    <Card className="max-w-md mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <QrCode className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-2 text-xl font-semibold text-gray-900">
            Mark Attendance
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Please ensure you're in the class before marking attendance
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {!location && (
          <Button
            onClick={getLocation}
            variant="outline"
            className="w-full"
            leftIcon={<QrCode size={20} />}
          >
            Get Location
          </Button>
        )}

        {location && (
          <div className="space-y-4">
            <div className="bg-green-50 text-green-700 p-3 rounded-md text-sm">
              Location acquired successfully
            </div>
            
            <Button
              onClick={handleSubmitAttendance}
              className="w-full"
              isLoading={loading}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Mark Attendance'}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AttendanceForm;