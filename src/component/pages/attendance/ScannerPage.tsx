import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import QRScanner from '../../features/attendance/QRScanner';
import Card from '../../common/Card';
import { QRCodeData, AttendanceRecord } from '../../../types/attendance.types';
import { useAttendance } from '../../../hooks/useAttendance';
import { QrCode, CheckCircle, AlertCircle } from 'lucide-react';

const ScannerPage: React.FC = () => {
  const { user } = useAuth();
  const { markAttendance } = useAttendance();
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleScanSuccess = async (data: QRCodeData) => {
    try {
      const attendanceData: Partial<AttendanceRecord> = {
        studentId: user?.id,
        module: data.module,
        type: data.type,
        location: data.location,
        timestamp: new Date(),
      };

      await markAttendance(attendanceData);
      setScanResult({
        success: true,
        message: 'Attendance marked successfully!',
      });
    } catch (error) {
      setScanResult({
        success: false,
        message: 'Failed to mark attendance. Please try again.',
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 dark:bg-gray-900">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Scan Attendance</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Scan the QR code shared by your lecturer to mark your attendance
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white dark:bg-gray-800">
          <div className="p-6">
            <div className="flex items-center justify-center mb-6">
              <QrCode size={48} className="text-primary dark:text-blue-400" />
            </div>
            <h2 className="text-lg font-semibold text-center mb-4 text-gray-900 dark:text-white">
              Scan QR Code
            </h2>
            <QRScanner
              studentId={user?.id || ''}
              onScanSuccess={handleScanSuccess}
            />
          </div>
        </Card>

        <div className="space-y-6">
          {scanResult && (
            <Card className="bg-white dark:bg-gray-800">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {scanResult.success ? (
                    <CheckCircle className="h-8 w-8 text-green-500 dark:text-green-400 mr-3" />
                  ) : (
                    <AlertCircle className="h-8 w-8 text-red-500 dark:text-red-400 mr-3" />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {scanResult.success ? 'Success!' : 'Error'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{scanResult.message}</p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          <Card className="bg-white dark:bg-gray-800">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Instructions</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2">1.</span>
                  Ensure you're in the classroom
                </li>
                <li className="flex items-start">
                  <span className="mr-2">2.</span>
                  Allow camera access when prompted
                </li>
                <li className="flex items-start">
                  <span className="mr-2">3.</span>
                  Point your camera at the QR code
                </li>
                <li className="flex items-start">
                  <span className="mr-2">4.</span>
                  Wait for confirmation
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ScannerPage;