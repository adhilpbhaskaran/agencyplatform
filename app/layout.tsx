// app/layout.tsx
import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import { QueryProvider } from '@/components/providers/query-provider';
import ConditionalHeader from '@/components/layout/conditional-header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bali Malayali B2B Platform',
  description: 'The Ultimate B2B Platform for Bali Travel',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en" className="dark">
        <body className={inter.className}>
          <ConditionalHeader />
          <QueryProvider>
            <main>{children}</main>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}