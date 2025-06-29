import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Clock, DollarSign, Users, BarChart3, Shield, Smartphone, Globe, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export default function FeaturesPage() {
  const features = [
    {
      icon: Zap,
      title: "Lightning-Fast Quote Generation",
      description: "Create professional quotes in under 2 minutes with our intelligent pricing engine and pre-built templates.",
      benefits: ["Automated pricing calculations", "Professional templates", "Real-time availability"]
    },
    {
      icon: Clock,
      title: "Time-Saving Automation",
      description: "Automate repetitive tasks and focus on what matters most - creating amazing travel experiences for your clients.",
      benefits: ["Automated follow-ups", "Smart scheduling", "Bulk operations"]
    },
    {
      icon: DollarSign,
      title: "Profit Optimization",
      description: "Maximize your margins with intelligent pricing suggestions and performance tracking across all your bookings.",
      benefits: ["Dynamic pricing", "Margin analysis", "Revenue tracking"]
    },
    {
      icon: Users,
      title: "Client Relationship Management",
      description: "Keep track of all client interactions, preferences, and booking history in one centralized dashboard.",
      benefits: ["Client profiles", "Communication history", "Preference tracking"]
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Get insights into your business performance with detailed reports and analytics dashboards.",
      benefits: ["Performance metrics", "Trend analysis", "Custom reports"]
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Your data is protected with bank-level security, encryption, and regular backups.",
      benefits: ["256-bit encryption", "Regular backups", "GDPR compliant"]
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Access your business from anywhere with our responsive design that works perfectly on all devices.",
      benefits: ["Mobile responsive", "Offline capabilities", "Cross-platform sync"]
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Serve international clients with built-in translation and multi-currency support.",
      benefits: ["Multiple languages", "Currency conversion", "Local payment methods"]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-green-500/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
              Powerful Features
              <span className="block bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                Built for Success
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Everything you need to run a successful travel agency in Bali. From quote generation to client management, we've got you covered.
            </p>
            <Link href="/partner-with-us">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                Join for Free & Start Earning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Feature Highlight Section */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Travel Agents Choose Our Platform</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built specifically for the unique challenges of running a travel business in Bali.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">Everything You Need in One Place</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Professional Quote Generation</h4>
                    <p className="text-muted-foreground">Create stunning, professional quotes that impress clients and win more bookings.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Automated Workflows</h4>
                    <p className="text-muted-foreground">Save hours every day with intelligent automation that handles routine tasks.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Real-Time Analytics</h4>
                    <p className="text-muted-foreground">Make data-driven decisions with comprehensive business insights and reporting.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <Card className="border-blue-500/30">
                <CardContent className="p-6">
                  <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">Platform Dashboard</p>
                      <p className="text-xs text-muted-foreground mt-1">Screenshot placeholder</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Travel Business?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join hundreds of successful travel agents who have already upgraded their business with our platform.
          </p>
          <Link href="/partner-with-us">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
              Join for Free & Start Earning
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}