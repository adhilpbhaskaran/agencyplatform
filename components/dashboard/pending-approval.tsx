import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, AlertCircle } from 'lucide-react';

export default function PendingApprovalComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Application Under Review
          </CardTitle>
          <CardDescription className="text-gray-600">
            Your agent registration is being reviewed by our team
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <h4 className="font-medium text-blue-900 mb-1">
                  What happens next?
                </h4>
                <p className="text-sm text-blue-700">
                  Our team will review your application within 24-48 hours. You'll receive an email notification once your account is approved.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            <p>Need help? Contact our support team at</p>
            <a href="mailto:support@bali-malayali.com" className="text-blue-600 hover:underline">
              support@bali-malayali.com
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}