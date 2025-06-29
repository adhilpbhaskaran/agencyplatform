import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              Last updated: June 15, 2023
            </p>
          </div>

          {/* Privacy Policy Content */}
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  This Privacy Policy describes how we collect, use, and protect your personal information when you use our travel agency platform. We are committed to protecting your privacy and ensuring the security of your personal data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2.1 Personal Information</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We collect personal information that you provide directly to us, including:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>Name, email address, and contact information</li>
                      <li>Business information (company name, address, tax ID)</li>
                      <li>Payment and billing information</li>
                      <li>Travel preferences and booking history</li>
                      <li>Communication records and support interactions</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2.2 Usage Information</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We automatically collect information about how you use our platform, including:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>Device information (IP address, browser type, operating system)</li>
                      <li>Usage patterns and feature interactions</li>
                      <li>Log files and analytics data</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use your personal information for the following purposes:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Providing and maintaining our travel platform services</li>
                  <li>Processing bookings, payments, and transactions</li>
                  <li>Communicating with you about your account and services</li>
                  <li>Providing customer support and technical assistance</li>
                  <li>Improving our platform and developing new features</li>
                  <li>Sending marketing communications (with your consent)</li>
                  <li>Complying with legal obligations and preventing fraud</li>
                  <li>Analyzing usage patterns to enhance user experience</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Information Sharing and Disclosure</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">4.1 Service Providers</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We may share your information with trusted third-party service providers who assist us in operating our platform, including payment processors, hosting providers, and analytics services.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">4.2 Business Partners</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We may share necessary information with hotels, transportation providers, and other travel suppliers to fulfill your bookings and provide services.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">4.3 Legal Requirements</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We may disclose your information when required by law, to protect our rights, or to comply with legal processes and government requests.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication measures</li>
                  <li>Employee training on data protection practices</li>
                  <li>Secure data centers and infrastructure</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. When we no longer need your information, we will securely delete or anonymize it.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Your Rights and Choices</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Access: Request a copy of the personal information we hold about you</li>
                  <li>Correction: Request correction of inaccurate or incomplete information</li>
                  <li>Deletion: Request deletion of your personal information</li>
                  <li>Portability: Request transfer of your data to another service</li>
                  <li>Objection: Object to certain processing of your information</li>
                  <li>Restriction: Request limitation of processing in certain circumstances</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Cookies and Tracking Technologies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to enhance your experience on our platform. These technologies help us:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze platform usage and performance</li>
                  <li>Provide personalized content and recommendations</li>
                  <li>Ensure platform security and prevent fraud</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  You can control cookie settings through your browser preferences, but disabling certain cookies may affect platform functionality.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. International Data Transfers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your information may be transferred to and processed in countries other than your country of residence. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">10. Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our platform is not intended for children under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that we have collected such information, we will take steps to delete it promptly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">11. Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on our platform and updating the "Last updated" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">12. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-card p-6 rounded-lg border">
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>Email:</strong> privacy@agencyplatform.com</p>
                    <p><strong>Address:</strong> Bali, Indonesia</p>
                    <p><strong>Phone:</strong> +62 XXX XXX XXXX</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">13. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  This Privacy Policy is governed by and construed in accordance with the laws of Indonesia. Any disputes arising from this policy will be subject to the exclusive jurisdiction of the courts in Indonesia.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}