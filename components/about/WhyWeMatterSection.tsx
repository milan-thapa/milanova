'use client'

import { motion } from 'framer-motion'

export default function WhyWeMatterSection() {
  const features = [
    {
      title: 'Experience That Counts',
      description: 'With founding members who bring 9+ years of industry experience, we\'ve seen technologies evolve and understand what truly works in real-world applications.',
    },
    {
      title: 'Collaborative Approach',
      description: 'Our multidisciplinary team works as one cohesive unit, ensuring that design, development, project management, and business strategy are perfectly aligned.',
    },
    {
      title: 'Quality-First Mindset',
      description: 'We\'re committed to delivering solutions that don\'t just meet expectations – they exceed them. Every line of code, every design element, and every strategic decision is crafted with precision.',
    },
    {
      title: 'Client-Centric Focus',
      description: 'Your success is our success. We invest in understanding your business, your challenges, and your goals to deliver solutions that create genuine impact.',
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#0D1F1A] mb-6">
            WHY <span className="text-black">WE</span> MATTER
          </h2>
          <p className="text-2xl md:text-3xl font-medium text-[#3A4A44] mb-8">
            What sets us apart
          </p>
          <p className="text-[#3A4A44] text-lg leading-relaxed">
            We combine deep industry experience, a collaborative team approach, and a client-first mindset to deliver solutions that don't just meet expectations – they create real, lasting impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#F8FAF9] rounded-2xl p-8 hover:shadow-md transition-shadow"
            >
              <h3 className="text-black font-bold text-xl mb-4">{feature.title}</h3>
              <p className="text-[#3A4A44] leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
