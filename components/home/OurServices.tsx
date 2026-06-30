'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ServicesSkeleton } from '@/components/shared/Skeleton'

export default function OurServices() {
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <ServicesSkeleton />
        </div>
      </section>
    )
  }

  if (services.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <p className="text-[#3A4A44]">No services configured. Please add services via admin panel.</p>
        </div>
      </section>
    )
  }
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* ── Header: 2-col layout ── */}
        <div className="mb-12 sm:mb-16">
          <div className="inline-block bg-black text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg mb-4">
            <span className="font-semibold tracking-widest text-xs sm:text-sm">OUR SERVICES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-3 sm:mb-4">
            How Can We Help? Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl text-sm sm:text-base md:text-lg">
            Nepal's leading web development company — trusted by 40+ businesses across Nepal & beyond.
          </p>
        </div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[38%_1fr_1fr] gap-3 sm:gap-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`group relative overflow-hidden rounded-2xl p-5 sm:p-6 md:p-8 lg:p-10 backdrop-blur-xl bg-white/60 border border-white/70 shadow-lg hover:shadow-2xl transition-all duration-300 ${index === 0 ? 'md:col-span-2 lg:col-span-1 lg:row-span-2 min-h-[240px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[480px]' : 'min-h-[160px] sm:min-h-[180px] md:min-h-[200px]'} flex flex-col`}
              whileHover={{ scale: 1.015, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {/* Glass Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold leading-snug mb-2.5 sm:mb-3.5 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}