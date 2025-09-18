import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Fresh Blog',
  description: 'A modern blog built with Next.js and Deno',
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
                  Fresh Blog
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