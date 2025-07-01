'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Circle, ArrowRight, Star, Users, Globe, TrendingUp, Zap, Award } from 'lucide-react'
import Link from 'next/link'

import Footer from '@/components/footer'

interface ChecklistItem {
  id: string
  title: string
  description: string
  completed: boolean
  href?: string
}

export default function OnboardingPage() {
  const { user } = useUser()
  const firstName = user?.firstName || 'there'
  
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    {
      id: 'profile',
      title: 'Complete Your Profile',
      description: 'Add your business information and contact details',
      completed: false,
      href: '/dashboard/profile'
    },
    {
      id: 'first-quote',
      title: 'Create Your First Quote',
      description: 'Build a travel quote for your first client',
      completed: false,
      href: '/dashboard/quotes/new'
    },
    {
      id: 'payment-setup',
      title: 'Set Up Payment Processing',
      description: 'Configure your payment methods to start earning',
      completed: false,
      href: '/dashboard/settings/payments'
    },
    {
      id: 'branding',
      title: 'Customize Your Branding',
      description: 'Upload your logo and customize your client-facing materials',
      completed: false,
      href: '/dashboard/settings/branding'
    },
    {
      id: 'first-booking',
      title: 'Process Your First Booking',
      description: 'Complete a booking and see how commissions work',
      completed: false,
      href: '/dashboard/bookings'
    }
  ])

  const toggleChecklistItem = (id: string) => {
    setChecklist(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  const completedCount = checklist.filter(item => item.completed).length
  const progressPercentage = (completedCount / checklist.length) * 100

  return (
    <div className="min-h-screen bg-background">


      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Personalized Greeting */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="h-4 w-4" />
              Welcome to Your Journey
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Welcome, {firstName}! 👋
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              You're just a few steps away from transforming your travel business. Let's get you set up to start earning higher commissions and providing exceptional service to your clients.
            </p>
            
            {/* Progress Overview */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Setup Progress</span>
                <span className="text-sm text-muted-foreground">{completedCount}/{checklist.length} completed</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Main CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/why-us">
                  Learn More About Our Platform
                </Link>
              </Button>
            </div>
          </div>

          {/* Getting Started Checklist */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checklist */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Getting Started Checklist
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Complete these steps to unlock the full potential of our platform
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {checklist.map((item) => (
                      <div 
                        key={item.id}
                        className="flex items-start gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                        onClick={() => toggleChecklistItem(item.id)}
                      >
                        <button className="mt-0.5">
                          {item.completed ? (
                            <CheckCircle className="h-5 w-5 text-primary" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                        </button>
                        <div className="flex-1">
                          <h3 className={`font-medium ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.description}
                          </p>
                          {item.href && !item.completed && (
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="mt-2 p-0 h-auto text-primary hover:text-primary/80"
                              asChild
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Link href={item.href}>
                                Get Started <ArrowRight className="ml-1 h-3 w-3" />
                              </Link>
                            </Button>
                          )}
                        </div>
                        {item.completed && (
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            Complete
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Benefits Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    What You'll Achieve
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">More Clients</h4>
                        <p className="text-xs text-muted-foreground">
                          Professional tools that impress clients
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Globe className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Global Reach</h4>
                        <p className="text-xs text-muted-foreground">
                          Access worldwide inventory
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Zap className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Faster Bookings</h4>
                        <p className="text-xs text-muted-foreground">
                          Streamlined booking process
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Award className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Higher Commissions</h4>
                        <p className="text-xs text-muted-foreground">
                          Earn more with performance tiers
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our support team is here to help you get started successfully.
                  </p>
                  <div className="space-y-2">
                    <Button size="sm" variant="outline" className="w-full" asChild>
                      <Link href="/support">
                        Contact Support
                      </Link>
                    </Button>
                    <Button size="sm" variant="ghost" className="w-full" asChild>
                      <Link href="/docs">
                        View Documentation
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Success Message */}
          {completedCount === checklist.length && (
            <div className="mt-12 text-center">
              <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Congratulations! 🎉</h3>
                  <p className="text-muted-foreground mb-6">
                    You've completed all the setup steps. You're now ready to start earning higher commissions and growing your travel business!
                  </p>
                  <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                    <Link href="/dashboard">
                      Start Building Your Business
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}