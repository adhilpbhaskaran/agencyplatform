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

export async function POST(
  request: NextRequest,
  { params }: { params: { payment_id: string } }
) {
  try {
    const { payment_id } = params;

    if (!payment_id) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      );
    }

    const supabase = await createSupabaseServerClient();

    // First, get the payment details to verify it exists and is pending
    const { data: payment, error: fetchError } = await supabase
      .from('payments')
      .select('id, quote_id, status, is_manual')
      .eq('id', payment_id)
      .single();

    if (fetchError || !payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }

    if (!payment.is_manual) {
      return NextResponse.json(
        { error: 'This endpoint is only for manual payments' },
        { status: 400 }
      );
    }

    if (payment.status !== 'pending_verification') {
      return NextResponse.json(
        { error: 'Payment is not pending verification' },
        { status: 400 }
      );
    }

    // Update payment status to succeeded with verification details
    const { error: updateError } = await supabase
      .from('payments')
      .update({
        status: 'succeeded',
        verified_at: new Date().toISOString(),
        // Note: In a real app, you'd get the admin ID from authentication
        // verified_by: adminId,
        updated_at: new Date().toISOString()
      })
      .eq('id', payment_id);

    if (updateError) {
      console.error('Error updating payment:', updateError);
      return NextResponse.json(
        { error: 'Failed to approve payment' },
        { status: 500 }
      );
    }

    // Call the unified booking confirmation function
    await confirmBooking(supabase, payment.quote_id, payment_id);

    return NextResponse.json({
      success: true,
      message: 'Payment approved and booking confirmed successfully'
    });
  } catch (error) {
    console.error('Error in payment approval API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}