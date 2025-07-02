// /app/api/webhooks/clerk/route.ts
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent, clerkClient } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env.local');
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', { status: 400 });
  }

  const eventType = evt.type;
  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id } = evt.data;

    const { data: admin } = await supabaseAdmin
      .from('admins')
      .select('role')
      .eq('clerk_id', id)
      .single();

    const role = admin ? admin.role : 'user';

    // CORRECTED: Await clerkClient() call
    await (await clerkClient()).users.updateUserMetadata(id, {
      publicMetadata: { role: role }
    });
    
    console.log(`Webhook: User ${id} role synced to: ${role}`);
  }
  return new NextResponse(null, { status: 200 });
}