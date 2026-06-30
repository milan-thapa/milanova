import { Metadata } from 'next'
import { Suspense } from 'react'
import CareersClient from './CareersClient'

export const metadata: Metadata = {
  title: 'Careers | Milanova',
  description: 'Join our team and build amazing digital experiences. Explore career opportunities at Milanova.',
  openGraph: {
    title: 'Careers | Milanova',
    description: 'Join our team and build amazing digital experiences. Explore career opportunities at Milanova.',
  },
}

export default function CareersPage() {
  return (
    <Suspense fallback={<CareersLoading />}>
      <CareersClient />
    </Suspense>
  )
}

function CareersLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-20">
        <div>
          <div className="h-12 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3 mb-12"></div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 rounded-xl p-6 h-48"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
