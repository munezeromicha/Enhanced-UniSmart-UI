export interface Location {
    latitude: number;
    longitude: number;
  }
  
  export interface QRCodeData {
    lecturerId: string;
    lecturerName: string;
    department: string;
    school: string;
    class: string;
    module: string;
    sessionType: 'first' | 'second';
    timestamp: number;
    location: {
      latitude: number;
      longitude: number;
    };
  }
  
  export interface AttendanceRecord {
    id?: string;
    studentId: string;
    moduleId: string;
    date: Date;
    status: 'present' | 'absent' | 'late';
    location?: {
      latitude: number;
      longitude: number;
    };
    qrData?: QRCodeData;
    timestamp?: number;
  }
  