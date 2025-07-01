import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Quote } from '@/hooks/use-quotes';

export async function getQuotesCount(agentId?: string): Promise<number> {
  try {
    if (!agentId) {
      return 0;
    }

    const supabase = await createSupabaseServerClient();

    const { count, error } = await supabase
      .from('quotes')
      .select('*', { count: 'exact', head: true })
      .eq('agent_id', agentId);

    if (error) {
      console.error('Error fetching quotes count:', error);
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.error('Error fetching quotes count:', error);
    return 0;
  }
}

export async function getQuotesForAgent(agentId: string): Promise<Quote[]> {
  try {
    const supabase = await createSupabaseServerClient();

    const { data: quotes, error } = await supabase
      .from('quotes')
      .select(`
        *,
        clients (id, name, email, phone)
      `)
      .eq('agent_id', agentId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching quotes:', error);
      return [];
    }

    // Map children field to childrenCount to avoid React children prop conflict
    const mappedQuotes = quotes?.map(quote => {
      const { children, ...rest } = quote;
      return {
        ...rest,
        childrenCount: children
      };
    }) || [];

    return mappedQuotes;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return [];
  }
}