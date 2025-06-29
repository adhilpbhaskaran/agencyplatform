import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { payment_id: string } }
) {
  try {
    const { payment_id } = params;
    const body = await request.json();
    const { reason } = body;

    if (!payment_id) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      );
    }

    if (!reason || reason.trim().length === 0) {
      return NextResponse.json(
        { error: 'Rejection reason is required' },
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

    // Update payment status to failed with rejection details
    const { error: updateError } = await supabase
      .from('payments')
      .update({
        status: 'failed',
        verified_at: new Date().toISOString(),
        // Note: In a real app, you'd get the admin ID from authentication
        // verified_by: adminId,
        updated_at: new Date().toISOString()
      })
      .eq('id', payment_id);

    if (updateError) {
      console.error('Error updating payment:', updateError);
      return NextResponse.json(
        { error: 'Failed to reject payment' },
        { status: 500 }
      );
    }

    // Create a notification for payment rejection
    const { error: notificationError } = await supabase
      .from('notifications')
      .insert({
        type: 'payment_rejected',
        title: 'Payment Rejected',
        message: `Your payment has been rejected. Reason: ${reason}`,
        quote_id: payment.quote_id,
        created_at: new Date().toISOString()
      });

    if (notificationError) {
      console.error('Failed to create notification:', notificationError);
      // Don't throw here as the main rejection succeeded
    }

    return NextResponse.json({
      success: true,
      message: 'Payment rejected successfully'
    });
  } catch (error) {
    console.error('Error in payment rejection API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}