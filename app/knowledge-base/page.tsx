import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Search, Book, Video, FileText, Download, Clock, User, Star, Filter } from 'lucide-react'
import Link from 'next/link'

import Footer from '@/components/footer'

export default function KnowledgeBasePage() {
  const categories = [
    { name: "Getting Started", count: 12, color: "bg-blue-500" },
    { name: "Quote Management", count: 18, color: "bg-green-500" },
    { name: "Client Management", count: 15, color: "bg-purple-500" },
    { name: "Integrations", count: 14, color: "bg-orange-500" },
    { name: "Billing & Payments", count: 8, color: "bg-red-500" },
    { name: "Troubleshooting", count: 10, color: "bg-yellow-500" }
  ]

  const featuredArticles = [
    {
      title: "Complete Guide to Creating Your First Quote",
      description: "Step-by-step tutorial on creating professional quotes that win more bookings.",
      category: "Getting Started",
      readTime: "8 min read",
      author: "Sarah Chen",
      rating: 4.9,
      type: "guide",
      featured: true
    },
    {
      title: "Advanced Pricing Strategies for Travel Agents",
      description: "Learn how to optimize your pricing to maximize profits while staying competitive.",
      category: "Quote Management",
      readTime: "12 min read",
      author: "Mike Rodriguez",
      rating: 4.8,
      type: "article",
      featured: true
    },
    {
      title: "Setting Up WhatsApp Business Integration",
      description: "Connect WhatsApp to streamline client communication and automate responses.",
      category: "Integrations",
      readTime: "6 min read",
      author: "Lisa Wang",
      rating: 4.7,
      type: "tutorial",
      featured: true
    }
  ]

  const recentArticles = [
    {
      title: "How to Handle Client Objections and Close More Deals",
      description: "Proven techniques for overcoming common objections and converting leads.",
      category: "Client Management",
      readTime: "10 min read",
      author: "David Kim",
      rating: 4.6,
      type: "guide",
      publishedAt: "2 days ago"
    },
    {
      title: "Understanding Performance Discount Tiers",
      description: "Maximize your earnings with our Bronze, Silver, and Gold tier system.",
      category: "Billing & Payments",
      readTime: "5 min read",
      author: "Emma Thompson",
      rating: 4.5,
      type: "article",
      publishedAt: "1 week ago"
    },
    {
      title: "Troubleshooting Common Login Issues",
      description: "Quick solutions for the most common login and access problems.",
      category: "Troubleshooting",
      readTime: "3 min read",
      author: "Alex Johnson",
      rating: 4.4,
      type: "tutorial",
      publishedAt: "1 week ago"
    },
    {
      title: "Customizing Quote Templates for Your Brand",
      description: "Make your quotes stand out with custom branding and professional design.",
      category: "Quote Management",
      readTime: "7 min read",
      author: "Maria Garcia",
      rating: 4.8,
      type: "tutorial",
      publishedAt: "2 weeks ago"
    },
    {
      title: "Integrating with Google Calendar for Better Scheduling",
      description: "Sync your bookings with Google Calendar to never miss an appointment.",
      category: "Integrations",
      readTime: "4 min read",
      author: "James Wilson",
      rating: 4.3,
      type: "tutorial",
      publishedAt: "2 weeks ago"
    },
    {
      title: "Building Long-term Client Relationships",
      description: "Strategies for turning one-time customers into repeat clients and referrals.",
      category: "Client Management",
      readTime: "9 min read",
      author: "Sophie Brown",
      rating: 4.7,
      type: "guide",
      publishedAt: "3 weeks ago"
    }
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'guide': return Book
      case 'tutorial': return Video
      case 'article': return FileText
      default: return FileText
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'guide': return 'Guide'
      case 'tutorial': return 'Tutorial'
      case 'article': return 'Article'
      default: return 'Article'
    }
  }

  return (
    <div className="min-h-screen bg-background">


      {/* Hero Section */}
      <section className="relative py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-green-500/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
              Knowledge Base
              <span className="block bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                Learn & Grow
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Comprehensive guides, tutorials, and articles to help you master our platform and grow your travel business.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Search articles, guides, and tutorials..."
                className="pl-12 pr-4 py-6 text-lg"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find the information you need organized by topic.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                      <Book className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.count} articles</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Featured Articles</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our most comprehensive and popular guides to help you succeed.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {featuredArticles.map((article, index) => {
              const TypeIcon = getTypeIcon(article.type)
              return (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary">{getTypeBadge(article.type)}</Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{article.rating}</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                      <TypeIcon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl line-clamp-2">{article.title}</CardTitle>
                    <CardDescription className="text-base line-clamp-3">
                      {article.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{article.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{article.author}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="mt-4">{article.category}</Badge>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-4">Recent Articles</h2>
              <p className="text-xl text-muted-foreground">
                Stay up to date with our latest guides and tutorials.
              </p>
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {recentArticles.map((article, index) => {
              const TypeIcon = getTypeIcon(article.type)
              return (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <TypeIcon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="secondary" className="text-xs">{getTypeBadge(article.type)}</Badge>
                          <Badge variant="outline" className="text-xs">{article.category}</Badge>
                        </div>
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{article.description}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{article.readTime}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <User className="h-3 w-3" />
                              <span>{article.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{article.rating}</span>
                            </div>
                          </div>
                          <span>{article.publishedAt}</span>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20 bg-gradient-to-r from-blue-500/10 to-green-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Quick Actions</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Can't find what you're looking for? Try these helpful resources.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/contact">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Search className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Contact Support</CardTitle>
                  <CardDescription>Get personalized help from our team</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            
            <Link href="/help-center">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Book className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Help Center</CardTitle>
                  <CardDescription>Browse all support resources</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            
            <Link href="/support#community">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Community Forum</CardTitle>
                  <CardDescription>Connect with other travel agents</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Download className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">Download Resources</CardTitle>
                <CardDescription>Get PDFs, templates, and guides</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}