'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCreateQuote } from '@/hooks/use-quotes';
import { X, Loader2, Plus } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface CreateQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateQuoteModal({ isOpen, onClose }: CreateQuoteModalProps) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    startDate: '',
    endDate: '',
    guestCount: 1,
  });

  const createQuoteMutation = useCreateQuote();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Transform camelCase to snake_case for API
      const apiData = {
        client_name: formData.clientName,
        client_email: formData.clientEmail,
        client_phone: formData.clientPhone,

        travel_start: formData.startDate,
    travel_end: formData.endDate,
    pax: formData.guestCount,
      };
      await createQuoteMutation.mutateAsync(apiData);
      // Reset form
      setFormData({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        startDate: '',
        endDate: '',
        guestCount: 1,
      });
      onClose();
    } catch (error) {
      console.error('Failed to create quote:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl">Create New Quote</CardTitle>
            <CardDescription>
              Start a new quote for your client
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Client Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Client Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="clientName" className="text-sm font-medium text-gray-700">
                    Client Name *
                  </label>
                  <Input
                    id="clientName"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    placeholder="Enter client name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="clientEmail" className="text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <Input
                    id="clientEmail"
                    name="clientEmail"
                    type="email"
                    value={formData.clientEmail}
                    onChange={handleInputChange}
                    placeholder="client@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="clientPhone" className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <Input
                  id="clientPhone"
                  name="clientPhone"
                  value={formData.clientPhone}
                  onChange={handleInputChange}
                  placeholder="+62 xxx xxx xxxx"
                />
              </div>
            </div>

            {/* Trip Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Trip Information</h3>
              

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="startDate" className="text-sm font-medium text-gray-700">
                    Start Date *
                  </label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="endDate" className="text-sm font-medium text-gray-700">
                    End Date *
                  </label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="guestCount" className="text-sm font-medium text-gray-700">
                  Number of Travelers *
                </label>
                <Input
                  id="guestCount"
                  name="guestCount"
                  type="number"
                  min="1"
                  value={formData.guestCount}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Error Display */}
            {createQuoteMutation.error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">
                  {createQuoteMutation.error.message}
                </p>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={createQuoteMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createQuoteMutation.isPending}
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              >
                {createQuoteMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Quote
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}