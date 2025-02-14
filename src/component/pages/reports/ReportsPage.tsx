import React, { useState, useEffect } from 'react';
import { FileText, Download, Trash2, Eye } from 'lucide-react';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Table from '../../common/Table';
import ReportGenerator from '../../features/reports/ReportGenerator';
import { reportService } from '../../../services/report.service';
import { formatDate, formatFileSize } from '../../../utils/formatters';
import { ReportData } from '../../../types/report.types';

const ReportPage: React.FC = () => {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await reportService.getReports();
      setReports(data);
    } catch (err) {
      setError('Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (reportId: string) => {
    try {
      const report = reports.find(r => r.id === reportId);
      if (!report) return;

      const blob = await reportService.downloadReport(reportId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${report.name}_${formatDate(report.generatedAt)}.${report.format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError('Failed to download report');
    }
  };

  const handleDelete = async (reportId: string) => {
    if (!window.confirm('Are you sure you want to delete this report?')) return;

    try {
      await reportService.deleteReport(reportId);
      setReports(reports.filter(r => r.id !== reportId));
    } catch (err) {
      setError('Failed to delete report');
    }
  };

  const columns = [
    {
      key: 'name',
      title: 'Report Name',
      render: (value: string, report: ReportData) => (
        <div className="flex items-center">
          <FileText className="h-5 w-5 text-gray-400 mr-2" />
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: 'type',
      title: 'Type',
      render: (value: string) => (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100">
          {value}
        </span>
      ),
    },
    {
      key: 'generatedAt',
      title: 'Generated',
      render: (value: Date) => formatDate(value),
    },
    {
      key: 'size',
      title: 'Size',
      render: (value: number) => formatFileSize(value),
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_: any, report: ReportData) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDownload(report.id)}
            leftIcon={<Download size={16} />}
          >
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedReport(report.id)}
            leftIcon={<Eye size={16} />}
          >
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700"
            onClick={() => handleDelete(report.id)}
            leftIcon={<Trash2 size={16} />}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="mt-2 text-gray-600">
          Generate and manage attendance reports
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6">
              {error && (
                <div className="mb-4 bg-red-50 text-red-700 p-3 rounded-md">
                  {error}
                </div>
              )}

              <Table
                data={reports}
                columns={columns}
                loading={loading}
                emptyMessage="No reports generated yet"
              />
            </div>
          </Card>
        </div>

        <div>
          <ReportGenerator onGenerate={fetchReports} />
        </div>
      </div>
    </div>
  );
};

export default ReportPage;