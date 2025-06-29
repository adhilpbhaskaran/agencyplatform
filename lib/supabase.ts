import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Server-side client for API routes
export const createServerClient = () => {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

// Export createClient for server-side usage
export { createClient }

// Helper function to handle Supabase errors
export function handleSupabaseError(error: any) {
  console.error('Supabase error:', error)
  
  if (error?.code === 'PGRST116') {
    return 'No data found'
  }
  
  if (error?.code === 'PGRST301') {
    return 'Unauthorized access'
  }
  
  if (error?.message) {
    return error.message
  }
  
  return 'An unexpected error occurred'
}

// Helper function to get user from Clerk
export async function getCurrentUser() {
  try {
    const { auth } = await import('@clerk/nextjs/server')
    const { userId } = await auth()
    return userId
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}