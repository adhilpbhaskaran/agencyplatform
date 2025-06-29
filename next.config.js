/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Server Actions are enabled by default in Next.js 14
  },
  images: {
    domains: [
      'supabase.co',
      'localhost',
      // Add your Supabase project URL domain here
    ],
  },
  env: {
    NEXT_PUBLIC_APP_NAME: 'Bali Malayali B2B Platform',
    NEXT_PUBLIC_APP_VERSION: '1.0.0',
  },
}

module.exports = nextConfig