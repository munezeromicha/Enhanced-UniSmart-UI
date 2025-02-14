import api from './api';
import { AttendanceRecord, QRCodeData } from '../types/attendance.types';


export const attendanceService = {
  async getAttendanceRecords(filters: {
    moduleId?: string;
    studentId?: string;
    date?: Date;
  }): Promise<AttendanceRecord[]> {
    const response = await api.get('/attendance', { params: filters });
    return response.data;
  },

  async markAttendance(data: Partial<AttendanceRecord>): Promise<AttendanceRecord> {
    const response = await api.post('/attendance', data);
    return response.data;
  },

  async generateQRCode(data: QRCodeData): Promise<string> {
    const response = await api.post('/attendance/qr', data);
    return response.data;
  },

  async validateQRCode(qrData: string, location: Location): Promise<boolean> {
    const response = await api.post('/attendance/validate', { qrData, location });
    return response.data.valid;
  },
};