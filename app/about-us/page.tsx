import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { ArrowRight, Users, Globe, Heart, Target, Award, MapPin } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Image from 'next/image'

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-green-500/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
              Built by Travel Agents,
              <span className="block bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                For Travel Agents.
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              We understand the challenges of running a travel business in Bali because we've been there. Our platform was born from real frustrations and built with real solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  It started with a simple frustration: spending more time on spreadsheets than with clients. As travel agents ourselves, we knew there had to be a better way to manage quotes, bookings, and client relationships.
                </p>
                <p>
                  After countless late nights juggling multiple systems, manual calculations, and unprofessional-looking quotes, we decided to build the platform we wished we had. A system that would let us focus on what we do best—creating amazing travel experiences.
                </p>
                <p>
                  Today, our platform serves hundreds of travel agents across Bali and beyond, helping them save time, increase profits, and deliver professional service that sets them apart from the competition.
                </p>
              </div>
            </div>
            <div>
              <Card className="border-blue-500/30">
                <CardContent className="p-6">
                  <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">Bali Office</p>
                      <p className="text-xs text-muted-foreground mt-1">Photo placeholder</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're committed to empowering travel professionals with the tools they need to succeed in today's competitive market.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Simplicity First</CardTitle>
                <CardDescription>
                  We believe powerful tools should be simple to use. Every feature is designed with the busy travel agent in mind.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Customer Success</CardTitle>
                <CardDescription>
                  Your success is our success. We're not just a software company—we're your partners in growth.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Local Expertise</CardTitle>
                <CardDescription>
                  Built specifically for the Bali travel market, with deep understanding of local needs and challenges.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground">
              A passionate group of travel industry veterans and technology experts.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Founder & CEO</h3>
                <p className="text-muted-foreground mb-4">
                  Former travel agent with 10+ years in Bali tourism industry
                </p>
                <p className="text-sm text-muted-foreground">
                  "I built this platform because I was tired of losing deals to faster competitors."
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Head of Product</h3>
                <p className="text-muted-foreground mb-4">
                  Technology expert with experience in travel and hospitality systems
                </p>
                <p className="text-sm text-muted-foreground">
                  "Every feature we build solves a real problem that travel agents face daily."
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Customer Success Lead</h3>
                <p className="text-muted-foreground mb-4">
                  Dedicated to helping agents maximize their platform usage and profits
                </p>
                <p className="text-sm text-muted-foreground">
                  "Seeing our users grow their business is what motivates me every day."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Press Section */}
      <section id="press" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Press & Recognition</h2>
            <p className="text-xl text-muted-foreground">
              What industry leaders and media are saying about our platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Travel Tech Innovation Award</CardTitle>
                <CardDescription>
                  "Recognized for outstanding innovation in travel technology solutions for small and medium travel agencies."
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Bali Tourism Board</CardTitle>
                <CardDescription>
                  "A game-changing platform that's helping local travel agents compete with international booking platforms."
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Travel Industry Weekly</CardTitle>
                <CardDescription>
                  "This platform is exactly what independent travel agents needed to level the playing field."
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500/10 to-green-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-muted-foreground">
              Numbers that show the difference we're making in the travel industry.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent mb-2">
                500+
              </div>
              <p className="text-muted-foreground">Active Travel Agents</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent mb-2">
                10,000+
              </div>
              <p className="text-muted-foreground">Quotes Generated</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent mb-2">
                90%
              </div>
              <p className="text-muted-foreground">Time Saved</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <p className="text-muted-foreground">Platform Availability</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Become part of a growing network of successful travel agents who have transformed their business with our platform.
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