'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function StartProject() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="relative py-20 sm:py-24 md:py-32 bg-black overflow-hidden">
      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 text-left"
      >
        <motion.h2
          variants={itemVariants}
          className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6"
        >
          Start your Project
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-white/90 text-base sm:text-lg md:text-xl max-w-2xl mb-8 leading-relaxed"
        >
          Let's build something remarkable together. Reach out for a free architectural consultation and we'll analyze your needs.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Link
            href="https://wa.me/9779762415657"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-black rounded-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold hover:scale-105 hover:bg-gray-200 transition-all duration-300"
          >
            Start your Project
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
