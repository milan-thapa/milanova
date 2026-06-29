'use client'

import { motion } from 'framer-motion'

const stats = [
  {
    value: '50+',
    label: 'Projects Completed',
    description: 'Delivering excellence across diverse industries',
  },
  {
    value: '9+',
    label: 'Years Experience',
    description: 'Almost a decade of digital innovation',
  },
  {
    value: '20+',
    label: 'Team Members',
    description: 'Skilled professionals passionate about quality',
  },
  {
    value: '15+',
    label: 'Industries Served',
    description: 'Expertise across multiple business sectors',
  },
]

export default function StatsCards() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <p className="text-[#B5E12A] font-semibold text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4">
            Our Impact
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D1F1A] mb-4 sm:mb-6">
            Numbers that speak
          </h2>
          <p className="text-[#3A4A44] text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Our track record demonstrates our commitment to delivering exceptional results for every client.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0D1F1A] rounded-2xl p-5 sm:p-6 md:p-8 text-center hover:bg-[#1A3028] transition-colors"
            >
              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#B5E12A] mb-3 sm:mb-4">
                {stat.value}
              </p>
              <h3 className="text-white text-lg sm:text-xl font-bold mb-2 sm:mb-3">{stat.label}</h3>
              <p className="text-[#8FA89E] text-xs sm:text-sm leading-relaxed">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
