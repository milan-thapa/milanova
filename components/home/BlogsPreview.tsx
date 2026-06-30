'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import SectionEyebrow from '@/components/shared/SectionEyebrow'

export default function BlogsPreview() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch('/api/blogs')
        const data = await response.json()
        setBlogs(data.slice(0, 3)) // Show only 3 latest blogs
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionEyebrow label="INSIGHTS" />
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-12">
            Our Latest Thinking
          </h2>
          <div className="text-center py-12 text-[#8FA89E]">Loading insights...</div>
        </div>
      </section>
    )
  }

  if (blogs.length === 0) {
    return (
      <section className="py-20 bg-[#EDF3EE]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionEyebrow label="INSIGHTS" />
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-12">
            Our Latest Thinking
          </h2>
          <div className="text-center py-12 text-[#8FA89E]">No insights available at the moment.</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <SectionEyebrow label="INSIGHTS" />
        <h2 className="text-3xl md:text-4xl font-bold text-[#0D1F1A] mb-12">
          Our Latest Thinking
        </h2>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              className="group cursor-pointer"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`/blogs/${blog.slug}`}>
                {/* Thumbnail */}
                <div className="aspect-video bg-gradient-to-br from-[#F4F9F4] to-[#FDFDE8] rounded-xl mb-4 overflow-hidden relative">
                  {blog.coverImage ? (
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#F4F9F4] flex items-center justify-center text-[#8FA89E]">
                      <svg className="w-16 h-16 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v2H8V8zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {blog.tags && blog.tags.length > 0 && blog.tags.slice(0, 2).map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-[#F0F0F0] text-[#3A4A44] text-xs uppercase font-medium rounded-full px-3 py-1"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-black font-bold text-lg mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-[#8FA89E] text-sm line-clamp-2 mb-3">
                  {blog.excerpt}
                </p>

                {/* Bottom row */}
                <div className="flex items-center justify-between text-[#8FA89E] text-sm">
                  <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            href="/blogs"
            className="text-accent font-medium hover:underline inline-flex items-center gap-2"
          >
            View All Insights
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
