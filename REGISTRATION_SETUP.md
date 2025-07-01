# User Registration Flow Setup

This document explains the user registration flow implementation and setup instructions for the platform.

## Overview

The platform implements a three-step registration process:

1. **Initial Sign-up with Clerk** - Quick authentication using social logins or email/password
2. **Complete Registration Form** - Detailed information collection
3. **Admin Approval Process** - Manual approval by administrators

## Implementation Details

### 1. Authentication Flow

- **Clerk Integration**: Users sign up through Clerk's authentication system
- **Automatic Redirect**: After Clerk signup, users are redirected to `/registration`
- **Access Control**: Middleware protects routes based on authentication and approval status

### 2. Registration Pages

#### `/registration` - Main Registration Page
- Checks user's registration status
- Displays registration form for new users
- Redirects approved users to dashboard
- Redirects pending users to pending page

#### `/registration/pending` - Pending Approval Page
- Shows status for users awaiting approval
- Displays registration details
- Provides next steps information

### 3. API Endpoints

#### `POST /api/agents/register`
- Handles new agent registration
- Validates form data using Zod
- Stores agent data in Supabase with `is_approved: false`

#### `GET /api/agents/register`
- Checks user's registration and approval status
- Returns current agent data if exists

#### `GET /api/admin/agents`
- Admin endpoint to fetch all agents
- Supports filtering by status (pending, approved, inactive)
- Includes search and pagination

#### `POST /api/admin/agents/approve`
- Admin endpoint to approve/reject agents
- Updates agent status in database
- Sends email notifications (placeholder implementation)

### 4. Admin Dashboard

#### `/admin/agents` - Agent Management
- View all registered agents
- Filter by approval status
- Search by name, email, or company
- Approve or reject agent applications
- View agent details and registration information

### 5. Access Control

#### Dashboard Protection
- `app/dashboard/layout.tsx` checks agent approval status
- Redirects unapproved users to appropriate pages
- Ensures only approved agents access dashboard features

#### Middleware Configuration
- Public routes: registration pages, marketing pages
- Protected routes: dashboard, admin, API endpoints
- Automatic authentication enforcement

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# Required: Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Required: Supabase Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Required: Admin Configuration
ADMIN_USER_IDS=user_abc123,user_def456  # Comma-separated Clerk user IDs

# Optional: Email notifications
RESEND_API_KEY=your_resend_api_key  # or other email service
FROM_EMAIL=noreply@yourdomain.com
```

### 2. Database Setup

The `agents` table is already configured in your Supabase migration with the required fields:

- `id` (UUID, primary key)
- `clerk_id` (text, unique)
- `email` (text)
- `full_name` (text)
- `phone` (text, optional)
- `company_name` (text, optional)
- `is_approved` (boolean, default: false)
- `is_active` (boolean, default: true)
- `created_at` and `updated_at` timestamps

### 3. Admin User Setup

1. Sign up through Clerk to get your user ID
2. Find your Clerk user ID in the Clerk dashboard
3. Add your user ID to `ADMIN_USER_IDS` in environment variables
4. Restart your application

### 4. Clerk Configuration

In your Clerk dashboard:

1. Set **After sign-up URL** to `/registration`
2. Set **After sign-in URL** to `/dashboard`
3. Configure your preferred authentication methods

## Usage Flow

### For New Users

1. User visits your platform and clicks "Sign Up"
2. Clerk handles authentication (social login or email/password)
3. After successful signup, user is redirected to `/registration`
4. User fills out the detailed registration form
5. Form submission creates agent record with `is_approved: false`
6. User is redirected to `/registration/pending`
7. User waits for admin approval

### For Admins

1. Admin logs in and navigates to `/admin/agents`
2. Admin sees list of pending registrations
3. Admin reviews agent details and approves/rejects
4. System updates agent status and sends notification
5. Approved agents can now access the dashboard

### For Approved Users

1. User logs in through Clerk
2. Middleware checks approval status
3. Approved users are directed to `/dashboard`
4. Full platform access is granted

## Customization Options

### Email Notifications

Implement email notifications in `/api/admin/agents/approve/route.ts`:

```typescript
// Example with Resend
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

async function sendApprovalNotification({ agentEmail, agentName, isApproved }) {
  await resend.emails.send({
    from: process.env.FROM_EMAIL,
    to: agentEmail,
    subject: isApproved ? 'Welcome! Account Approved' : 'Application Update',
    html: generateEmailTemplate({ agentName, isApproved })
  })
}
```

### Additional Form Fields

Modify `components/registration-form.tsx` to add more fields:

1. Update the form schema
2. Add form fields to the UI
3. Update the API endpoint to handle new fields
4. Update database schema if needed

### Custom Admin Roles

Replace the simple `ADMIN_USER_IDS` check with a proper role system:

1. Add roles to your user metadata in Clerk
2. Update `isAdmin` function to check roles
3. Implement granular permissions

## Troubleshooting

### Common Issues

1. **Redirect loops**: Check middleware configuration and route protection
2. **Database errors**: Verify Supabase connection and table schema
3. **Admin access denied**: Ensure user ID is correctly added to `ADMIN_USER_IDS`
4. **Registration form not submitting**: Check API endpoint and validation schema

### Debug Steps

1. Check browser console for JavaScript errors
2. Verify environment variables are loaded
3. Check Supabase logs for database errors
4. Review Clerk dashboard for authentication issues
5. Check server logs for API endpoint errors

## Security Considerations

1. **Admin Access**: Use proper role-based access control in production
2. **API Protection**: All admin endpoints check authentication and authorization
3. **Data Validation**: All form inputs are validated server-side
4. **Environment Variables**: Keep sensitive keys secure and never commit to version control
5. **Database Security**: Use Supabase RLS (Row Level Security) for additional protection

## Next Steps

1. Implement email notifications
2. Add audit logging for admin actions
3. Create admin dashboard analytics
4. Add bulk approval actions
5. Implement agent profile editing
6. Add agent status management (suspend/reactivate)