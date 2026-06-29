'use client'

import { motion } from 'framer-motion'

export default function OurStorySection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mb-16 text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0D1F1A] mb-6">
              OUR <span className="text-black">STORY</span>
            </h2>
            <p className="text-2xl md:text-3xl font-medium text-[#3A4A44] mb-8">
              From <span className="text-black">Passion</span> to <span className="text-black">Expertise</span>
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#3A4A44] text-lg leading-relaxed"
          >
            What started as a shared passion for cutting-edge technology has evolved into a thriving hub of creativity and technical excellence. Our founders, with their combined decades of experience in the tech industry, recognized the need for a company that doesn't just deliver projects, but crafts digital experiences that drive real business growth.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
