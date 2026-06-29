'use client'

import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
}

const staggerContainer = {
  whileInView: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

export default function OurStorySection() {
  const milestones = [
    { year: '2019', title: 'The Beginning', description: 'Founded with a vision to transform digital experiences in Nepal' },
    { year: '2020', title: 'First Major Client', description: 'Landed our first enterprise project, establishing our reputation' },
    { year: '2022', title: 'Team Expansion', description: 'Grew from 3 to 15 talented developers and designers' },
    { year: '2024', title: 'Global Reach', description: 'Expanded to serve clients across Asia, Europe, and North America' },
  ]

  return (
    <section className="py-20 sm:py-24 md:py-32 bg-[#F4F9F4] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B5E12A]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1A6B55]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left Content */}
          <div>
            <motion.div variants={fadeInUp} className="inline-block bg-black text-white px-4 sm:px-6 py-2 rounded-lg mb-6">
              <span className="font-semibold tracking-widest text-xs sm:text-sm">OUR STORY</span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0D1F1A] mb-6 sm:mb-8 leading-tight"
            >
              From <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A6B55] to-[#B5E12A]">Passion</span> to
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B5E12A] to-[#1A6B55]">Expertise</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-[#3A4A44] text-base sm:text-lg md:text-xl leading-relaxed mb-8"
            >
              What started as a shared passion for cutting-edge technology has evolved into a thriving hub of creativity and technical excellence. Our founders, with their combined decades of experience in the tech industry, recognized the need for a company that doesn't just deliver projects, but crafts digital experiences that drive real business growth.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-[#3A4A44] text-base sm:text-lg md:text-xl leading-relaxed"
            >
              Today, we stand as Nepal's premier web development company, trusted by startups and enterprises alike to bring their boldest digital visions to life.
            </motion.p>
          </div>

          {/* Right - Timeline */}
          <div className="relative">
            <motion.div variants={fadeInUp} className="space-y-8 sm:space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative pl-8 sm:pl-12">
                  {/* Timeline Line */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#B5E12A] to-[#1A6B55]" />
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-0 w-4 h-4 bg-[#B5E12A] rounded-full border-4 border-white shadow-lg" />
                  
                  <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-[#B5E12A] font-bold text-2xl sm:text-3xl mb-2">{milestone.year}</div>
                    <h3 className="text-[#0D1F1A] font-bold text-lg sm:text-xl mb-3">{milestone.title}</h3>
                    <p className="text-[#3A4A44] text-sm sm:text-base leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
