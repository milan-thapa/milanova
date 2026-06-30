'use client'

import { motion } from 'framer-motion'

export default function StatisticsSection() {
  const stats = [
    { value: '9+', label: 'Years of Experience' },
    { value: '15+', label: 'Industries Covered' },
    { value: '40+', label: 'Projects Completed' },
    { value: '10+', label: 'Trusted Partners' },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D1F1A]">
            Company Expertise Statistics
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-5xl md:text-6xl font-bold text-black mb-2">
                {stat.value}
              </p>
              <p className="text-[#0D1F1A] font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
