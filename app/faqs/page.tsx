'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { motion, AnimatePresence } from 'framer-motion'
import SectionEyebrow from '@/components/shared/SectionEyebrow'

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
    <main className="bg-white min-h-screen">
      <section className="py-20 bg-hero-dark">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionEyebrow label="FAQ's" />
          <h1 className="text-white text-4xl md:text-5xl font-extrabold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Web Development Nepal - We excel at turning challenges into innovative solutions effortlessly.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
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
                  className="w-full flex items-center justify-between py-6 px-4 text-left"
                >
                  <span className="text-text-dark font-semibold text-lg pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openId === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg
                      className="w-5 h-5 text-text-muted flex-shrink-0"
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
                        <p className="text-text-body text-base leading-relaxed">
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
      </section>
    </main>
  )
}
