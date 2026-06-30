'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Skeleton } from '@/components/shared/Skeleton'

export default function Footer() {
  const [settings, setSettings] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [subscribing, setSubscribing] = useState(false)
  const [subscribeMessage, setSubscribeMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [csrfToken, setCsrfToken] = useState('')

  useEffect(() => {
    fetch('/api/settings')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then(data => {
        if (data && typeof data === 'object' && !data.error) {
          setSettings(data)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetch('/api/csrf')
      .then(res => res.json())
      .then(data => {
        if (data.token) setCsrfToken(data.token)
      })
      .catch(console.error)
  }, [])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || subscribing) return

    setSubscribing(true)
    setSubscribeMessage(null)

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, csrfToken })
      })

      const data = await res.json()

      if (res.ok) {
        setSubscribeMessage({ type: 'success', text: 'Successfully subscribed!' })
        setEmail('')
      } else {
        setSubscribeMessage({ type: 'error', text: data.error || 'Subscription failed' })
      }
    } catch (error) {
      setSubscribeMessage({ type: 'error', text: 'Something went wrong' })
    } finally {
      setSubscribing(false)
    }
  }

  if (loading) {
    return (
      <footer className="bg-[#0D1F1A] text-white relative rounded-t-3xl py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      </footer>
    )
  }

  if (!settings) {
    return (
      <footer className="bg-[#0D1F1A] text-white relative rounded-t-3xl py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[#A8B8B0]">No settings configured. Please add settings via admin panel.</p>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-[#0D1F1A] text-white relative rounded-t-3xl">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12">
          {/* Column 1 - Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-bold text-2xl sm:text-3xl mb-4 inline-block text-white">
              {settings.siteName}
            </Link>
            <p className="text-[#A8B8B0] leading-relaxed mb-6 max-w-sm text-sm sm:text-base">
              We bring your ideas to life, create great experiences, and help your brand connect with people. Your trusted partner for digital innovation.
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-[#A8B8B0]">
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {settings.address}
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {settings.email}
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {settings.phone}
              </p>
            </div>
          </div>

          {/* Column 2 - Company */}
          <div>
            <h3 className="font-semibold mb-4 text-base sm:text-lg">Company</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-[#8FA89E]">
              <li>
                <Link href="/about" className="hover:text-[#B5E12A] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#B5E12A] transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-[#B5E12A] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#B5E12A] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#B5E12A] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h3 className="font-semibold mb-4 text-base sm:text-lg">Services</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-[#8FA89E]">
              <li>
                <Link href="/services" className="hover:text-[#B5E12A] transition-colors">
                  eCommerce Development
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#B5E12A] transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#B5E12A] transition-colors">
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#B5E12A] transition-colors">
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#B5E12A] transition-colors">
                  SaaS Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-base sm:text-lg">Legal</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-[#8FA89E]">
              <li>
                <Link href="/privacy" className="hover:text-[#B5E12A] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#B5E12A] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-[#B5E12A] transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#B5E12A] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5 - Newsletter */}
          <div>
            <h3 className="font-semibold mb-4 text-base sm:text-lg">Stay Updated</h3>
            <p className="text-xs sm:text-sm text-[#8FA89E] mb-4">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-[#1A3028] border border-[#1A3028] rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#B5E12A] transition-colors"
                required
              />
              <button
                type="submit"
                disabled={subscribing}
                className="bg-[#B5E12A] text-[#0D1F1A] px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm hover:bg-[#A3D01F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {subscribing ? 'Subscribing...' : 'Subscribe'}
              </button>
              {subscribeMessage && (
                <p className={`text-xs ${subscribeMessage.type === 'success' ? 'text-[#B5E12A]' : 'text-red-400'}`}>
                  {subscribeMessage.text}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Social icons */}
        <div className="flex gap-3 sm:gap-4 mt-8 sm:mt-12">
          {settings.facebookUrl && (
            <a
              href={settings.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1A3028] rounded-full flex items-center justify-center hover:bg-[#1A6B55] transition-all hover:scale-110"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          )}
          {settings.instagramUrl && (
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1A3028] rounded-full flex items-center justify-center hover:bg-[#1A6B55] transition-all hover:scale-110"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          )}
          {settings.twitterUrl && (
            <a
              href={settings.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1A3028] rounded-full flex items-center justify-center hover:bg-[#1A6B55] transition-all hover:scale-110"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          )}
          {settings.linkedinUrl && (
            <a
              href={settings.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1A3028] rounded-full flex items-center justify-center hover:bg-[#1A6B55] transition-all hover:scale-110"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          )}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1A3028] mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#8FA89E]">
          <p>© {new Date().getFullYear()} Milanova Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-4 sm:gap-6 mt-4 md:mt-0">
            <Link href="/terms" className="hover:text-[#B5E12A] transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-[#B5E12A] transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
