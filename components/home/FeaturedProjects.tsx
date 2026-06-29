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
        <div className="space-y-6">
          {projects.map((project: any, index: number) => {
            const imageUrl = project.mockupImage || project.coverImage
            console.log('Project image URL:', imageUrl, 'for project:', project.title)
            return (
              <Link key={project.id} href={`/projects/${project.slug}`}>
                <div className="rounded-3xl overflow-hidden min-h-[450px] sm:min-h-[520px] relative cursor-pointer shadow-2xl bg-purple-600 border-4 border-yellow-400 p-8">
                  <div className="text-white text-3xl font-bold">{project.title}</div>
                  <div className="text-white text-xl mt-4">{project.description}</div>
                  {imageUrl && <div className="text-yellow-300 mt-4 text-sm">Image: {imageUrl}</div>}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
