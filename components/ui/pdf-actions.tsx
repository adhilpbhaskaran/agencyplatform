import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Share2, Mail, Copy, Check } from 'lucide-react';

interface PDFActionsProps {
  pdfUrl: string;
  filename: string;
  clientEmail?: string;
  onClose?: () => void;
}

export const PDFActions: React.FC<PDFActionsProps> = ({
  pdfUrl,
  filename,
  clientEmail,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(pdfUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleEmailClient = () => {
    if (clientEmail) {
      const subject = encodeURIComponent('Your Travel Quote');
      const body = encodeURIComponent(
        `Dear Client,\n\nPlease find your travel quote attached: ${pdfUrl}\n\nBest regards`
      );
      window.open(`mailto:${clientEmail}?subject=${subject}&body=${body}`);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            PDF Generated Successfully!
          </h3>
          <p className="text-sm text-gray-600">
            Your quote PDF is ready. Choose an action below:
          </p>
        </div>
        
        <div className="space-y-3">
          <Button 
            onClick={handleDownload}
            className="w-full"
            variant="default"
          >
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          
          <Button 
            onClick={handleCopyLink}
            className="w-full"
            variant="outline"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Link Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy Share Link
              </>
            )}
          </Button>
          
          {clientEmail && (
            <Button 
              onClick={handleEmailClient}
              className="w-full"
              variant="outline"
            >
              <Mail className="h-4 w-4 mr-2" />
              Email to Client
            </Button>
          )}
          
          <Button 
            onClick={() => window.open(pdfUrl, '_blank')}
            className="w-full"
            variant="outline"
          >
            <Share2 className="h-4 w-4 mr-2" />
            View PDF
          </Button>
        </div>
        
        {onClose && (
          <Button 
            onClick={onClose}
            className="w-full mt-4"
            variant="ghost"
          >
            Close
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PDFActions;