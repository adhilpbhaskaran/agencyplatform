import React from 'react';

import { Quote } from '@/hooks/use-quotes';

interface QuotePDFTemplateProps {
  quote: Quote;
  agent: {
    name: string;
    email: string;
    phone?: string;
    company_name?: string;
    logo_url?: string;
  };
  client: {
    name: string;
    email: string;
    phone?: string;
  };
  settings: {
    show_agent_markup: boolean;
    show_bali_malayali_branding: boolean;
    cancellation_policy_snapshot?: string;
  };
}

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
  const selectedOptions = quote.quote_options?.filter(option => option.is_selected) || [];
  const hotelOptions = selectedOptions.filter(option => option.option_type === 'hotel');
  const activityOptions = selectedOptions.filter(option => option.option_type === 'activity');
  const transportOptions = selectedOptions.filter(option => option.option_type === 'transport');

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
            <p className="text-gray-900">{quote.adults + quote.children} people ({quote.adults} adults, {quote.children} children)</p>
          </div>
        </div>
      </div>

      {/* Trip Overview */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">Trip Overview</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="font-semibold text-gray-700">Destination:</p>
            <p className="text-gray-900 text-lg">Travel Dates</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Travel Dates:</p>
            <p className="text-gray-900">{formatDate(quote.check_in_date)} - {formatDate(quote.check_out_date)}</p>
          </div>
        </div>
      </div>

      {/* Day-by-Day Itinerary */}
      {quote.day_wise_plan && quote.day_wise_plan.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">Day-by-Day Itinerary</h2>
          <div className="space-y-6">
            {quote.day_wise_plan.map((day, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-bold text-blue-600 mb-3">Day {day.day_number}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {day.location && (
                    <div>
                      <p className="font-semibold text-gray-700">Location:</p>
                      <p className="text-gray-900">{day.location}</p>
                    </div>
                  )}
                  {day.accommodation && (
                    <div>
                      <p className="font-semibold text-gray-700">Accommodation:</p>
                      <p className="text-gray-900">{day.accommodation}</p>
                    </div>
                  )}
                  {day.activities && (
                    <div className="md:col-span-2">
                      <p className="font-semibold text-gray-700">Activities:</p>
                      <p className="text-gray-900">{day.activities}</p>
                    </div>
                  )}
                  {day.meals && (
                    <div>
                      <p className="font-semibold text-gray-700">Meals:</p>
                      <p className="text-gray-900">{day.meals}</p>
                    </div>
                  )}
                  {day.transportation && (
                    <div>
                      <p className="font-semibold text-gray-700">Transportation:</p>
                      <p className="text-gray-900">{day.transportation}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hotel Options */}
      {hotelOptions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">Selected Hotels</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Hotel Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Cost per Person</th>
                </tr>
              </thead>
              <tbody>
                {hotelOptions.map((hotel, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">{hotel.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{hotel.description}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(hotel.cost_per_person_idr)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Activities & Transport */}
      {(activityOptions.length > 0 || transportOptions.length > 0) && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">Additional Services</h2>
          
          {activityOptions.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Activities</h3>
              <div className="space-y-2">
                {activityOptions.map((activity, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <div>
                      <p className="font-semibold">{activity.name}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                    </div>
                    <p className="font-semibold">{formatCurrency(activity.cost_per_person_idr)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {transportOptions.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Transportation</h3>
              <div className="space-y-2">
                {transportOptions.map((transport, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <div>
                      <p className="font-semibold">{transport.name}</p>
                      <p className="text-sm text-gray-600">{transport.description}</p>
                    </div>
                    <p className="font-semibold">{formatCurrency(transport.cost_per_person_idr)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Cost Breakdown */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">Cost Breakdown</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Base Cost:</span>
              <span className="font-semibold">{formatCurrency(quote.total_cost_idr)}</span>
            </div>
            
            {selectedOptions.length > 0 && (
              <div className="border-t border-gray-300 pt-3">
                <p className="text-sm text-gray-600 mb-2">Selected Options:</p>
                {selectedOptions.map((option, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">• {option.name}</span>
                    <span>{formatCurrency(option.cost_per_person_idr * (quote.adults + quote.children))}</span>
                  </div>
                ))}
              </div>
            )}
            
            <div className="border-t-2 border-gray-400 pt-3">
              <div className="flex justify-between items-center text-lg">
                <span className="font-bold text-gray-800">Total Cost:</span>
                <span className="font-bold text-blue-600 text-xl">IDR {quote.final_price_idr?.toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">For {quote.adults + quote.children} travelers</p>
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