import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import QRGeneratorForm from '../../forms/QRGeneratorForm';
import Card from '../../common/Card';
import { QRCodeData } from '../../../types/attendance.types';
import { QRCodeSVG } from 'qrcode.react';
import { Download, RefreshCw } from 'lucide-react';
import Button from '../../common/Button';

const GeneratorPage: React.FC = () => {
  const { user } = useAuth();
  const [generatedQR, setGeneratedQR] = useState<QRCodeData | null>(null);

  const handleGenerateQR = (data: QRCodeData) => {
    setGeneratedQR(data);
  };

  const downloadQRCode = () => {
    if (!generatedQR) return;

    const canvas = document.getElementById('qr-code') as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = `qr-code-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const resetQRCode = () => {
    setGeneratedQR(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Generate Attendance QR Code
        </h1>
        <p className="mt-2 text-gray-600">
          Create a QR code for students to scan and mark their attendance
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <QRGeneratorForm
            lecturerData={{
              id: user?.id || '',
              name: user?.name || '',
              department: user?.department || '',
              school: user?.school || '',
            }}
            onGenerate={handleGenerateQR}
          />
        </div>

        {generatedQR && (
          <div>
            <Card>
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Generated QR Code</h2>
                <div className="flex justify-center mb-6">
                  <QRCodeSVG
                    id="qr-code"
                    value={JSON.stringify(generatedQR)}
                    size={256}
                    level="H"
                    includeMargin={true}
                  />
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={downloadQRCode}
                    leftIcon={<Download size={20} />}
                    className="w-full"
                  >
                    Download QR Code
                  </Button>
                  <Button
                    variant="outline"
                    onClick={resetQRCode}
                    leftIcon={<RefreshCw size={20} />}
                    className="w-full"
                  >
                    Generate New Code
                  </Button>
                </div>

                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p>
                    <strong>Module:</strong> {generatedQR.module}
                  </p>
                  <p>
                    <strong>Class:</strong> {generatedQR.class}
                  </p>
                  <p>
                    <strong>Session:</strong>{' '}
                    {generatedQR.sessionType.charAt(0).toUpperCase() +
                      generatedQR.sessionType.slice(1)}{' '}
                    Session
                  </p>
                  <p>
                    <strong>Generated:</strong>{' '}
                    {new Date(generatedQR.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratorPage;