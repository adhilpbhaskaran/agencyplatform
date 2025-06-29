import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();

    // Call the manual quote expiry function
    const { data: result, error } = await supabase
      .rpc('trigger_quote_expiry');

    if (error) {
      console.error('Error triggering quote expiry:', error);
      return NextResponse.json(
        { error: 'Failed to trigger quote expiry' },
        { status: 500 }
      );
    }

    // The result should be an array with one object containing the counts
    const expiryResult = result && result.length > 0 ? result[0] : {
      expired_count: 0,
      time_expired_count: 0,
      fx_expired_count: 0
    };

    return NextResponse.json({
      success: true,
      result: expiryResult,
      message: `Quote expiry completed: ${expiryResult.expired_count} quotes expired`
    });
  } catch (error) {
    console.error('Error in trigger quote expiry API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}