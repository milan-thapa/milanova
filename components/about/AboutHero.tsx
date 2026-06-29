'use client'

import { motion } from 'framer-motion'

export default function AboutHero() {
  return (
    <section className="min-h-[50vh] sm:min-h-[60vh] bg-[#1A3028] flex items-start pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 md:pb-12 relative rounded-b-[40px] sm:rounded-b-[60px] lg:rounded-b-[80px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full">
        <div className="text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight mb-6 sm:mb-8">
              Shaping the Future of Digital
              <br />
              Innovation for <span className="text-white">Startups</span>
              <br />
              <span className="text-white">Enterprises,</span> and Industry
              <br />
              Leaders
            </h1>
            <p className="text-[#8FA89E] text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
              We build next-generation web applications, mobile experiences, and scalable e-commerce platforms that drive growth, inspire innovation, and accelerate success. Empowering businesses worldwide to stay ahead in an ever-evolving digital landscape.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
