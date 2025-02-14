// src/utils/constants.ts
export const ATTENDANCE_STATUS = {
    PRESENT: 'present',
    PARTIAL: 'partial',
    ABSENT: 'absent',
  } as const;
  
  export const USER_ROLES = {
    STUDENT: 'student',
    LECTURER: 'lecturer',
    HOD: 'hod',
    DEAN: 'dean',
    REGISTRAR: 'registrar',
    PRINCIPAL: 'principal',
  } as const;
  
  export const QR_SCAN_TYPES = {
    FIRST: 'first',
    SECOND: 'second',
  } as const;
  
  // src/utils/helpers.ts
  export const calculateAttendancePercentage = (
    present: number,
    total: number
  ): number => {
    if (total === 0) return 0;
    return Math.round((present / total) * 100);
  };
  
  export const getDistanceBetweenCoordinates = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
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
  
  // src/utils/validation.ts
  export const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  export const validatePassword = (password: string): {
    isValid: boolean;
    message: string;
  } => {
    if (password.length < 8) {
      return {
        isValid: false,
        message: 'Password must be at least 8 characters long',
      };
    }
  
    if (!/[A-Z]/.test(password)) {
      return {
        isValid: false,
        message: 'Password must contain at least one uppercase letter',
      };
    }
  
    if (!/[a-z]/.test(password)) {
      return {
        isValid: false,
        message: 'Password must contain at least one lowercase letter',
      };
    }
  
    if (!/[0-9]/.test(password)) {
      return {
        isValid: false,
        message: 'Password must contain at least one number',
      };
    }
  
    return { isValid: true, message: '' };
  };
  
  // src/utils/formatters.ts
  export const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };
  
  export const formatTime = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  export const formatPercentage = (value: number): string => {
    return `${Math.round(value)}%`;
  };
  
  export const formatFileSize = (bytes: number): string => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
  
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
  
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };