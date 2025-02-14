// src/utils/validation.ts (continued)
export const validateRegistrationNumber = (regNo: string): ValidationResult => {
    const errors: string[] = [];
    const regNoRegex = /^[A-Z0-9]{7,10}$/;
  
    if (!regNo) {
      errors.push('Registration number is required');
    } else if (!regNoRegex.test(regNo)) {
      errors.push('Invalid registration number format');
    }
  
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  
  export const validateQRData = (qrData: string): ValidationResult => {
    const errors: string[] = [];
  
    try {
      const data = JSON.parse(qrData);
      
      if (!data.lecturerId) {
        errors.push('Missing lecturer information');
      }
      if (!data.moduleId) {
        errors.push('Missing module information');
      }
      if (!data.timestamp) {
        errors.push('Missing timestamp');
      }
      if (!data.location?.latitude || !data.location?.longitude) {
        errors.push('Missing location information');
      }
      
      // Check if QR code is expired (valid for 5 minutes)
      const timestamp = new Date(data.timestamp).getTime();
      const now = Date.now();
      if (now - timestamp > 5 * 60 * 1000) {
        errors.push('QR code has expired');
      }
  
    } catch (error) {
      errors.push('Invalid QR code format');
    }
  
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  
  export const validateDateRange = (startDate: Date, endDate: Date): ValidationResult => {
    const errors: string[] = [];
  
    if (!startDate) {
      errors.push('Start date is required');
    }
    if (!endDate) {
      errors.push('End date is required');
    }
    if (startDate && endDate && startDate > endDate) {
      errors.push('Start date must be before end date');
    }
    if (endDate && endDate > new Date()) {
      errors.push('End date cannot be in the future');
    }
  
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  
  export const validateLocation = (
    studentLocation: { latitude: number; longitude: number },
    lecturerLocation: { latitude: number; longitude: number },
    maxDistance: number = 50 // meters
  ): ValidationResult => {
    const errors: string[] = [];
  
    if (!studentLocation?.latitude || !studentLocation?.longitude) {
      errors.push('Student location is required');
    }
    if (!lecturerLocation?.latitude || !lecturerLocation?.longitude) {
      errors.push('Lecturer location is required');
    }
  
    if (errors.length === 0) {
      const distance = calculateDistance(studentLocation, lecturerLocation);
      if (distance > maxDistance) {
        errors.push(`You are too far from the classroom (${Math.round(distance)}m away)`);
      }
    }
  
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  
  export const validateModuleCode = (moduleCode: string): ValidationResult => {
    const errors: string[] = [];
    const moduleCodeRegex = /^[A-Z]{2,4}[0-9]{3,4}$/;
  
    if (!moduleCode) {
      errors.push('Module code is required');
    } else if (!moduleCodeRegex.test(moduleCode)) {
      errors.push('Invalid module code format (e.g., CS101, COMP2023)');
    }
  
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  
  export const validateAttendanceRecord = (record: any): ValidationResult => {
    const errors: string[] = [];
  
    if (!record.studentId) {
      errors.push('Student ID is required');
    }
    if (!record.moduleId) {
      errors.push('Module ID is required');
    }
    if (!record.date) {
      errors.push('Date is required');
    }
    if (!['present', 'partial', 'absent'].includes(record.status)) {
      errors.push('Invalid attendance status');
    }
    if (!record.location) {
      errors.push('Location information is required');
    }
  
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  
  // Helper function for validateLocation
  const calculateDistance = (
    coord1: { latitude: number; longitude: number },
    coord2: { latitude: number; longitude: number }
  ): number => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (coord1.latitude * Math.PI) / 180;
    const φ2 = (coord2.latitude * Math.PI) / 180;
    const Δφ = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
    const Δλ = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;
  
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c; // Distance in meters
  };

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};