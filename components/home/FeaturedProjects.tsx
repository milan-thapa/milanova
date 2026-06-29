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
        console.log('Fetching projects...')
        const response = await fetch('/api/projects')
        console.log('Response status:', response.status)
        const data = await response.json()
        console.log('Projects data:', data)
        
        // Temporarily add mock data if no projects exist
        if (!data || data.length === 0) {
          console.log('No projects found, using mock data')
          const mockProjects = [
            {
              id: '1',
              title: 'E-Commerce Platform',
              tagline: 'Modern shopping experience',
              description: 'A full-featured e-commerce platform with advanced features',
              category: 'eCommerce',
              stats: ['50K+ Users', '99.9% Uptime'],
              slug: 'ecommerce-platform',
              coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
              mockupImage: null,
            },
            {
              id: '2',
              title: 'SaaS Dashboard',
              tagline: 'Analytics made simple',
              description: 'Real-time analytics dashboard for business intelligence',
              category: 'SaaS',
              stats: ['10K+ Active Users', '24/7 Support'],
              slug: 'saas-dashboard',
              coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
              mockupImage: null,
            },
            {
              id: '3',
              title: 'Mobile Banking App',
              tagline: 'Banking at your fingertips',
              description: 'Secure and intuitive mobile banking application',
              category: 'Mobile App',
              stats: ['100K+ Downloads', '4.9 Rating'],
              slug: 'mobile-banking',
              coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
              mockupImage: null,
            },
          ]
          setProjects(mockProjects)
        } else {
          setProjects(data)
        }
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

  console.log('FeaturedProjects state:', { loading, projectsLength: projects.length, projects })

  // Temporary: Always show content for debugging
  console.log('Rendering featured projects section')

  if (loading) {
    console.log('Showing loading state')
    return (
      <section className="py-12 sm:py-16 md:py-20 bg-[#F4F9F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center py-12">Loading projects...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-red-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-white text-2xl font-bold mb-4">DEBUG: Featured Projects Section</div>
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
            {projects.map((project: any) => {
              const imageUrl = project.mockupImage || project.coverImage
              return (
                <Link key={project.id} href={`/projects/${project.slug}`}>
                  <motion.div
                    className="min-w-full md:min-w-[calc(33.333%-16px)] rounded-3xl overflow-hidden min-h-[400px] sm:min-h-[480px] relative cursor-pointer group"
                    whileHover={{
                      scale: 1.03,
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
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
                    )}

                    {/* Glassmorphism Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {/* Category Badge */}
                        {project.category && (
                          <div className="inline-block mb-3">
                            <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider rounded-full px-3 py-1.5">
                              {project.category}
                            </span>
                          </div>
                        )}

                        {/* Title */}
                        <h3 className="text-white text-xl sm:text-2xl font-bold mb-2 leading-tight">
                          {project.title}
                        </h3>

                        {/* Tagline */}
                        {project.tagline && (
                          <p className="text-white/90 font-medium mb-3 text-sm sm:text-base line-clamp-2">
                            {project.tagline}
                          </p>
                        )}

                        {/* Stats */}
                        {project.stats && project.stats.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.stats.slice(0, 2).map((stat: string, index: number) => (
                              <span
                                key={index}
                                className="bg-lime/20 backdrop-blur-sm border border-lime/30 text-lime text-xs font-semibold rounded-lg px-2.5 py-1"
                              >
                                {stat}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Description */}
                        <p className="text-white/70 text-sm line-clamp-2 mb-4 leading-relaxed">
                          {project.description}
                        </p>

                        {/* View Button - Always visible with glass effect */}
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full px-5 py-2.5 font-semibold text-sm group-hover:bg-white group-hover:text-black transition-all duration-300">
                          View Project
                          <svg
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </motion.div>
                    </div>

                    {/* Shine Effect on Hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        backgroundSize: '200% 200%',
                      }}
                    />
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
