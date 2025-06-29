import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Shield, Lock, Eye, Server, CheckCircle, AlertTriangle, Users, Globe } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description: "Bank-level security protocols protect your business and client data with industry-leading encryption and security measures.",
      details: ["256-bit SSL encryption", "SOC 2 Type II compliance", "Regular security audits"]
    },
    {
      icon: Lock,
      title: "Data Encryption",
      description: "All data is encrypted both in transit and at rest using advanced encryption standards to ensure maximum protection.",
      details: ["AES-256 encryption", "TLS 1.3 protocol", "End-to-end encryption"]
    },
    {
      icon: Eye,
      title: "Access Control",
      description: "Granular permission controls ensure that team members only have access to the data they need for their role.",
      details: ["Role-based access", "Multi-factor authentication", "Session management"]
    },
    {
      icon: Server,
      title: "Secure Infrastructure",
      description: "Our platform runs on secure, monitored infrastructure with 99.9% uptime and automatic failover protection.",
      details: ["AWS infrastructure", "24/7 monitoring", "Automatic backups"]
    }
  ]

  const compliance = [
    {
      title: "GDPR Compliant",
      description: "Full compliance with European data protection regulations",
      icon: Globe
    },
    {
      title: "SOC 2 Type II",
      description: "Audited security controls and procedures",
      icon: CheckCircle
    },
    {
      title: "ISO 27001",
      description: "International security management standards",
      icon: Shield
    },
    {
      title: "PCI DSS",
      description: "Payment card industry data security standards",
      icon: Lock
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80"
          alt="Bali secure technology and digital safety"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-green-500/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 text-white">
              Enterprise Security
              <span className="block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                You Can Trust
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10">
              Your business data and client information are protected by the same security standards used by banks and Fortune 500 companies.
            </p>
            <Link href="/partner-with-us">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                Join for Free & Start Earning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Security Protection</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every aspect of our platform is designed with security in mind, from data storage to user access.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {securityFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {detail}
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

      {/* Compliance Section */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Industry Compliance</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We meet and exceed industry standards for data protection and security compliance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {compliance.map((item, index) => {
              const IconComponent = item.icon
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Security Practices */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Security Practices</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Regular Security Audits</h3>
                    <p className="text-muted-foreground">Third-party security experts regularly audit our systems to identify and address potential vulnerabilities.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Security Training</h3>
                    <p className="text-muted-foreground">Our entire team receives regular security training to ensure best practices are followed at all levels.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Incident Response</h3>
                    <p className="text-muted-foreground">We have a comprehensive incident response plan to quickly address any security concerns that may arise.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <Card className="border-blue-500/30">
                <CardContent className="p-6">
                  <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Lock className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">Security Dashboard</p>
                      <p className="text-xs text-muted-foreground mt-1">Monitoring interface</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Data Protection */}
      <section className="py-20 bg-gradient-to-r from-blue-500/10 to-green-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Your Data Protection Rights</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We respect your privacy and give you full control over your data.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <Eye className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <CardTitle>Data Transparency</CardTitle>
                <CardDescription>
                  You always know what data we collect, how it's used, and who has access to it.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <CardTitle>Data Portability</CardTitle>
                <CardDescription>
                  Export your data at any time in standard formats. Your data belongs to you.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <AlertTriangle className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <CardTitle>Right to Deletion</CardTitle>
                <CardDescription>
                  Request deletion of your data at any time, and we'll remove it from our systems.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Secure Your Business Today
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of travel agents who trust our platform with their most sensitive business data.
          </p>
          <Link href="/partner-with-us">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
              Join for Free & Start Earning
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}