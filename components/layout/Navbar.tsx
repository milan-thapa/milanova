'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useFocusTrap } from '@/lib/use-focus-trap'

export default function Navbar() {
  const [isCompact, setIsCompact] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [navLinks, setNavLinks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const lastScrollY = useRef(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    fetch('/api/navigation')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then(data => {
        if (Array.isArray(data)) {
          setNavLinks(data)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = window.requestAnimationFrame(() => {
        const y = window.scrollY
        setIsCompact(y > 80)
        lastScrollY.current = y
        rafRef.current = null
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      {/* ─── FULL NAVBAR (transparent, top of page) ─── */}
      <nav
        aria-label="Main navigation"
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isCompact
            ? 'opacity-0 -translate-y-full pointer-events-none'
            : 'opacity-100 translate-y-0 pointer-events-auto'}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10 group flex items-center gap-1.5 sm:gap-2">
            <span className="text-white font-bold text-lg sm:text-xl tracking-tight">Milanova</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-4 sm:gap-6 lg:gap-8">
            {loading ? (
              <span className="text-sm text-white/60">Loading...</span>
           ) : navLinks.length === 0 ? (
              <span className="text-sm text-white/60">No navigation links</span>
            ) : (
              navLinks.map((link) => (
                <Link
                  key={link.id || link.href}
                  href={link.href}
                  className={`
                    relative text-sm font-medium tracking-wide
                    text-white/80 hover:text-white
                    transition-colors duration-200
                    after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0
                    after:bg-lime after:transition-all after:duration-300
                    hover:after:w-full
                    ${pathname === link.href ? 'text-white after:w-full' : ''}
                  `}
                >
                  {link.name}
                </Link>
              ))
            )}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <WhatsAppButton variant="outline" />
          </div>

          {/* Mobile Hamburger */}
          <MobileMenuButton open={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} light />
        </div>
      </nav>

      {/* ─── COMPACT PILL NAVBAR (on scroll) ─── */}
      <nav
        aria-label="Compact navigation"
        className={`
          fixed z-50 left-0 right-0
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isCompact
            ? 'top-4 opacity-100 translate-y-0 pointer-events-auto'
            : 'top-0 opacity-0 -translate-y-full pointer-events-none'}
        `}
      >
        <div className="max-w-5xl mx-auto px-3 sm:px-4">
          <div
            className="
              flex items-center justify-between
              bg-gradient-to-b from-white/90 to-white/70
              backdrop-blur-2xl
              border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)]
              rounded-[1.5rem] sm:rounded-[2rem] px-4 sm:px-6 h-14 sm:h-16
            "
          >
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-1 sm:gap-1.5">
              <span className="text-black font-bold text-base sm:text-lg tracking-tight">Milanova</span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-3 sm:gap-4 lg:gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`
                    relative text-sm font-medium
                    text-gray-700 hover:text-black
                    transition-colors duration-200
                    after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0
                    after:bg-teal after:transition-all after:duration-300
                    hover:after:w-full
                    ${pathname === link.href ? 'text-black after:w-full' : ''}
                  `}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex">
              <WhatsAppButton variant="solid" />
            </div>

            {/* Mobile Hamburger */}
            <MobileMenuButton open={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} />
          </div>
        </div>
      </nav>

      {/* ─── MOBILE DRAWER ─── */}
      {/* Backdrop */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`
          fixed inset-0 z-40 bg-black/40 backdrop-blur-sm
          transition-opacity duration-300
          lg:hidden
          ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        ref={useFocusTrap(mobileOpen)}
        className={`
          fixed top-0 right-0 bottom-0 z-50 w-64 sm:w-72
          bg-white flex flex-col
          transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
          lg:hidden shadow-2xl
          ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-4 sm:px-6 h-16 sm:h-20 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-1.5" onClick={() => setMobileOpen(false)}>
            <span className="text-[#0D1F1A] font-bold text-base sm:text-lg">Milanova</span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5 text-[#0D1F1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer links */}
        <nav className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-8 space-y-1">
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : '0ms' }}
              className={`
                flex items-center justify-between
                px-4 py-3 rounded-xl
                text-[#0D1F1A] font-medium text-sm
                transition-all duration-300
                hover:bg-gray-50 hover:pl-5 hover:translate-x-1
                ${pathname === link.href ? 'bg-gray-50 text-teal' : ''}
              `}
            >
              {link.name}
              <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </nav>

        {/* Drawer footer CTA */}
        <div className="px-4 sm:px-6 pb-6 sm:pb-8 pt-4 border-t border-gray-100">
          <a
            href="https://wa.me/9779801816685"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-teal text-white rounded-xl px-4 py-3.5 text-sm font-semibold hover:brightness-110 active:scale-[0.98] transition-all"
          >
            <WhatsAppIcon />
            WhatsApp Us
          </a>
        </div>
      </div>
    </>
  )
}

/* ─── Sub-components ─── */

function WhatsAppButton({ variant }: { variant: 'solid' | 'outline' }) {
  return (
    <a
      href="https://wa.me/9779801816685"
      target="_blank"
      rel="noopener noreferrer"
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
        transition-all duration-200 active:scale-[0.97]
        ${variant === 'solid'
          ? 'bg-teal text-white hover:brightness-110 shadow-sm'
          : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm'}
      `}
    >
      <WhatsAppIcon />
      WhatsApp Us
    </a>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function MobileMenuButton({
  open,
  onClick,
  light,
}: {
  open: boolean
  onClick: () => void
  light?: boolean
}) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      className={`
        lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5
        rounded-lg transition-colors duration-200
        ${light ? 'hover:bg-white/10' : 'hover:bg-gray-100'}
      `}
    >
      <span
        className={`
          block h-0.5 w-5 rounded-full transition-all duration-300 origin-center
          ${light ? 'bg-white' : 'bg-[#0D1F1A]'}
          ${open ? 'rotate-45 translate-y-2' : ''}
        `}
      />
      <span
        className={`
          block h-0.5 w-5 rounded-full transition-all duration-300
          ${light ? 'bg-white' : 'bg-[#0D1F1A]'}
          ${open ? 'opacity-0 scale-x-0' : ''}
        `}
      />
      <span
        className={`
          block h-0.5 w-5 rounded-full transition-all duration-300 origin-center
          ${light ? 'bg-white' : 'bg-[#0D1F1A]'}
          ${open ? '-rotate-45 -translate-y-2' : ''}
        `}
      />
    </button>
  )
}