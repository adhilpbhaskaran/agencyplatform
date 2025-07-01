import React from 'react';

import { Quote } from '@/hooks/use-quotes';

interface QuotePDFTemplateProps {
  quote: Quote;
  agent: {
    name: string;
    email: string;
    phone: string | null;
    company_name: string | null;
    logo_url: string | null;
  };
  client: {
    name: string;
    email: string;
    phone: string | undefined;
  };
  settings: {
    show_agent_markup: boolean;
    show_bali_malayali_branding: boolean;
    cancellation_policy_snapshot?: string;
  };
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const QuotePDFTemplate: React.FC<QuotePDFTemplateProps> = ({
  quote,
  agent,
  client,
  settings
}) => {
  // Using new schema structure with quote_options for pricing

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900 font-sans" style={{ fontSize: '14px', lineHeight: '1.5' }}>
      {/* Header */}
      <div className="border-b-2 border-blue-600 pb-6 mb-8">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            {agent.logo_url ? (
              <img src={agent.logo_url} alt="Company Logo" className="h-16 mb-4" />
            ) : (
              <div className="h-16 w-32 bg-blue-600 flex items-center justify-center text-white font-bold text-lg mb-4">
                {agent.company_name || agent.name}
              </div>
            )}
            <h1 className="text-3xl font-bold text-blue-600 mb-2">Travel Itinerary & Quote</h1>
            <p className="text-gray-600">Quote Reference: #{quote.id.slice(0, 8).toUpperCase()}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">
              <p className="font-semibold">{agent.company_name || agent.name}</p>
              <p>{agent.email}</p>
              {agent.phone && <p>{agent.phone}</p>}
              <p className="mt-2 text-xs">Generated on {formatDate(new Date().toISOString())}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Client Information */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">Client Information</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="font-semibold text-gray-700">Client Name:</p>
            <p className="text-gray-900">{client.name}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Email:</p>
            <p className="text-gray-900">{client.email}</p>
          </div>
          {client.phone && (
            <div>
              <p className="font-semibold text-gray-700">Phone:</p>
              <p className="text-gray-900">{client.phone}</p>
            </div>
          )}
          <div>
            <p className="font-semibold text-gray-700">Number of Travelers:</p>
            <p className="text-gray-900">{quote.pax} people</p>
          </div>
        </div>
      </div>

      {/* Trip Overview */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">Trip Overview</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="font-semibold text-gray-700">Destination:</p>
            <p className="text-gray-900 text-lg">Bali, Indonesia</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Travel Dates:</p>
            <p className="text-gray-900">{quote.travel_start && quote.travel_end ? `${formatDate(quote.travel_start)} - ${formatDate(quote.travel_end)}` : 'Dates TBD'}</p>
          </div>
        </div>
      </div>

      {/* Day-by-Day Itinerary */}
      {quote.quote_days && quote.quote_days.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">Day-by-Day Itinerary</h2>
          <div className="space-y-6">
            {quote.quote_days.map((day, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-bold text-blue-600 mb-3">Day {day.day_number}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {day.day_date && (
                    <div>
                      <p className="font-semibold text-gray-700">Date:</p>
                      <p className="text-gray-900">{new Date(day.day_date).toLocaleDateString()}</p>
                    </div>
                  )}
                  {day.region && (
                    <div>
                      <p className="font-semibold text-gray-700">Region:</p>
                      <p className="text-gray-900">{day.region}</p>
                    </div>
                  )}
                  {day.activities && (
                    <div className="md:col-span-2">
                      <p className="font-semibold text-gray-700">Activities:</p>
                      <p className="text-gray-900">{typeof day.activities === 'string' ? day.activities : JSON.stringify(day.activities)}</p>
                    </div>
                  )}
                  {day.notes && (
                    <div className="md:col-span-2">
                      <p className="font-semibold text-gray-700">Notes:</p>
                      <p className="text-gray-900">{day.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quote Options */}
      {quote.quote_options && quote.quote_options.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">Pricing Options</h2>
          <div className="space-y-4">
            {quote.quote_options.map((option, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">Option {option.option_number}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="font-semibold text-gray-700">Room Cost:</p>
                    <p className="text-gray-900">{formatCurrency(option.room_cost_idr || 0)}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Land Cost:</p>
                    <p className="text-gray-900">{formatCurrency(option.land_cost_idr || 0)}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Total Cost:</p>
                    <p className="text-gray-900 text-lg font-bold">{formatCurrency(option.total_cost_idr || 0)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}



      {/* Cost Breakdown */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">Cost Breakdown</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Base Cost:</span>
              <span className="font-semibold">{formatCurrency(quote.base_cost_idr || 0)}</span>
            </div>
            
            {quote.quote_options && quote.quote_options.length > 0 && (
              <div className="border-t border-gray-300 pt-3">
                <p className="text-sm text-gray-600 mb-2">Available Options:</p>
                {quote.quote_options.map((option, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">• Option {option.option_number}</span>
                    <span>{formatCurrency(option.total_cost_idr || 0)}</span>
                  </div>
                ))}
              </div>
            )}
            
            <div className="border-t-2 border-gray-400 pt-3">
              <div className="flex justify-between items-center text-lg">
                <span className="font-bold text-gray-800">Total Cost:</span>
                <span className="font-bold text-blue-600 text-xl">IDR {quote.final_total_idr?.toLocaleString() || '0'}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">For {quote.pax} travelers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      {settings.cancellation_policy_snapshot && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">Terms & Conditions</h2>
          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {settings.cancellation_policy_snapshot}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t-2 border-gray-300 pt-6 mt-8">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <p>Thank you for choosing {agent.company_name || agent.name}</p>
            <p>For questions, contact: {agent.email}</p>
          </div>
          {settings.show_bali_malayali_branding && (
            <div className="text-right text-xs text-gray-500">
              <p>Powered by</p>
              <p className="font-semibold text-blue-600">Bali Malayali</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuotePDFTemplate;