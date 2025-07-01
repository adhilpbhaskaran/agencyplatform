'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, useUser } from '@clerk/nextjs'

import Footer from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, Clock, CheckCircle, Mail, Phone, Building } from 'lucide-react'
import Link from 'next/link'

interface RegistrationStatus {
  registered: boolean
  status: 'not_registered' | 'pending_approval' | 'approved'
  agent?: {
    id: string
    fullName: string
    email: string
    isApproved: boolean
    createdAt: string
  }
}

export default function PendingApprovalPage() {
  const { userId, isLoaded } = useAuth()
  const { user } = useUser()
  const router = useRouter()
  const [registrationStatus, setRegistrationStatus] = useState<RegistrationStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoaded) return
    
    if (!userId) {
      router.push('/')
      return
    }

    checkRegistrationStatus()
  }, [isLoaded, userId, router])

  const checkRegistrationStatus = async () => {
    try {
      const response = await fetch('/api/agents/register')
      
      if (!response.ok) {
        throw new Error('Failed to check registration status')
      }

      const data: RegistrationStatus = await response.json()
      setRegistrationStatus(data)

      // If user is not registered, redirect to registration
      if (!data.registered) {
        router.push('/registration')
        return
      }

      // If user is approved, redirect to dashboard
      if (data.registered && data.status === 'approved') {
        router.push('/dashboard')
        return
      }

    } catch (err) {
      console.error('Error checking registration status:', err)
      setError('Failed to load registration status. Please refresh the page.')
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    setError(null)
    await checkRegistrationStatus()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen bg-background">
  
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">

        <div className="container mx-auto px-4 py-20">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-600 text-xl">!</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Error</h3>
                <p className="text-muted-foreground mb-4">{error}</p>
                <Button onClick={handleRefresh} disabled={isRefreshing}>
                  {isRefreshing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Refreshing...
                    </>
                  ) : (
                    'Try Again'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">

      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          {/* Main Status Card */}
          <Card className="mb-8">
            <CardHeader className="text-center">
              <div className="h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
              <CardTitle className="text-2xl">Registration Pending Approval</CardTitle>
              <p className="text-muted-foreground">
                Thank you for registering! Your application is currently being reviewed by our admin team.
              </p>
            </CardHeader>
            <CardContent>
              {registrationStatus?.agent && (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-3">Registration Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Name:</span>
                        <span>{registrationStatus.agent.fullName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span className="font-medium">Email:</span>
                        <span>{registrationStatus.agent.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Submitted:</span>
                        <span>{formatDate(registrationStatus.agent.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button onClick={handleRefresh} disabled={isRefreshing} variant="outline">
                      {isRefreshing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Checking Status...
                        </>
                      ) : (
                        'Refresh Status'
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* What's Next Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">What happens next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Admin Review</h4>
                    <p className="text-sm text-muted-foreground">
                      Our team will review your registration details and verify your information.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Email Notification</h4>
                    <p className="text-sm text-muted-foreground">
                      You'll receive an email notification once your account is approved.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Full Access</h4>
                    <p className="text-sm text-muted-foreground">
                      Once approved, you'll have full access to create quotes, manage clients, and earn commissions.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have any questions about your registration or need assistance, our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/support">
                    <Phone className="mr-2 h-4 w-4" />
                    Contact Support
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/help-center">
                    Help Center
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Auto-refresh notice */}
          <div className="text-center mt-8">
            <p className="text-xs text-muted-foreground">
              This page will automatically redirect you to the dashboard once your account is approved.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

// Auto-refresh every 30 seconds to check for approval
// This could be improved with WebSockets or Server-Sent Events in the future