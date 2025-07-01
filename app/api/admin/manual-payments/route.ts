import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Database } from '@/types/database';

type PaymentWithQuote = Database['public']['Tables']['payments']['Row'] & {
  quotes: {
    id: string;
    quote_ref: string;
    clients: {
      name: string;
      email: string;
    };
    agents: {
      name: string;
      email: string;
    };
  };
};

export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();

    // Get pending manual payments with related quote and client data
    const { data: payments, error } = await supabase
      .from('payments')
      .select(`
        id,
        quote_id,
        amount_idr,
        payment_method,
        gateway_transaction_id,
        proof_url,
        created_at,
        quotes!inner (
          id,
          quote_ref,
          clients!inner (
            name,
            email
          ),
          agents!inner (
            name,
            email
          )
        )
      `)
      .eq('is_manual', true)
      .eq('status', 'pending_verification')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching pending payments:', error);
      return NextResponse.json(
        { error: 'Failed to fetch pending payments' },
        { status: 500 }
      );
    }

    // Transform the data to flatten the nested structure
    const transformedPayments = payments?.map(payment => ({
      id: payment.id,
      quote_id: payment.quote_id,
      amount_idr: payment.amount_idr,
      payment_method: payment.payment_method,
      gateway_transaction_id: payment.gateway_transaction_id,
      proof_url: payment.proof_url,
      created_at: payment.created_at,
      quote: {
        id: (payment as any).quotes?.id,
        quote_ref: (payment as any).quotes?.quote_ref,
        clients: (payment as any).quotes?.clients,
        agents: (payment as any).quotes?.agents
      }
    })) || [];

    return NextResponse.json({
      success: true,
      payments: transformedPayments
    });
  } catch (error) {
    console.error('Error in manual payments API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}