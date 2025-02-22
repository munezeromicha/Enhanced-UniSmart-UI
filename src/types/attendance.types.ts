export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  registrationNumber: string;
  module: string;
  moduleName: string;
  type: 'first' | 'second';
  timestamp: Date;
  firstScan: boolean;
  secondScan: boolean;
  status: 'present' | 'partial' | 'absent';
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface QRCodeData {
  lecturerId: string;
  lecturerName: string;
  department: string;
  school: string;
  module: string;
  class: string;
  type: 'first' | 'second';
  timestamp: number;
  location: {
    latitude: number;
    longitude: number;
  };
}