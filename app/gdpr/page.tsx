import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Shield, Eye, Download, Trash2, Edit, Lock, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export default function GDPRPage() {
  const dataRights = [
    {
      icon: Eye,
      title: "Right to Access",
      description: "You have the right to request access to your personal data and receive information about how we process it.",
      action: "Request Data Access",
      timeframe: "Within 30 days"
    },
    {
      icon: Edit,
      title: "Right to Rectification",
      description: "You can request correction of inaccurate or incomplete personal data we hold about you.",
      action: "Request Data Correction",
      timeframe: "Within 30 days"
    },
    {
      icon: Trash2,
      title: "Right to Erasure",
      description: "You can request deletion of your personal data under certain circumstances (\"right to be forgotten\").",
      action: "Request Data Deletion",
      timeframe: "Within 30 days"
    },
    {
      icon: Lock,
      title: "Right to Restrict Processing",
      description: "You can request that we limit the processing of your personal data in specific situations.",
      action: "Request Processing Restriction",
      timeframe: "Within 30 days"
    },
    {
      icon: Download,
      title: "Right to Data Portability",
      description: "You can request to receive your personal data in a structured, machine-readable format.",
      action: "Request Data Export",
      timeframe: "Within 30 days"
    },
    {
      icon: Shield,
      title: "Right to Object",
      description: "You can object to the processing of your personal data for direct marketing or other legitimate interests.",
      action: "Object to Processing",
      timeframe: "Immediate for marketing"
    }
  ]

  const dataCategories = [
    {
      category: "Account Information",
      description: "Data you provide when creating and managing your account",
      examples: [
        "Name and contact information",
        "Email address and phone number",
        "Business information and preferences",
        "Profile photo and bio"
      ],
      legalBasis: "Contract performance",
      retention: "Until account deletion + 7 years for legal compliance"
    },
    {
      category: "Platform Usage Data",
      description: "Information about how you use our platform and services",
      examples: [
        "Login and activity logs",
        "Feature usage and preferences",
        "Quote and booking history",
        "Communication records"
      ],
      legalBasis: "Legitimate interest",
      retention: "3 years from last activity"
    },
    {
      category: "Customer Data",
      description: "Information about your clients that you store on our platform",
      examples: [
        "Client contact information",
        "Travel preferences and history",
        "Booking and payment records",
        "Communication history"
      ],
      legalBasis: "Contract performance",
      retention: "As per your data retention settings"
    },
    {
      category: "Technical Data",
      description: "Technical information collected automatically",
      examples: [
        "IP address and device information",
        "Browser type and version",
        "Cookies and tracking data",
        "Performance and error logs"
      ],
      legalBasis: "Legitimate interest",
      retention: "Up to 2 years"
    }
  ]

  const securityMeasures = [
    {
      title: "Data Encryption",
      description: "All personal data is encrypted both in transit and at rest using industry-standard encryption protocols."
    },
    {
      title: "Access Controls",
      description: "Strict access controls ensure only authorized personnel can access personal data on a need-to-know basis."
    },
    {
      title: "Regular Audits",
      description: "We conduct regular security audits and assessments to identify and address potential vulnerabilities."
    },
    {
      title: "Data Minimization",
      description: "We only collect and process personal data that is necessary for the specified purposes."
    },
    {
      title: "Incident Response",
      description: "We have established procedures for detecting, investigating, and responding to data security incidents."
    },
    {
      title: "Staff Training",
      description: "All staff receive regular training on data protection principles and GDPR compliance requirements."
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
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full mx-auto mb-8 flex items-center justify-center">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
              GDPR Compliance
              <span className="block bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                Your Data Rights
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              We are committed to protecting your personal data and respecting your privacy rights under the General Data Protection Regulation (GDPR).
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                GDPR Compliant
              </Badge>
              <span>Last updated: March 15, 2024</span>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6">What is GDPR?</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="mb-4">
                  The General Data Protection Regulation (GDPR) is a comprehensive data protection law that came into effect on May 25, 2018. It applies to all organizations that process personal data of individuals in the European Union, regardless of where the organization is located.
                </p>
                <p className="mb-4">
                  GDPR gives individuals greater control over their personal data and requires organizations to be transparent about how they collect, use, and protect personal information.
                </p>
                <p>
                  As a travel agent platform serving users globally, including those in the EU, we are fully committed to GDPR compliance and protecting your privacy rights.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Your Rights */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Your Data Protection Rights</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Under GDPR, you have several rights regarding your personal data. Here's how you can exercise them:
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dataRights.map((right, index) => {
              const IconComponent = right.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg mb-4 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{right.title}</h3>
                    <p className="text-muted-foreground mb-4">{right.description}</p>
                    <div className="space-y-2">
                      <Button size="sm" className="w-full">
                        {right.action}
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        Response time: {right.timeframe}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          
          <div className="text-center mt-12">
            <Card className="inline-block">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Need to Exercise Your Rights?</h3>
                <p className="text-muted-foreground mb-4">
                  Contact our Data Protection Officer to submit a request or ask questions about your data rights.
                </p>
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                  Contact Data Protection Officer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Data We Collect */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Data We Collect and Process</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We are transparent about what personal data we collect, why we collect it, and how long we keep it.
            </p>
          </div>
          
          <div className="space-y-8">
            {dataCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="grid lg:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{category.category}</h3>
                      <p className="text-muted-foreground mb-4">{category.description}</p>
                      <div className="space-y-2">
                        <Badge variant="outline">{category.legalBasis}</Badge>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Examples include:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {category.examples.map((example, exampleIndex) => (
                          <li key={exampleIndex} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 mr-2 flex-shrink-0" />
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Retention Period:</h4>
                      <p className="text-sm text-muted-foreground">{category.retention}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Measures */}
      <section className="py-20 bg-gradient-to-r from-blue-500/10 to-green-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How We Protect Your Data</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We implement comprehensive technical and organizational measures to ensure the security of your personal data.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityMeasures.map((measure, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg mb-4 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{measure.title}</h3>
                  <p className="text-muted-foreground">{measure.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Data Processing Basis */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6">Legal Basis for Processing</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Contract Performance</h3>
                  <p className="text-muted-foreground">
                    We process your personal data to provide our travel agent platform services, manage your account, and fulfill our contractual obligations to you.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">Legitimate Interest</h3>
                  <p className="text-muted-foreground">
                    We may process your data for our legitimate business interests, such as improving our services, preventing fraud, and ensuring platform security. We always balance these interests against your privacy rights.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">Consent</h3>
                  <p className="text-muted-foreground">
                    For certain activities like marketing communications or optional features, we rely on your explicit consent. You can withdraw consent at any time.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">Legal Compliance</h3>
                  <p className="text-muted-foreground">
                    We may process your data to comply with legal obligations, such as tax requirements, anti-money laundering regulations, or responding to legal requests.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Data Transfers */}
      <section className="py-20 bg-card/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6">International Data Transfers</h2>
              
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Our platform is hosted and operated from various locations worldwide. When we transfer your personal data outside the European Economic Area (EEA), we ensure appropriate safeguards are in place:
                </p>
                
                <ul className="text-muted-foreground space-y-2 ml-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span>Standard Contractual Clauses (SCCs) approved by the European Commission</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span>Adequacy decisions for countries with equivalent data protection standards</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span>Certification schemes and codes of conduct where applicable</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span>Additional technical and organizational security measures</span>
                  </li>
                </ul>
                
                <p className="text-muted-foreground">
                  For more details about our data transfer practices, please contact our Data Protection Officer.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Data Protection Officer</h3>
                <p className="text-muted-foreground mb-4">
                  Our Data Protection Officer is responsible for overseeing our GDPR compliance and handling data protection inquiries.
                </p>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <p><strong>Email:</strong> dpo@example.com</p>
                  <p><strong>Address:</strong> Jl. Raya Ubud No. 123, Ubud, Bali 80571, Indonesia</p>
                  <p><strong>Response Time:</strong> Within 30 days</p>
                </div>
                <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                  Contact DPO
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Supervisory Authority</h3>
                <p className="text-muted-foreground mb-4">
                  If you're not satisfied with our response to your data protection concerns, you have the right to lodge a complaint with your local supervisory authority.
                </p>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <p><strong>EU Residents:</strong> Contact your national data protection authority</p>
                  <p><strong>Find Your Authority:</strong> ec.europa.eu/justice/data-protection</p>
                </div>
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  File a Complaint
                </Button>
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
            <Link href="/cookie-policy">
              <Button variant="outline" size="lg">
                Cookie Policy
              </Button>
            </Link>
            <Link href="/terms-of-service">
              <Button variant="outline" size="lg">
                Terms of Service
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}