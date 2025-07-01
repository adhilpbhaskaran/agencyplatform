'use client';

import { useUser } from '@clerk/nextjs'
import RegistrationForm from '@/components/registration-form'
import Footer from '@/components/footer'

export default function RegistrationPage() {
  const { user } = useUser()

  return (
    <div className="min-h-screen bg-background">
      
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Welcome, {user?.firstName || 'Agent'}!
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            You're almost ready to start using our platform. Please complete your registration 
            below to get full access to all features.
          </p>
        </div>

        <RegistrationForm />

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Need help? <a href="/support" className="text-primary hover:underline">Contact our support team</a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}