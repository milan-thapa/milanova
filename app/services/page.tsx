'use client'

import { motion } from 'framer-motion'
import OurServices from '@/components/home/OurServices'
import ServiceDetails from '@/components/services/ServiceDetails'

export default function ServicesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] bg-white flex items-center pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-black rounded-full" />
              <span className="text-black/90 text-sm font-medium tracking-wide">OUR SERVICES</span>
            </div>

            {/* Headline */}
            <h1 className="text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 sm:mb-8">
              World-Class
              <br />
              <span className="text-black">Digital Solutions</span>
              <br />
              for Your Business
            </h1>

            {/* Description */}
            <p className="text-black/80 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed mb-8 sm:mb-10 max-w-3xl">
              Nepal's leading web development company — trusted by 40+ businesses across Nepal & beyond to deliver exceptional digital experiences.
            </p>
          </motion.div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Services Section */}
      <OurServices />
      
      {/* Service Details */}
      <ServiceDetails />
    </main>
  )
}
