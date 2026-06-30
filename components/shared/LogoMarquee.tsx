'use client'

import { useState, useEffect } from 'react'

export default function LogoMarquee() {
  const [logos, setLogos] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLogos() {
      try {
        const response = await fetch('/api/testimonials')
        const data = await response.json()
        // Extract company names from testimonials
        const companyNames = data.map((t: any) => t.company).filter(Boolean)
        setLogos(companyNames)
      } catch (error) {
        console.error('Error fetching logos:', error)
        // Fallback to default logos if API fails
        setLogos([
          'RARA Treks',
          'OHAYO SUSHI',
          'Bone & Joints',
          'ZOLPA',
          'Community Homestay',
          'ULTIMA',
          'BIA',
          'realme',
          'Gadgetbyte',
          'Mandala',
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchLogos()
  }, [])

  if (loading) {
    return (
      <div className="overflow-hidden py-12 bg-white">
        <div className="text-center py-12 text-[#8FA89E]">Loading...</div>
      </div>
    )
  }

  if (logos.length === 0) {
    return null
  }

  return (
    <div className="overflow-hidden py-12 bg-white">
      <p className="text-center text-sm font-medium text-[#8FA89E] mb-8">
        Trusted by {logos.length}+ Businesses Across Nepal & Beyond
      </p>
      
      <div className="relative">
        <div className="flex animate-marquee">
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-12 text-gray-400 hover:text-gray-900 transition-colors duration-300 font-semibold text-lg"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
