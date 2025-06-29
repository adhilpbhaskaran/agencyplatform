import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, CheckCircle, Star, Award, Users, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Bali beach sunset with traditional boats"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-green-500/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 text-white">
              A Partnership That Pays
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10">
              Our platform is 100% free for travel agents. No subscriptions, no hidden fees. We only succeed when you do.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              A simple, transparent 2-step process that puts you in control.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <Card className="relative">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <CardTitle className="text-2xl">You Sell & Add Your Markup</CardTitle>
                <CardDescription className="text-lg">
                  Use our platform to create professional quotes with our confidential net rates. You have complete freedom to add your own profit margin or service fee on top of the final price you show your client.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="relative">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <CardTitle className="text-2xl">You Get Paid, We Share</CardTitle>
                <CardDescription className="text-lg">
                  After your client pays, you receive the full amount, including your markup. Our commission is then calculated on the B2B net price of the booking. It's that simple and transparent.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Performance Discount Tiers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The More You Book, The Better Your Rates</h2>
            <p className="text-xl text-muted-foreground">
              All partners start with our competitive standard rates. As your booking volume increases, you automatically unlock Performance Discounts, increasing your profitability.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Bronze Tier */}
            <Card className="relative">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className="bg-amber-600/20 text-amber-400 border-amber-600/30">
                    Bronze
                  </Badge>
                  <Users className="h-6 w-6 text-amber-400" />
                </div>
                <CardTitle className="text-xl mb-2">For new partners getting started</CardTitle>
                <CardDescription className="text-sm mb-4">
                  0-10 Bookings / Quarter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-2xl font-bold text-amber-400 mb-1">Standard Rate</div>
                    <div className="text-sm text-muted-foreground">Performance Discount</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">90% of Net Rate</div>
                    <div className="text-sm text-muted-foreground">Your Payout</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Standard Email</div>
                    <div className="text-sm text-muted-foreground">Support Level</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Silver Tier */}
            <Card className="relative border-blue-500/50 bg-gradient-to-b from-blue-500/5 to-transparent">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-blue-600/20 text-blue-400 border-blue-600/30">
                    Silver
                  </Badge>
                  <TrendingUp className="h-6 w-6 text-blue-400" />
                </div>
                <CardTitle className="text-xl mb-2">For established agents with consistent volume</CardTitle>
                <CardDescription className="text-sm mb-4">
                  11-25 Bookings / Quarter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-2xl font-bold text-blue-400 mb-1">2% Extra Discount</div>
                    <div className="text-sm text-muted-foreground">Performance Discount</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">92% of Net Rate</div>
                    <div className="text-sm text-muted-foreground">Your Payout</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Priority Email</div>
                    <div className="text-sm text-muted-foreground">Support Level</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gold Tier */}
            <Card className="relative border-green-500/50 bg-gradient-to-b from-green-500/5 to-transparent">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-green-600/20 text-green-400 border-green-600/30">
                    Gold
                  </Badge>
                  <Award className="h-6 w-6 text-green-400" />
                </div>
                <CardTitle className="text-xl mb-2">For our top-performing power agents</CardTitle>
                <CardDescription className="text-sm mb-4">
                  26+ Bookings / Quarter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-2xl font-bold text-green-400 mb-1">5% Extra Discount</div>
                    <div className="text-sm text-muted-foreground">Performance Discount</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">95% of Net Rate</div>
                    <div className="text-sm text-muted-foreground">Your Payout</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Dedicated Account Manager</div>
                    <div className="text-sm text-muted-foreground">Support Level</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500/10 to-green-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Earning More?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join hundreds of successful agents who are already maximizing their profits with our transparent partnership model.
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