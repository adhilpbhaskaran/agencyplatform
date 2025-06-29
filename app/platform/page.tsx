'use client'

import { Zap, Shield, Globe, Users, BarChart3, Clock, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PlatformPage() {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning-Fast Quote Generation",
      description: "Generate professional, detailed quotes in under 2 minutes with our AI-powered system.",
      benefits: ["Real-time pricing updates", "Automated margin calculations", "Professional formatting"]
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Payment Processing",
      description: "Built-in payment gateway with fraud protection and automated invoicing.",
      benefits: ["PCI DSS compliant", "Multiple payment methods", "Automated receipts"]
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Multi-Language Support",
      description: "Serve clients worldwide with automatic translation and currency conversion.",
      benefits: ["50+ languages", "Real-time exchange rates", "Localized content"]
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Client Management System",
      description: "Comprehensive CRM to track leads, manage bookings, and nurture relationships.",
      benefits: ["Contact management", "Booking history", "Communication logs"]
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Advanced Analytics",
      description: "Detailed insights into your business performance and growth opportunities.",
      benefits: ["Revenue tracking", "Conversion metrics", "Performance insights"]
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "24/7 Availability",
      description: "Cloud-based platform accessible anywhere, anytime, on any device.",
      benefits: ["Mobile responsive", "Offline capabilities", "Auto-sync"]
    }
  ]

  const workflow = [
    {
      step: "1",
      title: "Client Inquiry",
      description: "Receive and capture client requirements through our smart intake form."
    },
    {
      step: "2",
      title: "Instant Quote",
      description: "Generate professional quotes with real-time pricing and availability."
    },
    {
      step: "3",
      title: "Client Approval",
      description: "Send branded proposals and collect approvals with digital signatures."
    },
    {
      step: "4",
      title: "Secure Payment",
      description: "Process payments securely with automated invoicing and receipts."
    },
    {
      step: "5",
      title: "Trip Management",
      description: "Manage bookings, send updates, and provide 24/7 support."
    }
  ]

  const integrations = [
    { name: "Booking.com", type: "Accommodation" },
    { name: "Agoda", type: "Hotels" },
    { name: "Viator", type: "Activities" },
    { name: "GetYourGuide", type: "Tours" },
    { name: "Stripe", type: "Payments" },
    { name: "PayPal", type: "Payments" },
    { name: "WhatsApp", type: "Communication" },
    { name: "Telegram", type: "Messaging" }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              The Complete
              <span className="block bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                Travel Agent Platform
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to run a successful Bali travel business, from quote generation to payment processing, all in one powerful platform.
            </p>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features for Modern Travel Agents</h2>
            <p className="text-xl text-muted-foreground">
              Built specifically for Bali travel specialists who demand efficiency and professionalism.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-4 text-white">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How Our Platform Works</h2>
            <p className="text-xl text-muted-foreground">
              Streamlined workflow that takes you from inquiry to booking in minutes.
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-8">
            {workflow.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                {index < workflow.length - 1 && (
                  <ArrowRight className="h-5 w-5 text-muted-foreground mx-auto mt-4 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Seamless Integrations</h2>
            <p className="text-xl text-muted-foreground">
              Connect with the tools and services you already use.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {integrations.map((integration, index) => (
              <Card key={index} className="text-center p-6">
                <div className="font-semibold mb-1">{integration.name}</div>
                <div className="text-sm text-muted-foreground">{integration.type}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Technical Excellence</h2>
            <p className="text-xl text-muted-foreground">
              Built on modern, secure, and scalable technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Security & Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    SSL/TLS encryption
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    PCI DSS compliance
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    GDPR compliant
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Regular security audits
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance & Reliability</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    99.9% uptime guarantee
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Global CDN network
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Auto-scaling infrastructure
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Real-time monitoring
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Data & Backup</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Daily automated backups
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Multi-region redundancy
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Data encryption at rest
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Disaster recovery plan
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your
            <span className="block bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
              Travel Business?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join hundreds of successful travel agents who have already made the switch to our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/partner-with-us">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                Get Started Today
              </Button>
            </Link>
            <Link href="/why-us">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}