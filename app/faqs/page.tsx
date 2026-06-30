'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    id: 1,
    question: 'How much does web development cost in Nepal in 2026?',
    answer: 'Web development costs in Nepal range from NPR 30,000 for simple sites to NPR 5,00,000+ for custom eCommerce or SaaS platforms. Contact us for a free quote tailored to your specific needs.',
  },
  {
    id: 2,
    question: 'Why hire a Nepal software development team for IT outsourcing?',
    answer: 'Nepal offers highly skilled developers at competitive rates, with strong English proficiency and cultural compatibility with Western markets. Our team delivers enterprise-quality work at significant cost savings.',
  },
  {
    id: 3,
    question: 'What services do you offer?',
    answer: 'We offer comprehensive web development services including eCommerce development, custom web applications, SaaS development, UI/UX design, mobile app development, and ongoing maintenance and support.',
  },
  {
    id: 4,
    question: 'How long does it take to develop a website?',
    answer: 'Project timelines vary based on complexity. A simple website typically takes 2-4 weeks, while complex eCommerce or SaaS platforms may take 8-16 weeks. We provide detailed timelines during our discovery phase.',
  },
  {
    id: 5,
    question: 'How much does web development cost?',
    answer: 'Costs depend on project scope, features, and complexity. We offer competitive pricing with transparent quotes. Contact us for a free consultation and detailed estimate.',
  },
  {
    id: 6,
    question: 'Do you offer ongoing support and maintenance?',
    answer: 'Yes, we offer comprehensive support and maintenance packages to ensure your website remains secure, up-to-date, and performing optimally after launch.',
  },
  {
    id: 7,
    question: 'Will my website be mobile-friendly?',
    answer: 'Absolutely. All our websites are built with a mobile-first approach, ensuring they look and perform perfectly across all devices - desktops, tablets, and smartphones.',
  },
  {
    id: 8,
    question: 'What happens if my website has technical issues after launch?',
    answer: 'We provide post-launch support and have a dedicated team to address any technical issues promptly. Our maintenance packages include priority support with guaranteed response times.',
  },
]



export default function FAQsPage() {
  const [openId, setOpenId] = useState<number | null>(null)

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <main className="min-h-screen">
      <section className="relative min-h-[40vh] sm:min-h-[50vh] bg-white flex items-center pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 md:pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full relative z-10">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-black rounded-full" />
              <span className="text-black/90 text-sm font-medium tracking-wide">FAQ's</span>
            </div>

            {/* Headline */}
            <h1 className="text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 sm:mb-8">
              Frequently Asked Questions
            </h1>

            {/* Description */}
            <p className="text-black/80 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed mb-6 sm:mb-8 max-w-3xl">
              Web Development Nepal - We excel at turning challenges into innovative solutions effortlessly.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full">
          <div className="max-w-4xl">
          <div className="space-y-0">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className={`border-b border-[#E8EDE9] ${
                  openId === faq.id ? 'bg-[#E8F5ED] border-l-3 border-l-teal' : 'hover:bg-[#F4F9F4]'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between py-6 sm:py-8 px-4 sm:px-6 text-left"
                >
                  <span className="text-black font-semibold text-base sm:text-lg md:text-xl pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openId === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg
                      className="w-5 h-5 text-gray-600 flex-shrink-0"
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
                      <div className="px-4 sm:px-6 pb-6 sm:pb-8">
                        <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>
    </main>
  )
}
