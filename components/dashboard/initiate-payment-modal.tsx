'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, FileText, X } from 'lucide-react';
import { Quote } from '@/hooks/use-quotes';

interface InitiatePaymentModalProps {
  quote: Quote;
  onClose: () => void;
  onSelectOnlinePayment: () => void;
  onSelectManualPayment: () => void;
}

export default function InitiatePaymentModal({
  quote,
  onClose,
  onSelectOnlinePayment,
  onSelectManualPayment
}: InitiatePaymentModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Collect Payment</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Quote Summary</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Client:</span>
                <span className="text-gray-900">{quote.clients?.full_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="text-gray-900 font-medium">
                  IDR {quote.final_price_idr?.toLocaleString() || '0'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quote #:</span>
                <span className="text-gray-900">{quote.id.slice(0, 8)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 mb-4">Choose Payment Method</h3>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onSelectOnlinePayment}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Online Payment</h4>
                  <p className="text-sm text-gray-600">Credit/Debit Card - Instant processing</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onSelectManualPayment}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Offline Payment</h4>
                  <p className="text-sm text-gray-600">Bank Transfer/UPI - Manual verification</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 pt-4 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}