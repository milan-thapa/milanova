'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/constants/animations'
import SectionEyebrow from '@/components/shared/SectionEyebrow'

export default function OurStorySection() {
  const milestones = [
    { year: '2019', title: 'The Beginning', description: 'Founded with a vision to transform digital experiences in Nepal' },
    { year: '2020', title: 'First Major Client', description: 'Landed our first enterprise project, establishing our reputation' },
    { year: '2022', title: 'Team Expansion', description: 'Grew from 3 to 15 talented developers and designers' },
    { year: '2024', title: 'Global Reach', description: 'Expanded to serve clients across Asia, Europe, and North America' },
  ]

  // Note: These are placeholder milestones. Update with actual company history or create an API endpoint.

  return (
    <section className="py-20 sm:py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative Elements */}

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
            <motion.div variants={fadeInUp}>
              <SectionEyebrow label="OUR STORY" variant="light" />
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 sm:mb-8 leading-tight"
            >
              From <span className="text-black">Passion</span> to
              <br />
              <span className="text-black">Expertise</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed mb-8"
            >
              What started as a shared passion for cutting-edge technology has evolved into a thriving hub of creativity and technical excellence. Our founders, with their combined decades of experience in the tech industry, recognized the need for a company that doesn't just deliver projects, but crafts digital experiences that drive real business growth.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed"
            >
              Today, we stand as Nepal's premier web development company, trusted by startups and enterprises alike to bring their boldest digital visions to life.
            </motion.p>
          </div>

          {/* Right - Timeline */}
          <div className="relative">
            <motion.div variants={fadeInUp} className="space-y-6 sm:space-y-8 md:space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative pl-6 sm:pl-8 md:pl-12">
                  {/* Timeline Line */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-300" />
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-0 w-3 sm:w-4 h-3 sm:h-4 bg-gray-900 rounded-full border-4 border-white shadow-lg" />
                  
                  <motion.div
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                  >
                    <div className="text-black font-bold text-xl sm:text-2xl md:text-3xl mb-2">{milestone.year}</div>
                    <h3 className="text-black font-bold text-base sm:text-lg md:text-xl mb-2 sm:mb-3 hover:text-gray-800 transition-colors">{milestone.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed hover:text-gray-700 transition-colors">{milestone.description}</p>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
