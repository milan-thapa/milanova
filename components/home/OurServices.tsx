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
      <section className="py-20 bg-[#EDF3EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <ServicesSkeleton />
        </div>
      </section>
    )
  }

  if (services.length === 0) {
    return (
      <section className="py-20 bg-[#EDF3EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <p className="text-[#3A4A44]">No services configured. Please add services via admin panel.</p>
        </div>
      </section>
    )
  }
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#EDF3EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* ── Header: 2-col layout ── */}
        <div className="mb-12">
          <div className="inline-block bg-black text-white px-4 sm:px-6 py-2 rounded-lg mb-4">
            <span className="font-semibold tracking-widest text-xs sm:text-sm">OUR SERVICES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0D1F1A] mb-3">
            How Can We Help ? Our Services
          </h2>
          <p className="text-[#3A4A44] max-w-2xl text-sm sm:text-base">
            Nepal's leading web development company — trusted by 40+ businesses across Nepal & beyond.
          </p>
        </div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[38%_1fr_1fr] gap-3.5">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`bg-black rounded-2xl p-5 sm:p-7 md:p-9 text-white ${index === 0 ? 'md:col-span-2 lg:col-span-1 lg:row-span-2 min-h-[280px] sm:min-h-[320px] md:min-h-[350px] lg:min-h-[480px]' : 'min-h-[180px] sm:min-h-[200px] md:min-h-[220px]'} flex flex-col`}
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            >
              <h3 className="text-xl sm:text-2xl font-extrabold leading-snug mb-3.5">
                {service.title}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}