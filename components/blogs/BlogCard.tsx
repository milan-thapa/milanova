'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

interface BlogCardProps {
  blog: {
    id: string
    slug: string
    title: string
    excerpt: string
    tags: string[]
    publishedAt: Date | string
    coverImage: string
    categoryRel?: {
      name: string
    } | null
    authorRel?: {
      name: string
    } | null
  }
}

export default function BlogCard({ blog }: BlogCardProps) {
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group cursor-pointer"
    >
      <Link href={`/blogs/${blog.slug}`} className="block">
        {/* Thumbnail */}
        <div className="aspect-video bg-gradient-to-br from-off-white to-cream rounded-xl sm:rounded-2xl mb-4 sm:mb-5 overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300 relative">
          {blog.coverImage ? (
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-teal/10 to-lime/20 flex items-center justify-center">
              <svg className="w-16 h-16 sm:w-20 sm:h-20 text-teal/40" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v2H8V8zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Category */}
        {blog.categoryRel && (
          <div className="mb-2">
            <span className="text-teal text-xs font-semibold uppercase tracking-wider">
              {blog.categoryRel.name}
            </span>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.tags?.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="bg-lime/20 text-teal text-xs font-bold uppercase tracking-wider rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-text-dark font-bold text-lg sm:text-xl mb-2 sm:mb-3 line-clamp-2 group-hover:text-teal transition-colors leading-tight">
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="text-text-body text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4 leading-relaxed">
          {blog.excerpt}
        </p>

        {/* Bottom row */}
        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-text-muted text-xs sm:text-sm">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(blog.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-2 text-teal font-semibold text-xs sm:text-sm group-hover:gap-3 transition-all">
            <span>Read More</span>
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
