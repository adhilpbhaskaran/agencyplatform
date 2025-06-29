'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Circle, ArrowRight, Sparkles, Users, MessageSquare, CreditCard, Settings, BookOpen, Play } from 'lucide-react'
import Link from 'next/link'

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  completed: boolean
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
}

export default function OnboardingFlow() {
  const [steps, setSteps] = useState<OnboardingStep[]>([
    {
      id: 'profile',
      title: 'Complete Your Profile',
      description: 'Add your agency details and contact information',
      icon: <Users className="h-5 w-5" />,
      completed: false,
      action: {
        label: 'Complete Profile',
        href: '/dashboard/profile'
      }
    },
    {
      id: 'first-quote',
      title: 'Create Your First Quote',
      description: 'Experience our smart quote generation system',
      icon: <Sparkles className="h-5 w-5" />,
      completed: false,
      action: {
        label: 'Create Quote',
        href: '/dashboard/quotes/new'
      }
    },
    {
      id: 'communication',
      title: 'Set Up Communication',
      description: 'Connect your preferred communication channels',
      icon: <MessageSquare className="h-5 w-5" />,
      completed: false,
      action: {
        label: 'Setup Communication',
        href: '/dashboard/settings/communication'
      }
    },
    {
      id: 'payment',
      title: 'Configure Payment Methods',
      description: 'Add your payment preferences for seamless transactions',
      icon: <CreditCard className="h-5 w-5" />,
      completed: false,
      action: {
        label: 'Setup Payments',
        href: '/dashboard/settings/payments'
      }
    },
    {
      id: 'training',
      title: 'Watch Platform Tutorial',
      description: 'Learn advanced features in our 5-minute tutorial',
      icon: <Play className="h-5 w-5" />,
      completed: false,
      action: {
        label: 'Watch Tutorial',
        onClick: () => {
          // Simulate watching tutorial
          markStepCompleted('training')
        }
      }
    }
  ])

  const [currentStep, setCurrentStep] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)

  const completedSteps = steps.filter(step => step.completed).length
  const progress = (completedSteps / steps.length) * 100

  const markStepCompleted = (stepId: string) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    ))
  }

  const handleStepAction = (step: OnboardingStep) => {
    if (step.action?.onClick) {
      step.action.onClick()
    }
    // Simulate step completion for demo purposes
    if (step.id !== 'training') {
      setTimeout(() => {
        markStepCompleted(step.id)
      }, 1000)
    }
  }

  useEffect(() => {
    if (completedSteps === steps.length && completedSteps > 0) {
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 3000)
    }
  }, [completedSteps, steps.length])

  if (completedSteps === steps.length) {
    return (
      <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-2">
              🎉 Congratulations! You're All Set!
            </h3>
            <p className="text-green-700 dark:text-green-300 mb-4">
              You've completed the onboarding process. You're now ready to start creating amazing Bali experiences for your clients.
            </p>
            <Button className="bg-green-600 hover:bg-green-700">
              <Link href="/dashboard/quotes/new" className="flex items-center gap-2">
                Start Creating Quotes
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Welcome to Bali Malayali! 🌴
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Let's get you set up in just a few minutes. Complete these steps to unlock the full potential of our platform.
              </p>
            </div>
            <Badge variant="secondary" className="text-sm">
              {completedSteps}/{steps.length} Complete
            </Badge>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      {/* Onboarding Steps */}
      <div className="grid gap-4">
        {steps.map((step, index) => (
          <Card 
            key={step.id} 
            className={`transition-all duration-200 ${
              step.completed 
                ? 'border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800' 
                : 'hover:shadow-md cursor-pointer'
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.completed 
                      ? 'bg-green-500 text-white' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {step.completed ? <CheckCircle className="h-5 w-5" /> : step.icon}
                  </div>
                  
                  <div>
                    <h3 className={`font-semibold ${
                      step.completed ? 'text-green-800 dark:text-green-200' : ''
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm ${
                      step.completed 
                        ? 'text-green-700 dark:text-green-300' 
                        : 'text-muted-foreground'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {step.completed ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      ✓ Completed
                    </Badge>
                  ) : (
                    step.action && (
                      step.action.href ? (
                        <Button asChild size="sm">
                          <Link href={step.action.href} className="flex items-center gap-2">
                            {step.action.label}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          onClick={() => handleStepAction(step)}
                          className="flex items-center gap-2"
                        >
                          {step.action.label}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      )
                    )
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" asChild className="h-auto p-4">
              <Link href="/support" className="flex flex-col items-center gap-2">
                <MessageSquare className="h-6 w-6" />
                <span className="font-medium">Get Help</span>
                <span className="text-xs text-muted-foreground text-center">
                  Chat with our support team
                </span>
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="h-auto p-4">
              <Link href="/platform" className="flex flex-col items-center gap-2">
                <Settings className="h-6 w-6" />
                <span className="font-medium">Platform Guide</span>
                <span className="text-xs text-muted-foreground text-center">
                  Learn about all features
                </span>
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="h-auto p-4">
              <Link href="/about-bali" className="flex flex-col items-center gap-2">
                <Sparkles className="h-6 w-6" />
                <span className="font-medium">Explore Bali</span>
                <span className="text-xs text-muted-foreground text-center">
                  Discover destinations
                </span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-6xl animate-bounce">
            🎉
          </div>
        </div>
      )}
    </div>
  )
}