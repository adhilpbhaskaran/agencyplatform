// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isAdminRoute = createRouteMatcher(['/admin(.*)']);
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/registration(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  // If the user is trying to access an admin route
  if (isAdminRoute(req)) {
    // If they are not logged in, or their role is not 'super_admin', redirect them away.
    if (!userId || (sessionClaims?.publicMetadata as { role?: string })?.role !== 'super_admin') {
      const homeUrl = new URL('/', req.url);
      return NextResponse.redirect(homeUrl);
    }
  }
  
  // If the user is trying to access a standard protected route
  if (isProtectedRoute(req)) {
    // Protect the route, which will redirect to sign-in if not logged in.
    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }

  // Allow all other requests to pass.
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};