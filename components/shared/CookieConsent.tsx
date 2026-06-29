'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    } else {
      setPreferences(JSON.parse(consent))
    }
  }, [])

  const handleAcceptAll = () => {
    const newPreferences = { essential: true, analytics: true, marketing: true }
    setPreferences(newPreferences)
    localStorage.setItem('cookie-consent', JSON.stringify(newPreferences))
    setShowBanner(false)
  }

  const handleRejectAll = () => {
    const newPreferences = { essential: true, analytics: false, marketing: false }
    setPreferences(newPreferences)
    localStorage.setItem('cookie-consent', JSON.stringify(newPreferences))
    setShowBanner(false)
  }

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences))
    setShowBanner(false)
  }

  const handleToggle = (key: keyof typeof preferences) => {
    if (key === 'essential') return // Essential cookies cannot be disabled
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0D1F1A] text-white p-4 md:p-6 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Cookie Preferences</h3>
            <p className="text-sm text-gray-300 mb-4">
              We use cookies to enhance your experience. You can choose which cookies to allow. Essential cookies are required for the website to function.
            </p>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-sm">Essential Cookies</span>
                  <p className="text-xs text-gray-400">Required for basic functionality</p>
                </div>
                <div className="relative inline-block w-12 h-6 rounded-full bg-teal cursor-not-allowed opacity-50">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-sm">Analytics Cookies</span>
                  <p className="text-xs text-gray-400">Help us improve our website</p>
                </div>
                <button
                  onClick={() => handleToggle('analytics')}
                  className={`relative inline-block w-12 h-6 rounded-full transition-colors ${
                    preferences.analytics ? 'bg-teal' : 'bg-gray-600'
                  }`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    preferences.analytics ? 'right-1' : 'left-1'
                  }`}></div>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-sm">Marketing Cookies</span>
                  <p className="text-xs text-gray-400">Used for advertising</p>
                </div>
                <button
                  onClick={() => handleToggle('marketing')}
                  className={`relative inline-block w-12 h-6 rounded-full transition-colors ${
                    preferences.marketing ? 'bg-teal' : 'bg-gray-600'
                  }`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    preferences.marketing ? 'right-1' : 'left-1'
                  }`}></div>
                </button>
              </div>
            </div>

            <Link href="/cookies" className="text-sm text-lime hover:underline">
              Learn more about our cookies
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 md:ml-4">
            <button
              onClick={handleRejectAll}
              className="px-4 py-2 text-sm font-medium border border-white/30 rounded-lg hover:bg-white/10 transition-colors"
            >
              Reject All
            </button>
            <button
              onClick={handleSavePreferences}
              className="px-4 py-2 text-sm font-medium bg-white text-[#0D1F1A] rounded-lg hover:bg-gray-100 transition-colors"
            >
              Save Preferences
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-4 py-2 text-sm font-medium bg-lime text-[#0D1F1A] rounded-lg hover:bg-[#A3D01F] transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
