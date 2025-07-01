import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

// Unified booking confirmation function
async function confirmBooking(supabase: any, quoteId: string, paymentId: string) {
  try {
    // Update quote status to paid and trip_status to pending
    const { error: quoteError } = await supabase
      .from('quotes')
      .update({
        status: 'paid',
        trip_status: 'pending',
        updated_at: new Date().toISOString()
      })
      .eq('id', quoteId);

    if (quoteError) {
      throw new Error(`Failed to update quote: ${quoteError.message}`);
    }

    // Create a notification for payment confirmation
    const { error: notificationError } = await supabase
      .from('notifications')
      .insert({
        type: 'payment_confirmed',
        title: 'Payment Confirmed!',
        message: 'Your payment has been confirmed and your booking is now active.',
        quote_id: quoteId,
        created_at: new Date().toISOString()
      });

    if (notificationError) {
      console.error('Failed to create notification:', notificationError);
      // Don't throw here as the main booking confirmation succeeded
    }

    return { success: true };
  } catch (error) {
    console.error('Error in confirmBooking:', error);
    throw error;
  }
}

// Mock payment gateway service
class MockPaymentGateway {
  static async createPaymentIntent(amount: number, currency: string = 'IDR') {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      client_secret: `pi_mock_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
      payment_intent_id: `pi_mock_${Date.now()}`,
      amount,
      currency,
      status: 'requires_payment_method'
    };
  }

  static async confirmPayment(paymentIntentId: string) {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 90% success rate for demo
    const isSuccess = Math.random() > 0.1;
    
    return {
      payment_intent_id: paymentIntentId,
      status: isSuccess ? 'succeeded' : 'failed',
      failure_reason: isSuccess ? null : 'card_declined'
    };
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createSupabaseServerClient();
    const quoteId = params.id;
    
    // Get quote details
    const { data: quote, error: quoteError } = await supabase
      .from('quotes')
      .select('*, clients(name)')
      .eq('id', quoteId)
      .single();
    
    if (quoteError || !quote) {
      return NextResponse.json(
        { error: 'Quote not found' },
        { status: 404 }
      );
    }
    
    // Check if quote is in valid state for payment
    if (quote.status === 'approved') {
      return NextResponse.json(
        { error: 'Quote has already been paid' },
        { status: 400 }
      );
    }
    
    if (quote.status === 'expired' || quote.status === 'void') {
      return NextResponse.json(
        { error: 'Quote is no longer valid for payment' },
        { status: 400 }
      );
    }
    
    // Check if payment already exists for this quote
    const { data: existingPayment } = await supabase
      .from('payments')
      .select('id, status')
      .eq('quote_id', quoteId)
      .eq('status', 'completed')
      .single();
    
    if (existingPayment) {
      return NextResponse.json(
        { error: 'Payment already exists for this quote' },
        { status: 400 }
      );
    }
    
    // Create payment intent with payment gateway
    const paymentIntent = await MockPaymentGateway.createPaymentIntent(
      quote.final_total_idr || 0,
      'IDR'
    );
    
    // Create pending payment record
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert({
        quote_id: quoteId,
        agent_id: quote.agent_id,
        amount_idr: quote.final_total_idr || 0,
        amount_paid: quote.final_total_idr || 0,
        currency_paid: 'IDR',
        payment_method: 'credit_card',
        status: 'pending',
        gateway_transaction_id: paymentIntent.payment_intent_id,
        is_manual: false,
        proof_url: null,
        verified_by: null,
        verified_at: null
      })
      .select()
      .single();
    
    if (paymentError) {
      console.error('Payment creation error:', paymentError);
      return NextResponse.json(
        { error: 'Failed to create payment record' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      payment_intent: {
        id: paymentIntent.payment_intent_id,
        client_secret: paymentIntent.client_secret,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency
      },
      payment_id: payment.id,
      quote: {
        id: quote.id,
        quote_ref: quote.quote_ref,
        client_name: quote.clients?.name,
        amount: quote.final_total_idr
      }
    });
    
  } catch (error) {
    console.error('Create payment intent error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Webhook endpoint for payment gateway notifications
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createSupabaseServerClient();
    const { payment_intent_id, status } = await request.json();
    
    if (!payment_intent_id) {
      return NextResponse.json(
        { error: 'Payment intent ID is required' },
        { status: 400 }
      );
    }
    
    // Find payment by gateway_transaction_id
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .select('*')
      .eq('gateway_transaction_id', payment_intent_id)
      .single();
    
    if (paymentError || !payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }
    
    // Verify payment with gateway
    const paymentResult = await MockPaymentGateway.confirmPayment(payment_intent_id);
    
    // Map gateway status to our payment status
     let newStatus: string;
     switch (paymentResult.status) {
       case 'succeeded':
         newStatus = 'succeeded';
         break;
       case 'failed':
         newStatus = 'failed';
         break;
       default:
         newStatus = 'pending';
     }
    
    const { error: updateError } = await supabase
      .from('payments')
      .update({
        status: newStatus,
        processed_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', payment.id);
    
    if (updateError) {
      console.error('Payment update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update payment' },
        { status: 500 }
      );
    }
    
    // If payment succeeded, confirm the booking
    if (newStatus === 'completed') {
      await confirmBooking(supabase, payment.quote_id, payment.id);
    }
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Payment webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}