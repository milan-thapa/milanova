'use client'

import { motion } from 'framer-motion'

export default function OurProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Discuss',
      description: 'We start by listening closely to your needs and challenges. This helps us set clear goals and make sure we\'re on the same page before moving forward.',
      bullets: ['Understand goals', 'Define scope', 'Align expectations'],
    },
    {
      number: '02',
      title: 'Design',
      description: 'Our designers craft intuitive, visually compelling interfaces tailored to your brand and users.',
      bullets: ['Wireframes', 'UI mockups', 'Prototype review'],
    },
    {
      number: '03',
      title: 'Develop',
      description: 'Our engineers build scalable, performant solutions using modern tech stacks.',
      bullets: ['Clean code', 'API integration', 'QA testing'],
    },
    {
      number: '04',
      title: 'Deliver',
      description: 'We launch with care, monitor performance, and provide post-launch support.',
      bullets: ['Staging review', 'Go live', 'Ongoing support'],
    },
    {
      number: '05',
      title: 'Maintain',
      description: 'We provide continuous maintenance and updates to ensure your solution stays current and performs optimally.',
      bullets: ['Regular updates', 'Security patches', 'Performance optimization'],
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#0D1F1A] mb-6">
            OUR <span className="text-black">PROCESS</span>
          </h2>
          <p className="text-2xl md:text-3xl font-medium text-[#3A4A44] mb-8">
            From Idea to <span className="text-black">Impact</span>
          </p>
          <p className="text-[#3A4A44] text-lg leading-relaxed">
            Every project begins with listening to your goals, your challenges, and your vision. From there, we move through a structured yet flexible process: discover, design, develop, and deploy. Each step is handled with care, ensuring that the final solution doesn't just work, but creates measurable impact for your business.
          </p>
        </motion.div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-8 items-start"
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center font-bold text-xl">
                  {step.number}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-[#0D1F1A] text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-[#3A4A44] mb-4 leading-relaxed">{step.description}</p>
                <div className="flex flex-wrap gap-2">
                  {step.bullets.map((bullet, i) => (
                    <span
                      key={i}
                      className="bg-black/10 text-[#0D1F1A] text-sm px-3 py-1 rounded-full"
                    >
                      {bullet}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
