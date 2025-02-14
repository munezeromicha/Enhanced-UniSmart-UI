import api from './api';
import { ReportData, ReportFilters } from '../types/report.types';

export const reportService = {
  async generateReport(filters: ReportFilters): Promise<ReportData> {
    const response = await api.post('/reports/generate', filters);
    return response.data;
  },

  async getReport(reportId: string): Promise<ReportData> {
    const response = await api.get(`/reports/${reportId}`);
    return response.data;
  },

  async exportReport(
    filters: ReportFilters,
    format: 'csv' | 'xlsx' = 'csv'
  ): Promise<Blob> {
    const response = await api.post(
      '/reports/export',
      { ...filters, format },
      { responseType: 'blob' }
    );
    return response.data;
  },

  async getStats(filters: ReportFilters) {
    const response = await api.get('/reports/stats', { params: filters });
    return response.data;
  },
};