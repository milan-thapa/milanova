'use client'

import { motion } from 'framer-motion'

export default function ProjectHero() {
  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] bg-gradient-to-br from-[#082E23] via-[#1A3028] to-[#0D1F1A] flex items-center pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#B5E12A]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#1A6B55]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#B5E12A]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-[#B5E12A] rounded-full" />
            <span className="text-white/90 text-sm font-medium tracking-wide">OUR PORTFOLIO</span>
          </div>

          {/* Headline */}
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 sm:mb-8">
            Every Project is a
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B5E12A] to-[#1A6B55]">Collaboration</span>
          </h1>

          {/* Description */}
          <p className="text-white/80 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed mb-8 sm:mb-10 max-w-3xl">
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
              className="inline-flex items-center gap-2 bg-[#B5E12A] text-[#0D1F1A] rounded-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold hover:bg-[#A3D01F] transition-all hover:scale-105"
            >
              View Recent Projects
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
