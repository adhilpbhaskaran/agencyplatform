import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { z } from 'zod'

// Check if user is admin (you may want to implement proper admin role checking)
const isAdmin = async (userId: string): Promise<boolean> => {
  // For now, we'll check if the user is in a list of admin user IDs
  // In production, you should implement proper role-based access control
  const adminUserIds = process.env.ADMIN_USER_IDS?.split(',') || []
  return adminUserIds.includes(userId)
}

// Validation schema
const approvalSchema = z.object({
  agentId: z.string().uuid('Invalid agent ID'),
  isApproved: z.boolean(),
  reason: z.string().optional() // Optional reason for rejection
})

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is admin
    if (!(await isAdmin(userId))) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const { agentId, isApproved, reason } = approvalSchema.parse(body)

    const supabase = await createSupabaseServerClient()

    // First, check if the agent exists
    const { data: existingAgent, error: fetchError } = await supabase
      .from('agents')
      .select('id, name, email, is_approved, clerk_id')
      .eq('id', agentId)
      .single()

    if (fetchError || !existingAgent) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      )
    }

    // Update the agent's approval status
    const { data: updatedAgent, error: updateError } = await supabase
      .from('agents')
      .update({
        is_approved: isApproved,
  
      })
      .eq('id', agentId)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating agent approval status:', updateError)
      return NextResponse.json(
        { error: 'Failed to update agent status' },
        { status: 500 }
      )
    }

    // TODO: Send email notification to the agent
    // You can implement email notifications here using your preferred email service
    // For example, using Resend, SendGrid, or AWS SES
    
    try {
      // Example email notification (implement based on your email service)
      await sendApprovalNotification({
        agentEmail: existingAgent.email,
        agentName: existingAgent.name,
        isApproved,
        reason
      })
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError)
      // Don't fail the request if email fails, just log it
    }

    // TODO: Add admin action logging if needed

    return NextResponse.json({
      message: `Agent ${isApproved ? 'approved' : 'rejected'} successfully`,
      agent: {
        id: updatedAgent.id,
        fullName: updatedAgent.name,
        email: updatedAgent.email,
        isApproved: updatedAgent.is_approved,
        updatedAt: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Agent approval API error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: error.errors
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Email notification function (implement based on your email service)
async function sendApprovalNotification({
  agentEmail,
  agentName,
  isApproved,
  reason
}: {
  agentEmail: string
  agentName: string
  isApproved: boolean
  reason?: string
}) {
  // TODO: Implement email notification
  // This is a placeholder - implement with your preferred email service
  
  const subject = isApproved 
    ? 'Welcome! Your agent account has been approved'
    : 'Update on your agent application'

  const message = isApproved
    ? `Hi ${agentName},\n\nGreat news! Your agent account has been approved. You can now access the full platform and start creating quotes for your clients.\n\nLogin to your dashboard: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard\n\nWelcome to the team!`
    : `Hi ${agentName},\n\nThank you for your interest in becoming an agent. Unfortunately, we cannot approve your application at this time.${reason ? `\n\nReason: ${reason}` : ''}\n\nIf you have any questions, please contact our support team.`

  console.log('Email notification (not implemented):', {
    to: agentEmail,
    subject,
    message
  })

  // Example implementation with a hypothetical email service:
  // await emailService.send({
  //   to: agentEmail,
  //   subject,
  //   text: message,
  //   html: generateEmailTemplate({ agentName, isApproved, reason })
  // })
}