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
    <div className="min-h-screen bg-gradient-to-b from-cream to-white pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 relative">
          <SectionEyebrow label="KNOWLEDGE HUB" variant="light" />
          <h1 className="text-black text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            Our <span className="text-blue-600">Insights</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl leading-relaxed">
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
                className={`whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-gray-50'
                }`}
              >
                {category}
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
