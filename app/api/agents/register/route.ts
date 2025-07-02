// /app/api/agents/register/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { fullName, phone, agentType, companyName, socialHandle, roleInCompany } = body;

    const supabase = await createSupabaseServerClient();
    const user = await (await clerkClient()).users.getUser(userId);
    const email = user.emailAddresses.find((e: any) => e.id === user.primaryEmailAddressId)?.emailAddress;
    
    if (!email) {
        throw new Error("User's primary email address could not be found.");
    }

    // Map agentType to the correct enum value
    let userType: 'travel_agent' | 'freelancer' | 'affiliate';
    if (agentType === 'Travel Agency / Company') {
      userType = 'travel_agent';
    } else if (agentType === 'Affiliate') {
      userType = 'affiliate';
    } else {
      userType = 'freelancer';
    }

    const agentDataToInsert = {
      clerk_id: userId,
      email: email,
      name: fullName,
      phone: phone,
      type: userType,
      company_name: companyName,
      social_handle: socialHandle,
      role_in_company: roleInCompany,
      is_approved: false
    };

    const { data: newAgent, error } = await supabase
      .from('agents')
      .insert(agentDataToInsert)
      .select()
      .single();

    if (error) {
      console.error('Failed to create agent in Supabase:', error);
      throw new Error(error.message);
    }

    return NextResponse.json(newAgent);
  } catch (error: any) {
    console.error('[AGENT_REGISTRATION_ERROR]', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error', details: error.message }), { status: 500 });
  }
}