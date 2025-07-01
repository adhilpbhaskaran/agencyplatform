'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, CreditCard, Lock, Loader2 } from 'lucide-react';
import { Quote } from '@/hooks/use-quotes';

interface OnlinePaymentModalProps {
  quote: Quote;
  onClose: () => void;
  onPaymentSuccess: () => void;
  onPaymentError: (error: string) => void;
}

interface PaymentIntent {
  id: string;
  client_secret: string;
  amount: number;
  currency: string;
}

export default function OnlinePaymentModal({
  quote,
  onClose,
  onPaymentSuccess,
  onPaymentError
}: OnlinePaymentModalProps) {
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    createPaymentIntent();
  }, []);

  const createPaymentIntent = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/quotes/${quote.id}/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create payment intent');
      }

      const data = await response.json();
      setPaymentIntent(data.payment_intent);
    } catch (error) {
      console.error('Payment intent creation error:', error);
      onPaymentError(error instanceof Error ? error.message : 'Failed to initialize payment');
    } finally {
      setIsLoading(false);
    }
  };

  const validateCardDetails = () => {
    const newErrors: Record<string, string> = {};

    // Card number validation (basic)
    const cardNumber = cardDetails.cardNumber.replace(/\s/g, '');
    if (!cardNumber || cardNumber.length < 13 || cardNumber.length > 19) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }

    // Expiry date validation
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!cardDetails.expiryDate || !expiryRegex.test(cardDetails.expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    } else {
      const [month, year] = cardDetails.expiryDate.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
      
      if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        newErrors.expiryDate = 'Card has expired';
      }
    }

    // CVV validation
    if (!cardDetails.cvv || cardDetails.cvv.length < 3 || cardDetails.cvv.length > 4) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    // Cardholder name validation
    if (!cardDetails.cardholderName.trim()) {
      newErrors.cardholderName = 'Please enter the cardholder name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCardDetails()) {
      return;
    }

    if (!paymentIntent) {
      onPaymentError('Payment not initialized');
      return;
    }

    setIsProcessing(true);

    try {
      // In a real implementation, you would use the payment gateway's SDK here
      // For example, with Stripe:
      // const { error, paymentIntent: confirmedIntent } = await stripe.confirmCardPayment(
      //   paymentIntent.client_secret,
      //   {
      //     payment_method: {
      //       card: cardElement,
      //       billing_details: {
      //         name: cardDetails.cardholderName
      //       }
      //     }
      //   }
      // );

      // Mock payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate payment success (90% success rate for demo)
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        // Update payment status via webhook simulation
        await fetch(`/api/quotes/${quote.id}/create-payment-intent`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            payment_intent_id: paymentIntent.id,
            status: 'succeeded'
          })
        });
        
        onPaymentSuccess();
      } else {
        throw new Error('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      onPaymentError(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Initializing payment...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Secure Payment</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
            disabled={isProcessing}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Payment Summary</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Client:</span>
                <span className="text-gray-900">{quote.clients?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quote #:</span>
                <span className="text-gray-900">{quote.id.slice(0, 8)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-gray-900">Total Amount:</span>
                <span className="text-gray-900">
                  IDR {quote.final_total_idr?.toLocaleString() || '0'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number *
            </label>
            <div className="relative">
              <Input
                type="text"
                value={cardDetails.cardNumber}
                onChange={(e) => setCardDetails({ 
                  ...cardDetails, 
                  cardNumber: formatCardNumber(e.target.value) 
                })}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className={errors.cardNumber ? 'border-red-500 pr-10' : 'pr-10'}
              />
              <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date *
              </label>
              <Input
                type="text"
                value={cardDetails.expiryDate}
                onChange={(e) => setCardDetails({ 
                  ...cardDetails, 
                  expiryDate: formatExpiryDate(e.target.value) 
                })}
                placeholder="MM/YY"
                maxLength={5}
                className={errors.expiryDate ? 'border-red-500' : ''}
              />
              {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV *
              </label>
              <Input
                type="text"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({ 
                  ...cardDetails, 
                  cvv: e.target.value.replace(/[^0-9]/g, '') 
                })}
                placeholder="123"
                maxLength={4}
                className={errors.cvv ? 'border-red-500' : ''}
              />
              {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cardholder Name *
            </label>
            <Input
              type="text"
              value={cardDetails.cardholderName}
              onChange={(e) => setCardDetails({ 
                ...cardDetails, 
                cardholderName: e.target.value 
              })}
              placeholder="John Doe"
              className={errors.cardholderName ? 'border-red-500' : ''}
            />
            {errors.cardholderName && <p className="text-red-500 text-xs mt-1">{errors.cardholderName}</p>}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4 text-blue-600" />
              <p className="text-sm text-blue-800">
                Your payment information is encrypted and secure.
              </p>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                `Pay IDR ${quote.final_total_idr?.toLocaleString() || '0'}`
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}