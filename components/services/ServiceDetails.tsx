'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/constants/animations'
import { useState, useEffect } from 'react'

export default function ServiceDetails() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/services')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then(data => {
        if (Array.isArray(data)) {
          setServices(data)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section className="py-20 sm:py-24 md:py-32 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center py-12 text-gray-400">Loading services...</div>
        </div>
      </section>
    )
  }

  if (services.length === 0) {
    return (
      <section className="py-20 sm:py-24 md:py-32 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center py-12 text-gray-400">No services available.</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 sm:py-24 md:py-32 bg-gray-50 relative overflow-hidden">
      {/* Decorative Elements */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
      </div>
    </section>
  )
}
