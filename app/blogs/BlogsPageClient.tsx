'use client'

import { useState, useEffect } from 'react'
import BlogGrid from '@/components/blogs/BlogGrid'
import SectionEyebrow from '@/components/shared/SectionEyebrow'

export default function BlogsPageClient() {
  const [selectedCategory, setSelectedCategory] = useState('All Stories')
  const [categories, setCategories] = useState<string[]>(['All Stories'])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/blogs/categories')
        const data = await response.json()
        setCategories(['All Stories', ...data])
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-cream to-white">
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
      <section className="py-8 bg-white border-b border-gray-100 sticky top-0 z-10 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {loading ? (
              <div className="flex items-center gap-2 text-text-muted">
                <div className="w-4 h-4 border-2 border-teal border-t-transparent rounded-full animate-spin" />
                <span>Loading categories...</span>
              </div>
            ) : categories.length === 1 ? (
              <div className="text-text-muted">No categories available</div>
            ) : (
              categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-teal text-white shadow-lg shadow-teal/30 scale-105'
                      : 'bg-white border border-gray-200 text-text-body hover:border-teal hover:text-teal'
                  }`}
                >
                  {category}
                </button>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <BlogGrid category={selectedCategory === 'All Stories' ? undefined : selectedCategory} />
        </div>
      </section>
    </main>
  )
}
