// src/utils/helpers.ts
import { Location } from '../types/attendance.types';

export const calculateDistance = (
  location1: Location,
  location2: Location
): number => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (location1.latitude * Math.PI) / 180;
  const φ2 = (location2.latitude * Math.PI) / 180;
  const Δφ = ((location2.latitude - location1.latitude) * Math.PI) / 180;
  const Δλ = ((location2.longitude - location1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export const isValidLocation = (
  studentLocation: Location,
  lecturerLocation: Location,
  maxDistance: number = 50 // meters
): boolean => {
  const distance = calculateDistance(studentLocation, lecturerLocation);
  return distance <= maxDistance;
};

export const calculateAttendanceStats = (
  present: number,
  partial: number,
  absent: number
) => {
  const total = present + partial + absent;
  return {
    total,
    presentPercentage: (present / total) * 100,
    partialPercentage: (partial / total) * 100,
    absentPercentage: (absent / total) * 100,
  };
};

export const groupByModule = <T extends { moduleId: string }>(
  items: T[]
): Record<string, T[]> => {
  return items.reduce((acc, item) => {
    const { moduleId } = item;
    if (!acc[moduleId]) {
      acc[moduleId] = [];
    }
    acc[moduleId].push(item);
    return acc;
  }, {} as Record<string, T[]>);
};

// src/utils/validation.ts
export const validateEmail = (email: string): boolean => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Password must contain at least one special character (!@#$%^&*)');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateQRData = (qrData: string): boolean => {
  try {
    const data = JSON.parse(qrData);
    return !!(
      data.lecturerId &&
      data.moduleId &&
      data.timestamp &&
      data.location?.latitude &&
      data.location?.longitude
    );
  } catch {
    return false;
  }
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

export const formatDateTime = (date: Date): string => {
  return `${formatDate(date)} ${formatTime(date)}`;
};

export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) {
    return `${remainingMinutes} min`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
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