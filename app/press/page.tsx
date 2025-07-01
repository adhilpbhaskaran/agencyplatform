import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Download, ExternalLink, Calendar, Award, Users, TrendingUp, Globe } from 'lucide-react'
import Link from 'next/link'

import Footer from '@/components/footer'

export default function PressPage() {
  const pressReleases = [
    {
      title: "Travel Agent Platform Reaches 10,000 Active Users Milestone",
      date: "March 15, 2024",
      excerpt: "Our platform celebrates a major milestone as we welcome our 10,000th active travel agent, demonstrating the growing demand for digital solutions in the travel industry.",
      category: "Company News",
      link: "#"
    },
    {
      title: "New AI-Powered Quote Generation Feature Launches",
      date: "February 28, 2024",
      excerpt: "Revolutionary AI technology now helps travel agents create personalized quotes 75% faster, setting a new industry standard for efficiency and accuracy.",
      category: "Product Update",
      link: "#"
    },
    {
      title: "Partnership with Bali Tourism Board Announced",
      date: "January 20, 2024",
      excerpt: "Strategic partnership aims to promote sustainable tourism practices and support local travel agents in Bali through enhanced digital tools and training programs.",
      category: "Partnership",
      link: "#"
    },
    {
      title: "$5M Series A Funding Round Completed",
      date: "December 10, 2023",
      excerpt: "Funding will accelerate platform development, expand team, and support international growth as demand for travel agent solutions continues to rise globally.",
      category: "Funding",
      link: "#"
    },
    {
      title: "Platform Wins 'Best Travel Technology Innovation' Award",
      date: "November 5, 2023",
      excerpt: "Recognition from the International Travel Technology Awards highlights our commitment to innovation and excellence in serving the travel agent community.",
      category: "Awards",
      link: "#"
    }
  ]

  const mediaKit = [
    {
      title: "Company Logo Pack",
      description: "High-resolution logos in various formats (PNG, SVG, EPS)",
      size: "2.5 MB",
      type: "ZIP"
    },
    {
      title: "Product Screenshots",
      description: "Platform interface screenshots and feature highlights",
      size: "8.1 MB",
      type: "ZIP"
    },
    {
      title: "Executive Photos",
      description: "Professional headshots of leadership team",
      size: "12.3 MB",
      type: "ZIP"
    },
    {
      title: "Company Fact Sheet",
      description: "Key statistics, milestones, and company information",
      size: "1.2 MB",
      type: "PDF"
    }
  ]

  const mediaFeatures = [
    {
      outlet: "Travel Weekly",
      title: "How Bali-Based Startup is Revolutionizing Travel Agent Operations",
      date: "March 8, 2024",
      type: "Feature Article",
      link: "#"
    },
    {
      outlet: "TechCrunch",
      title: "Travel Agent Platform Raises $5M to Digitize Traditional Travel Business",
      date: "December 12, 2023",
      type: "Funding News",
      link: "#"
    },
    {
      outlet: "Skift",
      title: "The Future of Travel Agents: Digital Tools Driving Industry Growth",
      date: "November 20, 2023",
      type: "Industry Analysis",
      link: "#"
    },
    {
      outlet: "Forbes",
      title: "Young Entrepreneurs Building the Next Generation of Travel Technology",
      date: "October 15, 2023",
      type: "Profile",
      link: "#"
    },
    {
      outlet: "The Jakarta Post",
      title: "Indonesian Travel Tech Startup Gains International Recognition",
      date: "September 28, 2023",
      type: "Local News",
      link: "#"
    }
  ]

  const awards = [
    {
      title: "Best Travel Technology Innovation",
      organization: "International Travel Technology Awards",
      year: "2023",
      description: "Recognized for innovative AI-powered quote generation and automation features."
    },
    {
      title: "Startup of the Year - Travel Category",
      organization: "Southeast Asia Tech Awards",
      year: "2023",
      description: "Honored for outstanding growth and impact in the travel technology sector."
    },
    {
      title: "Digital Innovation Excellence",
      organization: "Bali Digital Economy Forum",
      year: "2023",
      description: "Celebrated for contributing to Bali's digital transformation in tourism."
    },
    {
      title: "Rising Star in Travel Tech",
      organization: "Asia Pacific Travel Innovation Summit",
      year: "2022",
      description: "Early recognition for platform potential and market disruption capabilities."
    }
  ]

  const companyStats = [
    {
      icon: Users,
      value: "10,000+",
      label: "Active Travel Agents",
      description: "Trusted by agents worldwide"
    },
    {
      icon: Globe,
      value: "45+",
      label: "Countries Served",
      description: "Global platform reach"
    },
    {
      icon: TrendingUp,
      value: "300%",
      label: "Year-over-Year Growth",
      description: "Rapid platform adoption"
    },
    {
      icon: Award,
      value: "4",
      label: "Industry Awards",
      description: "Recognition for innovation"
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
              Press & Media
              <span className="block bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                News & Recognition
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Stay updated with our latest news, announcements, and industry recognition. Download our media kit and explore our journey in revolutionizing travel agent operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                <Download className="mr-2 h-5 w-5" />
                Download Media Kit
              </Button>
              <Button size="lg" variant="outline">
                Contact Press Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Company at a Glance</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Key metrics and achievements that showcase our growth and impact in the travel industry.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {companyStats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <h3 className="font-semibold mb-1">{stat.label}</h3>
                    <p className="text-sm text-muted-foreground">{stat.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Latest Press Releases</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Recent announcements and updates from our company.
            </p>
          </div>
          
          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <Badge variant="outline">{release.category}</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{release.date}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-3">{release.title}</h3>
                      <p className="text-muted-foreground mb-4">{release.excerpt}</p>
                    </div>
                    <Button variant="outline" className="ml-6">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              View All Press Releases
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Media Coverage</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Featured stories and mentions in leading industry publications.
            </p>
          </div>
          
          <div className="space-y-4">
            {mediaFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge className="bg-purple-100 text-purple-800">{feature.outlet}</Badge>
                        <Badge variant="outline">{feature.type}</Badge>
                        <span className="text-sm text-muted-foreground">{feature.date}</span>
                      </div>
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 bg-gradient-to-r from-blue-500/10 to-green-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Awards & Recognition</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Industry recognition for our innovation and contribution to travel technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {awards.map((award, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{award.title}</h3>
                      <p className="text-blue-600 font-semibold mb-1">{award.organization}</p>
                      <p className="text-muted-foreground text-sm mb-3">{award.year}</p>
                      <p className="text-muted-foreground">{award.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Media Kit</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Download our media assets, company information, and brand guidelines.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaKit.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <Download className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground mb-4">
                    <span>{item.type}</span>
                    <span>•</span>
                    <span>{item.size}</span>
                  </div>
                  <Button size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="py-20 bg-card/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Press Inquiries</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  For media inquiries, interview requests, or additional information, please contact our press team.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="font-semibold mb-2">Media Contact</h3>
                    <p className="text-muted-foreground mb-1">Emma Thompson</p>
                    <p className="text-muted-foreground mb-1">Head of Marketing</p>
                    <p className="text-blue-600">press@example.com</p>
                    <p className="text-muted-foreground">+62 361 123 4567</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Business Inquiries</h3>
                    <p className="text-muted-foreground mb-1">Sarah Chen</p>
                    <p className="text-muted-foreground mb-1">CEO & Co-Founder</p>
                    <p className="text-blue-600">business@example.com</p>
                    <p className="text-muted-foreground">+62 361 123 4568</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                    Contact Press Team
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline">
                    <Download className="mr-2 h-5 w-5" />
                    Download Media Kit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}