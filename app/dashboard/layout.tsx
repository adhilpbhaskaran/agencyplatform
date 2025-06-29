import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import dynamic from 'next/dynamic'

// Import components with SSR disabled to prevent hydration issues
const SidebarNoSSR = dynamic(
  () => import('@/components/dashboard/sidebar-client').then(mod => ({ default: mod.SidebarClient })),
  { ssr: false }
)

const HeaderNoSSR = dynamic(
  () => import('@/components/dashboard/header-client').then(mod => ({ default: mod.HeaderClient })),
  { ssr: false }
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