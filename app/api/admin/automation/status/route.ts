import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();

    // Get automation status from the view
    const { data: status, error } = await supabase
      .from('automation_status')
      .select('*');

    if (error) {
      console.error('Error fetching automation status:', error);
      return NextResponse.json(
        { error: 'Failed to fetch automation status' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      status: status || []
    });
  } catch (error) {
    console.error('Error in automation status API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}