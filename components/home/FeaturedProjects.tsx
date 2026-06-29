'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
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
        <div className="overflow-hidden">
          <div
            className="flex gap-4 sm:gap-6 transition-transform duration-500 ease-out"
            style={{ transform: mounted ? `translateX(-${currentIndex * (isMobile ? 100 : 33.333)}%)` : 'translateX(0)' }}
          >
            {projects.map((project: any) => (
              <motion.div
                key={project.id}
                className="min-w-full md:min-w-[calc(33.333%-16px)] rounded-3xl overflow-hidden min-h-[400px] sm:min-h-[480px] p-6 sm:p-8 flex flex-col justify-between relative cursor-pointer bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl"
                whileHover={{
                  scale: 1.02,
                  backgroundColor: 'rgba(0, 0, 0, 0.95)',
                  backdropFilter: 'blur(30px)'
                }}
              >
                <div>
                  <h3 className="text-white text-xl sm:text-2xl font-bold mb-2">{project.title}</h3>
                  {project.tagline && (
                    <p className="text-white/90 font-medium mb-4 text-sm sm:text-base">{project.tagline}</p>
                  )}
                  {project.stats && (
                    <p className="text-white font-bold mb-4 text-sm sm:text-base">{project.stats}</p>
                  )}
                  <p className="text-white/80 leading-relaxed text-sm sm:text-base">{project.description}</p>
                </div>

                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md opacity-0"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 bg-white text-black rounded-full px-6 sm:px-8 py-3 sm:py-4 font-bold hover:bg-gray-200 transition-all transform hover:scale-105 text-sm sm:text-base"
                  >
                    View Case Study
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
