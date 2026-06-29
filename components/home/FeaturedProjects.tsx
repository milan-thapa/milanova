'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FeaturedProjectsSkeleton } from '@/components/shared/Skeleton'

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects')
        const data = await response.json()
        setProjects(data)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  if (loading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 bg-[#F4F9F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <FeaturedProjectsSkeleton />
        </div>
      </section>
    )
  }

  if (projects.length === 0) {
    return (
      <section className="py-20 bg-[#F4F9F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center py-12 text-[#8FA89E]">No featured projects available at the moment.</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#F4F9F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 mb-12">
          <div>
            <div className="inline-block bg-black text-white px-4 sm:px-6 py-2 rounded-lg mb-4">
              <span className="font-semibold tracking-widest text-xs sm:text-sm">FEATURED PROJECTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0D1F1A] mb-3">
              Bringing Ideas to Life — eCommerce, Apps & More
            </h2>
            <p className="text-[#3A4A44] max-w-2xl text-sm sm:text-base">
              Our solutions transform our clients' ideas into powerful digital products that inspire and deliver results.
            </p>
          </div>

          {/* Navigation arrows */}
          <div className="flex gap-2 self-start sm:self-auto">
            <button
              onClick={prevProject}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#0D1F1A] flex items-center justify-center hover:bg-[#1A6B55] hover:border-[#1A6B55] hover:text-white transition-all"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextProject}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#0D1F1A] flex items-center justify-center hover:bg-[#1A6B55] hover:border-[#1A6B55] hover:text-white transition-all"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: any, index: number) => {
            const imageUrl = project.mockupImage || project.coverImage
            return (
              <Link key={project.id} href={`/projects/${project.slug}`}>
                <motion.div
                  className="rounded-3xl overflow-hidden min-h-[450px] sm:min-h-[520px] relative cursor-pointer group shadow-2xl"
                  whileHover={{
                    scale: 1.02,
                    y: -8,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {/* Background Image */}
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover blur-sm transition-all duration-700 group-hover:blur-xl group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                      priority={index < 2}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black" />
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 via-transparent to-transparent opacity-95 transition-all duration-500 group-hover:opacity-100 group-hover:backdrop-blur-sm" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="transition-opacity duration-300 group-hover:opacity-30"
                    >
                      {/* Category Badge */}
                      {project.category && (
                        <div className="inline-block mb-3">
                          <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider rounded-full px-4 py-1.5 shadow-lg">
                            {project.category}
                          </span>
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-2 leading-tight drop-shadow-lg">
                        {project.title}
                      </h3>

                      {/* Tagline */}
                      {project.tagline && (
                        <p className="text-white/95 font-medium mb-3 text-sm sm:text-base line-clamp-2 drop-shadow-md">
                          {project.tagline}
                        </p>
                      )}

                      {/* Stats */}
                      {project.stats && project.stats.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.stats.slice(0, 2).map((stat: string, statIndex: number) => (
                            <span
                              key={statIndex}
                              className="bg-lime/30 backdrop-blur-sm border border-lime/40 text-lime text-xs font-semibold rounded-lg px-3 py-1.5 shadow-md"
                            >
                              {stat}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-white/80 text-sm line-clamp-2 mb-5 leading-relaxed drop-shadow-sm">
                        {project.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Hover Overlay with Center Button */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md opacity-0"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <div className="inline-flex items-center gap-2 bg-white text-black rounded-full px-8 py-4 font-bold text-sm shadow-2xl hover:bg-lime transition-all duration-300">
                        View Project
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Shine Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
