import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { AlertCircle } from 'lucide-react';
import { QRCodeData } from '../../../types/attendance.types';
import { useTheme } from '../../../context/ThemeContext';

interface QRGeneratorProps {
  lecturerData: {
    id: string;
    name: string;
    department: string;
    school: string;
  };
  selectedClass: string;
  selectedModule: string;
}

const QRGenerator: React.FC<QRGeneratorProps> = ({
  lecturerData,
  selectedClass,
  selectedModule,
}) => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [sessionType, setSessionType] = useState<'first' | 'second'>('first');
  const [qrData, setQrData] = useState<QRCodeData | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    // Get current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  }, []);

  useEffect(() => {
    if (location) {
      const data: QRCodeData = {
        lecturerId: lecturerData.id,
        lecturerName: lecturerData.name,
        department: lecturerData.department,
        school: lecturerData.school,
        class: selectedClass,
        module: selectedModule,
        sessionType,
        timestamp: Date.now(),
        location,
      };
      setQrData(data);
    }
  }, [location, sessionType, lecturerData, selectedClass, selectedModule]);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary dark:text-cyan-400 mb-2">
          Generate Attendance QR Code
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Students will need to scan this QR code to mark their attendance
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Session Type
        </label>
        <div className="flex space-x-4">
          <button
            onClick={() => setSessionType('first')}
            className={`px-4 py-2 rounded-md ${
              sessionType === 'first'
                ? 'bg-primary dark:bg-cyan-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
            }`}
          >
            First Session
          </button>
          <button
            onClick={() => setSessionType('second')}
            className={`px-4 py-2 rounded-md ${
              sessionType === 'second'
                ? 'bg-primary dark:bg-cyan-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
            }`}
          >
            Second Session
          </button>
        </div>
      </div>

      {location ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
            {qrData && (
              <QRCodeSVG
                value={JSON.stringify(qrData)}
                size={256}
                level="H"
                includeMargin={true}
                bgColor={theme === 'dark' ? '#374151' : '#FFFFFF'}
                fgColor={theme === 'dark' ? '#FFFFFF' : '#000000'}
              />
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Scan this QR code to mark attendance
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-center p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <AlertCircle className="text-yellow-500 dark:text-yellow-400 mr-2" />
          <p className="text-yellow-700 dark:text-yellow-300">
            Please enable location services to generate the QR code
          </p>
        </div>
      )}
    </div>
  );
};

export default QRGenerator;