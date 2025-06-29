'use client'

import { FileText, Scale, Shield, AlertTriangle, CheckCircle, Mail } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TermsPage() {
  const lastUpdated = "December 15, 2024"

  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: <CheckCircle className="h-5 w-5" />,
      content: "By accessing and using the Bali Malayali platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
    },
    {
      id: "definitions",
      title: "Definitions",
      icon: <FileText className="h-5 w-5" />,
      content: [
        "\"Platform\" refers to the Bali Malayali website, mobile application, and related services.",
        "\"Partner\" refers to travel agents and agencies who have been approved to use our platform.",
        "\"Services\" refers to all features, tools, and functionalities provided through our platform.",
        "\"Content\" refers to all information, data, text, images, and other materials available on the platform."
      ]
    },
    {
      id: "eligibility",
      title: "Eligibility and Registration",
      icon: <Shield className="h-5 w-5" />,
      content: [
        "You must be at least 18 years old to use our services.",
        "You must be a legitimate travel business or authorized representative.",
        "You must provide accurate and complete information during registration.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You must notify us immediately of any unauthorized use of your account."
      ]
    },
    {
      id: "partner-obligations",
      title: "Partner Obligations",
      icon: <Scale className="h-5 w-5" />,
      content: [
        "Provide accurate business information and maintain current licensing.",
        "Use the platform in compliance with all applicable laws and regulations.",
        "Maintain professional standards in all client interactions.",
        "Protect client personal information and comply with data protection laws.",
        "Pay all fees and commissions as agreed upon in your partner agreement.",
        "Not engage in fraudulent, deceptive, or misleading practices."
      ]
    },
    {
      id: "platform-services",
      title: "Platform Services",
      icon: <FileText className="h-5 w-5" />,
      content: [
        "Quote generation and booking management tools.",
        "Access to our network of Bali service providers.",
        "Payment processing and financial management features.",
        "Customer support and technical assistance.",
        "Training materials and platform documentation.",
        "Marketing and promotional support materials."
      ]
    },
    {
      id: "fees-payments",
      title: "Fees and Payments",
      icon: <Scale className="h-5 w-5" />,
      content: [
        "Commission rates are specified in your individual partner agreement.",
        "Payments are processed according to the payment schedule in your agreement.",
        "All fees are exclusive of applicable taxes unless otherwise stated.",
        "Late payment fees may apply for overdue amounts.",
        "We reserve the right to modify fee structures with 30 days notice."
      ]
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      icon: <Shield className="h-5 w-5" />,
      content: [
        "All platform content, features, and functionality are owned by Bali Malayali.",
        "Partners receive a limited license to use the platform for business purposes.",
        "Partners may not copy, modify, or distribute platform content without permission.",
        "Partners retain ownership of their own business content and client data.",
        "Any feedback or suggestions provided become property of Bali Malayali."
      ]
    },
    {
      id: "prohibited-activities",
      title: "Prohibited Activities",
      icon: <AlertTriangle className="h-5 w-5" />,
      content: [
        "Using the platform for any illegal or unauthorized purpose.",
        "Attempting to gain unauthorized access to platform systems.",
        "Interfering with or disrupting platform services.",
        "Sharing account credentials with unauthorized parties.",
        "Engaging in fraudulent booking or payment activities.",
        "Violating any applicable laws or regulations.",
        "Harassing or threatening other users or our staff."
      ]
    },
    {
      id: "limitation-liability",
      title: "Limitation of Liability",
      icon: <Scale className="h-5 w-5" />,
      content: "To the maximum extent permitted by law, Bali Malayali shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the platform."
    },
    {
      id: "termination",
      title: "Termination",
      icon: <AlertTriangle className="h-5 w-5" />,
      content: [
        "Either party may terminate the agreement with 30 days written notice.",
        "We may terminate immediately for breach of terms or illegal activity.",
        "Upon termination, access to the platform will be revoked.",
        "Outstanding financial obligations survive termination.",
        "Confidentiality obligations continue after termination."
      ]
    }
  ]

  const renderContent = (content: string | string[]) => {
    if (typeof content === 'string') {
      return <p className="text-muted-foreground leading-relaxed">{content}</p>
    }
    return (
      <ul className="space-y-2">
        {content.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-muted-foreground">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mt-2 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Terms of
              <span className="block bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                Service
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              Please read these terms carefully before using our platform and services.
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
                These Terms of Service ("Terms") govern your use of the Bali Malayali platform and services. These Terms constitute a legally binding agreement between you and Bali Malayali. Please read them carefully.
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
              <CardContent>
                {renderContent(section.content)}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Privacy and Data Protection */}
      <section className="py-12 bg-card/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Privacy and Data Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
              </p>
              <Link href="/privacy">
                <Button variant="outline">
                  View Privacy Policy
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Dispute Resolution */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Governing Law</h4>
                <p className="text-muted-foreground">These Terms are governed by the laws of Indonesia, without regard to conflict of law principles.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Arbitration</h4>
                <p className="text-muted-foreground">Any disputes arising from these Terms will be resolved through binding arbitration in Bali, Indonesia.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Mediation</h4>
                <p className="text-muted-foreground">Before pursuing arbitration, parties agree to attempt resolution through good faith mediation.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Force Majeure */}
      <section className="py-12 bg-card/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Force Majeure</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Neither party shall be liable for any failure or delay in performance under these Terms which is due to fire, flood, earthquake, elements of nature, acts of God, acts of war, terrorism, riots, civil disorders, rebellions, or other similar causes beyond the reasonable control of such party.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Modifications */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Modifications to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting the updated Terms on our platform and updating the "Last updated" date. Your continued use of the platform after such modifications constitutes acceptance of the updated Terms.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Severability */}
      <section className="py-12 bg-card/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Severability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect and enforceable.
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
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Email:</strong> legal@balimalayali.com</p>
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