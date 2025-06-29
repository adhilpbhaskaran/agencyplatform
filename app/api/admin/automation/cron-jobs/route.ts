import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();

    // Get cron jobs status using the database function
    const { data: jobs, error } = await supabase
      .rpc('get_cron_jobs');

    if (error) {
      console.error('Error fetching cron jobs:', error);
      return NextResponse.json(
        { error: 'Failed to fetch cron jobs' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      jobs: jobs || []
    });
  } catch (error) {
    console.error('Error in cron jobs API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}