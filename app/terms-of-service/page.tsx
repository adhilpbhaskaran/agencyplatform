import Footer from '@/components/footer'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">


      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground">
              Last updated: June 15, 2023
            </p>
          </div>

          {/* Terms of Service Content */}
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using our travel agency platform ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our platform provides travel agents with tools and services to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Create and manage travel quotes and itineraries</li>
                  <li>Process bookings and payments</li>
                  <li>Communicate with clients</li>
                  <li>Access real-time pricing and availability</li>
                  <li>Generate professional travel documents</li>
                  <li>Manage business operations and analytics</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. User Accounts and Registration</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">3.1 Account Creation</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      To use our Service, you must create an account by providing accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">3.2 Eligibility</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      You must be at least 18 years old and legally capable of entering into binding contracts to use our Service. By using our Service, you represent and warrant that you meet these requirements.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">3.3 Account Security</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      You are responsible for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account or any other breach of security.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Acceptable Use Policy</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You agree not to use the Service to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon the rights of others</li>
                  <li>Transmit any harmful, threatening, or offensive content</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt the Service or servers</li>
                  <li>Use the Service for any fraudulent or illegal activities</li>
                  <li>Reverse engineer or attempt to extract source code</li>
                  <li>Resell or redistribute the Service without permission</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Payment Terms and Billing</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">5.1 Subscription Fees</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Access to our Service requires payment of subscription fees as outlined in our pricing plans. Fees are billed in advance on a monthly or annual basis, depending on your chosen plan.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">5.2 Transaction Fees</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We may charge transaction fees for bookings processed through our platform. These fees will be clearly disclosed before you complete any transaction.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">5.3 Payment Processing</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      All payments are processed securely through third-party payment processors. You authorize us to charge your designated payment method for all applicable fees.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">5.4 Refunds and Cancellations</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Subscription fees are generally non-refundable. You may cancel your subscription at any time, and cancellation will take effect at the end of your current billing period.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Intellectual Property Rights</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">6.1 Our Rights</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      The Service and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">6.2 Your Content</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      You retain ownership of any content you submit to the Service. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and distribute your content in connection with the Service.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">6.3 Feedback</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Any feedback, suggestions, or improvements you provide regarding the Service may be used by us without any obligation to compensate you.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Privacy and Data Protection</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using the Service, you consent to the collection and use of your information as outlined in our Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Third-Party Services and Content</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our Service may integrate with or contain links to third-party services, websites, or content. We are not responsible for:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>The availability, accuracy, or content of third-party services</li>
                  <li>The privacy practices of third-party providers</li>
                  <li>Any damages or losses caused by third-party services</li>
                  <li>The terms and conditions of third-party providers</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Service Availability and Modifications</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">9.1 Service Availability</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We strive to maintain high service availability but cannot guarantee uninterrupted access. The Service may be temporarily unavailable due to maintenance, updates, or technical issues.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">9.2 Service Modifications</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We reserve the right to modify, suspend, or discontinue any part of the Service at any time. We will provide reasonable notice of significant changes when possible.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">10. Disclaimers and Limitation of Liability</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">10.1 Service Disclaimer</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. We disclaim all warranties, including but not limited to merchantability, fitness for a particular purpose, and non-infringement.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">10.2 Limitation of Liability</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">10.3 Maximum Liability</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Our total liability to you for any claims arising from these Terms or the Service shall not exceed the amount you paid us in the twelve months preceding the claim.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">11. Indemnification</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You agree to indemnify, defend, and hold harmless our company, officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the Service, violation of these Terms, or infringement of any rights of another party.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">12. Termination</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">12.1 Termination by You</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      You may terminate your account at any time by following the cancellation process in your account settings or by contacting our support team.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">12.2 Termination by Us</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We may terminate or suspend your account immediately if you violate these Terms, engage in fraudulent activities, or for any other reason at our sole discretion.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">12.3 Effect of Termination</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Upon termination, your right to use the Service will cease immediately. We may delete your account and data, though some information may be retained as required by law or for legitimate business purposes.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">13. Dispute Resolution</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">13.1 Governing Law</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      These Terms are governed by and construed in accordance with the laws of Indonesia, without regard to conflict of law principles.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">13.2 Jurisdiction</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Any disputes arising from these Terms or the Service will be subject to the exclusive jurisdiction of the courts in Indonesia.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">13.3 Alternative Dispute Resolution</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Before pursuing formal legal action, we encourage you to contact us directly to resolve any disputes. We are committed to working with you to find a mutually acceptable solution.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">14. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the updated Terms on our platform and updating the "Last updated" date. Your continued use of the Service after such changes constitutes acceptance of the new Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">15. Severability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">16. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-card p-6 rounded-lg border">
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>Email:</strong> legal@agencyplatform.com</p>
                    <p><strong>Address:</strong> Bali, Indonesia</p>
                    <p><strong>Phone:</strong> +62 XXX XXX XXXX</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">17. Entire Agreement</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms, together with our Privacy Policy and any other legal notices published by us on the Service, constitute the entire agreement between you and us concerning the Service and supersede all prior agreements and understandings.
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