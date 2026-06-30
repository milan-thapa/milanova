'use client'

import { motion } from 'framer-motion'
import SectionEyebrow from '@/components/shared/SectionEyebrow'

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

export default function WhyWeMatterSection() {
  const features = [
    {
      title: 'Experience That Counts',
      description: 'With founding members who bring 9+ years of industry experience, we\'ve seen technologies evolve and understand what truly works in real-world applications.',
      color: 'from-gray-400 to-gray-600'
    },
    {
      title: 'Collaborative Approach',
      description: 'Our multidisciplinary team works as one cohesive unit, ensuring that design, development, project management, and business strategy are perfectly aligned.',
      color: 'from-gray-600 to-gray-400'
    },
    {
      title: 'Quality-First Mindset',
      description: 'We\'re committed to delivering solutions that don\'t just meet expectations – they exceed them. Every line of code, every design element, and every strategic decision is crafted with precision.',
      color: 'from-gray-400 to-gray-600'
    },
    {
      title: 'Client-Centric Focus',
      description: 'Your success is our success. We invest in understanding your business, your challenges, and your goals to deliver solutions that create genuine impact.',
      color: 'from-gray-600 to-gray-400'
    },
  ]

  // Note: These are placeholder features. Update with actual company differentiators or create an API endpoint.

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
            <SectionEyebrow label="WHY WE MATTER" variant="light" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 sm:mb-6">
              What Sets Us
              <br />
              <span className="text-black">Apart</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed">
              We combine deep industry experience, a collaborative team approach, and a client-first mindset to deliver solutions that don't just meet expectations – they create real, lasting impact.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <div className="relative bg-gray-50 rounded-2xl p-5 sm:p-6 md:p-8 h-full hover:shadow-xl hover:bg-gray-100 transition-all duration-300 border border-gray-200 hover:border-gray-300">
                  <h3 className="text-black font-bold text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 group-hover:text-gray-800 transition-colors">{feature.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed group-hover:text-gray-700 transition-colors">{feature.description}</p>
                  
                  {/* Decorative Corner */}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
