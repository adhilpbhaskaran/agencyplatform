import { redirect } from 'next/navigation'
import dynamic from 'next/dynamic'
import { auth } from '@clerk/nextjs/server'

// Import components dynamically
const SidebarNoSSR = dynamic(
  () => import('@/components/dashboard/sidebar-client').then(mod => ({ default: mod.SidebarClient }))
)

const HeaderNoSSR = dynamic(
  () => import('@/components/dashboard/header-client').then(mod => ({ default: mod.HeaderClient }))
)

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/')
  }

  // Registration and approval checks are now handled in middleware.ts

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarNoSSR />
      <div className="lg:pl-64">
        <HeaderNoSSR />
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}