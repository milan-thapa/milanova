'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/constants/animations'
import SectionEyebrow from '@/components/shared/SectionEyebrow'

export default function OurProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Discuss',
      description: 'We start by listening closely to your needs and challenges. This helps us set clear goals and make sure we\'re on the same page before moving forward.',
      bullets: ['Understand goals', 'Define scope', 'Align expectations']
    },
    {
      number: '02',
      title: 'Design',
      description: 'Our designers craft intuitive, visually compelling interfaces tailored to your brand and users.',
      bullets: ['Wireframes', 'UI mockups', 'Prototype review']
    },
    {
      number: '03',
      title: 'Develop',
      description: 'Our engineers build scalable, performant solutions using modern tech stacks.',
      bullets: ['Clean code', 'API integration', 'QA testing']
    },
    {
      number: '04',
      title: 'Deliver',
      description: 'We launch with care, monitor performance, and provide post-launch support.',
      bullets: ['Staging review', 'Go live', 'Ongoing support']
    },
    {
      number: '05',
      title: 'Maintain',
      description: 'We provide continuous maintenance and updates to ensure your solution stays current and performs optimally.',
      bullets: ['Regular updates', 'Security patches', 'Performance optimization']
    },
  ]

  return (
    <section className="py-20 sm:py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative Elements */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-left mb-10 sm:mb-12 md:mb-16">
            <SectionEyebrow label="OUR PROCESS" variant="light" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 sm:mb-6">
              From Idea to
              <br />
              <span className="text-black">Impact</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed">
              Every project begins with listening to your goals, your challenges, and your vision. From there, we move through a structured yet flexible process: discover, design, develop, and deploy.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <div className="relative bg-gray-50 rounded-2xl p-5 sm:p-6 md:p-8 h-full hover:shadow-xl hover:bg-gray-100 transition-all duration-300 border border-gray-200 hover:border-gray-300">
                  <div className="text-black font-bold text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 opacity-30 group-hover:opacity-50 transition-opacity">{step.number}</div>
                  <h3 className="text-black font-bold text-base sm:text-lg md:text-xl mb-2 sm:mb-3 group-hover:text-gray-800 transition-colors">{step.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4 group-hover:text-gray-700 transition-colors">{step.description}</p>
                  
                  {/* Bullets */}
                  <div className="relative z-10 flex flex-wrap gap-2">
                    {step.bullets.map((bullet, i) => (
                      <span
                        key={i}
                        className="bg-gray-200 text-black text-xs sm:text-sm px-3 py-1 rounded-full border border-gray-300"
                      >
                        {bullet}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
