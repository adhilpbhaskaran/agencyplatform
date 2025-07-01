'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'

interface RegistrationFormProps {
  onSuccess?: () => void
}

interface FormData {
  fullName: string
  phone: string
  agentType: 'Travel Agency / Company' | 'Individual / Freelancer' | ''
  companyName: string
  socialHandle: string
  roleInCompany: string
  acceptTerms: boolean
  acceptPrivacy: boolean
}

interface FormErrors {
  fullName?: string
  phone?: string
  agentType?: string
  companyName?: string
  socialHandle?: string
  roleInCompany?: string
  acceptTerms?: string
  acceptPrivacy?: string
  general?: string
}

export default function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    agentType: '',
    companyName: '',
    socialHandle: '',
    roleInCompany: '',
    acceptTerms: false,
    acceptPrivacy: false
  })

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'WhatsApp number is required'
    }

    if (!formData.agentType) {
      newErrors.agentType = 'Please select your agent type'
    }

    if (formData.agentType === 'Travel Agency / Company' && !formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required for Travel Agency / Company'
    }

    if (!formData.socialHandle.trim()) {
      newErrors.socialHandle = 'Website or Instagram URL is required'
    }

    if (!formData.roleInCompany.trim()) {
      newErrors.roleInCompany = 'Your role in the company is required'
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions'
    }

    if (!formData.acceptPrivacy) {
      newErrors.acceptPrivacy = 'You must accept the privacy policy'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Helper function to ensure URL has protocol
  const normalizeUrl = (url: string): string => {
    const trimmedUrl = url.trim()
    if (!trimmedUrl) return trimmedUrl
    
    // Check if URL already has a protocol
    if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
      return trimmedUrl
    }
    
    // Prepend https:// if no protocol is present
    return `https://${trimmedUrl}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      // Normalize the URL before sending to backend
      const normalizedFormData = {
        ...formData,
        socialHandle: normalizeUrl(formData.socialHandle)
      }

      const response = await fetch('/api/agents/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(normalizedFormData),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 409) {
          setErrors({ general: 'You have already registered. Please check your email for approval status.' })
        } else if (data && Array.isArray(data.details)) {
          // Validation errors from server (Zod errors)
          const serverErrors: FormErrors = {}
          data.details.forEach((error: any) => {
            const field = error.path[0] as keyof FormErrors
            serverErrors[field] = error.message
          })
          setErrors(serverErrors)
        } else {
          // Fallback for all other error formats (e.g., internal server errors)
          console.error('Received an unexpected error format from the server:', data)
          setErrors({ general: data?.error || 'An unexpected error occurred. Please try again.' })
        }
        return
      }

      // Success
      setIsSuccess(true)
      if (onSuccess) {
        onSuccess()
      }
      
      // Redirect to dashboard after a short delay - dashboard will handle routing
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)

    } catch (error: any) {
      console.error('Registration error:', error)
      
      // Handle network errors or unexpected response formats
      const responseData = error.response?.data
      
      if (responseData && Array.isArray(responseData.details)) {
        // The old logic can now run safely for Zod validation errors
        const serverErrors: FormErrors = {}
        responseData.details.forEach((err: any) => {
          const field = err.path[0] as keyof FormErrors
          if (field) {
            serverErrors[field] = err.message
          }
        })
        setErrors(serverErrors)
      } else {
        // This is the fallback for all other error formats (e.g., internal server errors)
        console.error('Received an unexpected error format from the server:', responseData)
        setErrors({ general: responseData?.error || 'Network error. Please check your connection and try again.' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Registration Submitted!</h3>
            <p className="text-muted-foreground mb-4">
              Thank you for registering. Your application is now pending admin approval. 
              You'll receive an email notification once your account is approved.
            </p>
            <p className="text-sm text-muted-foreground">
              Redirecting to dashboard...
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Complete Your Registration</CardTitle>
        <p className="text-center text-muted-foreground">
          Please provide the following information to complete your agent registration.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.general && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm text-red-700">{errors.general}</span>
            </div>
          )}

          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="Enter your full name"
              className={errors.fullName ? 'border-red-500' : ''}
            />
            {errors.fullName && (
              <p className="text-sm text-red-600">{errors.fullName}</p>
            )}
          </div>

          {/* WhatsApp Number */}
          <div className="space-y-2">
            <Label htmlFor="phone">WhatsApp Number (with country code) *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="e.g., +62 812 3456 7890"
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && (
              <p className="text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          {/* Agent Type */}
          <div className="space-y-3">
            <Label>Type of Agent *</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="agency"
                  name="agentType"
                  value="Travel Agency / Company"
                  checked={formData.agentType === 'Travel Agency / Company'}
                  onChange={(e) => handleInputChange('agentType', e.target.value as FormData['agentType'])}
                  className="w-4 h-4 text-blue-600"
                />
                <Label htmlFor="agency" className="font-normal cursor-pointer">
                  Travel Agency / Company
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="individual"
                  name="agentType"
                  value="Individual / Freelancer"
                  checked={formData.agentType === 'Individual / Freelancer'}
                  onChange={(e) => handleInputChange('agentType', e.target.value as FormData['agentType'])}
                  className="w-4 h-4 text-blue-600"
                />
                <Label htmlFor="individual" className="font-normal cursor-pointer">
                  Individual / Freelancer
                </Label>
              </div>
            </div>
            {errors.agentType && (
              <p className="text-sm text-red-600">{errors.agentType}</p>
            )}
          </div>

          {/* Company Name - Only show if Travel Agency selected */}
          {formData.agentType === 'Travel Agency / Company' && (
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                type="text"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="Enter your company name"
                className={errors.companyName ? 'border-red-500' : ''}
              />
              {errors.companyName && (
                <p className="text-sm text-red-600">{errors.companyName}</p>
              )}
            </div>
          )}

          {/* Website or Instagram URL */}
          <div className="space-y-2">
            <Label htmlFor="socialHandle">Website or Instagram URL *</Label>
            <Input
              id="socialHandle"
              type="text"
              value={formData.socialHandle}
              onChange={(e) => handleInputChange('socialHandle', e.target.value)}
              placeholder="https://www.yourwebsite.com or https://instagram.com/youraccount"
              className={errors.socialHandle ? 'border-red-500' : ''}
            />
            {errors.socialHandle && (
              <p className="text-sm text-red-600">{errors.socialHandle}</p>
            )}
          </div>

          {/* Role in Company */}
          <div className="space-y-2">
            <Label htmlFor="roleInCompany">Your Role in the Company *</Label>
            <Input
              id="roleInCompany"
              type="text"
              value={formData.roleInCompany}
              onChange={(e) => handleInputChange('roleInCompany', e.target.value)}
              placeholder="e.g., Owner, Sales Manager, Travel Consultant"
              className={errors.roleInCompany ? 'border-red-500' : ''}
            />
            {errors.roleInCompany && (
              <p className="text-sm text-red-600">{errors.roleInCompany}</p>
            )}
          </div>

          {/* Terms and Privacy */}
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={formData.acceptTerms}
                onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                className="w-4 h-4 text-blue-600 mt-1"
              />
              <Label htmlFor="acceptTerms" className="text-sm font-normal cursor-pointer">
                I accept the{' '}
                <Link href="/terms-of-service" className="text-blue-600 hover:underline" target="_blank">
                  Terms and Conditions
                </Link>
                {' '}*
              </Label>
            </div>
            {errors.acceptTerms && (
              <p className="text-sm text-red-600">{errors.acceptTerms}</p>
            )}

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="acceptPrivacy"
                checked={formData.acceptPrivacy}
                onChange={(e) => handleInputChange('acceptPrivacy', e.target.checked)}
                className="w-4 h-4 text-blue-600 mt-1"
              />
              <Label htmlFor="acceptPrivacy" className="text-sm font-normal cursor-pointer">
                I accept the{' '}
                <Link href="/privacy-policy" className="text-blue-600 hover:underline" target="_blank">
                  Privacy Policy
                </Link>
                {' '}*
              </Label>
            </div>
            {errors.acceptPrivacy && (
              <p className="text-sm text-red-600">{errors.acceptPrivacy}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting Registration...
              </>
            ) : (
              'Submit Registration'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}