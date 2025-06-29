import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { ArrowRight, Calendar, User, Clock, Tag } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Image from 'next/image'

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80"
          alt="Bali travel blogging and content creation"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-green-500/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-white">
              Travel Industry Insights
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10">
              Expert tips, market trends, and success stories to help you grow your travel business.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Featured Article</h2>
          
          <Card className="overflow-hidden border-blue-500/30">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-green-500/20 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Featured Image</p>
                  <p className="text-xs text-muted-foreground mt-1">Image placeholder</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>June 15, 2023</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>Admin</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-1" />
                    <span>Strategy</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4">
                  How We Helped 10 Travel Agents Double Their Revenue in 6 Months
                </h3>
                
                <p className="text-muted-foreground mb-6">
                  Learn the exact strategies these agents used on our platform to streamline operations, create professional quotes faster, and close more deals with higher profit margins.
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>10 min read</span>
                  </div>
                  
                  <Link href="/blog/how-we-helped-10-travel-agents-double-revenue">
                    <Button variant="outline">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Post 1 */}
            <Card>
              <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-green-500/20 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Article Image</p>
                  <p className="text-xs text-muted-foreground mt-1">Image placeholder</p>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>May 28, 2023</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="h-3 w-3 mr-1" />
                    <span>Marketing</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3">
                  5 Ways to Improve Your Client Communication
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4">
                  Effective communication strategies that will help you build stronger relationships with your travel clients.
                </p>
                
                <Link href="/blog/5-ways-to-improve-client-communication">
                  <Button variant="link" className="px-0">
                    Read More
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            {/* Post 2 */}
            <Card>
              <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-green-500/20 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Article Image</p>
                  <p className="text-xs text-muted-foreground mt-1">Image placeholder</p>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>May 15, 2023</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="h-3 w-3 mr-1" />
                    <span>Technology</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3">
                  Why Digital Transformation is Essential for Travel Agencies
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4">
                  How embracing technology can help your travel agency stay competitive in today's market.
                </p>
                
                <Link href="/blog/digital-transformation-for-travel-agencies">
                  <Button variant="link" className="px-0">
                    Read More
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            {/* Post 3 */}
            <Card>
              <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-green-500/20 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Article Image</p>
                  <p className="text-xs text-muted-foreground mt-1">Image placeholder</p>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>April 30, 2023</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="h-3 w-3 mr-1" />
                    <span>Business</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3">
                  Pricing Strategies That Maximize Your Profit Margins
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4">
                  Learn how to set the right prices for your travel packages to ensure profitability without losing clients.
                </p>
                
                <Link href="/blog/pricing-strategies-for-travel-agents">
                  <Button variant="link" className="px-0">
                    Read More
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            {/* Post 4 */}
            <Card>
              <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-green-500/20 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Article Image</p>
                  <p className="text-xs text-muted-foreground mt-1">Image placeholder</p>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>April 15, 2023</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="h-3 w-3 mr-1" />
                    <span>Success Story</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3">
                  From Struggling to Thriving: One Agent's Journey
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4">
                  How a solo travel agent went from working 80-hour weeks to building a successful agency with our platform.
                </p>
                
                <Link href="/blog/from-struggling-to-thriving">
                  <Button variant="link" className="px-0">
                    Read More
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            {/* Post 5 */}
            <Card>
              <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-green-500/20 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Article Image</p>
                  <p className="text-xs text-muted-foreground mt-1">Image placeholder</p>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>March 28, 2023</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="h-3 w-3 mr-1" />
                    <span>Tips</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3">
                  Creating Irresistible Travel Packages for Luxury Clients
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4">
                  Expert tips on how to craft high-end travel experiences that attract and retain luxury clients.
                </p>
                
                <Link href="/blog/creating-luxury-travel-packages">
                  <Button variant="link" className="px-0">
                    Read More
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            {/* Post 6 */}
            <Card>
              <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-green-500/20 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Article Image</p>
                  <p className="text-xs text-muted-foreground mt-1">Image placeholder</p>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>March 15, 2023</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="h-3 w-3 mr-1" />
                    <span>Industry</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3">
                  2023 Travel Trends: What Agents Need to Know
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4">
                  Stay ahead of the curve with our analysis of emerging travel trends and how to capitalize on them.
                </p>
                
                <Link href="/blog/2023-travel-trends">
                  <Button variant="link" className="px-0">
                    Read More
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500/10 to-green-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Stay Updated with Industry Insights
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Subscribe to our newsletter for the latest travel industry news, tips, and strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-2 rounded-md border border-input bg-background"
            />
            <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}