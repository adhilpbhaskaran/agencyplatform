'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate newsletter subscription
    setIsSubscribed(true)
    setEmail('')
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  const platformLinks = [
    { name: 'Platform Overview', href: '/platform' },
    { name: 'Features', href: '/features' },
    { name: 'Integrations', href: '/integrations' },
    { name: 'Security', href: '/security' }
  ]

  const supportLinks = [
    { name: 'Help Center', href: '/help-center' },
    { name: 'Contact Support', href: '/contact' },
    { name: 'Knowledge Base', href: '/knowledge-base' },
    { name: 'Community Forum', href: '/community-forum' }
  ]

  const companyLinks = [
    { name: 'About Us', href: '/about-us' },
    { name: 'Our Team', href: '/team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' }
  ]

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Cookie Policy', href: '/cookie-policy' },
    { name: 'GDPR', href: '/gdpr' }
  ]

  const quickLinks = [
    { name: 'Why Choose Us', href: '/why-us' },
    { name: 'Partner With Us', href: '/partner-with-us' },
    { name: 'About Bali', href: '/about-bali' },
    { name: 'Pricing', href: '/pricing' }
  ]

  return (
    <footer className="bg-card border-t border-border">
      {/* Newsletter Section */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Stay Updated with
              <span className="block bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                Bali Travel Insights
              </span>
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get the latest travel trends, destination updates, and platform features delivered to your inbox.
            </p>
            
            {isSubscribed ? (
              <div className="text-green-600 font-medium">
                ✓ Thank you for subscribing! Check your email for confirmation.
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BM</span>
              </div>
              <span className="text-xl font-bold">Bali Malayali</span>
            </Link>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Empowering travel agents worldwide to create exceptional Bali experiences. Join our growing network of successful partners.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-blue-500" />
                <span className="text-muted-foreground">hello@balimalayali.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-blue-500" />
                <span className="text-muted-foreground">+62-361-123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span className="text-muted-foreground">Ubud, Bali, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Follow us:</span>
              <div className="flex gap-3">
                <Link href="#" className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
                  <Facebook className="h-4 w-4" />
                </Link>
                <Link href="#" className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-blue-400 hover:text-white transition-colors">
                  <Twitter className="h-4 w-4" />
                </Link>
                <Link href="#" className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors">
                  <Instagram className="h-4 w-4" />
                </Link>
                <Link href="#" className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                  <Linkedin className="h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {legalLinks.map((link, index) => (
                <span key={link.name} className="flex items-center gap-4">
                  <Link href={link.href} className="hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                  {index < legalLinks.length - 1 && <span className="text-border">•</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Bali Malayali. All rights reserved. Made with ❤️ in Bali.
          </p>
        </div>
      </div>
    </footer>
  )
}