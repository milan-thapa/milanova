'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { toast } from 'sonner'

type JobType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP' | 'REMOTE'

interface Job {
  id: string
  slug: string
  title: string
  description: string
  requirements: string
  responsibilities: string
  benefits: string
  location: string
  type: JobType
  experience: string
  salary?: string
  department: string
  createdAt: string
}

interface JobDetailClientProps {
  job: Job
}

export default function JobDetailClient({ job }: JobDetailClientProps) {
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [csrfToken, setCsrfToken] = useState('')

  useState(() => {
    fetch('/api/csrf')
      .then(res => res.json())
      .then(data => {
        if (data.token) setCsrfToken(data.token)
      })
      .catch(console.error)
  })

  const typeColors = {
    FULL_TIME: 'bg-green-500/20 text-green-400',
    PART_TIME: 'bg-blue-500/20 text-blue-400',
    CONTRACT: 'bg-purple-500/20 text-purple-400',
    INTERNSHIP: 'bg-yellow-500/20 text-yellow-400',
    REMOTE: 'bg-cyan-500/20 text-cyan-400'
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
          <Link href="/careers" className="inline-flex items-center gap-2 text-[#3A4A44] hover:text-[#B5E12A] transition-colors mb-6">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Careers
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`text-sm px-3 py-1 rounded-full ${typeColors[job.type]}`}>
                {job.type.replace('_', ' ')}
              </span>
              <span className="text-sm px-3 py-1 rounded-full bg-gray-200 text-gray-600">
                {job.location}
              </span>
              <span className="text-sm px-3 py-1 rounded-full bg-gray-200 text-gray-600">
                {job.department}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
              {job.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {job.experience}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-black mb-4">About the Role</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 whitespace-pre-line">{job.description}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-black mb-4">Responsibilities</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 whitespace-pre-line">{job.responsibilities}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-black mb-4">Requirements</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 whitespace-pre-line">{job.requirements}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-black mb-4">Benefits</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 whitespace-pre-line">{job.benefits}</p>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="sticky top-8"
            >
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-black mb-6">Apply for this Position</h3>
                {!showApplicationForm ? (
                  <div>
                    <button
                      onClick={() => setShowApplicationForm(true)}
                      className="w-full bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-hover transition-colors mb-4"
                    >
                      Apply Now
                    </button>
                    <p className="text-sm text-gray-600 text-center">
                      We'll review your application and get back to you within 5-7 business days.
                    </p>
                  </div>
                ) : (
                  <ApplicationForm jobId={job.id} jobTitle={job.title} csrfToken={csrfToken} />
                )}
              </div>

              <div className="mt-6 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-black mb-4">Share this Job</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href)
                      toast.success('Link copied to clipboard!')
                    }}
                    className="flex-1 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    Copy Link
                  </button>
                  <a
                    href={`https://twitter.com/intent/tweet?text=Check out this job opening at Milanova: ${job.title}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm text-center"
                  >
                    Twitter
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm text-center"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ApplicationForm({ jobId, jobTitle, csrfToken }: { jobId: string; jobTitle: string; csrfToken: string }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    resumeUrl: '',
    coverLetter: '',
    linkedinUrl: '',
    portfolioUrl: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('fileType', 'document')
      formData.append('folder', 'resumes')

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()
      if (data.url) {
        setFormData(prev => ({ ...prev, resumeUrl: data.url }))
        toast.success('Resume uploaded successfully!')
      } else {
        toast.error('Failed to upload resume')
      }
    } catch (error) {
      toast.error('Error uploading resume')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.resumeUrl) {
      toast.error('Please upload your resume')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          jobId,
          csrfToken
        })
      })

      const data = await res.json()
      if (res.ok) {
        toast.success('Application submitted successfully!')
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          resumeUrl: '',
          coverLetter: '',
          linkedinUrl: '',
          portfolioUrl: ''
        })
      } else {
        toast.error(data.error || 'Failed to submit application')
      }
    } catch (error) {
      toast.error('Error submitting application')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-[#A8B8B0] mb-2">Full Name *</label>
        <input
          type="text"
          required
          value={formData.fullName}
          onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
          className="w-full bg-[#0D1F1A] border border-[#1A6B55]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#B5E12A] transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm text-[#A8B8B0] mb-2">Email *</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full bg-[#0D1F1A] border border-[#1A6B55]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#B5E12A] transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm text-[#A8B8B0] mb-2">Phone *</label>
        <input
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          className="w-full bg-[#0D1F1A] border border-[#1A6B55]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#B5E12A] transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm text-[#A8B8B0] mb-2">Resume *</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileUpload}
          className="w-full bg-[#0D1F1A] border border-[#1A6B55]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#B5E12A] transition-colors file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#B5E12A] file:text-[#0D1F1A] hover:file:bg-[#A3D01F]"
        />
        {uploading && <p className="text-xs text-[#A8B8B0] mt-1">Uploading...</p>}
        {formData.resumeUrl && (
          <p className="text-xs text-[#B5E12A] mt-1">Resume uploaded ✓</p>
        )}
      </div>
      <div>
        <label className="block text-sm text-[#A8B8B0] mb-2">Cover Letter</label>
        <textarea
          value={formData.coverLetter}
          onChange={(e) => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
          rows={4}
          className="w-full bg-[#0D1F1A] border border-[#1A6B55]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#B5E12A] transition-colors resize-none"
        />
      </div>
      <div>
        <label className="block text-sm text-[#A8B8B0] mb-2">LinkedIn URL</label>
        <input
          type="url"
          value={formData.linkedinUrl}
          onChange={(e) => setFormData(prev => ({ ...prev, linkedinUrl: e.target.value }))}
          className="w-full bg-[#0D1F1A] border border-[#1A6B55]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#B5E12A] transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm text-[#A8B8B0] mb-2">Portfolio URL</label>
        <input
          type="url"
          value={formData.portfolioUrl}
          onChange={(e) => setFormData(prev => ({ ...prev, portfolioUrl: e.target.value }))}
          className="w-full bg-[#0D1F1A] border border-[#1A6B55]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#B5E12A] transition-colors"
        />
      </div>
      <button
        type="submit"
        disabled={submitting || uploading}
        className="w-full bg-[#B5E12A] text-[#0D1F1A] px-6 py-3 rounded-lg font-semibold hover:bg-[#A3D01F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  )
}
