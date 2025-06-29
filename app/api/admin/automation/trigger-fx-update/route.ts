import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();

    // Call the manual FX update function
    const { data: result, error } = await supabase
      .rpc('trigger_fx_update');

    if (error) {
      console.error('Error triggering FX update:', error);
      return NextResponse.json(
        { error: 'Failed to trigger FX update' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      result: result,
      message: 'FX update triggered successfully'
    });
  } catch (error) {
    console.error('Error in trigger FX update API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}