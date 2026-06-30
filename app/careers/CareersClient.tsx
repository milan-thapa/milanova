'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

type JobType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP' | 'REMOTE'

interface Job {
  id: string
  slug: string
  title: string
  description: string
  location: string
  type: JobType
  department: string
  experience: string
  isFeatured: boolean
  createdAt: string
}

export default function CareersClient() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/jobs')
      const data = await res.json()
      setJobs(data.jobs || [])
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }


  if (loading) {
    return null
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#B5E12A]/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-20 sm:py-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6">
              Build the Future with{' '}
              <span className="text-accent">Milanova</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mb-8">
              Join a team of passionate innovators, designers, and engineers creating digital experiences that matter. 
              We're looking for talented individuals who want to make an impact.
            </p>
            <div className="flex flex-wrap gap-4 text-sm sm:text-base">
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Competitive Salary
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Remote-First Culture
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Professional Growth
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* All Jobs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 pb-20">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl sm:text-3xl font-bold text-[#0D1F1A] mb-6"
        >
          Open Positions ({jobs.length})
        </motion.h2>
        
        {jobs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#8FA89E] text-lg">No positions available at the moment.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Why Join Us Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-[#0D1F1A] text-left mb-12"
          >
            Why Join Milanova?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🚀',
                title: 'Innovation First',
                description: 'Work on cutting-edge projects with modern technologies and push the boundaries of what\'s possible.'
              },
              {
                icon: '🌱',
                title: 'Growth Culture',
                description: 'Continuous learning opportunities, mentorship programs, and clear career progression paths.'
              },
              {
                icon: '🤝',
                title: 'Collaborative Team',
                description: 'Join a diverse, inclusive team that values creativity, collaboration, and mutual respect.'
              },
              {
                icon: '💰',
                title: 'Competitive Benefits',
                description: 'Competitive salary, health insurance, flexible PTO, and performance bonuses.'
              },
              {
                icon: '🏠',
                title: 'Flexible Work',
                description: 'Remote-first culture with flexible hours and the freedom to work from anywhere.'
              },
              {
                icon: '🎯',
                title: 'Impactful Work',
                description: 'Build products that matter and make a real difference for clients and users worldwide.'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:border-accent/50 transition-colors"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-black mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function JobCard({ job }: { job: Job }) {
  const typeColors = {
    FULL_TIME: 'bg-green-500/20 text-green-400',
    PART_TIME: 'bg-blue-500/20 text-blue-400',
    CONTRACT: 'bg-purple-500/20 text-purple-400',
    INTERNSHIP: 'bg-yellow-500/20 text-yellow-400',
    REMOTE: 'bg-cyan-500/20 text-cyan-400'
  }

  return (
    <Link href={`/careers/${job.slug}`}>
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-black mb-2">
              {job.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <span className={`text-sm px-4 py-2 rounded-full font-medium ${typeColors[job.type]}`}>
                {job.type.replace('_', ' ')}
              </span>
              <span className="text-sm px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium">
                {job.location}
              </span>
              <span className="text-sm px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium">
                {job.department}
              </span>
            </div>
          </div>
          <div className="flex sm:flex-col items-center sm:items-end gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {job.experience}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
