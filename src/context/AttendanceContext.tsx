// src/context/AttendanceContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { AttendanceRecord, AttendanceStats } from '../types/attendance.types';
import { attendanceService } from '../services/attendance.service';

interface AttendanceContextType {
  records: AttendanceRecord[];
  stats: AttendanceStats | null;
  loading: boolean;
  error: string | null;
  fetchAttendance: (moduleId: string, date?: Date) => Promise<void>;
  markAttendance: (data: Partial<AttendanceRecord>) => Promise<AttendanceRecord>;
  updateAttendance: (recordId: string, updates: Partial<AttendanceRecord>) => Promise<void>;
  clearError: () => void;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export const AttendanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [stats, setStats] = useState<AttendanceStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateStats = (records: AttendanceRecord[]): AttendanceStats => {
    const total = records.length;
    const present = records.filter(r => r.status === 'present').length;
    const partial = records.filter(r => r.status === 'partial').length;
    const absent = records.filter(r => r.status === 'absent').length;

    return {
      total,
      present,
      partial,
      absent,
      percentage: total > 0 ? (present / total) * 100 : 0,
    };
  };

  const fetchAttendance = useCallback(async (moduleId: string, date?: Date) => {
    setLoading(true);
    setError(null);
    try {
      const data = await attendanceService.getAttendanceRecords({ moduleId, date });
      setRecords(data);
      setStats(calculateStats(data));
    } catch (err) {
      setError('Failed to fetch attendance records');
    } finally {
      setLoading(false);
    }
  }, []);

  const markAttendance = async (data: Partial<AttendanceRecord>) => {
    setLoading(true);
    setError(null);
    try {
      const newRecord = await attendanceService.markAttendance(data);
      setRecords(prev => [...prev, newRecord]);
      setStats(calculateStats([...records, newRecord]));
      return newRecord;
    } catch (err) {
      setError('Failed to mark attendance');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateAttendance = async (recordId: string, updates: Partial<AttendanceRecord>) => {
    setLoading(true);
    setError(null);
    try {
      const updatedRecord = await attendanceService.updateAttendance(recordId, updates);
      setRecords(prev =>
        prev.map(record => (record.id === recordId ? { ...record, ...updatedRecord } : record))
      );
      setStats(calculateStats(records.map(record => 
        record.id === recordId ? { ...record, ...updatedRecord } : record
      )));
    } catch (err) {
      setError('Failed to update attendance');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AttendanceContext.Provider
      value={{
        records,
        stats,
        loading,
        error,
        fetchAttendance,
        markAttendance,
        updateAttendance,
        clearError,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => {
  const context = useContext(AttendanceContext);
  if (context === undefined) {
    throw new Error('useAttendance must be used within an AttendanceProvider');
  }
  return context;
};

export default AttendanceContext;