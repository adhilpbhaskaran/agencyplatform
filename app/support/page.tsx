'use client'

import { MessageCircle, Phone, Mail, Clock, Book, Video, Users, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const supportChannels = [
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7 Available",
      responseTime: "< 2 minutes",
      action: "Start Chat",
      href: "#chat"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone Support",
      description: "Speak directly with our experts",
      availability: "Mon-Fri 9AM-6PM GMT+8",
      responseTime: "Immediate",
      action: "Call Now",
      href: "tel:+62-361-123-4567"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Support",
      description: "Send us detailed questions or feedback",
      availability: "24/7 Available",
      responseTime: "< 4 hours",
      action: "Send Email",
      href: "mailto:support@balimalayali.com"
    }
  ]

  const supportResources = [
    {
      icon: <Book className="h-6 w-6" />,
      title: "Knowledge Base",
      description: "Comprehensive guides and tutorials",
      articles: "150+ Articles",
      href: "/support/knowledge-base"
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      articles: "50+ Videos",
      href: "/support/tutorials"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Forum",
      description: "Connect with other travel agents",
      articles: "1000+ Members",
      href: "/support/community"
    }
  ]

  const faqItems = [
    {
      question: "How quickly can I start using the platform?",
      answer: "Once approved, you can start using the platform immediately. Our onboarding process takes less than 30 minutes."
    },
    {
      question: "What are the commission rates?",
      answer: "Our commission structure is competitive and transparent. Contact our sales team for detailed pricing information."
    },
    {
      question: "Do you provide training for new partners?",
      answer: "Yes! We offer comprehensive training including live sessions, video tutorials, and dedicated onboarding support."
    },
    {
      question: "Can I customize quotes for my clients?",
      answer: "Absolutely. Our platform allows full customization of quotes, including branding, pricing, and package details."
    },
    {
      question: "What payment methods do you support?",
      answer: "We support all major credit cards, bank transfers, PayPal, and local payment methods in various countries."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Yes, our platform is fully responsive and works perfectly on mobile devices. A dedicated mobile app is coming soon."
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Message Sent Successfully!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Thank you for contacting us. Our support team will get back to you within 4 hours.
          </p>
          <Link href="/support">
            <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
              Back to Support
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              We're Here to
              <span className="block bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                Help You Succeed
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get the support you need, when you need it. Our dedicated team is committed to your success.
            </p>
          </div>
        </div>
      </div>

      {/* Support Channels */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Choose Your Preferred Support Channel</h2>
            <p className="text-xl text-muted-foreground">
              Multiple ways to get help, all designed for your convenience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {supportChannels.map((channel, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mx-auto mb-4 text-white">
                    {channel.icon}
                  </div>
                  <CardTitle>{channel.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{channel.description}</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-green-500" />
                      {channel.availability}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Response time: {channel.responseTime}
                    </div>
                  </div>
                  <Link href={channel.href}>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                      {channel.action}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Self-Service Resources */}
      <section id="knowledge-base" className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Self-Service Resources</h2>
            <p className="text-xl text-muted-foreground">
              Find answers instantly with our comprehensive help resources.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {supportResources.map((resource, index) => (
              <Card key={index} id={index === 2 ? 'community' : undefined}>
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-4 text-white">
                    {resource.icon}
                  </div>
                  <CardTitle>{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{resource.description}</p>
                  <div className="text-sm text-green-600 font-medium mb-4">{resource.articles}</div>
                  <Button variant="outline" className="w-full">
                    {resource.title === 'Community Forum' ? 'Join Community' : 'Explore'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common questions.
            </p>
          </div>
          
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-card/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Send Us a Message</h2>
            <p className="text-xl text-muted-foreground">
              Can't find what you're looking for? Send us a detailed message.
            </p>
          </div>
          
          <Card>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="How can we help you?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please describe your question or issue in detail..."
                    rows={6}
                  />
                </div>
                
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </Button>
                
                <p className="text-sm text-muted-foreground text-center">
                  We typically respond within 4 hours during business hours.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Support Hours */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">Support Hours</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Live Chat & Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Sunday</span>
                      <span className="text-green-600">24/7</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Phone Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday - Sunday</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      GMT+8 (Bali Time)
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}