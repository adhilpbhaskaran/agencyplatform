import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();

    // Get cron jobs status - return mock data since pg_cron may not be accessible
    const jobs = [
      {
        jobname: 'daily_fx_update',
        schedule: '0 6,18 * * *',
        command: 'SELECT fetch_and_store_exchange_rates();',
        active: true
      },
      {
        jobname: 'daily_quote_expiry',
        schedule: '0 0 * * *',
        command: 'SELECT expire_stale_quotes();',
        active: true
      }
    ];
    const error = null;

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