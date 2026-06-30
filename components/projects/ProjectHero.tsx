'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function ProjectHero() {
  const [projectCount, setProjectCount] = useState(0)

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjectCount(data.length || 0)
      })
      .catch(console.error)
  }, [])

  return (
    <section className="relative min-h-[40vh] sm:min-h-[50vh] bg-white flex items-center pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-blue-600 rounded-full" />
            <span className="text-gray-800 text-sm font-medium tracking-wide">OUR PORTFOLIO</span>
          </div>

          {/* Headline */}
          <h1 className="text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 sm:mb-8">
            Every Project is a
            <br />
            <span className="text-blue-600">Collaboration</span>
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed mb-8 sm:mb-10 max-w-3xl">
            We help brands tell their story, solve real problems, and create meaningful user experiences that drive business growth.
          </p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <a
              href="#projects"
              className="inline-flex items-center bg-black text-white rounded-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold hover:bg-gray-800 transition-all hover:scale-105"
            >
              View Recent Projects
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
