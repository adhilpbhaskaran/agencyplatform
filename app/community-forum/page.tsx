import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowRight, Search, MessageCircle, Users, TrendingUp, Clock, Heart, Reply, Pin, Star, Filter } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export default function CommunityForumPage() {
  const forumCategories = [
    {
      title: "General Discussion",
      description: "Share experiences and connect with fellow travel agents",
      topics: 156,
      posts: 1240,
      icon: MessageCircle,
      color: "bg-blue-500"
    },
    {
      title: "Platform Help",
      description: "Get help with platform features and troubleshooting",
      topics: 89,
      posts: 567,
      icon: Users,
      color: "bg-green-500"
    },
    {
      title: "Business Tips",
      description: "Share strategies for growing your travel business",
      topics: 134,
      posts: 892,
      icon: TrendingUp,
      color: "bg-purple-500"
    },
    {
      title: "Success Stories",
      description: "Celebrate wins and inspire others with your achievements",
      topics: 67,
      posts: 234,
      icon: Star,
      color: "bg-orange-500"
    }
  ]

  const featuredTopics = [
    {
      title: "How I increased my booking rate by 40% in 3 months",
      author: {
        name: "Sarah Chen",
        avatar: "/avatars/sarah.jpg",
        badge: "Gold Member"
      },
      category: "Success Stories",
      replies: 23,
      likes: 45,
      lastActivity: "2 hours ago",
      isPinned: true,
      excerpt: "I want to share the strategies that helped me dramatically improve my conversion rate..."
    },
    {
      title: "Best practices for handling difficult clients?",
      author: {
        name: "Mike Rodriguez",
        avatar: "/avatars/mike.jpg",
        badge: "Silver Member"
      },
      category: "Business Tips",
      replies: 18,
      likes: 32,
      lastActivity: "4 hours ago",
      isPinned: false,
      excerpt: "I've been struggling with some challenging clients lately. What are your go-to strategies..."
    },
    {
      title: "WhatsApp integration not working - need help!",
      author: {
        name: "Lisa Wang",
        avatar: "/avatars/lisa.jpg",
        badge: "Bronze Member"
      },
      category: "Platform Help",
      replies: 12,
      likes: 8,
      lastActivity: "6 hours ago",
      isPinned: false,
      excerpt: "I'm trying to set up the WhatsApp integration but keep getting an error message..."
    }
  ]

  const recentTopics = [
    {
      title: "Tips for pricing tours during peak season",
      author: {
        name: "David Kim",
        avatar: "/avatars/david.jpg",
        badge: "Gold Member"
      },
      category: "Business Tips",
      replies: 15,
      likes: 28,
      lastActivity: "1 hour ago",
      excerpt: "Peak season is coming up and I'm wondering how everyone adjusts their pricing..."
    },
    {
      title: "New feature request: Bulk quote templates",
      author: {
        name: "Emma Thompson",
        avatar: "/avatars/emma.jpg",
        badge: "Silver Member"
      },
      category: "Platform Help",
      replies: 7,
      likes: 12,
      lastActivity: "3 hours ago",
      excerpt: "Would love to see a feature that allows creating multiple quote templates at once..."
    },
    {
      title: "Celebrating 100 bookings this month! 🎉",
      author: {
        name: "Alex Johnson",
        avatar: "/avatars/alex.jpg",
        badge: "Bronze Member"
      },
      category: "Success Stories",
      replies: 25,
      likes: 67,
      lastActivity: "5 hours ago",
      excerpt: "Just hit a major milestone and wanted to share my excitement with the community..."
    },
    {
      title: "How do you handle last-minute cancellations?",
      author: {
        name: "Maria Garcia",
        avatar: "/avatars/maria.jpg",
        badge: "Gold Member"
      },
      category: "Business Tips",
      replies: 19,
      likes: 31,
      lastActivity: "8 hours ago",
      excerpt: "Had three cancellations this week and it's really affecting my revenue. Any advice..."
    },
    {
      title: "Platform update feedback - new dashboard",
      author: {
        name: "James Wilson",
        avatar: "/avatars/james.jpg",
        badge: "Silver Member"
      },
      category: "Platform Help",
      replies: 11,
      likes: 16,
      lastActivity: "12 hours ago",
      excerpt: "Thoughts on the new dashboard layout? I'm finding it a bit confusing to navigate..."
    },
    {
      title: "Networking event in Ubud - who's interested?",
      author: {
        name: "Sophie Brown",
        avatar: "/avatars/sophie.jpg",
        badge: "Gold Member"
      },
      category: "General Discussion",
      replies: 8,
      likes: 14,
      lastActivity: "1 day ago",
      excerpt: "Planning a casual meetup for local travel agents. Would love to meet some of you in person..."
    }
  ]

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Gold Member': return 'bg-yellow-500'
      case 'Silver Member': return 'bg-gray-400'
      case 'Bronze Member': return 'bg-orange-600'
      default: return 'bg-blue-500'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-green-500/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
              Community Forum
              <span className="block bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                Connect & Learn
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Join thousands of travel agents sharing experiences, tips, and supporting each other's success.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Search discussions, topics, or users..."
                className="pl-12 pr-4 py-6 text-lg"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                Search
              </Button>
            </div>
            
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
              Start New Discussion
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Forum Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Forum Categories</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore different topics and find the discussions that interest you most.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {forumCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-xl mb-2">{category.title}</h3>
                        <p className="text-muted-foreground mb-4">{category.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{category.topics} topics</span>
                          <span>•</span>
                          <span>{category.posts} posts</span>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Topics */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Featured Discussions</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Popular and pinned topics that are generating great conversations.
            </p>
          </div>
          
          <div className="space-y-6">
            {featuredTopics.map((topic, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={topic.author.avatar} alt={topic.author.name} />
                      <AvatarFallback>{topic.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        {topic.isPinned && <Pin className="h-4 w-4 text-blue-500" />}
                        <Badge variant="outline">{topic.category}</Badge>
                        <Badge className={`text-xs ${getBadgeColor(topic.author.badge)} text-white`}>
                          {topic.author.badge}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-lg mb-2 line-clamp-1">{topic.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{topic.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="font-medium">{topic.author.name}</span>
                          <div className="flex items-center space-x-1">
                            <Reply className="h-4 w-4" />
                            <span>{topic.replies}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span>{topic.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{topic.lastActivity}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Topics */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-4">Recent Discussions</h2>
              <p className="text-xl text-muted-foreground">
                Stay up to date with the latest conversations in the community.
              </p>
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
          
          <div className="space-y-4">
            {recentTopics.map((topic, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={topic.author.avatar} alt={topic.author.name} />
                      <AvatarFallback>{topic.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline" className="text-xs">{topic.category}</Badge>
                        <Badge className={`text-xs ${getBadgeColor(topic.author.badge)} text-white`}>
                          {topic.author.badge}
                        </Badge>
                      </div>
                      <h3 className="font-semibold mb-1 line-clamp-1">{topic.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-1">{topic.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span className="font-medium">{topic.author.name}</span>
                          <div className="flex items-center space-x-1">
                            <Reply className="h-3 w-3" />
                            <span>{topic.replies}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-3 w-3" />
                            <span>{topic.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{topic.lastActivity}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Discussions
            </Button>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-20 bg-gradient-to-r from-blue-500/10 to-green-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Community Stats</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how our community is growing and thriving together.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent mb-2">
                2,500+
              </div>
              <p className="text-muted-foreground">Active Members</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent mb-2">
                450+
              </div>
              <p className="text-muted-foreground">Topics Created</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent mb-2">
                3,200+
              </div>
              <p className="text-muted-foreground">Posts & Replies</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent mb-2">
                95%
              </div>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Join the Conversation
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Connect with fellow travel agents, share your experiences, and grow your business together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
              Start New Discussion
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link href="/partner-with-us">
              <Button size="lg" variant="outline">
                Join the Platform
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}