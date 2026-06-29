'use client'

import { motion } from 'framer-motion'

export default function WhatDrivesUsSection() {
  const values = [
    {
      title: 'Goal',
      description: 'To deliver work that exceeds expectations, encourages collaboration, and creates real results.',
    },
    {
      title: 'Mission',
      description: 'To help businesses grow by building digital solutions that truly make a difference.',
    },
    {
      title: 'Vision',
      description: 'To be the partner businesses trust to bring smart, creative technology ideas to life.',
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#0D1F1A] mb-6">
            WHAT <span className="text-black">DRIVES</span> US
          </h2>
          <p className="text-2xl md:text-3xl font-medium text-[#3A4A44] mb-8">
            The Principles Behind Our Work
          </p>
          <p className="text-[#3A4A44] text-lg leading-relaxed">
            We are driven by a clear mission, a bold vision, and concrete goals that ensure every project delivers meaningful results for our clients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#F8FAF9] rounded-2xl p-8 text-center hover:shadow-md transition-shadow"
            >
              <h3 className="text-black font-bold text-2xl mb-4">{value.title}</h3>
              <p className="text-[#3A4A44] leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
