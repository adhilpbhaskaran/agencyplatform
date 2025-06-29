'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2, Calendar, MapPin, Users, DollarSign, Plus, Trash2, CreditCard } from 'lucide-react';
import PDFActions from '@/components/ui/pdf-actions';
import InitiatePaymentModal from '@/components/dashboard/initiate-payment-modal';
import RecordManualPaymentModal, { ManualPaymentData } from '@/components/dashboard/record-manual-payment-modal';
import OnlinePaymentModal from '@/components/dashboard/online-payment-modal';
import { useState, useEffect } from 'react';
import { formatDate } from '@/lib/utils';
import { useQuote, useUpdateQuote, useGeneratePDF, Quote } from '@/hooks/use-quotes';

interface DayPlan {
  id?: string;
  day_number: number;
  location: string;
  activities: string;
  accommodation: string;
  meals: string;
  transportation: string;
}

interface QuoteOption {
  id?: string;
  option_type: 'hotel' | 'activity' | 'transport';
  name: string;
  description: string;
  cost_per_person_idr: number;
  is_selected: boolean;
}

export default function QuoteDetailPage() {
  const params = useParams();
  const quoteId = params.id as string;
  
  const [dayPlans, setDayPlans] = useState<DayPlan[]>([]);
  const [quoteOptions, setQuoteOptions] = useState<QuoteOption[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showPDFActions, setShowPDFActions] = useState(false);
  const [generatedPDF, setGeneratedPDF] = useState<{ pdf_url: string; filename: string } | null>(null);
  
  // Payment modal states
  const [showInitiatePayment, setShowInitiatePayment] = useState(false);
  const [showManualPayment, setShowManualPayment] = useState(false);
  const [showOnlinePayment, setShowOnlinePayment] = useState(false);
  const [isRecordingPayment, setIsRecordingPayment] = useState(false);
  
  const { data: quote, isLoading, error } = useQuote(quoteId);
  const updateQuoteMutation = useUpdateQuote();
  const generatePDFMutation = useGeneratePDF();

  // Initialize local state when quote data loads
  useEffect(() => {
    if (quote) {
      setDayPlans(quote.day_wise_plan || []);
      setQuoteOptions(quote.quote_options || []);
    }
  }, [quote]);

  const addDayPlan = () => {
    const newDay: DayPlan = {
      day_number: dayPlans.length + 1,
      location: '',
      activities: '',
      accommodation: '',
      meals: '',
      transportation: ''
    };
    setDayPlans([...dayPlans, newDay]);
  };

  const removeDayPlan = (index: number) => {
    setDayPlans(dayPlans.filter((_, i) => i !== index));
  };

  const updateDayPlan = (index: number, field: keyof DayPlan, value: string | number) => {
    const updated = [...dayPlans];
    updated[index] = { ...updated[index], [field]: value };
    setDayPlans(updated);
  };

  const addQuoteOption = (type: 'hotel' | 'activity' | 'transport') => {
    const newOption: QuoteOption = {
      option_type: type,
      name: '',
      description: '',
      cost_per_person_idr: 0,
      is_selected: false
    };
    setQuoteOptions([...quoteOptions, newOption]);
  };

  const removeQuoteOption = (index: number) => {
    setQuoteOptions(quoteOptions.filter((_, i) => i !== index));
  };

  const updateQuoteOption = (index: number, field: keyof QuoteOption, value: any) => {
    const updated = [...quoteOptions];
    updated[index] = { ...updated[index], [field]: value };
    setQuoteOptions(updated);
  };

  const handleSaveQuote = async () => {
    try {
      await updateQuoteMutation.mutateAsync({
        id: quoteId,
        data: {
          day_wise_plan: dayPlans,
          quote_options: quoteOptions
        }
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save quote:', error);
    }
  };

  const handleGeneratePDF = async () => {
    try {
      const result = await generatePDFMutation.mutateAsync(quoteId);
      setGeneratedPDF(result);
      setShowPDFActions(true);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    }
  };

  // Payment handlers
  const handleInitiatePayment = () => {
    setShowInitiatePayment(true);
  };

  const handleSelectOnlinePayment = () => {
    setShowInitiatePayment(false);
    setShowOnlinePayment(true);
  };

  const handleSelectManualPayment = () => {
    setShowInitiatePayment(false);
    setShowManualPayment(true);
  };

  const handleRecordManualPayment = async (data: ManualPaymentData) => {
    setIsRecordingPayment(true);
    try {
      const formData = new FormData();
      formData.append('amount', data.amount.toString());
      formData.append('payment_method', data.payment_method);
      if (data.transaction_id) {
        formData.append('transaction_id', data.transaction_id);
      }
      if (data.notes) {
        formData.append('notes', data.notes);
      }
      if (data.proof_file) {
        formData.append('proof_file', data.proof_file);
      }

      const response = await fetch(`/api/quotes/${quoteId}/record-payment`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to record payment');
      }

      const result = await response.json();
      setShowManualPayment(false);
      
      // Show success message
      alert('Payment recorded successfully! It will be verified by an admin.');
      
      // Refresh quote data
      window.location.reload();
    } catch (error) {
      console.error('Failed to record payment:', error);
      alert(error instanceof Error ? error.message : 'Failed to record payment');
    } finally {
      setIsRecordingPayment(false);
    }
  };

  const handlePaymentSuccess = () => {
    setShowOnlinePayment(false);
    alert('Payment successful! Your booking is now confirmed.');
    window.location.reload();
  };

  const handlePaymentError = (error: string) => {
    setShowOnlinePayment(false);
    alert(`Payment failed: ${error}`);
  };

  const closeAllPaymentModals = () => {
    setShowInitiatePayment(false);
    setShowManualPayment(false);
    setShowOnlinePayment(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Quote Not Found</h1>
          <p className="text-gray-600">The quote you're looking for doesn't exist or you don't have permission to view it.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quote #{quote.id.slice(0, 8)}</h1>
          <p className="text-gray-600 mt-1">{quote.clients?.full_name} • {quote.check_in_date} - {quote.check_out_date}</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant={quote.status === 'draft' ? 'secondary' : quote.status === 'sent' ? 'default' : quote.status === 'confirmed' ? 'default' : 'destructive'}>
            {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
          </Badge>
          {quote.status === 'sent' && (
            <Button 
              onClick={handleInitiatePayment}
              className="bg-green-600 hover:bg-green-700"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Collect Payment
            </Button>
          )}
          <Button 
            onClick={handleGeneratePDF}
            disabled={generatePDFMutation.isPending}
            variant="outline"
          >
            {generatePDFMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate PDF'
            )}
          </Button>
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? 'outline' : 'default'}
          >
            {isEditing ? 'View Mode' : 'Edit Quote'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quote Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Quote Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Client</label>
                  <p className="text-gray-900">{quote.clients?.full_name}</p>
                <p className="text-sm text-gray-600">{quote.clients?.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Travel Dates</label>
                  <p className="text-gray-900 flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {quote.check_in_date} - {quote.check_out_date}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Travel Dates</label>
                  <p className="text-gray-900 flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(quote.check_in_date)} - {formatDate(quote.check_out_date)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Travelers</label>
                  <p className="text-gray-900">{quote.adults + quote.children} people ({quote.adults} adults, {quote.children} children)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Day-by-Day Itinerary */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Day-by-Day Itinerary</CardTitle>
                {isEditing && (
                  <Button onClick={addDayPlan} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Day
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {dayPlans.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No itinerary planned yet</p>
                  {isEditing && (
                    <Button onClick={addDayPlan} className="mt-4" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Day
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {dayPlans.map((day, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">Day {day.day_number}</h3>
                        {isEditing && (
                          <Button 
                            onClick={() => removeDayPlan(index)} 
                            size="sm" 
                            variant="outline"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Location</label>
                          {isEditing ? (
                            <Input 
                              value={day.location}
                              onChange={(e) => updateDayPlan(index, 'location', e.target.value)}
                              placeholder="Enter location"
                            />
                          ) : (
                            <p className="text-gray-900">{day.location || 'Not specified'}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-700">Accommodation</label>
                          {isEditing ? (
                            <Input 
                              value={day.accommodation}
                              onChange={(e) => updateDayPlan(index, 'accommodation', e.target.value)}
                              placeholder="Enter accommodation"
                            />
                          ) : (
                            <p className="text-gray-900">{day.accommodation || 'Not specified'}</p>
                          )}
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="text-sm font-medium text-gray-700">Activities</label>
                          {isEditing ? (
                            <Textarea 
                              value={day.activities}
                              onChange={(e) => updateDayPlan(index, 'activities', e.target.value)}
                              placeholder="Describe the day's activities"
                              rows={3}
                            />
                          ) : (
                            <p className="text-gray-900">{day.activities || 'No activities planned'}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-700">Meals</label>
                          {isEditing ? (
                            <Input 
                              value={day.meals}
                              onChange={(e) => updateDayPlan(index, 'meals', e.target.value)}
                              placeholder="Meal arrangements"
                            />
                          ) : (
                            <p className="text-gray-900">{day.meals || 'Not specified'}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-700">Transportation</label>
                          {isEditing ? (
                            <Input 
                              value={day.transportation}
                              onChange={(e) => updateDayPlan(index, 'transportation', e.target.value)}
                              placeholder="Transportation details"
                            />
                          ) : (
                            <p className="text-gray-900">{day.transportation || 'Not specified'}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quote Options */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Hotel & Service Options</CardTitle>
                {isEditing && (
                  <div className="flex gap-2">
                    <Button onClick={() => addQuoteOption('hotel')} size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Hotel
                    </Button>
                    <Button onClick={() => addQuoteOption('activity')} size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Activity
                    </Button>
                    <Button onClick={() => addQuoteOption('transport')} size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Transport
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {quoteOptions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No options added yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {quoteOptions.map((option, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline">{option.option_type}</Badge>
                        {isEditing && (
                          <Button 
                            onClick={() => removeQuoteOption(index)} 
                            size="sm" 
                            variant="outline"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Name</label>
                          {isEditing ? (
                            <Input 
                              value={option.name}
                              onChange={(e) => updateQuoteOption(index, 'name', e.target.value)}
                              placeholder="Option name"
                            />
                          ) : (
                            <p className="text-gray-900">{option.name || 'Unnamed option'}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-700">Cost per Person (IDR)</label>
                          {isEditing ? (
                            <Input 
                              type="number"
                              value={option.cost_per_person_idr}
                              onChange={(e) => updateQuoteOption(index, 'cost_per_person_idr', parseInt(e.target.value) || 0)}
                              placeholder="0"
                            />
                          ) : (
                            <p className="text-gray-900">IDR {option.cost_per_person_idr.toLocaleString()}</p>
                          )}
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="text-sm font-medium text-gray-700">Description</label>
                          {isEditing ? (
                            <Textarea 
                              value={option.description}
                              onChange={(e) => updateQuoteOption(index, 'description', e.target.value)}
                              placeholder="Describe this option"
                              rows={2}
                            />
                          ) : (
                            <p className="text-gray-900">{option.description || 'No description'}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Cost Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Cost Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Cost:</span>
                  <span className="font-medium">IDR {quote.total_cost_idr?.toLocaleString() || '0'}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-green-600">IDR {quote.final_price_idr?.toLocaleString() || '0'}</span>
                </div>
                
                <div className="text-sm text-gray-500">
                  <p>For {quote.adults + quote.children} travelers</p>
                  <p>Created {formatDate(quote.created_at)}</p>
                </div>
              </div>
              
              {isEditing && (
                <div className="pt-4 border-t">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleSaveQuote}
                    disabled={updateQuoteMutation.isPending}
                  >
                    {updateQuoteMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Calculating...
                      </>
                    ) : (
                      'Save & Calculate Price'
                    )}
                  </Button>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Pricing will be calculated automatically
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* PDF Actions Modal */}
      {showPDFActions && generatedPDF && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <PDFActions
              pdfUrl={generatedPDF.pdf_url}
              filename={generatedPDF.filename}
              clientEmail={quote.clients?.email}
              onClose={() => {
                setShowPDFActions(false);
                setGeneratedPDF(null);
              }}
            />
          </div>
        </div>
      )}
      
      {/* Payment Modals */}
      {showInitiatePayment && (
        <InitiatePaymentModal
          quote={quote}
          onClose={closeAllPaymentModals}
          onSelectOnlinePayment={handleSelectOnlinePayment}
          onSelectManualPayment={handleSelectManualPayment}
        />
      )}
      
      {showManualPayment && (
        <RecordManualPaymentModal
          quote={quote}
          onClose={closeAllPaymentModals}
          onSubmit={handleRecordManualPayment}
          isSubmitting={isRecordingPayment}
        />
      )}
      
      {showOnlinePayment && (
        <OnlinePaymentModal
          quote={quote}
          onClose={closeAllPaymentModals}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
        />
      )}
    </div>
  );
}