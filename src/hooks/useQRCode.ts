// src/hooks/useQRCode.ts
import { useState } from 'react';
import { QRCodeData } from '../types/attendance.types';

export const useQRCode = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateQRCode = async (data: QRCodeData) => {
    setLoading(true);
    setError(null);
    try {
      // Implementation for QR code generation
      return JSON.stringify(data);
    } catch (err) {
      setError('Failed to generate QR code');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { generateQRCode, loading, error };
};

// src/hooks/useAttendance.ts
import { useState, useEffect } from 'react';
import { AttendanceRecord } from '../types/attendance.types';
import { attendanceService } from '../services/attendance.service';

export const useAttendance = (moduleId?: string, date?: Date) => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      if (!moduleId) return;
      
      try {
        const data = await attendanceService.getAttendanceRecords(moduleId, date);
        setRecords(data);
      } catch (err) {
        setError('Failed to fetch attendance records');
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [moduleId, date]);

  const markAttendance = async (data: Partial<AttendanceRecord>) => {
    setLoading(true);
    try {
      const updatedRecord = await attendanceService.markAttendance(data);
      setRecords(prev => [...prev, updatedRecord]);
      return updatedRecord;
    } catch (err) {
      setError('Failed to mark attendance');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    records,
    loading,
    error,
    markAttendance,
  };
};