import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Globe, CreditCard, Calendar, Mail, Phone, Database, Cloud } from 'lucide-react'
import Link from 'next/link'

import Footer from '@/components/footer'

export default function IntegrationsPage() {
  const integrations = [
    {
      icon: Globe,
      title: "Booking Platforms",
      description: "Connect with major booking platforms to sync availability and pricing in real-time.",
      partners: ["Booking.com", "Agoda", "Expedia", "Airbnb"]
    },
    {
      icon: CreditCard,
      title: "Payment Gateways",
      description: "Accept payments from clients worldwide with secure, integrated payment processing.",
      partners: ["Stripe", "PayPal", "Midtrans", "Xendit"]
    },
    {
      icon: Calendar,
      title: "Calendar Systems",
      description: "Sync your bookings with popular calendar applications for better schedule management.",
      partners: ["Google Calendar", "Outlook", "Apple Calendar", "Calendly"]
    },
    {
      icon: Mail,
      title: "Email Marketing",
      description: "Automate your marketing campaigns and client communications with integrated email tools.",
      partners: ["Mailchimp", "SendGrid", "ConvertKit", "Campaign Monitor"]
    },
    {
      icon: Phone,
      title: "Communication Tools",
      description: "Stay connected with clients through integrated messaging and communication platforms.",
      partners: ["WhatsApp Business", "Telegram", "Slack", "Microsoft Teams"]
    },
    {
      icon: Database,
      title: "CRM Systems",
      description: "Sync client data with your existing CRM for a unified view of customer relationships.",
      partners: ["Salesforce", "HubSpot", "Pipedrive", "Zoho CRM"]
    },
    {
      icon: Cloud,
      title: "Cloud Storage",
      description: "Backup and sync your documents and files with popular cloud storage services.",
      partners: ["Google Drive", "Dropbox", "OneDrive", "iCloud"]
    },
    {
      icon: Zap,
      title: "Automation Tools",
      description: "Connect with automation platforms to create custom workflows and processes.",
      partners: ["Zapier", "Make", "IFTTT", "Microsoft Power Automate"]
    }
  ]

  return (
    <div className="min-h-screen bg-background">


      {/* Hero Section */}
      <section className="relative py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-green-500/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
              Seamless Integrations
              <span className="block bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                Connect Everything
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Connect your favorite tools and services to create a unified workflow that saves time and increases efficiency.
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

      {/* Integrations Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Connect Your Favorite Tools</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform integrates with the tools you already use, creating a seamless workflow for your travel business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {integrations.map((integration, index) => {
              const IconComponent = integration.icon
              return (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{integration.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {integration.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {integration.partners.map((partner, partnerIndex) => (
                        <div key={partnerIndex} className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                          {partner}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How Integrations Work</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Setting up integrations is simple and takes just a few clicks. No technical knowledge required.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Choose Your Tools</h3>
              <p className="text-muted-foreground">
                Browse our integration marketplace and select the tools you want to connect to your platform.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">One-Click Setup</h3>
              <p className="text-muted-foreground">
                Authenticate your accounts with a simple one-click setup process. No coding or technical setup required.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Start Syncing</h3>
              <p className="text-muted-foreground">
                Your data automatically syncs between platforms, keeping everything up-to-date in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Use Integrations?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Save Time</h3>
                    <p className="text-muted-foreground">Eliminate manual data entry and reduce time spent switching between different tools.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Database className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Reduce Errors</h3>
                    <p className="text-muted-foreground">Automatic data synchronization eliminates human errors and ensures consistency across platforms.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Globe className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Unified Workflow</h3>
                    <p className="text-muted-foreground">Create a seamless workflow that connects all your business tools in one centralized platform.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <Card className="border-blue-500/30">
                <CardContent className="p-6">
                  <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Cloud className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">Integration Dashboard</p>
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
      <section className="py-20 bg-gradient-to-r from-blue-500/10 to-green-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Connect Your Tools?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start building a more efficient workflow today with our powerful integrations.
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