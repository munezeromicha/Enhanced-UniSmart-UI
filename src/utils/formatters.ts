// src/utils/formatters.ts
export const formatDate = (date: Date | string): string => {
    if (!date) return '';
    const d = new Date(date);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(d);
  };
  
  export const formatShortDate = (date: Date | string): string => {
    if (!date) return '';
    const d = new Date(date);
    return new Intl.DateTimeFormat('en-US', {
      year: '2-digit',
      month: 'short',
      day: 'numeric',
    }).format(d);
  };
  
  export const formatTime = (date: Date | string): string => {
    if (!date) return '';
    const d = new Date(date);
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(d);
  };
  
  export const formatDateTime = (date: Date | string): string => {
    if (!date) return '';
    const d = new Date(date);
    return `${formatDate(d)} at ${formatTime(d)}`;
  };
  
  export const formatTimeAgo = (date: Date | string): string => {
    const now = new Date();
    const d = new Date(date);
    const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);
    
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1
    };
  
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
      }
    }
    
    return 'just now';
  };
  
  /**
   * Number Formatters
   */
  export const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num);
  };
  
  export const formatPercentage = (value: number, decimals: number = 1): string => {
    if (isNaN(value)) return '0%';
    return `${value.toFixed(decimals)}%`;
  };
  
  export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };
  
  /**
   * File Size Formatter
   */
  export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${units[i]}`;
  };
  
  /**
   * Duration Formatters
   */
  export const formatDuration = (minutes: number): string => {
    if (minutes < 1) return 'Less than a minute';
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (remainingMinutes === 0) {
      return `${hours} hour${hours !== 1 ? 's' : ''}`;
    }
    
    return `${hours} hour${hours !== 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`;
  };
  
  export const formatDurationShort = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };
  
  /**
   * Status and Label Formatters
   */
  export const formatAttendanceStatus = (status: string): string => {
    const statusMap: { [key: string]: string } = {
      present: 'Present',
      partial: 'Partial',
      absent: 'Absent',
    };
    return statusMap[status.toLowerCase()] || status;
  };
  
  export const getStatusColor = (status: string): string => {
    const colorMap: { [key: string]: string } = {
      present: 'green',
      partial: 'yellow',
      absent: 'red',
    };
    return colorMap[status.toLowerCase()] || 'gray';
  };
  
  /**
   * Name Formatters
   */
  export const formatFullName = (firstName: string, lastName: string): string => {
    return `${firstName} ${lastName}`.trim();
  };
  
  export const formatInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  /**
   * Location Formatter
   */
  export const formatLocation = (latitude: number, longitude: number): string => {
    return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
  };
  
  /**
   * Module Code Formatter
   */
  export const formatModuleCode = (code: string): string => {
    // Assuming module codes are in format like "CS101" or "COMP201"
    const match = code.match(/([A-Z]+)(\d+)/);
    if (!match) return code;
    return `${match[1]} ${match[1] === 'CS' ? '0' : ''}${match[2]}`;
  };
  
  /**
   * Registration Number Formatter
   */
  export const formatRegistrationNumber = (regNo: string): string => {
    // Assuming registration numbers are in format like "2023001" or "CST2023001"
    return regNo.replace(/(\d{4})(\d{3})/, '$1/$2');
  };