import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Database } from '@/types/database';

export type Quote = Database['public']['Tables']['quotes']['Row'] & {
  clients: Database['public']['Tables']['clients']['Row'];
  quote_hotels?: (Database['public']['Tables']['quote_hotels']['Row'] & {
    hotels: Database['public']['Tables']['hotels']['Row'];
    hotel_rooms: Database['public']['Tables']['hotel_rooms']['Row'];
  })[];
  quote_transport?: (Database['public']['Tables']['quote_transport']['Row'] & {
    transport_services: Database['public']['Tables']['transport_services']['Row'] & {
      transport_providers: Database['public']['Tables']['transport_providers']['Row'];
    };
  })[];
  day_wise_plan?: DayPlan[];
  quote_options?: QuoteOption[];
};

export interface QuotesResponse {
  quotes: Quote[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

interface DayPlan {
  id?: string;
  day_number: number;
  location: string;
  activities: string;
  accommodation: string;
  meals: string;
  transportation: string;
}

interface QuoteOption {
  id?: string;
  option_type: 'hotel' | 'activity' | 'transport';
  name: string;
  description: string;
  cost_per_person_idr: number;
  is_selected: boolean;
}

interface CreateQuoteData {
  client_name: string;
  client_email: string;
  client_phone?: string;
  client_nationality?: string;
  check_in_date: string;
  check_out_date: string;
  adults: number;
  children?: number;
  currency_display?: string;
  agent_margin_percentage?: number;
  hotels?: {
    hotel_id: string;
    room_id: string;
    nights: number;
    rooms: number;
    rate_per_night_idr: number;
    total_cost_idr: number;
  }[];
  transport?: {
    transport_id: string;
    quantity: number;
    unit_price_idr: number;
    total_cost_idr: number;
  }[];
  notes?: string;
}

interface UpdateQuoteData {
  day_wise_plan?: DayPlan[];
  quote_options?: QuoteOption[];
}

const fetchQuotes = async (params?: {
  status?: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}): Promise<QuotesResponse> => {
  const searchParams = new URLSearchParams();
  
  if (params?.status) searchParams.append('status', params.status);
  if (params?.limit) searchParams.append('limit', params.limit.toString());
  if (params?.offset) searchParams.append('offset', params.offset.toString());
  if (params?.sortBy) searchParams.append('sortBy', params.sortBy);
  if (params?.sortOrder) searchParams.append('sortOrder', params.sortOrder);
  
  const response = await fetch(`/api/quotes?${searchParams.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch quotes');
  }
  return response.json();
};

const fetchQuote = async (id: string): Promise<Quote> => {
  const response = await fetch(`/api/quotes/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch quote');
  }
  return response.json();
};

const createQuote = async (data: CreateQuoteData): Promise<{ quote: Quote }> => {
  const response = await fetch('/api/quotes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create quote');
  }
  
  return response.json();
};

const updateQuote = async ({ id, data }: { id: string; data: UpdateQuoteData }): Promise<Quote> => {
  const response = await fetch(`/api/quotes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update quote');
  }
  
  return response.json();
};

const generatePDF = async (id: string): Promise<{ pdf_url: string; filename: string }> => {
  const response = await fetch(`/api/quotes/${id}/generate-pdf`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to generate PDF');
  }
  
  return response.json();
};

export const useQuotes = (params?: {
  status?: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}) => {
  return useQuery({
    queryKey: ['quotes', params],
    queryFn: () => fetchQuotes(params),
  });
};

export const useQuote = (id: string) => {
  return useQuery({
    queryKey: ['quote', id],
    queryFn: () => fetchQuote(id),
    enabled: !!id,
  });
};

export const useCreateQuote = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createQuote,
    onSuccess: () => {
      // Invalidate and refetch quotes
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
    },
    onError: (error) => {
      console.error('Error creating quote:', error);
    },
  });
};

export const useUpdateQuote = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateQuote,
    onSuccess: (updatedQuote) => {
      // Update the specific quote in cache
      queryClient.setQueryData(['quote', updatedQuote.id], updatedQuote);
      // Invalidate the quotes list to refresh stats
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
    },
    onError: (error) => {
      console.error('Error updating quote:', error);
    },
  });
};

export const useGeneratePDF = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: generatePDF,
    onSuccess: (data, quoteId) => {
      // Update the quote in cache with the new PDF URL
      queryClient.setQueryData(['quote', quoteId], (oldData: Quote | undefined) => {
        if (oldData) {
          return { ...oldData, pdf_url: data.pdf_url };
        }
        return oldData;
      });
      // Invalidate the quotes list to refresh with PDF URL
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
    },
    onError: (error) => {
      console.error('Error generating PDF:', error);
    },
  });
};