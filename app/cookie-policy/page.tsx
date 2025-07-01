import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Cookie, Shield, Settings, Info, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'

import Footer from '@/components/footer'

export default function CookiePolicyPage() {
  const cookieTypes = [
    {
      name: "Essential Cookies",
      icon: Shield,
      required: true,
      description: "These cookies are necessary for the website to function and cannot be switched off in our systems.",
      examples: [
        "Authentication cookies to keep you logged in",
        "Security cookies to protect against fraud",
        "Session cookies to maintain your preferences",
        "Load balancing cookies for optimal performance"
      ],
      retention: "Session or up to 1 year",
      color: "bg-green-500"
    },
    {
      name: "Analytics Cookies",
      icon: Info,
      required: false,
      description: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.",
      examples: [
        "Google Analytics for website usage statistics",
        "Heatmap tracking for user behavior analysis",
        "Performance monitoring cookies",
        "A/B testing cookies for feature optimization"
      ],
      retention: "Up to 2 years",
      color: "bg-blue-500"
    },
    {
      name: "Functional Cookies",
      icon: Settings,
      required: false,
      description: "These cookies enable the website to provide enhanced functionality and personalization.",
      examples: [
        "Language preference cookies",
        "Theme and display preference cookies",
        "Form auto-fill cookies",
        "Chat widget functionality cookies"
      ],
      retention: "Up to 1 year",
      color: "bg-purple-500"
    },
    {
      name: "Marketing Cookies",
      icon: Cookie,
      required: false,
      description: "These cookies are used to track visitors across websites to display relevant and engaging advertisements.",
      examples: [
        "Social media integration cookies",
        "Advertising platform cookies",
        "Retargeting and remarketing cookies",
        "Conversion tracking cookies"
      ],
      retention: "Up to 2 years",
      color: "bg-orange-500"
    }
  ]

  const thirdPartyCookies = [
    {
      provider: "Google Analytics",
      purpose: "Website analytics and performance tracking",
      cookies: "_ga, _gid, _gat",
      retention: "Up to 2 years",
      privacyPolicy: "https://policies.google.com/privacy"
    },
    {
      provider: "Google Ads",
      purpose: "Advertising and conversion tracking",
      cookies: "_gcl_au, _gcl_aw",
      retention: "Up to 90 days",
      privacyPolicy: "https://policies.google.com/privacy"
    },
    {
      provider: "Facebook Pixel",
      purpose: "Social media advertising and analytics",
      cookies: "_fbp, _fbc",
      retention: "Up to 90 days",
      privacyPolicy: "https://www.facebook.com/privacy/policy"
    },
    {
      provider: "Intercom",
      purpose: "Customer support chat functionality",
      cookies: "intercom-*",
      retention: "Up to 1 year",
      privacyPolicy: "https://www.intercom.com/legal/privacy"
    },
    {
      provider: "Hotjar",
      purpose: "User behavior analytics and heatmaps",
      cookies: "_hjid, _hjSessionUser_*",
      retention: "Up to 1 year",
      privacyPolicy: "https://www.hotjar.com/legal/policies/privacy"
    }
  ]

  return (
    <div className="min-h-screen bg-background">


      {/* Hero Section */}
      <section className="relative py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-green-500/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full mx-auto mb-8 flex items-center justify-center">
              <Cookie className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
              Cookie Policy
              <span className="block bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                Transparency First
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              We believe in transparency about how we collect and use data. This policy explains how we use cookies and similar technologies on our platform.
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: March 15, 2024
            </p>
          </div>
        </div>
      </section>

      {/* What Are Cookies */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6">What Are Cookies?</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="mb-4">
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.
                </p>
                <p className="mb-4">
                  Cookies allow websites to remember your preferences, login status, and other information that makes your browsing experience more convenient and personalized.
                </p>
                <p>
                  We use cookies and similar technologies to enhance your experience on our platform, analyze usage patterns, and provide personalized content and advertisements.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Types of Cookies */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Types of Cookies We Use</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We use different types of cookies for various purposes. Here's a breakdown of each category:
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {cookieTypes.map((type, index) => {
              const IconComponent = type.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className={`w-12 h-12 ${type.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold">{type.name}</h3>
                          {type.required ? (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Required
                            </Badge>
                          ) : (
                            <Badge variant="outline">
                              <XCircle className="h-3 w-3 mr-1" />
                              Optional
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-4">{type.description}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Examples:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {type.examples.map((example, exampleIndex) => (
                          <li key={exampleIndex} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 mr-2 flex-shrink-0" />
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="text-sm">
                      <span className="font-semibold">Retention Period: </span>
                      <span className="text-muted-foreground">{type.retention}</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Third-Party Cookies */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Third-Party Cookies</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We also use cookies from trusted third-party services to enhance functionality and analyze performance.
            </p>
          </div>
          
          <div className="space-y-4">
            {thirdPartyCookies.map((provider, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-5 gap-4 items-center">
                    <div>
                      <h3 className="font-semibold">{provider.provider}</h3>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted-foreground">{provider.purpose}</p>
                    </div>
                    <div>
                      <p className="text-sm font-mono bg-muted px-2 py-1 rounded">{provider.cookies}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{provider.retention}</span>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={provider.privacyPolicy} target="_blank">
                          Privacy Policy
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Managing Cookies */}
      <section className="py-20 bg-gradient-to-r from-blue-500/10 to-green-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6">Managing Your Cookie Preferences</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Cookie Settings</h3>
                  <p className="text-muted-foreground mb-4">
                    You can manage your cookie preferences at any time by clicking the "Cookie Settings" button in our website footer or by using the button below.
                  </p>
                  <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                    <Settings className="mr-2 h-4 w-4" />
                    Manage Cookie Preferences
                  </Button>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">Browser Settings</h3>
                  <p className="text-muted-foreground mb-4">
                    You can also control cookies through your browser settings. Most browsers allow you to:
                  </p>
                  <ul className="text-muted-foreground space-y-2 ml-6">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 mr-3 flex-shrink-0" />
                      View and delete cookies
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 mr-3 flex-shrink-0" />
                      Block third-party cookies
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 mr-3 flex-shrink-0" />
                      Block all cookies (may affect website functionality)
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 mr-3 flex-shrink-0" />
                      Delete cookies when you close your browser
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">Impact of Disabling Cookies</h3>
                  <p className="text-muted-foreground">
                    Please note that disabling certain cookies may affect the functionality of our website. Essential cookies are required for basic website operation and cannot be disabled.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact and Updates */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Policy Updates</h3>
                <p className="text-muted-foreground mb-4">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
                </p>
                <p className="text-muted-foreground mb-4">
                  When we make changes, we will update the "Last updated" date at the top of this policy and notify you through our website or other appropriate means.
                </p>
                <Button variant="outline">
                  View Privacy Policy
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Questions or Concerns?</h3>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about our use of cookies or this Cookie Policy, please don't hesitate to contact us.
                </p>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <p><strong>Email:</strong> privacy@example.com</p>
                  <p><strong>Address:</strong> Jl. Raya Ubud No. 123, Ubud, Bali 80571, Indonesia</p>
                </div>
                <Link href="/contact">
                  <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-20 bg-card/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Related Information</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/privacy-policy">
              <Button variant="outline" size="lg">
                Privacy Policy
              </Button>
            </Link>
            <Link href="/terms-of-service">
              <Button variant="outline" size="lg">
                Terms of Service
              </Button>
            </Link>
            <Link href="/gdpr">
              <Button variant="outline" size="lg">
                GDPR Information
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}