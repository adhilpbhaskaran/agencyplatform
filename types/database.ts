export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      agents: {
        Row: {
          id: string
          clerk_id: string
          email: string
          full_name: string
          phone: string | null
          company_name: string | null
          logo_url: string | null
          commission_rate: number
          is_approved: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          clerk_id: string
          email: string
          full_name: string
          phone?: string | null
          company_name?: string | null
          logo_url?: string | null
          commission_rate?: number
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          clerk_id?: string
          email?: string
          full_name?: string
          phone?: string | null
          company_name?: string | null
          logo_url?: string | null
          commission_rate?: number
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          agent_id: string
          full_name: string
          email: string
          phone: string | null
          nationality: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          agent_id: string
          full_name: string
          email: string
          phone?: string | null
          nationality?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          agent_id?: string
          full_name?: string
          email?: string
          phone?: string | null
          nationality?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      hotels: {
        Row: {
          id: string
          name: string
          location: string
          description: string | null
          star_rating: number | null
          amenities: Json | null
          contact_info: Json | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          location: string
          description?: string | null
          star_rating?: number | null
          amenities?: Json | null
          contact_info?: Json | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          location?: string
          description?: string | null
          star_rating?: number | null
          amenities?: Json | null
          contact_info?: Json | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      hotel_rooms: {
        Row: {
          id: string
          hotel_id: string
          room_type: Database['public']['Enums']['room_type']
          base_price_idr: number
          max_occupancy: number
          amenities: Json | null
          is_available: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          hotel_id: string
          room_type: Database['public']['Enums']['room_type']
          base_price_idr: number
          max_occupancy: number
          amenities?: Json | null
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          hotel_id?: string
          room_type?: Database['public']['Enums']['room_type']
          base_price_idr?: number
          max_occupancy?: number
          amenities?: Json | null
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      transport_providers: {
        Row: {
          id: string
          name: string
          contact_info: Json | null
          service_areas: string[] | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          contact_info?: Json | null
          service_areas?: string[] | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          contact_info?: Json | null
          service_areas?: string[] | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      transport_services: {
        Row: {
          id: string
          provider_id: string
          transport_type: Database['public']['Enums']['transport_type']
          vehicle_type: Database['public']['Enums']['vehicle_type']
          base_price_idr: number
          max_passengers: number
          description: string | null
          is_available: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          provider_id: string
          transport_type: Database['public']['Enums']['transport_type']
          vehicle_type: Database['public']['Enums']['vehicle_type']
          base_price_idr: number
          max_passengers: number
          description?: string | null
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          provider_id?: string
          transport_type?: Database['public']['Enums']['transport_type']
          vehicle_type?: Database['public']['Enums']['vehicle_type']
          base_price_idr?: number
          max_passengers?: number
          description?: string | null
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      quotes: {
        Row: {
          id: string
          quote_number: string
          agent_id: string
          clerk_id: string
          client_id: string
          status: Database['public']['Enums']['quote_status']
          check_in_date: string
          check_out_date: string
          adults: number
          children: number
          total_cost_idr: number
          agent_margin_percentage: number
          final_price_idr: number
          currency_display: string
          exchange_rate: number
          price_locked_at: string | null
          expires_at: string | null
          expired: boolean
          pdf_url: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          quote_number?: string
          agent_id: string
          clerk_id: string
          client_id: string
          status?: Database['public']['Enums']['quote_status']
          check_in_date: string
          check_out_date: string
          adults: number
          children: number
          total_cost_idr?: number
          agent_margin_percentage?: number
          final_price_idr?: number
          currency_display?: string
          exchange_rate?: number
          price_locked_at?: string | null
          expires_at?: string | null
          expired?: boolean
          pdf_url?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          quote_number?: string
          agent_id?: string
          clerk_id?: string
          client_id?: string
          status?: Database['public']['Enums']['quote_status']
          check_in_date?: string
          check_out_date?: string
          adults?: number
          children?: number
          total_cost_idr?: number
          agent_margin_percentage?: number
          final_price_idr?: number
          currency_display?: string
          exchange_rate?: number
          price_locked_at?: string | null
          expires_at?: string | null
          expired?: boolean
          pdf_url?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      quote_hotels: {
        Row: {
          id: string
          quote_id: string
          hotel_id: string
          room_id: string
          nights: number
          rooms: number
          rate_per_night_idr: number
          total_cost_idr: number
          created_at: string
        }
        Insert: {
          id?: string
          quote_id: string
          hotel_id: string
          room_id: string
          nights: number
          rooms: number
          rate_per_night_idr: number
          total_cost_idr: number
          created_at?: string
        }
        Update: {
          id?: string
          quote_id?: string
          hotel_id?: string
          room_id?: string
          nights?: number
          rooms?: number
          rate_per_night_idr?: number
          total_cost_idr?: number
          created_at?: string
        }
      }
      quote_transport: {
        Row: {
          id: string
          quote_id: string
          transport_id: string
          quantity: number
          unit_price_idr: number
          total_cost_idr: number
          created_at: string
        }
        Insert: {
          id?: string
          quote_id: string
          transport_id: string
          quantity: number
          unit_price_idr: number
          total_cost_idr: number
          created_at?: string
        }
        Update: {
          id?: string
          quote_id?: string
          transport_id?: string
          quantity?: number
          unit_price_idr?: number
          total_cost_idr?: number
          created_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          quote_id: string
          amount_idr: number
          payment_method: Database['public']['Enums']['payment_method']
          status: Database['public']['Enums']['payment_status']
          transaction_id: string | null
          is_manual: boolean
          proof_url: string | null
          verified_by: string | null
          verified_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          quote_id: string
          amount_idr: number
          payment_method: Database['public']['Enums']['payment_method']
          status?: Database['public']['Enums']['payment_status']
          transaction_id?: string | null
          is_manual?: boolean
          proof_url?: string | null
          verified_by?: string | null
          verified_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          quote_id?: string
          amount_idr?: number
          payment_method?: Database['public']['Enums']['payment_method']
          status?: Database['public']['Enums']['payment_status']
          transaction_id?: string | null
          is_manual?: boolean
          proof_url?: string | null
          verified_by?: string | null
          verified_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      exchange_rates: {
        Row: {
          id: string
          from_currency: string
          to_currency: string
          rate: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          from_currency: string
          to_currency: string
          rate: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          from_currency?: string
          to_currency?: string
          rate?: number
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          agent_id: string
          type: Database['public']['Enums']['notification_type']
          title: string
          message: string
          read: boolean
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          agent_id: string
          type: Database['public']['Enums']['notification_type']
          title: string
          message: string
          read?: boolean
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          agent_id?: string
          type?: Database['public']['Enums']['notification_type']
          title?: string
          message?: string
          read?: boolean
          metadata?: Json | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_quote_cost: {
        Args: {
          quote_id: string
        }
        Returns: number
      }
      convert_currency: {
        Args: {
          amount: number
          from_currency: string
          to_currency: string
        }
        Returns: number
      }
    }
    Enums: {
      quote_status: 'draft' | 'sent' | 'confirmed' | 'cancelled' | 'expired' | 'on_hold_external_issue'
      payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
      payment_method: 'bank_transfer' | 'credit_card' | 'digital_wallet' | 'cash'
      room_type: 'standard' | 'deluxe' | 'suite' | 'villa' | 'family'
      transport_type: 'airport_transfer' | 'day_tour' | 'intercity' | 'local_transport'
      vehicle_type: 'sedan' | 'suv' | 'van' | 'bus' | 'luxury_car'
      notification_type: 'quote_update' | 'payment_received' | 'booking_confirmed' | 'system_alert' | 'external_disruption'
      funnel_event_type: 'quote_created' | 'quote_sent' | 'quote_viewed' | 'quote_downloaded' | 'quote_confirmed' | 'quote_cancelled'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}