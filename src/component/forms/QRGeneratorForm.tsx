import React, { useState, useEffect } from 'react';
import { useQRCode } from '../../hooks/useQRCode';
import { QRCodeData } from '../../types/attendance.types';
import Button from '../common/Button';
import Card from '../common/Card';
import { QrCode, MapPin } from 'lucide-react';

interface QRGeneratorFormProps {
  lecturerData: {
    id: string;
    name: string;
    department: string;
    school: string;
  };
  onGenerate?: (data: QRCodeData) => void;
}

const QRGeneratorForm: React.FC<QRGeneratorFormProps> = ({
  lecturerData,
  onGenerate
}) => {
  const [selectedModule, setSelectedModule] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [sessionType, setSessionType] = useState<'first' | 'second'>('first');
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const { generateQRCode, loading, error } = useQRCode();

  const modules = [
    { id: 'MOD1', name: 'Web Programming' },
    { id: 'MOD2', name: 'Database Systems' },
  ];

  const classes = [
    { id: 'CS1', name: 'Year 1 Computer Science' },
    { id: 'CS2', name: 'Year 2 Computer Science' },
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setLocation(position),
        (error) => console.error('Error getting location:', error)
      );
    }
  }, []);

  const handleGenerate = async () => {
    if (!location) {
      alert('Location is required to generate QR code');
      return;
    }

    const qrData: QRCodeData = {
      lecturerId: lecturerData.id,
      lecturerName: lecturerData.name,
      department: lecturerData.department,
      school: lecturerData.school,
      moduleId: selectedModule,
      class: selectedClass,
      sessionType,
      timestamp: Date.now(),
      location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    };

    try {
      const result = await generateQRCode(qrData);
      if (onGenerate) {
        onGenerate(qrData);
      }
    } catch (err) {
      console.error('Failed to generate QR code:', err);
    }
  };

  return (
    <Card className="max-w-lg mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <QrCode className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-2 text-xl font-semibold text-gray-900">
            Generate Attendance QR Code
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Create a QR code for students to scan and mark their attendance
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Module
            </label>
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            >
              <option value="">Choose a module...</option>
              {modules.map((module) => (
                <option key={module.id} value={module.id}>
                  {module.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            >
              <option value="">Choose a class...</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Session Type
            </label>
            <div className="mt-1 flex space-x-4">
              <button
                type="button"
                onClick={() => setSessionType('first')}
                className={`flex-1 py-2 px-4 rounded-md ${
                  sessionType === 'first'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                First Session
              </button>
              <button
                type="button"
                onClick={() => setSessionType('second')}
                className={`flex-1 py-2 px-4 rounded-md ${
                  sessionType === 'second'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Second Session
              </button>
            </div>
          </div>

          {location ? (
            <div className="flex items-center text-sm text-green-600">
              <MapPin size={16} className="mr-2" />
              Location acquired
            </div>
          ) : (
            <div className="flex items-center text-sm text-yellow-600">
              <MapPin size={16} className="mr-2" />
              Acquiring location...
            </div>
          )}

          <Button
            onClick={handleGenerate}
            className="w-full"
            isLoading={loading}
            disabled={loading || !location || !selectedModule || !selectedClass}
            leftIcon={<QrCode size={20} />}
          >
            {loading ? 'Generating...' : 'Generate QR Code'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default QRGeneratorForm;