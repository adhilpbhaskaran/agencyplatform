'use client'

import { Shield, Eye, Lock, Users, Globe, Mail } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PrivacyPage() {
  const lastUpdated = "December 15, 2024"

  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: <Eye className="h-5 w-5" />,
      content: [
        {
          subtitle: "Personal Information",
          text: "We collect information you provide directly to us, such as when you create an account, apply to become a partner, or contact us for support. This may include your name, email address, phone number, business information, and payment details."
        },
        {
          subtitle: "Usage Information",
          text: "We automatically collect information about how you use our platform, including your IP address, browser type, operating system, referring URLs, and pages visited."
        },
        {
          subtitle: "Cookies and Tracking",
          text: "We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide personalized content. You can control cookie settings through your browser."
        }
      ]
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      icon: <Users className="h-5 w-5" />,
      content: [
        {
          subtitle: "Service Provision",
          text: "We use your information to provide, maintain, and improve our platform, process transactions, and deliver customer support."
        },
        {
          subtitle: "Communication",
          text: "We may use your contact information to send you important updates, marketing communications (with your consent), and respond to your inquiries."
        },
        {
          subtitle: "Analytics and Improvement",
          text: "We analyze usage data to understand how our platform is used, identify areas for improvement, and develop new features."
        }
      ]
    },
    {
      id: "information-sharing",
      title: "Information Sharing",
      icon: <Globe className="h-5 w-5" />,
      content: [
        {
          subtitle: "Service Providers",
          text: "We may share your information with trusted third-party service providers who assist us in operating our platform, processing payments, or providing customer support."
        },
        {
          subtitle: "Business Transfers",
          text: "In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction."
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose your information if required by law, court order, or to protect our rights, property, or safety, or that of our users."
        }
      ]
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: <Lock className="h-5 w-5" />,
      content: [
        {
          subtitle: "Security Measures",
          text: "We implement industry-standard security measures to protect your personal information, including encryption, secure servers, and regular security audits."
        },
        {
          subtitle: "Access Controls",
          text: "Access to your personal information is restricted to authorized personnel who need it to perform their job functions."
        },
        {
          subtitle: "Data Breach Response",
          text: "In the unlikely event of a data breach, we will notify affected users and relevant authorities as required by applicable laws."
        }
      ]
    }
  ]

  const rights = [
    "Access your personal information",
    "Correct inaccurate information",
    "Delete your personal information",
    "Restrict processing of your information",
    "Data portability",
    "Object to processing",
    "Withdraw consent"
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Privacy
              <span className="block bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              We are committed to protecting your privacy and ensuring the security of your personal information.
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8">
              <p className="text-muted-foreground text-lg leading-relaxed">
                This Privacy Policy describes how Bali Malayali ("we," "our," or "us") collects, uses, and protects your personal information when you use our platform and services. By using our services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Sections */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {sections.map((section, index) => (
            <Card key={index} id={section.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center text-white">
                    {section.icon}
                  </div>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {section.content.map((item, idx) => (
                  <div key={idx}>
                    <h4 className="font-semibold mb-2">{item.subtitle}</h4>
                    <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Your Rights */}
      <section className="py-12 bg-card/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center text-white">
                  <Users className="h-5 w-5" />
                </div>
                Your Rights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {rights.map((right, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full" />
                    <span className="text-sm">{right}</span>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground mt-6">
                To exercise any of these rights, please contact us using the information provided below.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Cookies Policy */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Cookies and Tracking Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Essential Cookies</h4>
                <p className="text-muted-foreground">Required for the platform to function properly. These cannot be disabled.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Analytics Cookies</h4>
                <p className="text-muted-foreground">Help us understand how you use our platform to improve user experience.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Marketing Cookies</h4>
                <p className="text-muted-foreground">Used to deliver relevant advertisements and track campaign effectiveness.</p>
              </div>
              <p className="text-muted-foreground">
                You can manage your cookie preferences through your browser settings or by contacting us directly.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* International Transfers */}
      <section className="py-12 bg-card/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your personal information.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Data Retention */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Data Retention</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements. When we no longer need your information, we will securely delete or anonymize it.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Children's Privacy */}
      <section className="py-12 bg-card/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Our services are not intended for children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Changes to Policy */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Changes to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center text-white">
                  <Mail className="h-5 w-5" />
                </div>
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Email:</strong> privacy@balimalayali.com</p>
                <p><strong>Phone:</strong> +62-361-123-4567</p>
                <p><strong>Address:</strong> Jl. Raya Ubud No. 123, Ubud, Bali 80571, Indonesia</p>
              </div>
              <div className="mt-8">
                <Link href="/support">
                  <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}