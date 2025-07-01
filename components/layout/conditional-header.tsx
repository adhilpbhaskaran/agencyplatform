'use client';

import { usePathname } from 'next/navigation';
import Header from './header';

export default function ConditionalHeader() {
  const pathname = usePathname();
  
  // Don't show the main header on dashboard pages since they have their own header
  if (pathname.startsWith('/dashboard')) {
    return null;
  }
  
  return <Header />;
}