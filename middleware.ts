// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/about(.*)',
  '/about-bali(.*)',
  '/about-us(.*)',
  '/blog(.*)',
  '/careers(.*)',
  '/community-forum(.*)',
  '/contact(.*)',
  '/cookie-policy(.*)',
  '/features(.*)',
  '/gdpr(.*)',
  '/help-center(.*)',
  '/integrations(.*)',
  '/knowledge-base(.*)',
  '/partner-with-us(.*)',
  '/platform(.*)',
  '/press(.*)',
  '/pricing(.*)',
  '/privacy(.*)',
  '/privacy-policy(.*)',
  '/security(.*)',
  '/support(.*)',
  '/team(.*)',
  '/terms(.*)',
  '/terms-of-service(.*)',
  '/why-us(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/registration(.*)'
]);

// Define routes that require agent authentication
const isProtectedAgentRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/onboarding(.*)',
  '/quotes(.*)'
]);

// Define routes that require admin authentication
const isProtectedAdminRoute = createRouteMatcher([
  '/admin(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth();
  
  // Allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }
  
  // Check if user is authenticated for protected routes
  if (isProtectedAgentRoute(req) || isProtectedAdminRoute(req)) {
    if (!userId) {
      return redirectToSignIn();
    }
  }
  
  // Check admin role for admin routes
  if (isProtectedAdminRoute(req)) {
    const userRole = (sessionClaims?.publicMetadata as { role?: string })?.role;
    
    if (userRole !== 'admin') {
      // Redirect non-admin users to dashboard
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};