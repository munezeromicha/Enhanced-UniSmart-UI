// src/components/reports/ReportGenerator.tsx
import React, { useState } from 'react';
import { FileText, Filter } from 'lucide-react';
import Card from '../../common/Card';
import Button from '../../common/Button';
import { reportService } from '../../../services/report.service';

interface ReportFilters {
  startDate: string;
  endDate: string;
  moduleId?: string;
  department?: string;
  school?: string;
}

const ReportGenerator: React.FC = () => {
  const [filters, setFilters] = useState<ReportFilters>({
    startDate: '',
    endDate: '',
  });
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      const report = await reportService.generateReport(filters);
      // Handle report data
    } catch (error) {
      console.error('Failed to generate report:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Generate Report
          </h2>
          <Filter className="w-5 h-5 text-gray-400" />
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) =>
                  setFilters({ ...filters, startDate: e.target.value })
                }
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) =>
                  setFilters({ ...filters, endDate: e.target.value })
                }
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Module
            </label>
            <select
              value={filters.moduleId || ''}
              onChange={(e) =>
                setFilters({ ...filters, moduleId: e.target.value })
              }
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">All Modules</option>
              {/* Add module options */}
            </select>
          </div>

          <Button
            onClick={handleGenerateReport}
            isLoading={loading}
            leftIcon={<FileText size={20} />}
            className="w-full"
          >
            Generate Report
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ReportGenerator;