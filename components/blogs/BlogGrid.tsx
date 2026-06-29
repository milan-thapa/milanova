'use client'

import { useState, useEffect } from 'react'
import BlogCard from './BlogCard'

interface BlogGridProps {
  category?: string
}

export default function BlogGrid({ category }: BlogGridProps) {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const url = category ? `/api/blogs?category=${encodeURIComponent(category)}` : '/api/blogs'
        const response = await fetch(url)
        const data = await response.json()
        setBlogs(data)
      } catch (error) {
        console.error('Error fetching blogs:', error)
        setBlogs([])
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [category])

  if (loading) {
    return (
      <div className="text-center py-12 sm:py-16 md:py-20">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-off-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <svg className="animate-spin w-8 h-8 sm:w-10 sm:h-10 text-text-muted" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p className="text-text-muted text-base sm:text-lg">Loading blogs...</p>
      </div>
    )
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16 md:py-20">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-off-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-text-muted text-base sm:text-lg mb-2">
          {category ? `No blogs in "${category}" category.` : 'No blogs found.'}
        </p>
        <p className="text-text-muted text-sm">
          {category ? 'Try selecting a different category.' : 'Add your first blog via the admin panel.'}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  )
}
