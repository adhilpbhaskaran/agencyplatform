import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, MapPin, Linkedin, Twitter, Mail, Globe, Users, Award, Heart, Target } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      location: "Ubud, Bali",
      image: "/team/sarah-chen.jpg",
      bio: "Former travel agent with 15+ years in the industry. Built her first agency in Bali and scaled it to 7 figures before founding our platform.",
      expertise: ["Business Strategy", "Travel Industry", "Leadership"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sarah@example.com"
      }
    },
    {
      name: "Michael Rodriguez",
      role: "CTO & Co-Founder",
      location: "Canggu, Bali",
      image: "/team/michael-rodriguez.jpg",
      bio: "Tech entrepreneur with expertise in SaaS platforms. Previously built and sold two successful travel tech companies.",
      expertise: ["Software Development", "Platform Architecture", "AI/ML"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "michael@example.com"
      }
    },
    {
      name: "Lisa Wang",
      role: "Head of Product",
      location: "Seminyak, Bali",
      image: "/team/lisa-wang.jpg",
      bio: "Product designer turned product manager with a passion for creating intuitive user experiences in the travel space.",
      expertise: ["Product Strategy", "UX Design", "User Research"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "lisa@example.com"
      }
    },
    {
      name: "David Kim",
      role: "Head of Customer Success",
      location: "Denpasar, Bali",
      image: "/team/david-kim.jpg",
      bio: "Customer success expert who ensures our travel agents achieve their business goals and maximize platform value.",
      expertise: ["Customer Success", "Training", "Support"],
      social: {
        linkedin: "#",
        email: "david@example.com"
      }
    },
    {
      name: "Emma Thompson",
      role: "Head of Marketing",
      location: "Ubud, Bali",
      image: "/team/emma-thompson.jpg",
      bio: "Digital marketing strategist specializing in travel and hospitality. Helps travel agents build their online presence.",
      expertise: ["Digital Marketing", "Content Strategy", "Brand Building"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "emma@example.com"
      }
    },
    {
      name: "James Wilson",
      role: "Lead Developer",
      location: "Sanur, Bali",
      image: "/team/james-wilson.jpg",
      bio: "Full-stack developer with expertise in modern web technologies. Passionate about building scalable solutions for travel businesses.",
      expertise: ["Full-Stack Development", "API Design", "Performance Optimization"],
      social: {
        linkedin: "#",
        email: "james@example.com"
      }
    },
    {
      name: "Maria Garcia",
      role: "Travel Industry Specialist",
      location: "Jimbaran, Bali",
      image: "/team/maria-garcia.jpg",
      bio: "20+ years in travel operations and tour management. Provides industry insights and helps shape our platform features.",
      expertise: ["Tour Operations", "Industry Relations", "Quality Assurance"],
      social: {
        linkedin: "#",
        email: "maria@example.com"
      }
    },
    {
      name: "Alex Johnson",
      role: "Business Development",
      location: "Kuta, Bali",
      image: "/team/alex-johnson.jpg",
      bio: "Partnership and business development expert focused on expanding our network of travel agents and industry partners.",
      expertise: ["Partnership Development", "Sales Strategy", "Market Expansion"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "alex@example.com"
      }
    }
  ]

  const advisors = [
    {
      name: "Dr. Ketut Suardana",
      role: "Tourism Industry Advisor",
      company: "Former Director, Bali Tourism Board",
      image: "/advisors/ketut-suardana.jpg",
      bio: "30+ years in Bali tourism development and policy. Provides strategic guidance on sustainable tourism practices."
    },
    {
      name: "Jennifer Park",
      role: "Technology Advisor",
      company: "Former VP Engineering, Booking.com",
      image: "/advisors/jennifer-park.jpg",
      bio: "Travel tech veteran with deep expertise in scaling platforms and building robust travel booking systems."
    },
    {
      name: "Roberto Silva",
      role: "Business Strategy Advisor",
      company: "CEO, Global Travel Ventures",
      image: "/advisors/roberto-silva.jpg",
      bio: "Serial entrepreneur and investor in travel technology companies. Guides our growth and expansion strategy."
    }
  ]

  const companyValues = [
    {
      icon: Heart,
      title: "Passion for Travel",
      description: "We're all passionate travelers who understand the magic of exploring new places and cultures."
    },
    {
      icon: Users,
      title: "Community First",
      description: "We believe in building strong relationships and supporting each other's success."
    },
    {
      icon: Target,
      title: "Results Driven",
      description: "We're committed to delivering measurable results that help travel agents grow their businesses."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from product development to customer service."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80"
          alt="Bali team workspace with tropical views"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-green-500/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 text-white">
              Meet Our Team
              <span className="block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Passionate About Travel
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10">
              We're a diverse team of travel enthusiasts, tech experts, and business professionals united by our mission to empower travel agents worldwide.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-white/80">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Based in Bali, Indonesia</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>Serving Agents Globally</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our founders and leaders bring decades of combined experience in travel, technology, and business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {teamMembers.slice(0, 2).map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-green-500 rounded-full mb-6 flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                    <p className="text-lg text-blue-600 font-semibold mb-2">{member.role}</p>
                    <div className="flex items-center text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{member.location}</span>
                    </div>
                    <p className="text-muted-foreground mb-6">{member.bio}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {member.expertise.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      {member.social.linkedin && (
                        <Button variant="outline" size="sm">
                          <Linkedin className="h-4 w-4" />
                        </Button>
                      )}
                      {member.social.twitter && (
                        <Button variant="outline" size="sm">
                          <Twitter className="h-4 w-4" />
                        </Button>
                      )}
                      {member.social.email && (
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Team */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Core Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The talented individuals who make our platform possible and ensure our customers' success.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.slice(2).map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-full mb-4 flex items-center justify-center">
                      <span className="text-xl font-bold text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-semibold mb-2">{member.role}</p>
                    <div className="flex items-center text-muted-foreground text-sm mb-3">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{member.location}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {member.expertise.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      {member.social.linkedin && (
                        <Button variant="outline" size="sm">
                          <Linkedin className="h-3 w-3" />
                        </Button>
                      )}
                      {member.social.twitter && (
                        <Button variant="outline" size="sm">
                          <Twitter className="h-3 w-3" />
                        </Button>
                      )}
                      {member.social.email && (
                        <Button variant="outline" size="sm">
                          <Mail className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Advisory Board</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Industry experts and thought leaders who guide our strategic direction and growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {advisors.map((advisor, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4 flex items-center justify-center">
                      <span className="text-lg font-bold text-white">
                        {advisor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-1">{advisor.name}</h3>
                    <p className="text-purple-600 font-semibold text-sm mb-1">{advisor.role}</p>
                    <p className="text-muted-foreground text-sm mb-3">{advisor.company}</p>
                    <p className="text-muted-foreground text-sm">{advisor.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-gradient-to-r from-blue-500/10 to-green-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do and shape our company culture.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Join Our Team
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            We're always looking for passionate individuals who want to make a difference in the travel industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/careers">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                View Open Positions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}