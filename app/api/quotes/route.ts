import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Database } from '@/types/database';

type Quote = Database['public']['Tables']['quotes']['Row'];
type QuoteWithRelations = Quote & {
  clients: Database['public']['Tables']['clients']['Row']
  quote_days: Database['public']['Tables']['quote_days']['Row'][]
  quote_options: Database['public']['Tables']['quote_options']['Row'][]
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const supabase = await createSupabaseServerClient();
    const { searchParams } = new URL(request.url);
    
    // Query parameters
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Build query
    let query = supabase
      .from('quotes')
      .select(`
        *,
        clients (
          id,
          name,
          email,
          phone
        ),
        quote_days (
          id,
          day_number,
          day_date,
          region,
          activities,
          notes
        ),
        quote_options (
          id,
          option_number,
          hotel_room_ids,
          room_cost_idr,
          land_cost_idr,
          total_cost_idr
        )
      `)
      .eq('clerk_id', userId);

    // Apply status filter if provided
    if (status && status !== 'all') {
      query = query.eq('status', status as Database['public']['Enums']['quote_status']);
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data: quotes, error } = await query;

    if (error) {
      console.error('Error fetching quotes:', error);
      return NextResponse.json(
        { error: 'Failed to fetch quotes' },
        { status: 500 }
      );
    }

    // Get total count for pagination
    const { count: totalCount } = await supabase
      .from('quotes')
      .select('*', { count: 'exact', head: true })
      .eq('clerk_id', userId);

    return NextResponse.json({
      quotes: quotes as QuoteWithRelations[],
      pagination: {
        total: totalCount || 0,
        limit,
        offset,
        hasMore: (offset + limit) < (totalCount || 0)
      }
    });

  } catch (error) {
    console.error('Unexpected error in GET /api/quotes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const supabase = await createSupabaseServerClient();

    const body = await request.json();
    const {
    client_name,
    client_email,
    client_phone,
    client_nationality,
    travel_start,
    travel_end,
      pax,
      currency_display,
      agent_margin_percentage,
      quote_days,
      quote_options,
      notes
    } = body;

    // Validate required fields
    if (!client_name || !client_email || !travel_start || !travel_end || !pax) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get agent information
    const { data: agent, error: agentError } = await supabase
      .from('agents')
      .select('id')
      .eq('clerk_id', userId)
      .single();

    if (agentError || !agent) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      );
    }

    // Start transaction - create/find client
    let clientId: string;

    // First, try to find existing client by email
    const { data: existingClient } = await supabase
      .from('clients')
      .select('id')
      .eq('email', client_email)
      .eq('agent_id', agent.id)
      .single();

    if (existingClient) {
      clientId = existingClient.id;
      
      // Update client information if provided
      await supabase
        .from('clients')
        .update({
          name: client_name,
          phone: client_phone || null
        })
        .eq('id', clientId);
    } else {
      // Create new client
      const { data: newClient, error: clientError } = await supabase
        .from('clients')
        .insert({
          name: client_name,
          email: client_email,
          phone: client_phone || null,
          agent_id: agent.id
        })
        .select('id')
        .single();

      if (clientError || !newClient) {
        console.error('Error creating client:', clientError);
        return NextResponse.json(
          { error: 'Failed to create client' },
          { status: 500 }
        );
      }

      clientId = newClient.id;
    }

    // Generate quote number
    const quoteNumber = `Q${Date.now()}`;

    // Create the quote
    const { data: quote, error: quoteError } = await supabase
      .from('quotes')
      .insert({
        quote_ref: quoteNumber,
        agent_id: agent.id,
        clerk_id: userId,
        client_id: clientId,
        travel_start,
    travel_end,
        pax: parseInt(pax.toString()),
        display_currency: currency_display || 'USD',
        status: 'draft',
        base_cost_idr: 0,
        markup_idr: 0,
        final_total_idr: 0,
        exchange_rate_used: 1
      })
      .select(`
        *,
        clients (
          id,
          name,
          email,
          phone
        ),
        quote_days (
          id,
          day_number,
          day_date,
          region,
          activities,
          notes
        ),
        quote_options (
          id,
          option_number,
          hotel_room_ids,
          room_cost_idr,
          land_cost_idr,
          total_cost_idr
        )
      `)
      .single();

    if (quoteError || !quote) {
      console.error('Error creating quote:', quoteError);
      return NextResponse.json(
        { error: 'Failed to create quote' },
        { status: 500 }
      );
    }

    // Add quote days if provided
    if (quote_days && quote_days.length > 0) {
      const dayInserts = quote_days.map((day: any) => ({
        quote_id: quote.id,
        day_number: day.day_number,
        day_date: day.day_date,
        region: day.region,
        activities: day.activities,
        notes: day.notes
      }));

      const { error: dayError } = await supabase
        .from('quote_days')
        .insert(dayInserts);

      if (dayError) {
        console.error('Error adding days to quote:', dayError);
        // Rollback quote creation
        await supabase.from('quotes').delete().eq('id', quote.id);
        return NextResponse.json(
          { error: 'Failed to add days to quote' },
          { status: 500 }
        );
      }
    }

    // Add quote options if provided
    if (quote_options && quote_options.length > 0) {
      const optionInserts = quote_options.map((option: any) => ({
        quote_id: quote.id,
        option_number: option.option_number,
        hotel_room_ids: option.hotel_room_ids,
        room_cost_idr: option.room_cost_idr,
        land_cost_idr: option.land_cost_idr,
        total_cost_idr: option.total_cost_idr
      }));

      const { error: optionError } = await supabase
        .from('quote_options')
        .insert(optionInserts);

      if (optionError) {
        console.error('Error adding options to quote:', optionError);
        // Rollback quote creation
        await supabase.from('quotes').delete().eq('id', quote.id);
        return NextResponse.json(
          { error: 'Failed to add options to quote' },
          { status: 500 }
        );
      }
    }

    // Calculate total cost using the database function if available
    try {
      const { data: costResult, error: costError } = await supabase
        .rpc('update_quote_currency', { p_quote_id: quote.id });

      if (!costError) {
        // Fetch updated quote
        const { data: updatedQuote, error: fetchError } = await supabase
          .from('quotes')
          .select(`
            *,
            clients (
              id,
              name,
              email,
              phone
            )
          `)
          .eq('id', quote.id)
          .single();

        if (!fetchError && updatedQuote) {
          return NextResponse.json({ quote: updatedQuote }, { status: 201 });
        }
      }
    } catch (error) {
      console.error('Error updating quote currency:', error);
    }

    return NextResponse.json({ quote }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error in POST /api/quotes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}