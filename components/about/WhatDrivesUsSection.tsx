'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/constants/animations'
import SectionEyebrow from '@/components/shared/SectionEyebrow'

export default function WhatDrivesUsSection() {
  const values = [
    {
      title: 'Goal',
      description: 'To deliver work that exceeds expectations, encourages collaboration, and creates real results.',
      color: 'from-gray-400 to-gray-600'
    },
    {
      title: 'Mission',
      description: 'To help businesses grow by building digital solutions that truly make a difference.',
      color: 'from-gray-600 to-gray-400'
    },
    {
      title: 'Vision',
      description: 'To be the partner businesses trust to bring smart, creative technology ideas to life.',
      color: 'from-gray-400 to-gray-600'
    },
  ]

  // Note: These are placeholder values. Update with actual company values or create an API endpoint.

  return (
    <section className="py-20 sm:py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative Elements */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-left mb-10 sm:mb-12 md:mb-16">
            <SectionEyebrow label="WHAT DRIVES US" variant="light" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 sm:mb-6">
              The Principles Behind
              <br />
              <span className="text-black">Our Work</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed">
              We are driven by a clear mission, a bold vision, and concrete goals that ensure every project delivers meaningful results for our clients.
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <div className="relative bg-white rounded-2xl p-5 sm:p-6 md:p-8 h-full hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-gray-300">
                  <h3 className="text-black font-bold text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 group-hover:text-gray-800 transition-colors">{value.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed group-hover:text-gray-700 transition-colors">{value.description}</p>
                  
                  {/* Decorative Corner */}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
