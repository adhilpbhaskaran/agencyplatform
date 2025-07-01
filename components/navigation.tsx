'use client'

import dynamic from 'next/dynamic'

const ClientNavigation = dynamic(
  () => import('@/components/client-navigation'),
  {
    // Optional: Add a loading skeleton
    loading: () => <div className="h-16 w-full animate-pulse bg-gray-800/20 border-b border-border" />,
  }
)

export default function Navigation() {
  return <ClientNavigation />
}