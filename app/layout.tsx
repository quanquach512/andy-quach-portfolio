import type { Metadata } from 'next'
import { DM_Sans, Fira_Code } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AdminProvider } from '@/components/admin/admin-provider'
import { LoginModal } from '@/components/admin/login-modal'
import { AdminDashboard } from '@/components/admin/admin-dashboard'

import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-sans'
});

const firaCode = Fira_Code({ 
  subsets: ["latin"],
  variable: '--font-mono'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://andyquach.dev'),

  title: {
    default: 'Andy Quach | Software Engineer',
    template: '%s | Andy Quach',
  },

  description:
    'Full-stack software engineer specializing in building modern web applications with Next.js and AWS.',

  openGraph: {
    title: 'Andy Quach | Software Engineer',
    description:
      'Full-stack software engineer specializing in building modern web applications with Next.js and AWS.',
    url: 'https://andyquach.dev',
    siteName: 'Andy Quach Portfolio',
    type: 'website',
    images: [
      {
        url: "https://andyquach.dev/og.png",
        width: 1200,
        height: 630,
        alt: 'Andy Quach Portfolio',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Andy Quach | Software Engineer',
    description:
      'Full-stack software engineer specializing in building modern web applications with Next.js and AWS.',
    images: ['/og.png'],
  },

  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${firaCode.variable} bg-background`}>
      <body className="font-sans antialiased">
        <AdminProvider>
          {children}
          <LoginModal />
          <AdminDashboard />
        </AdminProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
