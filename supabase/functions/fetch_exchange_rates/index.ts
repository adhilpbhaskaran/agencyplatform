import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface ExchangeRateResponse {
  success: boolean;
  rates: {
    [key: string]: number;
  };
  base: string;
  date: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Fetch exchange rates from exchangerate.host
    // Base currency is IDR, we need rates for USD, INR, AED
    const targetCurrencies = ['USD', 'INR', 'AED']
    const baseCurrency = 'IDR'
    
    console.log('Fetching exchange rates...')
    
    // Fetch rates with IDR as base
    const response = await fetch(
      `https://api.exchangerate.host/latest?base=${baseCurrency}&symbols=${targetCurrencies.join(',')}`
    )
    
    if (!response.ok) {
      throw new Error(`Exchange rate API error: ${response.status} ${response.statusText}`)
    }
    
    const data: ExchangeRateResponse = await response.json()
    
    if (!data.success) {
      throw new Error('Exchange rate API returned unsuccessful response')
    }
    
    console.log('Exchange rates fetched:', data.rates)
    
    // Prepare exchange rate records for upsert
    const exchangeRateRecords = []
    const currentTimestamp = new Date().toISOString()
    
    // Add the base currency (IDR) with rate 1.0
    exchangeRateRecords.push({
      currency_code: baseCurrency,
      rate_to_idr: 1.0,
      last_updated: currentTimestamp,
      source: 'exchangerate.host'
    })
    
    // Add target currencies
    for (const currency of targetCurrencies) {
      if (data.rates[currency]) {
        // Since we're using IDR as base, the rate from API is IDR to target currency
        // We need to store rate_to_idr, so we need to invert it
        const rateToIdr = 1 / data.rates[currency]
        
        exchangeRateRecords.push({
          currency_code: currency,
          rate_to_idr: rateToIdr,
          last_updated: currentTimestamp,
          source: 'exchangerate.host'
        })
      }
    }
    
    console.log('Prepared exchange rate records:', exchangeRateRecords)
    
    // Upsert exchange rates into the database
    const { data: upsertData, error: upsertError } = await supabase
      .from('exchange_rates')
      .upsert(
        exchangeRateRecords,
        {
          onConflict: 'currency_code',
          ignoreDuplicates: false
        }
      )
    
    if (upsertError) {
      console.error('Database upsert error:', upsertError)
      throw new Error(`Database error: ${upsertError.message}`)
    }
    
    console.log('Exchange rates updated successfully')
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Exchange rates updated successfully',
        updated_currencies: exchangeRateRecords.map(r => r.currency_code),
        timestamp: currentTimestamp
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
    
  } catch (error) {
    console.error('Error in fetch_exchange_rates function:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})