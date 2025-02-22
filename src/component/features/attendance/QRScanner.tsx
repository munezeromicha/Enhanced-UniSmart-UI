import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { QRCodeData } from '../../../types/attendance.types';

interface QRScannerProps {
  studentId: string;
  onScanSuccess: (data: QRCodeData) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ studentId, onScanSuccess }) => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [scanSuccess, setScanSuccess] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        setScanError('Location services are required for attendance');
      }
    );
  }, []);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const handleScan = (data: string | null) => {
    if (data && location) {
      try {
        const qrData: QRCodeData = JSON.parse(data);
        const distance = calculateDistance(
          location.latitude,
          location.longitude,
          qrData.location.latitude,
          qrData.location.longitude
        );

        // Check if student is within 50 meters of the lecturer
        if (distance > 50) {
          setScanError('You are too far from the classroom location');
          return;
        }

        // Check if QR code is not expired (valid for 5 minutes)
        if (Date.now() - qrData.timestamp > 5 * 60 * 1000) {
          setScanError('QR code has expired');
          return;
        }

        setScanSuccess(true);
        setScanError(null);
        onScanSuccess(qrData);
      } catch (error) {
        setScanError('Invalid QR code');
      }
    }
  };

  useEffect(() => {
    // Wait for the component to mount
    const initializeScanner = () => {
      if (!scannerRef.current && document.getElementById('reader')) {
        scannerRef.current = new Html5QrcodeScanner(
          "reader",
          { 
            fps: 10, 
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0
          },
          false
        );

        scannerRef.current.render(
          (decodedText) => {
            try {
              handleScan(decodedText);
              scannerRef.current?.clear();
            } catch (err) {
              setScanError("Invalid QR Code");
            }
          },
          (error) => {
            console.warn(error);
            setScanError("Failed to scan QR code");
          }
        );
      }
    };

    // Initialize scanner after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(initializeScanner, 100);

    return () => {
      clearTimeout(timeoutId);
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, [handleScan]);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary dark:text-blue-400 mb-2">Scan Attendance QR Code</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Please ensure you're in the classroom before scanning
        </p>
      </div>

      {!location ? (
        <div className="flex items-center justify-center p-6 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
          <AlertCircle className="text-yellow-500 dark:text-yellow-400 mr-2" />
          <p className="text-yellow-700 dark:text-yellow-200">
            Please enable location services to scan attendance
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg">
            <div id="reader" className="w-full dark:invert-[.85]"></div>
          </div>

          {scanError && (
            <div className="flex items-center p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
              <XCircle className="text-red-500 dark:text-red-400 mr-2" />
              <p className="text-red-700 dark:text-red-200">{scanError}</p>
            </div>
          )}

          {scanSuccess && (
            <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <CheckCircle className="text-green-500 dark:text-green-400 mr-2" />
              <p className="text-green-700 dark:text-green-200">Attendance recorded successfully!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QRScanner;