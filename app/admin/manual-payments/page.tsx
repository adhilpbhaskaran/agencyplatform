'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Eye, Check, X, ExternalLink } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface PendingPayment {
  id: string;
  quote_id: string;
  amount_idr: number;
  payment_method: string;
  transaction_id: string | null;
  proof_url: string | null;
  created_at: string;
  quote: {
    id: string;
    quote_number: string;
    clients: {
      full_name: string;
      email: string;
    };
    agents: {
      full_name: string;
      email: string;
    };
  };
}

export default function ManualPaymentsPage() {
  const [payments, setPayments] = useState<PendingPayment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingPaymentId, setProcessingPaymentId] = useState<string | null>(null);

  useEffect(() => {
    fetchPendingPayments();
  }, []);

  const fetchPendingPayments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/manual-payments');
      if (!response.ok) {
        throw new Error('Failed to fetch pending payments');
      }
      const data = await response.json();
      setPayments(data.payments || []);
    } catch (error) {
      console.error('Failed to fetch pending payments:', error);
      alert('Failed to load pending payments');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprovePayment = async (paymentId: string) => {
    if (!confirm('Are you sure you want to approve this payment? This action cannot be undone.')) {
      return;
    }

    setProcessingPaymentId(paymentId);
    try {
      const response = await fetch(`/api/admin/payments/${paymentId}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to approve payment');
      }

      // Remove the approved payment from the list
      setPayments(payments.filter(p => p.id !== paymentId));
      alert('Payment approved successfully!');
    } catch (error) {
      console.error('Failed to approve payment:', error);
      alert(error instanceof Error ? error.message : 'Failed to approve payment');
    } finally {
      setProcessingPaymentId(null);
    }
  };

  const handleRejectPayment = async (paymentId: string) => {
    const reason = prompt('Please provide a reason for rejecting this payment:');
    if (!reason) {
      return;
    }

    setProcessingPaymentId(paymentId);
    try {
      const response = await fetch(`/api/admin/payments/${paymentId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reason })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to reject payment');
      }

      // Remove the rejected payment from the list
      setPayments(payments.filter(p => p.id !== paymentId));
      alert('Payment rejected successfully!');
    } catch (error) {
      console.error('Failed to reject payment:', error);
      alert(error instanceof Error ? error.message : 'Failed to reject payment');
    } finally {
      setProcessingPaymentId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manual Payment Verification</h1>
        <p className="text-gray-600 mt-2">
          Review and approve manual payments submitted by agents.
        </p>
      </div>

      {payments.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Check className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Pending Payments
            </h3>
            <p className="text-gray-600">
              All manual payments have been processed.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {payments.map((payment) => (
            <Card key={payment.id} className="border-l-4 border-l-yellow-400">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Payment #{payment.id.slice(0, 8)}
                  </CardTitle>
                  <Badge variant="secondary">Pending Verification</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Payment Details */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Payment Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-medium">
                          IDR {payment.amount_idr.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Method:</span>
                        <span className="capitalize">
                          {payment.payment_method.replace('_', ' ')}
                        </span>
                      </div>
                      {payment.transaction_id && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Transaction ID:</span>
                          <span className="font-mono text-xs">
                            {payment.transaction_id}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Submitted:</span>
                        <span>{formatDate(payment.created_at)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quote & Client Details */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Quote & Client</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Quote #:</span>
                        <span className="font-medium">
                          {payment.quote.quote_number}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Client:</span>
                        <span>{payment.quote.clients.full_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Agent:</span>
                        <span>{payment.quote.agents.full_name}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Actions</h4>
                    <div className="space-y-2">
                      {payment.proof_url && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => window.open(payment.proof_url!, '_blank')}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Proof
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
                      )}
                      
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          onClick={() => handleApprovePayment(payment.id)}
                          disabled={processingPaymentId === payment.id}
                        >
                          {processingPaymentId === payment.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </>
                          )}
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="destructive"
                          className="flex-1"
                          onClick={() => handleRejectPayment(payment.id)}
                          disabled={processingPaymentId === payment.id}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}