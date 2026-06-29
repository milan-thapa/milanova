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

export default function WhyWeMatterSection() {
  const features = [
    {
      icon: '🏆',
      title: 'Experience That Counts',
      description: 'With founding members who bring 9+ years of industry experience, we\'ve seen technologies evolve and understand what truly works in real-world applications.',
      color: 'from-[#B5E12A] to-[#1A6B55]'
    },
    {
      icon: '🤝',
      title: 'Collaborative Approach',
      description: 'Our multidisciplinary team works as one cohesive unit, ensuring that design, development, project management, and business strategy are perfectly aligned.',
      color: 'from-[#1A6B55] to-[#B5E12A]'
    },
    {
      icon: '✨',
      title: 'Quality-First Mindset',
      description: 'We\'re committed to delivering solutions that don\'t just meet expectations – they exceed them. Every line of code, every design element, and every strategic decision is crafted with precision.',
      color: 'from-[#B5E12A] to-[#1A6B55]'
    },
    {
      icon: '💎',
      title: 'Client-Centric Focus',
      description: 'Your success is our success. We invest in understanding your business, your challenges, and your goals to deliver solutions that create genuine impact.',
      color: 'from-[#1A6B55] to-[#B5E12A]'
    },
  ]

  return (
    <section className="py-20 sm:py-24 md:py-32 bg-[#F4F9F4] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1A6B55]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B5E12A]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-block bg-black text-white px-4 sm:px-6 py-2 rounded-lg mb-6">
              <span className="font-semibold tracking-widest text-xs sm:text-sm">WHY WE MATTER</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0D1F1A] mb-6">
              What Sets Us
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A6B55] to-[#B5E12A]">Apart</span>
            </h2>
            <p className="text-[#3A4A44] text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              We combine deep industry experience, a collaborative team approach, and a client-first mindset to deliver solutions that don't just meet expectations – they create real, lasting impact.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative"
              >
                <div className="relative bg-white rounded-3xl p-8 sm:p-10 h-full hover:shadow-2xl transition-all duration-500 border border-[#E8EDE9] hover:border-[#B5E12A]/30 overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Icon */}
                  <div className="text-5xl sm:text-6xl mb-6">{feature.icon}</div>
                  
                  {/* Title */}
                  <h3 className="text-[#0D1F1A] font-bold text-xl sm:text-2xl mb-4">{feature.title}</h3>
                  
                  {/* Description */}
                  <p className="text-[#3A4A44] text-sm sm:text-base leading-relaxed">{feature.description}</p>
                  
                  {/* Decorative Corner */}
                  <div className={`absolute bottom-4 right-4 w-20 h-20 bg-gradient-to-br ${feature.color} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
