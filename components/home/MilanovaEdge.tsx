'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import SectionEyebrow from '@/components/shared/SectionEyebrow'

export default function MilanovaEdge() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Transform scroll progress for each card - smoother, more natural transitions
  const card1Scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95])
  const card1Y = useTransform(scrollYProgress, [0, 0.4], [0, 20])
  const card1Opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const card1Blur = useTransform(scrollYProgress, [0, 0.4], [0, 10])

  const card2Scale = useTransform(scrollYProgress, [0.3, 0.7], [1, 0.95])
  const card2Y = useTransform(scrollYProgress, [0.3, 0.7], [0, 20])
  const card2Opacity = useTransform(scrollYProgress, [0.3, 0.7], [1, 0])
  const card2Blur = useTransform(scrollYProgress, [0.3, 0.7], [0, 10])

  const card3Scale = useTransform(scrollYProgress, [0.6, 1], [1, 0.95])
  const card3Y = useTransform(scrollYProgress, [0.6, 1], [0, 20])
  const card3Opacity = useTransform(scrollYProgress, [0.6, 1], [1, 0])
  const card3Blur = useTransform(scrollYProgress, [0.6, 1], [0, 10])

  return (
    <section className="relative py-12 sm:py-16 md:py-20 pb-24 sm:pb-32 md:pb-40 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mb-8 sm:mb-10 md:mb-12">
        <SectionEyebrow label="THE MILANOVA EDGE" />
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
          Why Choose Milanova
        </h2>
        <p className="text-[#3A4A44] max-w-2xl">
          Discover what sets us apart and how we deliver exceptional results for your business.
        </p>
      </div>

      {/* Container for stacking effect */}
      <div ref={containerRef} className="relative mx-auto max-w-6xl" style={{ height: '300vh' }}>
        
        {/* BLOCK 1 - Innovation - Sticks first */}
        <motion.div
          style={{
            scale: card1Scale,
            y: card1Y,
            opacity: card1Opacity,
            filter: card1Blur,
          }}
          className="sticky top-16 sm:top-20 bg-black p-6 sm:p-8 md:p-12 h-[400px] sm:h-[450px] md:h-[500px] flex items-center mb-6 sm:mb-8 z-10"
        >
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
              {/* Left column */}
              <div>
                <h2 className="text-white text-3xl md:text-4xl font-black uppercase mb-8">
                  WE DRIVE DIGITAL INNOVATION
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-white font-bold text-lg mb-3">Crafting future-ready software & experiences</h3>
                    <p className="text-white/90 leading-relaxed">
                      We help ambitious brands and start-ups turn bold ideas into powerful, scalable products that fuel growth and success.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-3">Shaping the next era of UX</h3>
                    <p className="text-white/90 leading-relaxed">
                      Our designs and solutions redefine digital interactions, creating intuitive, impactful experiences that set new industry benchmarks.
                    </p>
                  </div>
                </div>
                {/* Tech stack icons */}
                <div className="flex gap-4 mt-8">
                  {['React', 'Tailwind', 'Laravel', 'JS', 'Next.js'].map((tech) => (
                    <div key={tech} className="bg-white/20 rounded-lg px-4 py-2 text-white font-medium text-sm">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* BLOCK 2 - Delivery - Sticks second */}
        <motion.div
          style={{
            scale: card2Scale,
            y: card2Y,
            opacity: card2Opacity,
            filter: card2Blur,
          }}
          className="sticky top-16 sm:top-20 bg-gray-900 p-6 sm:p-8 md:p-12 h-[400px] sm:h-[450px] md:h-[500px] flex items-center mb-12 sm:mb-16 z-20"
        >
          <div className="w-full">
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-8 sm:mb-10 md:mb-12 text-left">
              DELIVERING EXCELLENCE! FAST & RELIABLY
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div>
                <h3 className="text-white font-bold text-xl mb-4">Lean execution, real results</h3>
                <p className="text-white/90 leading-relaxed mb-4">
                  We prioritize action over talk, shipping design and development progress every week—on time, every time.
                </p>
                <span className="inline-block bg-white/20 rounded-full px-4 py-2 text-white text-sm font-medium">
                  2–3x faster than in-house team
                </span>
              </div>
              <div>
                <h3 className="text-white font-bold text-xl mb-4">Turning complexity into clarity</h3>
                <p className="text-white/90 leading-relaxed mb-4">
                  We simplify intricate systems into sleek, user-focused solutions built for seamless performance.
                </p>
                <span className="inline-block bg-white/20 rounded-full px-4 py-2 text-white text-sm font-medium">
                  Get started with zero upfront fees
                </span>
              </div>
              <div>
                <h3 className="text-white font-bold text-xl mb-4">Flexible models, effortless onboarding</h3>
                <p className="text-white/90 leading-relaxed mb-4">
                  From dedicated teams to expert support, we integrate smoothly into your workflows with transparent pricing and no hidden costs.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* BLOCK 3 - Trust - Sticks third */}
        <motion.div
          style={{
            scale: card3Scale,
            y: card3Y,
            opacity: card3Opacity,
            filter: card3Blur,
          }}
          className="sticky top-16 sm:top-20 bg-gray-800 p-6 sm:p-8 md:p-12 h-[400px] sm:h-[450px] md:h-[500px] flex items-center mb-6 sm:mb-8 z-30"
        >
          <div className="w-full">
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-6 sm:mb-8">
              WHY CLIENTS LOVE PARTNERING WITH US
            </h2>
            <div className="space-y-4 mb-8">
              <p className="text-white/90">
                <span className="text-white font-bold">A trusted extension of your team</span> — clients call us their growth partner
              </p>
              <p className="text-white/90">
                <span className="text-white font-bold">4.9/5 – Rated by industry leaders</span> — 100+ successful projects
              </p>
              <p className="text-white/90">
                <span className="text-white font-bold">Purpose-driven innovation</span> — passionate about solving problems that matter
              </p>
            </div>
            <div className="flex gap-4">
              <span className="bg-white/10 rounded-full px-4 py-2 text-white text-sm">Made for your growth</span>
              <span className="bg-white/10 rounded-full px-4 py-2 text-white text-sm">Partners in lasting success</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
