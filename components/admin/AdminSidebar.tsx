'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, FolderKanban, FileText, MessageSquare, HelpCircle, Mail, LogOut, Settings, Navigation, Briefcase, Menu, X, UserCircle, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signOutAction } from '@/app/admin/actions'
import { useState, useEffect } from 'react'
import { auth } from '@/lib/auth'
import Image from 'next/image'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/blogs', label: 'Blogs', icon: FileText },
  { href: '/admin/categories', label: 'Categories', icon: Navigation },
  { href: '/admin/authors', label: 'Authors', icon: Briefcase },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
  { href: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { href: '/admin/contact', label: 'Contact', icon: Mail },
  { href: '/admin/services', label: 'Services', icon: Briefcase },
  { href: '/admin/navigation', label: 'Navigation', icon: Navigation },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
  { href: '/admin/settings/profile', label: 'Profile', icon: User },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [userImage, setUserImage] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUser() {
      const session = await auth()
      if (session?.user?.image) {
        setUserImage(session.user.image)
      }
    }
    fetchUser()
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-50 active:bg-gray-100 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-screen bg-white border-r border-gray-200 flex flex-col z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-64 md:w-72 lg:w-64 xl:w-72
      `}>
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h1 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Milanova Admin</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Content Management</p>
        </div>

        <nav className="flex-1 p-3 sm:p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            const isProfile = item.href === '/admin/settings/profile'
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-3 rounded-lg transition-colors touch-target ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {isProfile && userImage ? (
                  <Image
                    src={userImage}
                    alt="User profile picture"
                    width={24}
                    height={24}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
                <span className="font-medium text-sm sm:text-base">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-3 sm:p-4 border-t border-gray-200">
          <form action={signOutAction}>
            <Button type="submit" variant="outline" className="w-full" size="default">
              <LogOut className="w-4 h-4 mr-2" />
              <span className="text-sm sm:text-base">Sign Out</span>
            </Button>
          </form>
        </div>
      </aside>
    </>
  )
}
