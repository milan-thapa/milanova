'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import SectionEyebrow from '@/components/shared/SectionEyebrow'
import { TestimonialsSkeleton } from '@/components/shared/Skeleton'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch('/api/testimonials')
        const data = await response.json()
        setTestimonials(data)
      } catch (error) {
        console.error('Error fetching testimonials:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  const nextTestimonial = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  }

  const currentTestimonial = testimonials[currentIndex]

  if (loading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <TestimonialsSkeleton />
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionEyebrow label="TESTIMONIAL" />
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
            What Our Clients Say
          </h2>
          <p className="text-[#3A4A44] max-w-2xl mb-12">
            Discover how we've helped businesses overcome challenges and achieve lasting success.
          </p>
          <div className="text-center py-12 text-[#8FA89E]">No testimonials available at the moment.</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <SectionEyebrow label="TESTIMONIAL" />
        <h2 className="text-3xl md:text-4xl font-bold text-[#0D1F1A] mb-3">
          What Our Clients Say
        </h2>
        <p className="text-[#3A4A44] max-w-2xl mb-12">
          Discover how we've helped businesses overcome challenges and achieve lasting success.
        </p>

        {/* Testimonial Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-lg p-8 md:p-12">
          {/* Counter */}
          <div className="text-right text-[#8FA89E] text-sm mb-8">
            {currentIndex + 1} / {testimonials.length}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
            >
              {/* Left - Image */}
              <div className="relative flex items-center justify-center">
                <div className="relative w-full aspect-square max-w-[220px]">
                  {currentTestimonial.image ? (
                    <Image
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      fill
                      className="rounded-2xl object-cover"
                      sizes="(max-width: 768px) 220px, 220px"
                    />
                  ) : (
                    <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center">
                      <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* Right - Content */}
              <div className="relative min-h-[280px] flex flex-col justify-center">
                {/* Quote icon */}
                <div className="absolute -top-4 -left-4 text-[#C8C8A0] text-[80px] font-serif leading-none">
                  "
                </div>

                <div className="relative z-10 pt-8">
                  <p className="text-black text-xl md:text-2xl font-medium leading-relaxed mb-6">
                    {currentTestimonial.quote}
                  </p>
                  <p className="text-black font-bold text-lg mb-1">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-gray-600 text-sm mb-1">{currentTestimonial.role}</p>
                  <p className="text-[#3A4A44] text-sm">{currentTestimonial.company}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-black w-8'
                      : 'bg-gray-300 border-2 border-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
