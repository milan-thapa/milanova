'use client'

import { motion } from 'framer-motion'

export default function WhatDrivesUs() {
  const values = [
    {
      icon: '🎯',
      title: 'Our Goal',
      description: 'To deliver work that exceeds expectations, encourages collaboration, and creates real results.',
    },
    {
      icon: '🚀',
      title: 'Our Mission',
      description: 'To help businesses grow by building digital solutions that truly make a difference.',
    },
    {
      icon: '🌟',
      title: 'Our Vision',
      description: 'To be the trusted partner that brings smart, creative technology ideas to life.',
    },
  ]

  return (
    <section className="py-24 bg-[#F8FAF9]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#B5E12A] font-semibold text-sm tracking-widest uppercase mb-4">
            What Drives Us
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0D1F1A] mb-6">
            The principles behind our work
          </h2>
          <p className="text-[#3A4A44] text-lg max-w-2xl mx-auto">
            We are driven by a clear mission, a bold vision, and concrete goals that ensure every project delivers meaningful results.
          </p>
        </motion.div>

        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-10 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="text-5xl mb-6">{value.icon}</div>
              <h3 className="text-[#0D1F1A] font-bold text-2xl mb-4">{value.title}</h3>
              <p className="text-[#3A4A44] leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
