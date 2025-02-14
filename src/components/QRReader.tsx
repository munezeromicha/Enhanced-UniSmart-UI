import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';

function QRReader({ onResult }: { onResult: (result: string) => void }) {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        formatsToSupport: [ Html5QrcodeScanner.SCAN_TYPE_CAMERA ]
      },
      /* verbose= */ false
    );
    
    scanner.render(
      (decodedText) => {
        onResult(decodedText);
        // Optional: Stop scanning after successful scan
        scanner.clear();
      }, 
      (error) => {
        console.warn(error);
      }
    );

    // Cleanup on component unmount
    return () => {
      scanner.clear();
    };
  }, [onResult]);

  return (
    <div className="qr-reader-container">
      <div id="reader"></div>
    </div>
  );
}

export default QRReader; 