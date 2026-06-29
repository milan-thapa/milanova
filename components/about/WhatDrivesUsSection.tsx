'use client'

import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
}

const staggerContainer = {
  whileInView: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

export default function WhatDrivesUsSection() {
  const values = [
    {
      icon: '🎯',
      title: 'Goal',
      description: 'To deliver work that exceeds expectations, encourages collaboration, and creates real results.',
      color: 'from-[#B5E12A] to-[#1A6B55]'
    },
    {
      icon: '🚀',
      title: 'Mission',
      description: 'To help businesses grow by building digital solutions that truly make a difference.',
      color: 'from-[#1A6B55] to-[#B5E12A]'
    },
    {
      icon: '👁️',
      title: 'Vision',
      description: 'To be the partner businesses trust to bring smart, creative technology ideas to life.',
      color: 'from-[#B5E12A] to-[#1A6B55]'
    },
  ]

  return (
    <section className="py-20 sm:py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B5E12A]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-block bg-[#1A6B55] text-white px-4 sm:px-6 py-2 rounded-lg mb-6">
              <span className="font-semibold tracking-widest text-xs sm:text-sm">WHAT DRIVES US</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0D1F1A] mb-6">
              The Principles Behind
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A6B55] to-[#B5E12A]">Our Work</span>
            </h2>
            <p className="text-[#3A4A44] text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              We are driven by a clear mission, a bold vision, and concrete goals that ensure every project delivers meaningful results for our clients.
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative"
              >
                <div className="relative bg-gradient-to-br from-[#F4F9F4] to-white rounded-3xl p-8 sm:p-10 h-full hover:shadow-2xl transition-all duration-500 border border-[#E8EDE9] hover:border-[#B5E12A]/30 overflow-hidden">
                  {/* Background Gradient on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Icon */}
                  <div className="text5xl sm:text-6xl mb-6">{value.icon}</div>
                  
                  {/* Title */}
                  <h3 className="text-[#0D1F1A] font-bold text-2xl sm:text-3xl mb-4">{value.title}</h3>
                  
                  {/* Description */}
                  <p className="text-[#3A4A44] text-sm sm:text-base leading-relaxed">{value.description}</p>
                  
                  {/* Decorative Corner */}
                  <div className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-br ${value.color} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
