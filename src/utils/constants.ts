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
  