import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import puppeteer from 'puppeteer';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import QuotePDFTemplate from '@/components/pdf/quote-template';
import { Database } from '@/types/database';
import { Quote } from '@/hooks/use-quotes';

interface DayPlan {
  day_number: number;
  location: string;
  activities: string;
  accommodation: string;
  meals: string;
  transportation: string;
}

interface QuoteOption {
  option_type: 'hotel' | 'activity' | 'transport';
  name: string;
  description: string;
  cost_per_person_idr: number;
  is_selected: boolean;
}



export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const quoteId = params.id;
    const supabase = await createSupabaseServerClient();

    // Fetch quote data with related information
    const { data: quote, error: quoteError } = await supabase
      .from('quotes')
      .select(`
        *,
        day_wise_plan (*),
        quote_options (*),
        clients (
          full_name,
          email,
          phone
        )
      `)
      .eq('id', quoteId)
      .eq('agent_id', userId)
      .single();

    if (quoteError || !quote) {
      return NextResponse.json(
        { error: 'Quote not found or access denied' },
        { status: 404 }
      );
    }

    // Fetch agent information
    const { data: agent, error: agentError } = await supabase
      .from('agents')
      .select('*')
      .eq('clerk_id', userId)
      .single();

    if (agentError || !agent) {
      return NextResponse.json(
        { error: 'Agent information not found' },
        { status: 404 }
      );
    }

    // Prepare template data
    const templateData = {
      quote: quote as Quote,
      agent: {
        name: agent.full_name,
        email: agent.email,
        phone: agent.phone,
        company_name: agent.company_name,
        logo_url: agent.logo_url
      },
      client: {
        name: quote.clients?.full_name || '',
        email: quote.clients?.email || '',
        phone: quote.clients?.phone || undefined
      },
      settings: {
        show_agent_markup: false,
        show_bali_malayali_branding: true,
        cancellation_policy_snapshot: 'Standard cancellation policy applies'
      }
    };

    // Generate HTML from React component
    const htmlContent = renderToStaticMarkup(
      React.createElement(QuotePDFTemplate, templateData)
    );

    // Create full HTML document with Tailwind CSS
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Quote ${quote.id}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @media print {
            body { margin: 0; }
            .page-break { page-break-before: always; }
          }
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `;

    // Launch Puppeteer and generate PDF
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });
    
    // Generate PDF buffer
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      }
    });

    await browser.close();

    // Generate unique filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `quote-${quote.id.slice(0, 8)}-${timestamp}.pdf`;
    const filePath = `quotes-pdf/${filename}`;

    // Upload PDF to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('quotes-pdf')
      .upload(filePath, pdfBuffer, {
        contentType: 'application/pdf',
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json(
        { error: 'Failed to upload PDF' },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('quotes-pdf')
      .getPublicUrl(filePath);

    const pdfUrl = urlData.publicUrl;

    // Update quote with PDF URL
    const { error: updateError } = await supabase
      .from('quotes')
      .update({ pdf_url: pdfUrl })
      .eq('id', quoteId)
      .eq('agent_id', userId);

    if (updateError) {
      console.error('Update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update quote with PDF URL' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      pdf_url: pdfUrl,
      filename: filename
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}