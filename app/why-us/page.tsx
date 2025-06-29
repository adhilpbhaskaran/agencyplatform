import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { ArrowRight, X, CheckCircle, Clock, AlertTriangle, Zap, FileText, DollarSign } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Image from 'next/image'

export default function WhyUsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2020&q=80"
          alt="Bali temple and traditional architecture"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-green-500/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 text-white">
              Stop Juggling Spreadsheets.
              <span className="block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Start Selling.
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10">
              We built a platform that works the way you do—fast, professional, and profitable.
            </p>
          </div>
        </div>
      </section>

      {/* Before & After Showcase */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* BEFORE: The Chaos */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-lg mb-6">
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-red-400">BEFORE: The Chaos</h2>
                <h3 className="text-2xl font-semibold mb-6">The 2 AM Panic.</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Cross-referencing three outdated spreadsheets, a dozen WhatsApp chats, and a volatile currency website just to confirm a hotel price for a client who needed it an hour ago. Sound familiar? The manual process is not just slow; it's costing you money and client confidence.
                </p>
              </div>
              
              <Card className="border-red-500/30 bg-red-500/5">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <X className="h-5 w-5 text-red-500" />
                      <span className="text-sm">Multiple spreadsheets to cross-reference</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <X className="h-5 w-5 text-red-500" />
                      <span className="text-sm">Manual currency calculations</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <X className="h-5 w-5 text-red-500" />
                      <span className="text-sm">Hours spent on each quote</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <X className="h-5 w-5 text-red-500" />
                      <span className="text-sm">Unprofessional email attachments</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <X className="h-5 w-5 text-red-500" />
                      <span className="text-sm">Lost deals due to slow response</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AFTER: The Control */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-lg mb-6">
                  <Zap className="h-8 w-8 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-green-400">AFTER: The Control</h2>
                <h3 className="text-2xl font-semibold mb-6">The 5-Minute Masterpiece.</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A single click. Live hotel rates, transport costs, and your profit margin are calculated instantly. A professional, branded PDF is generated and ready to send. This is the new standard of B2B travel in Bali.
                </p>
              </div>
              
              <Card className="border-green-500/30 bg-green-500/5">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm">Real-time pricing engine</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm">Automatic currency conversion</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm">5-minute quote generation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm">Professional branded PDFs</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm">Win more deals with speed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Platform Screenshot Placeholder */}
              <Card className="border-green-500/30">
                <CardContent className="p-6">
                  <div className="aspect-video bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">Professional Quote Editor UI</p>
                      <p className="text-xs text-muted-foreground mt-1">Screenshot placeholder</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The Difference is Clear</h2>
            <p className="text-xl text-muted-foreground">
              See why hundreds of travel agents have made the switch to our platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Save 90% of Your Time</CardTitle>
                <CardDescription>
                  What used to take hours now takes minutes. Spend your time selling, not calculating.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Increase Your Margins</CardTitle>
                <CardDescription>
                  Real-time pricing and transparent costs help you price competitively while protecting your profits.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Impress Your Clients</CardTitle>
                <CardDescription>
                  Professional, branded quotes that make you look like the premium agency you are.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500/10 to-green-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Leave the Chaos Behind?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join hundreds of successful agents who have already transformed their business with our platform.
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