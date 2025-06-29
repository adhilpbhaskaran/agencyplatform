import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();

    // Get current exchange rates
    const { data: rates, error } = await supabase
      .from('exchange_rates')
      .select('*')
      .order('currency_code', { ascending: true });

    if (error) {
      console.error('Error fetching exchange rates:', error);
      return NextResponse.json(
        { error: 'Failed to fetch exchange rates' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      rates: rates || []
    });
  } catch (error) {
    console.error('Error in exchange rates API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}