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



