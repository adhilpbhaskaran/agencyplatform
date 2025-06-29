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
        clients (*),
        day_wise_plan (*),
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
      quote_number: quote.quote_number,
      agent_id: quote.agent_id,
      clerk_id: quote.clerk_id,
      client_id: quote.client_id,
      client_name: quote.clients?.name || '',
      client_email: quote.clients?.email || '',
      status: quote.status,
      check_in_date: quote.check_in_date,
      check_out_date: quote.check_out_date,
      adults: quote.adults,
      children: quote.children,
      total_cost_idr: quote.total_cost_idr || 0,
      agent_margin_percentage: quote.agent_margin_percentage || 0,
      final_price_idr: quote.final_price_idr || 0,
      currency_display: quote.currency_display || 'IDR',
      exchange_rate: quote.exchange_rate || 1,
      price_locked_at: quote.price_locked_at,
      expires_at: quote.expires_at,
      expired: quote.expired || false,
      pdf_url: quote.pdf_url || null,
      notes: quote.notes,
      created_at: quote.created_at,
      updated_at: quote.updated_at,
      day_wise_plan: quote.day_wise_plan || [],
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
    const { day_wise_plan, quote_options } = body;

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
      .from('day_wise_plan')
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
    if (day_wise_plan && day_wise_plan.length > 0) {
      const dayPlansToInsert = day_wise_plan.map((plan: any) => ({
        quote_id: params.id,
        day_number: plan.day_number,
        location: plan.location || '',
        activities: plan.activities || '',
        accommodation: plan.accommodation || '',
        meals: plan.meals || '',
        transportation: plan.transportation || ''
      }));

      const { error: insertDayPlansError } = await supabase
        .from('day_wise_plan')
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
        option_type: option.option_type,
        name: option.name || '',
        description: option.description || '',
        cost_per_person_idr: option.cost_per_person_idr || 0,
        is_selected: option.is_selected || false
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

    // Call the pricing engine functions
    try {
      // First, calculate the quote cost
      const { error: calculateError } = await supabase
        .rpc('calculate_quote_cost', { quote_id_param: params.id });

      if (calculateError) {
        console.error('Error calculating quote cost:', calculateError);
        // Don't fail the request, just log the error
      }

      // Then, update the currency display
      const { error: currencyError } = await supabase
        .rpc('update_quote_currency', { quote_id_param: params.id });

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
        day_wise_plan (*),
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
      quote_number: updatedQuote.quote_number,
      agent_id: updatedQuote.agent_id,
      clerk_id: updatedQuote.clerk_id,
      client_id: updatedQuote.client_id,
      client_name: updatedQuote.clients?.name || '',
      client_email: updatedQuote.clients?.email || '',
      status: updatedQuote.status,
      check_in_date: updatedQuote.check_in_date,
      check_out_date: updatedQuote.check_out_date,
      adults: updatedQuote.adults,
      children: updatedQuote.children,
      total_cost_idr: updatedQuote.total_cost_idr || 0,
      agent_margin_percentage: updatedQuote.agent_margin_percentage || 0,
      final_price_idr: updatedQuote.final_price_idr || 0,
      currency_display: updatedQuote.currency_display || 'IDR',
      exchange_rate: updatedQuote.exchange_rate || 1,
      price_locked_at: updatedQuote.price_locked_at,
      expires_at: updatedQuote.expires_at,
      expired: updatedQuote.expired || false,
      pdf_url: updatedQuote.pdf_url || null,
      notes: updatedQuote.notes,
      created_at: updatedQuote.created_at,
      updated_at: updatedQuote.updated_at,
      day_wise_plan: updatedQuote.day_wise_plan || [],
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