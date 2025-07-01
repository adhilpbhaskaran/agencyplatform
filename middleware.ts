// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define which routes are protected and require a user to be logged in.
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/admin(.*)'
]);

export default clerkMiddleware((auth, req) => {
  // If the route is a protected route, enforce authentication.
  if (isProtectedRoute(req)) {
    auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};