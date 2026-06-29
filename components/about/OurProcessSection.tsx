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
      staggerChildren: 0.1
    }
  }
}

export default function OurProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Discuss',
      description: 'We start by listening closely to your needs and challenges. This helps us set clear goals and make sure we\'re on the same page before moving forward.',
      bullets: ['Understand goals', 'Define scope', 'Align expectations'],
      icon: '💬'
    },
    {
      number: '02',
      title: 'Design',
      description: 'Our designers craft intuitive, visually compelling interfaces tailored to your brand and users.',
      bullets: ['Wireframes', 'UI mockups', 'Prototype review'],
      icon: '🎨'
    },
    {
      number: '03',
      title: 'Develop',
      description: 'Our engineers build scalable, performant solutions using modern tech stacks.',
      bullets: ['Clean code', 'API integration', 'QA testing'],
      icon: '⚡'
    },
    {
      number: '04',
      title: 'Deliver',
      description: 'We launch with care, monitor performance, and provide post-launch support.',
      bullets: ['Staging review', 'Go live', 'Ongoing support'],
      icon: '🚀'
    },
    {
      number: '05',
      title: 'Maintain',
      description: 'We provide continuous maintenance and updates to ensure your solution stays current and performs optimally.',
      bullets: ['Regular updates', 'Security patches', 'Performance optimization'],
      icon: '🔧'
    },
  ]

  return (
    <section className="py-20 sm:py-24 md:py-32 bg-[#0D1F1A] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B5E12A]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1A6B55]/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-block bg-[#B5E12A] text-[#0D1F1A] px-4 sm:px-6 py-2 rounded-lg mb-6">
              <span className="font-semibold tracking-widest text-xs sm:text-sm">OUR PROCESS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              From Idea to
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B5E12A] to-[#1A6B55]">Impact</span>
            </h2>
            <p className="text-white/80 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Every project begins with listening to your goals, your challenges, and your vision. From there, we move through a structured yet flexible process: discover, design, develop, and deploy.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative"
              >
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 h-full hover:bg-white/10 hover:border-[#B5E12A]/30 transition-all duration-500 overflow-hidden">
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#B5E12A]/10 to-[#1A6B55]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Number Badge */}
                  <div className="relative z-10 text-[#B5E12A] font-bold text-4xl sm:text-5xl mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="relative z-10 text-4xl sm:text-5xl mb-4">{step.icon}</div>
                  
                  {/* Title */}
                  <h3 className="relative z-10 text-white font-bold text-xl sm:text-2xl mb-3">{step.title}</h3>
                  
                  {/* Description */}
                  <p className="relative z-10 text-white/70 text-sm sm:text-base leading-relaxed mb-4">{step.description}</p>
                  
                  {/* Bullets */}
                  <div className="relative z-10 flex flex-wrap gap-2">
                    {step.bullets.map((bullet, i) => (
                      <span
                        key={i}
                        className="bg-[#B5E12A]/20 text-[#B5E12A] text-xs sm:text-sm px-3 py-1 rounded-full border border-[#B5E12A]/30"
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
