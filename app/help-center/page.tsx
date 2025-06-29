import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Search, Book, Video, MessageCircle, Phone, Mail, Clock, HelpCircle, FileText } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export default function HelpCenterPage() {
  const helpCategories = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn the basics of using our platform",
      articles: 12,
      topics: ["Account Setup", "First Quote", "Dashboard Overview", "Basic Settings"]
    },
    {
      icon: FileText,
      title: "Quote Management",
      description: "Everything about creating and managing quotes",
      articles: 18,
      topics: ["Creating Quotes", "Pricing Strategies", "Templates", "Client Communication"]
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      articles: 8,
      topics: ["Platform Walkthrough", "Advanced Features", "Tips & Tricks", "Best Practices"]
    },
    {
      icon: MessageCircle,
      title: "Client Management",
      description: "Managing client relationships and data",
      articles: 15,
      topics: ["Client Profiles", "Communication History", "Preferences", "Follow-ups"]
    },
    {
      icon: HelpCircle,
      title: "Troubleshooting",
      description: "Common issues and solutions",
      articles: 10,
      topics: ["Login Issues", "Payment Problems", "Technical Errors", "Performance"]
    },
    {
      icon: Phone,
      title: "Integrations",
      description: "Connecting third-party tools",
      articles: 14,
      topics: ["Payment Gateways", "Calendar Sync", "Email Marketing", "CRM Integration"]
    }
  ]

  const popularArticles = [
    "How to create your first quote in under 5 minutes",
    "Setting up automated follow-up emails",
    "Customizing quote templates for your brand",
    "Understanding pricing tiers and discounts",
    "Integrating with WhatsApp Business",
    "Managing client preferences and history"
  ]

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7",
      action: "Start Chat"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "Response within 2 hours",
      action: "Send Email"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our experts",
      availability: "Mon-Fri 9AM-6PM",
      action: "Call Now"
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
              Help Center
              <span className="block bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                We're Here to Help
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Find answers to your questions, learn how to use our platform, and get the support you need to grow your travel business.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Search for help articles, tutorials, or guides..."
                className="pl-12 pr-4 py-6 text-lg"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Browse Help Topics</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find the information you need organized by category.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                    <CardDescription className="text-base">
                      {category.description}
                    </CardDescription>
                    <div className="text-sm text-muted-foreground">
                      {category.articles} articles
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                          • {topic}
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

      {/* Popular Articles */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Popular Articles</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The most helpful articles based on what other users are reading.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {popularArticles.map((article, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-white">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold hover:text-blue-500 transition-colors">{article}</h3>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Need More Help?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Can't find what you're looking for? Our support team is here to help.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => {
              const IconComponent = option.icon
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{option.title}</CardTitle>
                    <CardDescription className="text-base mb-4">
                      {option.description}
                    </CardDescription>
                    <div className="flex items-center justify-center text-sm text-muted-foreground mb-6">
                      <Clock className="h-4 w-4 mr-2" />
                      {option.availability}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                      {option.action}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 bg-gradient-to-r from-blue-500/10 to-green-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Quick Links</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Jump to the most commonly needed resources.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/support#contact">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader className="text-center">
                  <Mail className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <CardTitle className="text-lg">Contact Support</CardTitle>
                </CardHeader>
              </Card>
            </Link>
            
            <Link href="/support#knowledge-base">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader className="text-center">
                  <Book className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <CardTitle className="text-lg">Knowledge Base</CardTitle>
                </CardHeader>
              </Card>
            </Link>
            
            <Link href="/support#community">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader className="text-center">
                  <MessageCircle className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <CardTitle className="text-lg">Community Forum</CardTitle>
                </CardHeader>
              </Card>
            </Link>
            
            <Link href="/partner-with-us">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader className="text-center">
                  <ArrowRight className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <CardTitle className="text-lg">Get Started</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}