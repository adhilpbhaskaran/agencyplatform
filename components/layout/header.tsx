// components/layout/header.tsx
'use client';

import dynamic from 'next/dynamic';

// Dynamically import the component that contains the actual navigation UI
// with server-side rendering (ssr) turned off.
const ClientNavigation = dynamic(
  () => import('@/components/layout/client-navigation').then(mod => mod.ClientNavigation),
  {
    ssr: false,
    // Optional: Show a simple loading state while it loads.
    loading: () => <div className="h-16 w-full animate-pulse bg-gray-800/20" />,
  }
);

export default function Header() {
  // This client component renders the non-SSR navigation.
  return <ClientNavigation />;
}