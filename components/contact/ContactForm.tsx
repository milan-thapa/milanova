'use client'

import { useState, useEffect } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    projectDetails: '',
  })
  const [csrfToken, setCsrfToken] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Fetch CSRF token on component mount
    fetch('/api/csrf')
      .then(res => res.json())
      .then(data => setCsrfToken(data.csrfToken))
      .catch(console.error)
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.projectDetails.trim()) {
      newErrors.projectDetails = 'Project details are required'
    } else if (formData.projectDetails.length < 10) {
      newErrors.projectDetails = 'Please provide more details (at least 10 characters)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, csrfToken }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ fullName: '', email: '', phone: '', projectDetails: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero section with green background for navbar */}
      <div className="bg-[#0D2B22] h-16 sm:h-20 rounded-b-[2rem] sm:rounded-b-[3rem] md:rounded-b-[4rem]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Left Column */}
          <div>
            <h1 className="text-text-dark text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6">
              Have a Project in Mind?
            </h1>
            <p className="text-text-body text-sm sm:text-base md:text-lg mb-8 sm:mb-12 leading-relaxed">
              Let's build something remarkable. Reach out for a free architectural consultation.
            </p>

            {/* Contact Details */}
            <div className="space-y-4 sm:space-y-6">
              <a
                href="mailto:info@milanova.com"
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-[#E0EDE6] rounded-xl"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#F9FDF9] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-teal" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-text-muted text-xs sm:text-sm">Email</p>
                  <p className="text-text-dark font-medium text-sm sm:text-base">info@milanova.com</p>
                </div>
              </a>

              <a
                href="tel:+9779801816685"
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-[#E0EDE6] rounded-xl"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#F9FDF9] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-teal" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 1.25 0 2.45.2 3.57.57.35.13.74.04 1.02-.24l2.2-2.2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-text-muted text-xs sm:text-sm">Phone</p>
                  <p className="text-text-dark font-medium text-sm sm:text-base">+977-9801816685</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-[#F9FDF9] border border-[#E0EDE6] rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-text-dark font-medium mb-2 text-sm sm:text-base">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value })
                    if (errors.fullName) setErrors({ ...errors, fullName: '' })
                  }}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border focus:outline-none bg-white text-sm sm:text-base transition-colors ${
                    errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-[#E0E0E0] focus:border-teal'
                  }`}
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-text-dark font-medium mb-2 text-sm sm:text-base">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value })
                    if (errors.email) setErrors({ ...errors, email: '' })
                  }}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border focus:outline-none bg-white text-sm sm:text-base transition-colors ${
                    errors.email ? 'border-red-500 focus:border-red-500' : 'border-[#E0E0E0] focus:border-teal'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-text-dark font-medium mb-2 text-sm sm:text-base">Phone (optional)</label>
                <div className="flex gap-2 sm:gap-3">
                  <select className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-[#E0E0E0] focus:border-teal focus:outline-none bg-white text-sm sm:text-base shrink-0">
                    <option>NP 🇳🇵 +977</option>
                  </select>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-[#E0E0E0] focus:border-teal focus:outline-none bg-white text-sm sm:text-base"
                    placeholder="9800000000"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div>
                <label className="block text-text-dark font-medium mb-2 text-sm sm:text-base">Project Details</label>
                <textarea
                  required
                  rows={4}
                  value={formData.projectDetails}
                  onChange={(e) => {
                    setFormData({ ...formData, projectDetails: e.target.value })
                    if (errors.projectDetails) setErrors({ ...errors, projectDetails: '' })
                  }}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border focus:outline-none bg-white resize-none text-sm sm:text-base transition-colors ${
                    errors.projectDetails ? 'border-red-500 focus:border-red-500' : 'border-[#E0E0E0] focus:border-teal'
                  }`}
                  placeholder="Tell us about your project..."
                />
                {errors.projectDetails && (
                  <p className="text-red-500 text-xs mt-1">{errors.projectDetails}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || !csrfToken}
                className="w-full bg-black text-white rounded-full px-6 sm:px-8 py-3 sm:py-4 font-bold hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isSubmitting ? 'Sending...' : 'Get a Quote'}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-3 sm:p-4 text-sm sm:text-base">
                  We'll be in touch within 24 hours!
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-3 sm:p-4 text-sm sm:text-base">
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
