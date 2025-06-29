'use client'

import { Users, Target, Award, Globe, Heart, Zap, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AboutPage() {
  const values = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Passion for Bali",
      description: "We live and breathe Bali. Our deep connection to the island drives everything we do."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Partner Success",
      description: "Your success is our success. We're committed to helping every partner thrive."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Innovation",
      description: "We continuously innovate to stay ahead of industry trends and technology."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Reach",
      description: "Connecting Bali with the world through our network of travel professionals."
    }
  ]

  const milestones = [
    {
      year: "2019",
      title: "Company Founded",
      description: "Started with a vision to revolutionize Bali travel booking"
    },
    {
      year: "2020",
      title: "First 100 Partners",
      description: "Reached our first major milestone during challenging times"
    },
    {
      year: "2021",
      title: "Platform Launch",
      description: "Launched our comprehensive travel agent platform"
    },
    {
      year: "2022",
      title: "International Expansion",
      description: "Expanded to serve travel agents in 25+ countries"
    },
    {
      year: "2023",
      title: "500+ Partners",
      description: "Built a thriving community of successful travel agents"
    },
    {
      year: "2024",
      title: "AI Integration",
      description: "Introduced AI-powered quote generation and optimization"
    }
  ]

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      bio: "Former travel industry executive with 15+ years experience. Passionate about connecting people with Bali's magic.",
      expertise: "Travel Industry, Business Strategy"
    },
    {
      name: "Priya Nair",
      role: "Head of Operations",
      bio: "Operations expert who ensures our platform runs smoothly 24/7. Based in Bali for 8+ years.",
      expertise: "Operations, Process Optimization"
    },
    {
      name: "Arjun Menon",
      role: "Head of Technology",
      bio: "Tech visionary building the future of travel booking. Former Silicon Valley engineer.",
      expertise: "Software Development, AI/ML"
    },
    {
      name: "Lakshmi Pillai",
      role: "Head of Partner Success",
      bio: "Dedicated to helping our partners succeed. Expert in travel agent training and support.",
      expertise: "Partner Relations, Training"
    }
  ]

  const stats = [
    { number: "500+", label: "Active Partners" },
    { number: "50+", label: "Countries Served" },
    { number: "$2M+", label: "Revenue Generated" },
    { number: "10,000+", label: "Happy Travelers" }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              About
              <span className="block bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                Bali Malayali
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're on a mission to make Bali accessible to travelers worldwide while empowering travel agents with the tools they need to succeed.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2019 by a group of travel industry veterans and Bali enthusiasts, Bali Malayali was born from a simple observation: booking authentic Bali experiences was unnecessarily complicated and expensive.
                </p>
                <p>
                  We saw travel agents struggling with outdated systems, limited local knowledge, and complex booking processes. Meanwhile, travelers were missing out on the true magic of Bali due to generic, overpriced packages.
                </p>
                <p>
                  Our solution? A platform that combines deep local expertise with cutting-edge technology, empowering travel agents to offer authentic, competitively-priced Bali experiences while building profitable businesses.
                </p>
                <p>
                  Today, we're proud to serve over 500 travel agents across 50+ countries, helping them create unforgettable Bali experiences for thousands of travelers every year.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center p-6">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg">
                  To democratize access to authentic Bali experiences by empowering travel agents worldwide with the tools, knowledge, and support they need to create exceptional journeys for their clients.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg">
                  To become the world's leading platform for Bali travel, known for our commitment to authenticity, sustainability, and the success of our partners and their clients.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mx-auto mb-4 text-white">
                    {value.icon}
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground">
              Key milestones in our growth story.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {milestones.map((milestone, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent mb-2">
                    {milestone.year}
                  </div>
                  <CardTitle>{milestone.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
            <p className="text-xl text-muted-foreground">
              Meet the passionate individuals driving our mission forward.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-center">{member.name}</CardTitle>
                  <p className="text-center text-blue-600 font-medium">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-center">{member.bio}</p>
                  <div className="text-center">
                    <span className="text-sm font-medium">Expertise: </span>
                    <span className="text-sm text-muted-foreground">{member.expertise}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment to Sustainability */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Commitment to Bali</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We believe in responsible tourism that benefits local communities and preserves Bali's natural beauty for future generations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Local Partnerships
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We work exclusively with local Balinese businesses, ensuring tourism revenue stays in the community.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Environmental Protection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We promote eco-friendly accommodations and activities that minimize environmental impact.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Cultural Preservation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We support authentic cultural experiences that respect and preserve Balinese traditions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Join Our
            <span className="block bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
              Growing Family
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Become part of a community that's passionate about Bali and committed to your success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/partner-with-us">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                Partner With Us
              </Button>
            </Link>
            <Link href="/support">
              <Button size="lg" variant="outline">
                Contact Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}