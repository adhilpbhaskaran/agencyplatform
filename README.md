# Bali Malayali B2B Travel Platform

A comprehensive B2B travel platform designed specifically for Malayali travel agents specializing in Bali tourism. This platform enables agents to create professional quotes, manage bookings, track payments, and grow their travel business with intelligent pricing and real-time exchange rates.

## 🌟 Features

### Core Functionality
- **Smart Quote Generator**: Create professional quotes with intelligent pricing engine
- **Real-time Pricing**: Dynamic pricing with live exchange rates and automatic margin calculations
- **Client Management**: Comprehensive CRM to manage clients and track interactions
- **Payment Processing**: Multi-currency payment processing with automated commission tracking
- **Analytics Dashboard**: Detailed analytics, conversion rates, and revenue insights
- **White-label PDFs**: Professional, branded quote PDFs with company customization

### Advanced Features
- **Multi-currency Support**: All monetary logic in IDR with display currency conversion
- **Real-time Notifications**: In-app notification system with Supabase Realtime
- **Exchange Rate Monitoring**: Automatic FX rate updates with drift detection
- **Quote Expiry Management**: Automated quote expiration based on time and rate changes
- **Commission Tracking**: Automated commission calculations and payouts
- **Audit Trail**: Comprehensive logging and audit functionality

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Authentication**: Clerk.dev
- **PDF Generation**: Puppeteer
- **UI Components**: Radix UI, Lucide Icons
- **Styling**: Tailwind CSS with custom Bali Malayali branding
- **Database**: PostgreSQL with Row Level Security (RLS)
- **Real-time**: Supabase Realtime subscriptions

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account and project
- Clerk.dev account and application
- Git for version control

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd bali-malayali-b2b-platform
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Copy the example environment file and configure your variables:

```bash
cp .env.local.example .env.local
```

Update `.env.local` with your actual values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Application Configuration
NEXT_PUBLIC_APP_NAME="Bali Malayali"
NEXT_PUBLIC_APP_VERSION="1.0.0"
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Exchange Rate API
EXCHANGE_RATE_API_KEY=your_exchange_rate_api_key

# Other configurations...
```

### 4. Database Setup

#### Initialize Supabase Project

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key to `.env.local`
3. Run the database migrations:

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

#### Manual Database Setup (Alternative)

If you prefer to set up the database manually:

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the contents of `supabase/migrations/20240101000000_initial_schema.sql`
4. Run the contents of `supabase/migrations/20240101000001_demo_data.sql` for sample data

### 5. Clerk Authentication Setup

1. Create a Clerk application at [clerk.dev](https://clerk.dev)
2. Configure your Clerk settings:
   - Enable email/password authentication
   - Set up social providers if desired
   - Configure webhooks for user creation
3. Add your Clerk keys to `.env.local`

### 6. Storage Configuration

Configure Supabase Storage buckets:

1. Go to Storage in your Supabase dashboard
2. Create buckets:
   - `quotes-pdf` (for generated quote PDFs)
   - `agent-logos` (for agent company logos)
3. Set appropriate bucket policies for security

### 7. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
bali-malayali-b2b-platform/
├── app/                    # Next.js 14 app directory
│   ├── dashboard/         # Dashboard pages
│   ├── api/              # API routes
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   └── dashboard/       # Dashboard-specific components
├── lib/                 # Utility functions
│   ├── supabase.ts     # Supabase client
│   └── utils.ts        # General utilities
├── types/              # TypeScript type definitions
│   └── database.ts     # Database types
├── supabase/           # Supabase configuration
│   ├── config.toml     # Supabase config
│   └── migrations/     # Database migrations
├── public/             # Static assets
└── package.json        # Dependencies and scripts
```

## 🔧 Development Phases

The project is organized into phases for systematic development:

- **✅ PHASE 0**: Supabase Schema Setup
- **✅ PHASE 1**: UI Foundation & Authentication
- **🚧 PHASE 2**: Core Quote Management
- **⏳ PHASE 3**: Payment Integration
- **⏳ PHASE 4**: PDF Generation & Storage
- **⏳ PHASE 5**: FX Engine & Expiry Monitor
- **⏳ PHASE 6**: AI Copilot (Optional)

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📊 Database Schema

The platform uses a comprehensive PostgreSQL schema with:

- **Core Tables**: agents, clients, quotes, hotels, transport
- **Financial**: payments, commissions, exchange_rates
- **System**: notifications, audit_logs, retry_queue
- **Analytics**: quote_funnel_events, system_logs

All tables include Row Level Security (RLS) policies for data isolation.

## 🔐 Security Features

- **Authentication**: Clerk.dev integration with social providers
- **Authorization**: Row Level Security (RLS) in Supabase
- **Data Validation**: TypeScript and Zod schema validation
- **API Security**: Rate limiting and input sanitization
- **Audit Trail**: Comprehensive logging of all actions

## 🌍 Internationalization

- **Currency**: All internal calculations in IDR
- **Display**: Multi-currency display with real-time conversion
- **Localization**: Support for English and regional languages

## 📈 Performance Optimizations

- **Database**: Optimized indexes and materialized views
- **Caching**: Redis caching for frequently accessed data
- **CDN**: Static asset delivery via Vercel Edge Network
- **Real-time**: Efficient Supabase Realtime subscriptions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- 📧 Email: support@balimalayali.com
- 📱 WhatsApp: +62 XXX XXX XXXX
- 💬 Discord: [Join our community](https://discord.gg/balimalayali)

## 🙏 Acknowledgments

- Built with ❤️ for the Malayali travel community
- Powered by Supabase and Vercel
- UI components by Radix UI
- Icons by Lucide

---

**Ready to transform your travel business? Let's build something amazing together! 🌴✈️**