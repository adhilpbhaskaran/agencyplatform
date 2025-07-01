import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createSupabaseServerClient();
    
    // Get the agent record
    const { data: agent, error: agentError } = await supabase
      .from('agents')
      .select('id')
      .eq('clerk_user_id', userId)
      .single();

    if (agentError || !agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    // Fetch the quote with related data
    const { data: quote, error: quoteError } = await supabase
      .from('quotes')
      .select(`
        *,
        clients (id, name, email, phone),
        quote_days (*),
        quote_options (*)
      `)
      .eq('id', params.id)
      .eq('agent_id', agent.id)
      .single();

    if (quoteError || !quote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    // Transform the data to match our interface
    const transformedQuote = {
      id: quote.id,
      quote_ref: quote.quote_ref,
      agent_id: quote.agent_id,
      clerk_id: quote.clerk_id,
      client_id: quote.client_id,
      client_name: quote.clients?.name || '',
      client_email: quote.clients?.email || '',
      status: quote.status,
      travel_start: quote.travel_start,
      travel_end: quote.travel_end,
      pax: quote.pax,
      base_cost_idr: quote.base_cost_idr || 0,
      markup_idr: quote.markup_idr || 0,
      final_total_idr: quote.final_total_idr || 0,
      display_currency: quote.display_currency || 'IDR',
      exchange_rate_used: quote.exchange_rate_used || 1,
      display_final_total: quote.display_final_total || 0,
      expires_at: quote.expires_at,
      pdf_url: quote.pdf_url || null,
      created_at: quote.created_at,
      updated_at: quote.updated_at,
      quote_days: quote.quote_days || [],
      quote_options: quote.quote_options || []
    };

    return NextResponse.json(transformedQuote);
  } catch (error) {
    console.error('Error fetching quote:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { quote_days, quote_options } = body;

    const supabase = await createSupabaseServerClient();
    
    // Get the agent record
    const { data: agent, error: agentError } = await supabase
      .from('agents')
      .select('id')
      .eq('clerk_user_id', userId)
      .single();

    if (agentError || !agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    // Verify the quote belongs to this agent
    const { data: existingQuote, error: quoteError } = await supabase
      .from('quotes')
      .select('id')
      .eq('id', params.id)
      .eq('agent_id', agent.id)
      .single();

    if (quoteError || !existingQuote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    // Start transaction - Delete existing child records first (Upsert Fix)
    const { error: deleteDayPlansError } = await supabase
      .from('quote_days')
      .delete()
      .eq('quote_id', params.id);

    if (deleteDayPlansError) {
      console.error('Error deleting day plans:', deleteDayPlansError);
      return NextResponse.json(
        { error: 'Failed to update itinerary' },
        { status: 500 }
      );
    }

    const { error: deleteOptionsError } = await supabase
      .from('quote_options')
      .delete()
      .eq('quote_id', params.id);

    if (deleteOptionsError) {
      console.error('Error deleting quote options:', deleteOptionsError);
      return NextResponse.json(
        { error: 'Failed to update options' },
        { status: 500 }
      );
    }

    // Insert new day plans if provided
    if (quote_days && quote_days.length > 0) {
      const dayPlansToInsert = quote_days.map((plan: any) => ({
        quote_id: params.id,
        day_number: plan.day_number,
        day_date: plan.day_date,
        region: plan.region,
        activities: plan.activities || null,
        notes: plan.notes || null
      }));

      const { error: insertDayPlansError } = await supabase
        .from('quote_days')
        .insert(dayPlansToInsert);

      if (insertDayPlansError) {
        console.error('Error inserting day plans:', insertDayPlansError);
        return NextResponse.json(
          { error: 'Failed to save itinerary' },
          { status: 500 }
        );
      }
    }

    // Insert new quote options if provided
    if (quote_options && quote_options.length > 0) {
      const optionsToInsert = quote_options.map((option: any) => ({
        quote_id: params.id,
        option_number: option.option_number,
        hotel_room_ids: option.hotel_room_ids || [],
        room_cost_idr: option.room_cost_idr || 0,
        land_cost_idr: option.land_cost_idr || 0,
        total_cost_idr: option.total_cost_idr || 0
      }));

      const { error: insertOptionsError } = await supabase
        .from('quote_options')
        .insert(optionsToInsert);

      if (insertOptionsError) {
        console.error('Error inserting quote options:', insertOptionsError);
        return NextResponse.json(
          { error: 'Failed to save options' },
          { status: 500 }
        );
      }
    }

    // Update the currency display
    try {
      const { error: currencyError } = await supabase
        .rpc('update_quote_currency', { p_quote_id: params.id });

      if (currencyError) {
        console.error('Error updating quote currency:', currencyError);
        // Don't fail the request, just log the error
      }
    } catch (pricingError) {
      console.error('Error in pricing engine:', pricingError);
      // Continue without failing the request
    }

    // Fetch the updated quote with all related data
    const { data: updatedQuote, error: fetchError } = await supabase
      .from('quotes')
      .select(`
        *,
        clients (*),
        quote_days (*),
        quote_options (*)
      `)
      .eq('id', params.id)
      .single();

    if (fetchError || !updatedQuote) {
      return NextResponse.json(
        { error: 'Failed to fetch updated quote' },
        { status: 500 }
      );
    }

    // Transform the data to match our interface
    const transformedQuote = {
      id: updatedQuote.id,
      quote_ref: updatedQuote.quote_ref,
      agent_id: updatedQuote.agent_id,
      clerk_id: updatedQuote.clerk_id,
      client_id: updatedQuote.client_id,
      client_name: updatedQuote.clients?.name || '',
      client_email: updatedQuote.clients?.email || '',
      status: updatedQuote.status,
      travel_start: updatedQuote.travel_start,
      travel_end: updatedQuote.travel_end,
      pax: updatedQuote.pax,
      base_cost_idr: updatedQuote.base_cost_idr || 0,
      markup_idr: updatedQuote.markup_idr || 0,
      final_total_idr: updatedQuote.final_total_idr || 0,
      display_currency: updatedQuote.display_currency || 'IDR',
      exchange_rate_used: updatedQuote.exchange_rate_used || 1,
      display_final_total: updatedQuote.display_final_total || 0,
      expires_at: updatedQuote.expires_at,
      pdf_url: updatedQuote.pdf_url || null,
      created_at: updatedQuote.created_at,
      updated_at: updatedQuote.updated_at,
      quote_days: updatedQuote.quote_days || [],
      quote_options: updatedQuote.quote_options || []
    };

    return NextResponse.json(transformedQuote);
  } catch (error) {
    console.error('Error updating quote:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}