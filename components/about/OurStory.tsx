'use client'

import { motion } from 'framer-motion'

export default function OurStory() {
  const stats = [
    { value: '50+', label: 'Projects Delivered' },
    { value: '9+', label: 'Years Experience' },
    { value: '20+', label: 'Team Members' },
    { value: '15+', label: 'Industries Served' },
  ]

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 md:mb-20"
        >
          <p className="text-[#B5E12A] font-semibold text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4">
            Our Story
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D1F1A] mb-4 sm:mb-6 leading-tight">
            Building digital experiences since 2016
          </h2>
          <p className="text-[#3A4A44] text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
            What started as a small team of passionate developers has grown into a full-service digital agency. Our journey began with a simple belief: that great technology should be accessible to businesses of all sizes.
          </p>
          <p className="text-[#3A4A44] text-sm sm:text-base md:text-lg leading-relaxed">
            Today, we partner with startups and enterprises alike, helping them navigate the digital landscape with confidence. Our team combines deep technical expertise with creative thinking to deliver solutions that not only work but drive measurable results.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#B5E12A] mb-2">
                {stat.value}
              </p>
              <p className="text-[#0D1F1A] text-sm sm:text-base font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
