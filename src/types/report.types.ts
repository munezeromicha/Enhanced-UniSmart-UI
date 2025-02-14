export interface AttendanceStats {
    total: number;
    present: number;
    partial: number;
    absent: number;
    percentage: number;
  }
  
  export interface ModuleStats extends AttendanceStats {
    moduleId: string;
    moduleName: string;
  }
  
  export interface ReportFilters {
    startDate?: Date;
    endDate?: Date;
    moduleId?: string;
    department?: string;
    school?: string;
    studentId?: string;
    lecturerId?: string;
  }
  
  export interface ReportData {
    id: string;
    name: string;
    filters: ReportFilters;
    stats: AttendanceStats;
    moduleStats: ModuleStats[];
    records: AttendanceRecord[];
    generatedAt: Date;
  }