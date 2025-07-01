export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activities: {
        Row: {
          cancellation_policy_id: string | null
          created_at: string
          description: string | null
          id: string
          location: string
          name: string
          price_idr: number
          updated_at: string
        }
        Insert: {
          cancellation_policy_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location: string
          name: string
          price_idr: number
          updated_at?: string
        }
        Update: {
          cancellation_policy_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string
          name?: string
          price_idr?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "activities_cancellation_policy_id_fkey"
            columns: ["cancellation_policy_id"]
            isOneToOne: false
            referencedRelation: "cancellation_policies"
            referencedColumns: ["id"]
          },
        ]
      }
      admins: {
        Row: {
          clerk_id: string
          email: string
          id: string
          name: string
          role: string
        }
        Insert: {
          clerk_id: string
          email: string
          id?: string
          name: string
          role?: string
        }
        Update: {
          clerk_id?: string
          email?: string
          id?: string
          name?: string
          role?: string
        }
        Relationships: []
      }
      agent_notifications: {
        Row: {
          agent_id: string
          id: number
          is_read: boolean
          notification_id: string
          read_at: string | null
        }
        Insert: {
          agent_id: string
          id?: number
          is_read?: boolean
          notification_id: string
          read_at?: string | null
        }
        Update: {
          agent_id?: string
          id?: number
          is_read?: boolean
          notification_id?: string
          read_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_notifications_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_notifications_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "notifications"
            referencedColumns: ["id"]
          },
        ]
      }
      agents: {
        Row: {
          clerk_id: string
          company_name: string | null
          created_at: string
          email: string
          id: string
          is_approved: boolean | null
          logo_url: string | null
          name: string
          phone: string | null
          referred_by_agent_id: string | null
          role_in_company: string | null
          social_handle: string | null
          tier: Database["public"]["Enums"]["agent_tier"]
          type: Database["public"]["Enums"]["user_type"] | null
        }
        Insert: {
          clerk_id: string
          company_name?: string | null
          created_at?: string
          email: string
          id?: string
          is_approved?: boolean | null
          logo_url?: string | null
          name: string
          phone?: string | null
          referred_by_agent_id?: string | null
          role_in_company?: string | null
          social_handle?: string | null
          tier?: Database["public"]["Enums"]["agent_tier"]
          type?: Database["public"]["Enums"]["user_type"] | null
        }
        Update: {
          clerk_id?: string
          company_name?: string | null
          created_at?: string
          email?: string
          id?: string
          is_approved?: boolean | null
          logo_url?: string | null
          name?: string
          phone?: string | null
          referred_by_agent_id?: string | null
          role_in_company?: string | null
          social_handle?: string | null
          tier?: Database["public"]["Enums"]["agent_tier"]
          type?: Database["public"]["Enums"]["user_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "agents_referred_by_agent_id_fkey"
            columns: ["referred_by_agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      asset_gallery: {
        Row: {
          alt_text: string | null
          asset_url: string
          created_at: string
          display_order: number | null
          entity_type: string
          id: string
          related_entity_id: string
        }
        Insert: {
          alt_text?: string | null
          asset_url: string
          created_at?: string
          display_order?: number | null
          entity_type: string
          id?: string
          related_entity_id: string
        }
        Update: {
          alt_text?: string | null
          asset_url?: string
          created_at?: string
          display_order?: number | null
          entity_type?: string
          id?: string
          related_entity_id?: string
        }
        Relationships: []
      }
      cancellation_policies: {
        Row: {
          description: string | null
          id: string
          is_default: boolean
          name: string
        }
        Insert: {
          description?: string | null
          id?: string
          is_default?: boolean
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          is_default?: boolean
          name?: string
        }
        Relationships: []
      }
      cancellation_policy_rules: {
        Row: {
          days_before_arrival: number
          id: number
          notes: string | null
          policy_id: string
          refund_percentage: number
        }
        Insert: {
          days_before_arrival: number
          id?: number
          notes?: string | null
          policy_id: string
          refund_percentage: number
        }
        Update: {
          days_before_arrival?: number
          id?: number
          notes?: string | null
          policy_id?: string
          refund_percentage?: number
        }
        Relationships: [
          {
            foreignKeyName: "cancellation_policy_rules_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "cancellation_policies"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          agent_id: string
          created_at: string
          email: string | null
          id: string
          name: string | null
          phone: string | null
        }
        Insert: {
          agent_id: string
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
        }
        Update: {
          agent_id?: string
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      commissions: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          originating_agent_id: string
          quote_id: string
          referrer_id: string
          status: string | null
          type: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          id?: string
          originating_agent_id: string
          quote_id: string
          referrer_id: string
          status?: string | null
          type: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          originating_agent_id?: string
          quote_id?: string
          referrer_id?: string
          status?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "commissions_originating_agent_id_fkey"
            columns: ["originating_agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      disputes: {
        Row: {
          agent_id: string
          created_at: string
          id: string
          quote_id: string
          reason: string
          refund_amount_idr: number | null
          resolution_details: string | null
          resolved_at: string | null
          status: Database["public"]["Enums"]["dispute_status"]
          support_ticket_id: string | null
        }
        Insert: {
          agent_id: string
          created_at?: string
          id?: string
          quote_id: string
          reason: string
          refund_amount_idr?: number | null
          resolution_details?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["dispute_status"]
          support_ticket_id?: string | null
        }
        Update: {
          agent_id?: string
          created_at?: string
          id?: string
          quote_id?: string
          reason?: string
          refund_amount_idr?: number | null
          resolution_details?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["dispute_status"]
          support_ticket_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "disputes_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "disputes_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "disputes_support_ticket_id_fkey"
            columns: ["support_ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      entry_fees: {
        Row: {
          id: string
          location: string
          price_idr: number
        }
        Insert: {
          id?: string
          location: string
          price_idr: number
        }
        Update: {
          id?: string
          location?: string
          price_idr?: number
        }
        Relationships: []
      }
      exchange_rates: {
        Row: {
          currency_code: string
          id: string
          last_updated: string
          rate_to_idr: number
          source: string | null
        }
        Insert: {
          currency_code: string
          id?: string
          last_updated?: string
          rate_to_idr: number
          source?: string | null
        }
        Update: {
          currency_code?: string
          id?: string
          last_updated?: string
          rate_to_idr?: number
          source?: string | null
        }
        Relationships: []
      }
      hotel_rooms: {
        Row: {
          allow_child: boolean
          allow_triple: boolean
          base_price_idr: number
          child_price_idr: number | null
          created_at: string
          extra_adult_price_idr: number | null
          hotel_id: string
          id: string
          max_capacity: number
          name: string
        }
        Insert: {
          allow_child?: boolean
          allow_triple?: boolean
          base_price_idr: number
          child_price_idr?: number | null
          created_at?: string
          extra_adult_price_idr?: number | null
          hotel_id: string
          id?: string
          max_capacity?: number
          name: string
        }
        Update: {
          allow_child?: boolean
          allow_triple?: boolean
          base_price_idr?: number
          child_price_idr?: number | null
          created_at?: string
          extra_adult_price_idr?: number | null
          hotel_id?: string
          id?: string
          max_capacity?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "hotel_rooms_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      hotels: {
        Row: {
          cancellation_policy_id: string | null
          city: string
          created_at: string
          id: string
          name: string
        }
        Insert: {
          cancellation_policy_id?: string | null
          city: string
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          cancellation_policy_id?: string | null
          city?: string
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "hotels_cancellation_policy_id_fkey"
            columns: ["cancellation_policy_id"]
            isOneToOne: false
            referencedRelation: "cancellation_policies"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_snapshots: {
        Row: {
          available_units: number | null
          id: string
          snapshot_date: string
          updated_at: string
          vendor_id: string
          vendor_type: string
        }
        Insert: {
          available_units?: number | null
          id?: string
          snapshot_date: string
          updated_at?: string
          vendor_id: string
          vendor_type: string
        }
        Update: {
          available_units?: number | null
          id?: string
          snapshot_date?: string
          updated_at?: string
          vendor_id?: string
          vendor_type?: string
        }
        Relationships: []
      }
      logs: {
        Row: {
          action: string
          changes: Json | null
          created_at: string
          id: number
          object_id: string | null
          object_type: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          changes?: Json | null
          created_at?: string
          id?: number
          object_id?: string | null
          object_type?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          changes?: Json | null
          created_at?: string
          id?: number
          object_id?: string | null
          object_type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          quote_id: string | null
          target_url: string | null
          title: string | null
          type: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          quote_id?: string | null
          target_url?: string | null
          title?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          quote_id?: string | null
          target_url?: string | null
          title?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          agent_id: string
          amount_idr: number | null
          amount_paid: number
          created_at: string
          currency_paid: string
          fx_rate_used: number | null
          gateway_transaction_id: string | null
          id: string
          is_manual: boolean
          payment_gateway: string | null
          payment_method: string | null
          proof_url: string | null
          quote_id: string
          status: string | null
          tax_details: Json | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          agent_id: string
          amount_idr?: number | null
          amount_paid: number
          created_at?: string
          currency_paid: string
          fx_rate_used?: number | null
          gateway_transaction_id?: string | null
          id?: string
          is_manual?: boolean
          payment_gateway?: string | null
          payment_method?: string | null
          proof_url?: string | null
          quote_id: string
          status?: string | null
          tax_details?: Json | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          agent_id?: string
          amount_idr?: number | null
          amount_paid?: number
          created_at?: string
          currency_paid?: string
          fx_rate_used?: number | null
          gateway_transaction_id?: string | null
          id?: string
          is_manual?: boolean
          payment_gateway?: string | null
          payment_method?: string | null
          proof_url?: string | null
          quote_id?: string
          status?: string | null
          tax_details?: Json | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "admins"
            referencedColumns: ["id"]
          },
        ]
      }
      quote_days: {
        Row: {
          activities: Json | null
          day_date: string
          day_number: number
          entry_fee_ids: string[] | null
          id: string
          notes: string | null
          quote_id: string
          region: Database["public"]["Enums"]["travel_region"]
        }
        Insert: {
          activities?: Json | null
          day_date: string
          day_number: number
          entry_fee_ids?: string[] | null
          id?: string
          notes?: string | null
          quote_id: string
          region: Database["public"]["Enums"]["travel_region"]
        }
        Update: {
          activities?: Json | null
          day_date?: string
          day_number?: number
          entry_fee_ids?: string[] | null
          id?: string
          notes?: string | null
          quote_id?: string
          region?: Database["public"]["Enums"]["travel_region"]
        }
        Relationships: [
          {
            foreignKeyName: "quote_days_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      quote_funnel_events: {
        Row: {
          agent_id: string | null
          event_type: string | null
          id: string
          metadata: Json | null
          occurred_at: string | null
          quote_id: string | null
        }
        Insert: {
          agent_id?: string | null
          event_type?: string | null
          id?: string
          metadata?: Json | null
          occurred_at?: string | null
          quote_id?: string | null
        }
        Update: {
          agent_id?: string | null
          event_type?: string | null
          id?: string
          metadata?: Json | null
          occurred_at?: string | null
          quote_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quote_funnel_events_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quote_funnel_events_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      quote_options: {
        Row: {
          hotel_room_ids: string[] | null
          id: string
          land_cost_idr: number | null
          option_number: number
          quote_id: string
          room_cost_idr: number | null
          total_cost_idr: number | null
        }
        Insert: {
          hotel_room_ids?: string[] | null
          id?: string
          land_cost_idr?: number | null
          option_number: number
          quote_id: string
          room_cost_idr?: number | null
          total_cost_idr?: number | null
        }
        Update: {
          hotel_room_ids?: string[] | null
          id?: string
          land_cost_idr?: number | null
          option_number?: number
          quote_id?: string
          room_cost_idr?: number | null
          total_cost_idr?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "quote_options_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      quote_status_history: {
        Row: {
          changed_at: string
          changed_by_user_id: string | null
          id: number
          quote_id: string
          status_from: Database["public"]["Enums"]["quote_status"] | null
          status_to: Database["public"]["Enums"]["quote_status"]
        }
        Insert: {
          changed_at?: string
          changed_by_user_id?: string | null
          id?: number
          quote_id: string
          status_from?: Database["public"]["Enums"]["quote_status"] | null
          status_to: Database["public"]["Enums"]["quote_status"]
        }
        Update: {
          changed_at?: string
          changed_by_user_id?: string | null
          id?: number
          quote_id?: string
          status_from?: Database["public"]["Enums"]["quote_status"] | null
          status_to?: Database["public"]["Enums"]["quote_status"]
        }
        Relationships: [
          {
            foreignKeyName: "quote_status_history_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      quote_versions: {
        Row: {
          changes_summary: string | null
          created_at: string
          created_by_user_id: string | null
          id: number
          pdf_url: string | null
          quote_id: string
          version_number: number
        }
        Insert: {
          changes_summary?: string | null
          created_at?: string
          created_by_user_id?: string | null
          id?: number
          pdf_url?: string | null
          quote_id: string
          version_number?: number
        }
        Update: {
          changes_summary?: string | null
          created_at?: string
          created_by_user_id?: string | null
          id?: number
          pdf_url?: string | null
          quote_id?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "quote_versions_created_by_user_id_fkey"
            columns: ["created_by_user_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quote_versions_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      quotes: {
        Row: {
          agent_id: string
          base_cost_idr: number | null
          cancellation_policy_snapshot: Json | null
          children: number | null
          clerk_id: string | null
          client_id: string | null
          created_at: string
          display_currency: string
          display_final_total: number | null
          exchange_rate_used: number | null
          expires_at: string | null
          final_total_idr: number | null
          id: string
          is_archived: boolean | null
          markup_idr: number | null
          pax: number
          pdf_url: string | null
          quote_ref: string | null
          status: Database["public"]["Enums"]["quote_status"]
          travel_end: string
          travel_start: string
          trip_status: Database["public"]["Enums"]["trip_status"]
          updated_at: string | null
        }
        Insert: {
          agent_id: string
          base_cost_idr?: number | null
          cancellation_policy_snapshot?: Json | null
          children?: number | null
          clerk_id?: string | null
          client_id?: string | null
          created_at?: string
          display_currency?: string
          display_final_total?: number | null
          exchange_rate_used?: number | null
          expires_at?: string | null
          final_total_idr?: number | null
          id?: string
          is_archived?: boolean | null
          markup_idr?: number | null
          pax: number
          pdf_url?: string | null
          quote_ref?: string | null
          status?: Database["public"]["Enums"]["quote_status"]
          travel_end: string
          travel_start: string
          trip_status?: Database["public"]["Enums"]["trip_status"]
          updated_at?: string | null
        }
        Update: {
          agent_id?: string
          base_cost_idr?: number | null
          cancellation_policy_snapshot?: Json | null
          children?: number | null
          clerk_id?: string | null
          client_id?: string | null
          created_at?: string
          display_currency?: string
          display_final_total?: number | null
          exchange_rate_used?: number | null
          expires_at?: string | null
          final_total_idr?: number | null
          id?: string
          is_archived?: boolean | null
          markup_idr?: number | null
          pax?: number
          pdf_url?: string | null
          quote_ref?: string | null
          status?: Database["public"]["Enums"]["quote_status"]
          travel_end?: string
          travel_start?: string
          trip_status?: Database["public"]["Enums"]["trip_status"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotes_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      retry_queue: {
        Row: {
          attempts: number | null
          created_at: string | null
          error_log: string | null
          id: string
          job_type: string | null
          last_attempt_at: string | null
          max_attempts: number | null
          payload: Json | null
          reference_id: string | null
          status: string | null
        }
        Insert: {
          attempts?: number | null
          created_at?: string | null
          error_log?: string | null
          id?: string
          job_type?: string | null
          last_attempt_at?: string | null
          max_attempts?: number | null
          payload?: Json | null
          reference_id?: string | null
          status?: string | null
        }
        Update: {
          attempts?: number | null
          created_at?: string | null
          error_log?: string | null
          id?: string
          job_type?: string | null
          last_attempt_at?: string | null
          max_attempts?: number | null
          payload?: Json | null
          reference_id?: string | null
          status?: string | null
        }
        Relationships: []
      }
      seasonal_rates: {
        Row: {
          end_date: string
          hotel_room_id: string
          id: string
          rate_idr: number
          season: Database["public"]["Enums"]["pricing_season"]
          start_date: string
        }
        Insert: {
          end_date: string
          hotel_room_id: string
          id?: string
          rate_idr: number
          season: Database["public"]["Enums"]["pricing_season"]
          start_date: string
        }
        Update: {
          end_date?: string
          hotel_room_id?: string
          id?: string
          rate_idr?: number
          season?: Database["public"]["Enums"]["pricing_season"]
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "seasonal_rates_hotel_room_id_fkey"
            columns: ["hotel_room_id"]
            isOneToOne: false
            referencedRelation: "hotel_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          description: string | null
          id: string
          key: string
          updated_at: string
          value: string
        }
        Insert: {
          description?: string | null
          id?: string
          key: string
          updated_at?: string
          value: string
        }
        Update: {
          description?: string | null
          id?: string
          key?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          agent_id: string
          created_at: string
          description: string | null
          id: string
          priority: string | null
          quote_id: string | null
          status: string | null
          subject: string
        }
        Insert: {
          agent_id: string
          created_at?: string
          description?: string | null
          id?: string
          priority?: string | null
          quote_id?: string | null
          status?: string | null
          subject: string
        }
        Update: {
          agent_id?: string
          created_at?: string
          description?: string | null
          id?: string
          priority?: string | null
          quote_id?: string | null
          status?: string | null
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      transport_rates: {
        Row: {
          id: string
          pax_limit: number
          rate_per_day_idr: number
          region: Database["public"]["Enums"]["travel_region"]
          vehicle_type: string
        }
        Insert: {
          id?: string
          pax_limit: number
          rate_per_day_idr: number
          region: Database["public"]["Enums"]["travel_region"]
          vehicle_type: string
        }
        Update: {
          id?: string
          pax_limit?: number
          rate_per_day_idr?: number
          region?: Database["public"]["Enums"]["travel_region"]
          vehicle_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      bytea_to_text: {
        Args: {
          data: string
        }
        Returns: string
      }
      fetch_and_store_exchange_rates: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      http: {
        Args: {
          request: Database["public"]["CompositeTypes"]["http_request"]
        }
        Returns: unknown
      }
      http_delete:
        | {
            Args: {
              uri: string
            }
            Returns: unknown
          }
        | {
            Args: {
              uri: string
              content: string
              content_type: string
            }
            Returns: unknown
          }
      http_get:
        | {
            Args: {
              uri: string
            }
            Returns: unknown
          }
        | {
            Args: {
              uri: string
              data: Json
            }
            Returns: unknown
          }
      http_head: {
        Args: {
          uri: string
        }
        Returns: unknown
      }
      http_header: {
        Args: {
          field: string
          value: string
        }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
      }
      http_list_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: {
          uri: string
          content: string
          content_type: string
        }
        Returns: unknown
      }
      http_post:
        | {
            Args: {
              uri: string
              content: string
              content_type: string
            }
            Returns: unknown
          }
        | {
            Args: {
              uri: string
              data: Json
            }
            Returns: unknown
          }
      http_put: {
        Args: {
          uri: string
          content: string
          content_type: string
        }
        Returns: unknown
      }
      http_reset_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      http_set_curlopt: {
        Args: {
          curlopt: string
          value: string
        }
        Returns: boolean
      }
      text_to_bytea: {
        Args: {
          data: string
        }
        Returns: string
      }
      update_quote_currency: {
        Args: {
          p_quote_id: string
        }
        Returns: undefined
      }
      urlencode:
        | {
            Args: {
              data: Json
            }
            Returns: string
          }
        | {
            Args: {
              string: string
            }
            Returns: string
          }
        | {
            Args: {
              string: string
            }
            Returns: string
          }
    }
    Enums: {
      agent_tier: "bronze" | "silver" | "gold"
      dispute_status:
        | "open"
        | "investigating"
        | "resolved_refund"
        | "resolved_credit"
        | "rejected"
      pricing_season: "low" | "high" | "peak"
      quote_status:
        | "draft"
        | "sent"
        | "revised"
        | "approved"
        | "paid"
        | "expired"
        | "void"
        | "on_hold_external_issue"
      travel_region: "mainland" | "nusa_penida"
      trip_status: "pending" | "completed" | "cancelled"
      user_type: "travel_agent" | "freelancer" | "affiliate"
    }
    CompositeTypes: {
      http_header: {
        field: string | null
        value: string | null
      }
      http_request: {
        method: unknown | null
        uri: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content_type: string | null
        content: string | null
      }
      http_response: {
        status: number | null
        content_type: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content: string | null
      }
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

