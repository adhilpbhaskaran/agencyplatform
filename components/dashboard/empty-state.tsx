'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Sparkles, Users, TrendingUp, Globe, MessageSquare, CreditCard, BookOpen, Play, Star } from 'lucide-react'
import Link from 'next/link'
import OnboardingFlow from './onboarding-flow'

interface EmptyStateProps {
  userName?: string
}

export default function EmptyState({ userName = 'Travel Agent' }: EmptyStateProps) {
  const quickStats = [
    {
      label: 'Active Partners',
      value: '2,500+',
      icon: <Users className="h-4 w-4" />,
      color: 'text-blue-600'
    },
    {
      label: 'Quotes Generated',
      value: '50K+',
      icon: <Sparkles className="h-4 w-4" />,
      color: 'text-green-600'
    },
    {
      label: 'Revenue Processed',
      value: '$25M+',
      icon: <TrendingUp className="h-4 w-4" />,
      color: 'text-purple-600'
    },
    {
      label: 'Countries Served',
      value: '45+',
      icon: <Globe className="h-4 w-4" />,
      color: 'text-orange-600'
    }
  ]

  const features = [
    {
      title: 'Smart Quote Generation',
      description: 'AI-powered quotes in under 2 minutes',
      icon: <Sparkles className="h-6 w-6 text-blue-500" />,
      action: 'Create Quote',
      href: '/dashboard/quotes/new'
    },
    {
      title: 'Integrated Communication',
      description: 'WhatsApp, Email, and SMS in one place',
      icon: <MessageSquare className="h-6 w-6 text-green-500" />,
      action: 'Setup Communication',
      href: '/dashboard/settings/communication'
    },
    {
      title: 'Automated Payments',
      description: 'Secure payment processing and tracking',
      icon: <CreditCard className="h-6 w-6 text-purple-500" />,
      action: 'Configure Payments',
      href: '/dashboard/settings/payments'
    }
  ]

  const testimonials = [
    {
      quote: "Bali Malayali transformed our business. We're now processing 3x more bookings with half the effort.",
      author: "Sarah Johnson",
      company: "Tropical Escapes Travel",
      rating: 5
    },
    {
      quote: "The quote generation is incredible. What used to take hours now takes minutes.",
      author: "Michael Chen",
      company: "Asia Adventures",
      rating: 5
    }
  ]

  return (
    <div className="space-y-8">
      {/* Personal Welcome */}
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2">
          Welcome to Bali Malayali, {userName}! 🌴
        </h1>
        <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
          You're now part of an exclusive network of travel professionals creating extraordinary Bali experiences.
        </p>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-4">
                <div className={`flex items-center justify-center gap-2 mb-2 ${stat.color}`}>
                  {stat.icon}
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
            <Link href="/dashboard/quotes/new" className="flex items-center gap-2">
              Create Your First Quote
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/platform" className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Watch Platform Tour
            </Link>
          </Button>
        </div>
      </div>

      {/* Onboarding Flow */}
      <OnboardingFlow />

      {/* Key Features Preview */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">
          What Makes Us Different
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  {feature.icon}
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href={feature.href} className="flex items-center justify-center gap-2">
                    {feature.action}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Social Proof */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">
          What Our Partners Say
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-lg mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Learning Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Learning Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" asChild className="h-auto p-4">
              <Link href="/platform" className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                </div>
                <span className="font-medium">Platform Guide</span>
                <span className="text-xs text-muted-foreground text-center">
                  Complete feature overview
                </span>
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="h-auto p-4">
              <Link href="/support" className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-green-600" />
                </div>
                <span className="font-medium">Get Support</span>
                <span className="text-xs text-muted-foreground text-center">
                  24/7 expert assistance
                </span>
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="h-auto p-4">
              <Link href="/about-bali" className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                  <Globe className="h-4 w-4 text-orange-600" />
                </div>
                <span className="font-medium">Explore Bali</span>
                <span className="text-xs text-muted-foreground text-center">
                  Destination insights
                </span>
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="h-auto p-4">
              <Link href="/why-us" className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <Star className="h-4 w-4 text-purple-600" />
                </div>
                <span className="font-medium">Why Choose Us</span>
                <span className="text-xs text-muted-foreground text-center">
                  Our competitive edge
                </span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 border-blue-200 dark:border-blue-800">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Transform Your Travel Business?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of successful travel agents who have revolutionized their workflow with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
              <Link href="/dashboard/quotes/new" className="flex items-center gap-2">
                Start Creating Quotes
                <Sparkles className="h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/partner-with-us" className="flex items-center gap-2">
                Learn More
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}