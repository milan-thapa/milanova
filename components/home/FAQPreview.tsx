'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionEyebrow from '@/components/shared/SectionEyebrow'

export default function FAQPreview() {
  const [faqs, setFaqs] = useState<any[]>([])
  const [openId, setOpenId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFAQs() {
      try {
        const response = await fetch('/api/faqs')
        const data = await response.json()
        setFaqs(data)
      } catch (error) {
        console.error('Error fetching FAQs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchFAQs()
  }, [])

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <SectionEyebrow label="FAQ's" />
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
            Frequently Asked Questions, Web Development Nepal
          </h2>
          <p className="text-[#3A4A44] mb-12">
            We excel at turning challenges into innovative solutions effortlessly.
          </p>
          <div className="text-center py-12 text-[#8FA89E]">Loading FAQs...</div>
        </div>
      </section>
    )
  }

  if (faqs.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <SectionEyebrow label="FAQ's" />
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
            Frequently Asked Questions, Web Development Nepal
          </h2>
          <p className="text-[#3A4A44] mb-12">
            We excel at turning challenges into innovative solutions effortlessly.
          </p>
          <div className="text-center py-12 text-[#8FA89E]">No FAQs available at the moment.</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10">
        <SectionEyebrow label="FAQ's" />
        <h2 className="text-3xl md:text-4xl font-bold text-[#0D1F1A] mb-3">
          Frequently Asked Questions, Web Development Nepal
        </h2>
        <p className="text-[#3A4A44] mb-12">
          We excel at turning challenges into innovative solutions effortlessly.
        </p>

        {/* Accordion */}
        <div className="space-y-0">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`border-b border-gray-200 ${
                openId === faq.id ? 'bg-gray-50 border-l-3 border-l-accent' : 'hover:bg-gray-100'
              }`}
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between py-6 px-4 text-left"
              >
                <span className="text-[#0D1F1A] font-semibold text-lg pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    className="w-5 h-5 text-[#8FA89E] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-6">
                      <p className="text-[#3A4A44] text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <a
            href="/faqs"
            className="text-accent font-medium hover:underline inline-flex items-center gap-2"
          >
            View All FAQs
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
