'use client'

import { useEffect } from 'react'

export default function AdminPage() {
  useEffect(() => {
    // Redirect to the admin interface
    window.location.href = '/admin/index.html'
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting to Admin...</h1>
        <p>
          If you are not redirected automatically,{' '}
          <a href="/admin/index.html" className="text-blue-600 hover:text-blue-800">
            click here
          </a>
        </p>
      </div>
    </div>
  )
}