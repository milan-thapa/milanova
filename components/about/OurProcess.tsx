'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We dive deep into understanding your business, audience, and goals to create a solid foundation.',
    icon: '🔍',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'We craft a tailored roadmap that aligns technology with your business objectives.',
    icon: '📋',
  },
  {
    number: '03',
    title: 'Design',
    description: 'Our designers create stunning, user-centric interfaces that bring your vision to life.',
    icon: '🎨',
  },
  {
    number: '04',
    title: 'Development',
    description: 'We build robust, scalable solutions using cutting-edge technologies and best practices.',
    icon: '💻',
  },
  {
    number: '05',
    title: 'Testing',
    description: 'Rigorous quality assurance ensures your product performs flawlessly across all platforms.',
    icon: '✅',
  },
  {
    number: '06',
    title: 'Launch',
    description: 'We deploy your solution with precision and provide ongoing support for continued success.',
    icon: '🚀',
  },
]

export default function OurProcess() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-[#0D1F1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-10 sm:mb-12 md:mb-16"
        >
          <p className="text-[#B5E12A] font-semibold text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4">
            Our Process
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            How we bring ideas to life
          </h2>
          <p className="text-[#8FA89E] text-sm sm:text-base md:text-lg max-w-2xl">
            Our proven six-step process ensures every project is delivered on time, on budget, and exceeds expectations.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8 hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                <span className="text-3xl sm:text-4xl">{step.icon}</span>
                <span className="text-[#B5E12A] text-xl sm:text-2xl font-bold">{step.number}</span>
              </div>
              <h3 className="text-white text-lg sm:text-xl font-bold mb-2 sm:mb-3">{step.title}</h3>
              <p className="text-[#8FA89E] text-sm sm:text-base leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
