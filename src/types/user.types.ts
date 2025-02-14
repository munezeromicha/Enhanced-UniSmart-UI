// src/types/user.types.ts
export type UserRole = 'lecturer' | 'student' | 'hod' | 'dean' | 'registrar' | 'principal';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  school?: string;
}

// src/types/attendance.types.ts
export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  registrationNumber: string;
  moduleId: string;
  moduleName: string;
  date: Date;
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
  class: string;
  module: string;
  sessionType: 'first' | 'second';
  timestamp: number;
  location: {
    latitude: number;
    longitude: number;
  };
}

// src/types/module.types.ts
export interface Module {
  id: string;
  name: string;
  code: string;
  department: string;
  school: string;
  lecturerId: string;
}