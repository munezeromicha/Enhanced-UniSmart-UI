import { useState, useEffect } from 'react';
import { attendanceService } from '../services/attendance.service';
import { AttendanceRecord, AttendanceStats } from '../types/attendance.types';
import { useAuth } from './useAuth';

export const useAttendance = (moduleId?: string) => {
  const { user } = useAuth();
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [stats, setStats] = useState<AttendanceStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      if (!moduleId) return;
      
      try {
        setLoading(true);
        const data = await attendanceService.getAttendanceRecords({
          moduleId,
          studentId: user?.role === 'student' ? user.id : undefined,
        });
        setRecords(data);
        
        const total = data.length;
        const present = data.filter(r => r.status === 'present').length;
        const partial = data.filter(r => r.status === 'partial').length;
        const absent = data.filter(r => r.status === 'absent').length;
        
        setStats({
          total,
          present,
          partial,
          absent,
          percentage: (present / total) * 100,
        });
      } catch (err) {
        setError('Failed to fetch attendance records');
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [moduleId, user]);

  const markAttendance = async (data: Partial<AttendanceRecord>) => {
    setLoading(true);
    try {
      const record = await attendanceService.markAttendance(data);
      setRecords(prev => [...prev, record]);
      return record;
    } catch (err) {
      setError('Failed to mark attendance');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateAttendance = async (recordId: string, updates: Partial<AttendanceRecord>) => {
    setLoading(true);
    try {
      const updated = await attendanceService.updateAttendance(recordId, updates);
      setRecords(prev => 
        prev.map(record => 
          record.id === recordId ? { ...record, ...updated } : record
        )
      );
      return updated;
    } catch (err) {
      setError('Failed to update attendance');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    records,
    stats,
    loading,
    error,
    markAttendance,
    updateAttendance,
  };
};