import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Database } from '@/types/database';

type Quote = Database['public']['Tables']['quotes']['Row'];
type QuoteWithRelations = Quote & {
  clients: Database['public']['Tables']['clients']['Row']
  quote_hotels: (Database['public']['Tables']['quote_hotels']['Row'] & {
    hotels: Database['public']['Tables']['hotels']['Row']
    hotel_rooms: Database['public']['Tables']['hotel_rooms']['Row']
  })[]
  quote_transport: (Database['public']['Tables']['quote_transport']['Row'] & {
    transport_services: Database['public']['Tables']['transport_services']['Row'] & {
      transport_providers: Database['public']['Tables']['transport_providers']['Row']
    }
  })[]
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
          full_name,
          email,
          phone,
          nationality
        ),
        quote_hotels (
          id,
          hotel_id,
          room_id,
          nights,
          rooms,
          rate_per_night_idr,
          total_cost_idr,
          hotels (
            id,
            name,
            location,
            star_rating
          ),
          hotel_rooms (
            id,
            room_type,
            max_occupancy
          )
        ),
        quote_transport (
          id,
          transport_id,
          quantity,
          unit_price_idr,
          total_cost_idr,
          transport_services (
            id,
            transport_type,
            vehicle_type,
            description,
            transport_providers (
              id,
              name
            )
          )
        )
      `)
      .eq('clerk_id', userId);

    // Apply status filter if provided
    if (status && status !== 'all') {
      query = query.eq('status', status);
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
      check_in_date,
      check_out_date,
      adults,
      children,
      currency_display,
      agent_margin_percentage,
      hotels,
      transport,
      notes
    } = body;

    // Validate required fields
    if (!client_name || !client_email || !check_in_date || !check_out_date || !adults) {
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
          full_name: client_name,
          phone: client_phone || null,
          nationality: client_nationality || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', clientId);
    } else {
      // Create new client
      const { data: newClient, error: clientError } = await supabase
        .from('clients')
        .insert({
          full_name: client_name,
          email: client_email,
          phone: client_phone || null,
          nationality: client_nationality || null,
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
        quote_number: quoteNumber,
        agent_id: agent.id,
        clerk_id: userId,
        client_id: clientId,
        check_in_date,
        check_out_date,
        adults: parseInt(adults.toString()),
        children: parseInt((children || 0).toString()),
        currency_display: currency_display || 'USD',
        agent_margin_percentage: agent_margin_percentage || 15,
        status: 'draft',
        notes,
        total_cost_idr: 0,
        final_price_idr: 0,
        exchange_rate: 1
      })
      .select(`
        *,
        clients (
          id,
          full_name,
          email,
          phone,
          nationality
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

    // Add hotels if provided
    if (hotels && hotels.length > 0) {
      const hotelInserts = hotels.map((hotel: any) => ({
        quote_id: quote.id,
        hotel_id: hotel.hotel_id,
        room_id: hotel.room_id,
        nights: hotel.nights,
        rooms: hotel.rooms,
        rate_per_night_idr: hotel.rate_per_night_idr,
        total_cost_idr: hotel.total_cost_idr
      }));

      const { error: hotelError } = await supabase
        .from('quote_hotels')
        .insert(hotelInserts);

      if (hotelError) {
        console.error('Error adding hotels to quote:', hotelError);
        // Rollback quote creation
        await supabase.from('quotes').delete().eq('id', quote.id);
        return NextResponse.json(
          { error: 'Failed to add hotels to quote' },
          { status: 500 }
        );
      }
    }

    // Add transport if provided
    if (transport && transport.length > 0) {
      const transportInserts = transport.map((t: any) => ({
        quote_id: quote.id,
        transport_id: t.transport_id,
        quantity: t.quantity,
        unit_price_idr: t.unit_price_idr,
        total_cost_idr: t.total_cost_idr
      }));

      const { error: transportError } = await supabase
        .from('quote_transport')
        .insert(transportInserts);

      if (transportError) {
        console.error('Error adding transport to quote:', transportError);
        // Rollback quote creation
        await supabase.from('quotes').delete().eq('id', quote.id);
        return NextResponse.json(
          { error: 'Failed to add transport to quote' },
          { status: 500 }
        );
      }
    }

    // Calculate total cost using the database function if available
    try {
      const { data: totalCost, error: costError } = await supabase
        .rpc('calculate_quote_cost', { quote_id: quote.id });

      if (!costError && totalCost) {
        // Update quote with calculated costs
        const { data: updatedQuote, error: updateError } = await supabase
          .from('quotes')
          .update({
            total_cost_idr: totalCost,
            final_price_idr: Math.round(totalCost * (1 + (agent_margin_percentage || 15) / 100))
          })
          .eq('id', quote.id)
          .select(`
            *,
            clients (
              id,
              full_name,
              email,
              phone,
              nationality
            )
          `)
          .single();

        if (!updateError && updatedQuote) {
          return NextResponse.json({ quote: updatedQuote }, { status: 201 });
        }
      }
    } catch (error) {
      console.error('Error calculating quote cost:', error);
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