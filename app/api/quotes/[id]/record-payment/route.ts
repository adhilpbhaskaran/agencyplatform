import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Database } from '@/types/database';

type Payment = Database['public']['Tables']['payments']['Insert'];

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createSupabaseServerClient();
    const quoteId = params.id;
    
    // Parse form data
    const formData = await request.formData();
    const amount = parseInt(formData.get('amount') as string);
    const paymentMethod = formData.get('payment_method') as string;
    const transactionId = formData.get('transaction_id') as string;
    const notes = formData.get('notes') as string;
    const proofFile = formData.get('proof_file') as File;
    
    // Validate required fields
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Valid amount is required' },
        { status: 400 }
      );
    }
    
    if (!paymentMethod) {
      return NextResponse.json(
        { error: 'Payment method is required' },
        { status: 400 }
      );
    }
    
    if (!proofFile) {
      return NextResponse.json(
        { error: 'Payment proof is required' },
        { status: 400 }
      );
    }
    
    // Verify quote exists and get quote details
    const { data: quote, error: quoteError } = await supabase
      .from('quotes')
      .select('*')
      .eq('id', quoteId)
      .single();
    
    if (quoteError || !quote) {
      return NextResponse.json(
        { error: 'Quote not found' },
        { status: 404 }
      );
    }
    
    // Check if payment already exists for this quote
    const { data: existingPayment } = await supabase
      .from('payments')
      .select('id')
      .eq('quote_id', quoteId)
      .eq('status', 'completed')
      .single();
    
    if (existingPayment) {
      return NextResponse.json(
        { error: 'Payment already exists for this quote' },
        { status: 400 }
      );
    }
    
    // Upload proof file to Supabase Storage
    const fileExt = proofFile.name.split('.').pop();
    const fileName = `payment-proof-${quoteId}-${Date.now()}.${fileExt}`;
    const filePath = `payment-proofs/${fileName}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, proofFile, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (uploadError) {
      console.error('File upload error:', uploadError);
      return NextResponse.json(
        { error: 'Failed to upload payment proof' },
        { status: 500 }
      );
    }
    
    // Get public URL for the uploaded file
    const { data: urlData } = supabase.storage
      .from('documents')
      .getPublicUrl(filePath);
    
    // Create payment record
    const paymentData: Payment = {
      quote_id: quoteId,
      amount_idr: amount,
      payment_method: paymentMethod as Database['public']['Enums']['payment_method'],
      status: 'pending',
      transaction_id: transactionId || null,
      is_manual: true,
      proof_url: urlData.publicUrl,
      verified_by: null,
      verified_at: null
    };
    
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert(paymentData)
      .select()
      .single();
    
    if (paymentError) {
      console.error('Payment creation error:', paymentError);
      return NextResponse.json(
        { error: 'Failed to create payment record' },
        { status: 500 }
      );
    }
    
    // Update quote status to indicate payment is pending
    const { error: updateError } = await supabase
      .from('quotes')
      .update({ 
        status: 'sent', // Keep as sent until payment is verified
        updated_at: new Date().toISOString()
      })
      .eq('id', quoteId);
    
    if (updateError) {
      console.error('Quote update error:', updateError);
      // Don't fail the request if quote update fails
    }
    
    // Create notification for admin about pending payment verification
    const { error: notificationError } = await supabase
      .from('notifications')
      .insert({
        agent_id: quote.agent_id,
        type: 'payment_received',
        title: 'Manual Payment Recorded',
        message: `Manual payment of IDR ${amount.toLocaleString()} recorded for Quote #${quote.quote_number}. Awaiting verification.`,
        read: false,
        metadata: {
          quote_id: quoteId,
          payment_id: payment.id,
          amount: amount,
          payment_method: paymentMethod
        }
      });
    
    if (notificationError) {
      console.error('Notification creation error:', notificationError);
      // Don't fail the request if notification fails
    }
    
    return NextResponse.json({
      success: true,
      payment: {
        id: payment.id,
        amount_idr: payment.amount_idr,
        status: payment.status,
        payment_method: payment.payment_method,
        is_manual: payment.is_manual,
        created_at: payment.created_at
      },
      message: 'Payment recorded successfully. It will be verified by an admin.'
    });
    
  } catch (error) {
    console.error('Record payment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}