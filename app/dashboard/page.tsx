// /app/dashboard/page.tsx
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { getAgentProfileByClerkId } from '@/lib/agent-actions';
import ApplicationUnderReview from '@/components/dashboard/application-under-review';
import MainDashboard from '@/components/dashboard/main-dashboard';
import { getQuotesForAgent } from '@/lib/quote-actions';

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) {
    // This should be handled by middleware, but is a good safeguard
    return redirect('/sign-in');
  }

  const agentProfile = await getAgentProfileByClerkId(userId);

  // STATE 1: No profile in our DB. User has signed up but not registered.
  if (!agentProfile) {
    redirect('/registration');
  }

  // STATE 2: Profile exists, but is not yet approved by an admin.
  if (agentProfile.is_approved === false) {
    return <ApplicationUnderReview />;
  }

  // STATE 3: Profile exists and is approved. Show the full dashboard.
  const initialQuotes = await getQuotesForAgent(agentProfile.id);
  return <MainDashboard agent={agentProfile} initialQuotes={initialQuotes} />;
}