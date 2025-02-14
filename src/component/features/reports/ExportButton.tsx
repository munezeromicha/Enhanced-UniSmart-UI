

// src/components/reports/ExportButton.tsx
import React from 'react';
import { Download } from 'lucide-react';
import Button from '../../common/Button';
import { reportService } from '../../../services/report.service';

interface ExportButtonProps {
  filters: any;
  format?: 'csv' | 'xlsx';
  onExport?: () => void;
}

const ExportButton: React.FC<ExportButtonProps> = ({
  filters,
  format = 'csv',
  onExport,
}) => {
  const handleExport = async () => {
    try {
      const blob = await reportService.exportReport(filters, format);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `attendance_report_${new Date().toISOString()}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      if (onExport) {
        onExport();
      }
    } catch (error) {
      console.error('Failed to export report:', error);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleExport}
      leftIcon={<Download size={20} />}
    >
      Export {format.toUpperCase()}
    </Button>
  );
};

export default ExportButton;