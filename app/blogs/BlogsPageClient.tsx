'use client'

import { useState, useEffect } from 'react'
import BlogGrid from '@/components/blogs/BlogGrid'
import SectionEyebrow from '@/components/shared/SectionEyebrow'

export default function BlogsPageClient() {
  const [selectedCategory, setSelectedCategory] = useState('All Stories')
  const [categories, setCategories] = useState<string[]>(['All Stories'])

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/blogs/categories')
        const data = await response.json()
        setCategories(['All Stories', ...data])
      } catch (error) {
        // Silently fail - will show only "All Stories"
      }
    }
    fetchCategories()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#082E23] py-24 md:py-32" style={{ borderBottomLeftRadius: '80px', borderBottomRightRadius: '80px' }}>
        <div className="max-w-7xl mx-auto px-6 relative">
          <SectionEyebrow label="KNOWLEDGE HUB" />
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            Our <span className="text-lime">Insights</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed">
            Explore our latest thoughts, industry trends, and expert perspectives on design, technology, and innovation.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 bg-white border-b border-gray-100 sticky top-0 z-10 backdrop-blur-md bg-white/95 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-300 relative group ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-teal to-teal/90 text-white shadow-lg shadow-teal/25 scale-105'
                    : 'bg-white border-2 border-gray-200 text-text-body hover:border-teal hover:text-teal hover:shadow-md'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {selectedCategory === category && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {category}
                </span>
                {selectedCategory === category && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal to-lime opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <BlogGrid category={selectedCategory === 'All Stories' ? undefined : selectedCategory} />
        </div>
      </section>
    </div>
  )
}
