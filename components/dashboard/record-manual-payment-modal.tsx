'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Upload, Loader2 } from 'lucide-react';
import { Quote } from '@/hooks/use-quotes';

interface RecordManualPaymentModalProps {
  quote: Quote;
  onClose: () => void;
  onSubmit: (data: ManualPaymentData) => Promise<void>;
  isSubmitting?: boolean;
}

export interface ManualPaymentData {
  amount: number;
  payment_method: string;
  gateway_transaction_id?: string;
  proof_file?: File;
  notes?: string;
}

export default function RecordManualPaymentModal({
  quote,
  onClose,
  onSubmit,
  isSubmitting = false
}: RecordManualPaymentModalProps) {
  const [formData, setFormData] = useState<ManualPaymentData>({
    amount: quote.final_total_idr || 0,
    payment_method: 'bank_transfer',
    gateway_transaction_id: '',
    notes: ''
  });
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!allowedTypes.includes(file.type)) {
        setErrors({ ...errors, proof_file: 'Please upload a valid image (JPG, PNG) or PDF file' });
        return;
      }
      
      if (file.size > maxSize) {
        setErrors({ ...errors, proof_file: 'File size must be less than 5MB' });
        return;
      }
      
      setProofFile(file);
      setFormData({ ...formData, proof_file: file });
      setErrors({ ...errors, proof_file: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Record<string, string> = {};
    
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Amount is required and must be greater than 0';
    }
    
    if (!formData.payment_method) {
      newErrors.payment_method = 'Payment method is required';
    }
    
    if (!proofFile) {
      newErrors.proof_file = 'Payment proof is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Failed to record payment:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Record Offline Payment</h2>
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
            <h3 className="font-medium text-gray-900 mb-2">Quote Details</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Client:</span>
                <span className="text-gray-900">{quote.clients?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quote #:</span>
                <span className="text-gray-900">{quote.id.slice(0, 8)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expected Amount:</span>
                <span className="text-gray-900 font-medium">
                  IDR {quote.final_total_idr?.toLocaleString() || '0'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Amount (IDR) *
            </label>
            <Input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) || 0 })}
              placeholder="Enter payment amount"
              className={errors.amount ? 'border-red-500' : ''}
            />
            {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method *
            </label>
            <select
              value={formData.payment_method}
              onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="bank_transfer">Bank Transfer</option>
              <option value="digital_wallet">Digital Wallet (UPI/GoPay/OVO)</option>
              <option value="cash">Cash</option>
            </select>
            {errors.payment_method && <p className="text-red-500 text-xs mt-1">{errors.payment_method}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Transaction ID (Optional)
            </label>
            <Input
              type="text"
              value={formData.gateway_transaction_id}
              onChange={(e) => setFormData({ ...formData, gateway_transaction_id: e.target.value })}
              placeholder="Enter transaction reference number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Proof *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
                id="proof-upload"
              />
              <label
                htmlFor="proof-upload"
                className="cursor-pointer flex flex-col items-center justify-center space-y-2"
              >
                <Upload className="h-8 w-8 text-gray-400" />
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    {proofFile ? proofFile.name : 'Click to upload payment proof'}
                  </p>
                  <p className="text-xs text-gray-500">
                    Supports: JPG, PNG, PDF (max 5MB)
                  </p>
                </div>
              </label>
            </div>
            {errors.proof_file && <p className="text-red-500 text-xs mt-1">{errors.proof_file}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (Optional)
            </label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add any additional notes about this payment"
              rows={3}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Recording...
                </>
              ) : (
                'Record Payment'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}