'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/constants/animations'

export default function AboutHero() {
  return (
    <section className="relative min-h-[50vh] sm:min-h-[60vh] bg-white flex items-center pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-black rounded-full" />
            <span className="text-black/90 text-sm font-medium tracking-wide">ABOUT MILANOVA</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 sm:mb-8"
          >
            Shaping the Future of
            <br />
            <span className="text-black">Digital Innovation</span>
            <br />
            for Startups, Enterprises & Industry Leaders
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-black/80 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed mb-8 sm:mb-10 max-w-3xl"
          >
            We build next-generation web applications, mobile experiences, and scalable e-commerce platforms that drive growth, inspire innovation, and accelerate success.
          </motion.p>
        </motion.div>
      </div>

    </section>
  )
}
