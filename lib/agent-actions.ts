import { auth } from '@clerk/nextjs/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Database } from '@/types/database';

export interface AgentProfile {
  id: string;
  clerk_id: string;
  email: string;
  name: string;
  phone: string | null;
  type: string | null;
  company_name: string | null;
  social_handle: string | null;
  role_in_company: string | null;
  logo_url: string | null;
  is_approved: boolean | null;
  created_at: string;
}

export async function getAgentProfile(): Promise<AgentProfile | null> {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return null;
    }

    const supabase = await createSupabaseServerClient();

    const { data: agent, error } = await supabase
      .from('agents')
      .select('*')
      .eq('clerk_id', userId)
      .single();

    if (error || !agent) {
      return null;
    }

    // Map database row to AgentProfile interface
    return {
      id: agent.id,
      clerk_id: agent.clerk_id,
      email: agent.email,
      name: agent.name,
      phone: agent.phone,
      type: agent.type,
      company_name: agent.company_name,
      social_handle: agent.social_handle,
      role_in_company: agent.role_in_company,
      logo_url: agent.logo_url,
      is_approved: agent.is_approved,
      created_at: agent.created_at,
    };
  } catch (error) {
    console.error('Error fetching agent profile:', error);
    return null;
  }
}

export async function getAgentProfileByClerkId(clerkId: string): Promise<AgentProfile | null> {
  try {
    const supabase = await createSupabaseServerClient();

    const { data: agent, error } = await supabase
      .from('agents')
      .select('*')
      .eq('clerk_id', clerkId)
      .single();

    if (error || !agent) {
      return null;
    }

    // Map database row to AgentProfile interface
    return {
      id: agent.id,
      clerk_id: agent.clerk_id,
      email: agent.email,
      name: agent.name,
      phone: agent.phone,
      type: agent.type,
      company_name: agent.company_name,
      social_handle: agent.social_handle,
      role_in_company: agent.role_in_company,
      logo_url: agent.logo_url,
      is_approved: agent.is_approved,
      created_at: agent.created_at,
    };
  } catch (error) {
    console.error('Error fetching agent profile by clerk ID:', error);
    return null;
  }
}