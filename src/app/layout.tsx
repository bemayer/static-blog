import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Static Blog',
  description: 'A modern static blog built with Next.js and Deno',
  icons: {
    icon: [
      { url: '/static-blog/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/static-blog/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: '/static-blog/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        <div className="min-h-screen">
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-4xl mx-auto px-4 py-6">
              <h1 className="text-2xl font-bold">
                <Link href="/" className="text-gray-900 hover:text-gray-700">
                  Static Blog
                </Link>
              </h1>
            </div>
          </header>
          <main className="max-w-4xl mx-auto px-4 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}