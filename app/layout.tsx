import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ShotLinks - URL Shortener',
  description: 'Create short, memorable links with ShotLinks. Fast, reliable, and secure URL shortening service.',
  keywords: 'URL shortener, link shortener, short links, ShotLinks',
  authors: [{ name: 'ShotLinks Team' }],
  openGraph: {
    title: 'ShotLinks - URL Shortener',
    description: 'Create short, memorable links with ShotLinks',
    type: 'website',
    url: 'https://shotlinks.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShotLinks - URL Shortener',
    description: 'Create short, memorable links with ShotLinks',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#10B981',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: '#EF4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
} 