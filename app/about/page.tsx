import { Metadata } from 'next'
import AboutHero from '@/components/about/AboutHero'
import OurStorySection from '@/components/about/OurStorySection'
import WhatDrivesUsSection from '@/components/about/WhatDrivesUsSection'
import OurProcessSection from '@/components/about/OurProcessSection'
import WhyWeMatterSection from '@/components/about/WhyWeMatterSection'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Milanova - Nepal\'s leading web development company. Discover our story, mission, vision, and the team behind innovative digital solutions.',
  keywords: ['about Milanova', 'web development company Nepal', 'our team', 'company story', 'mission driven'],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us - Milanova',
    description: 'Learn about Milanova - Nepal\'s leading web development company. Discover our story, mission, vision, and the team.',
    url: 'https://milanova.com/about',
    images: [
      {
        url: '/images/aboutus.png',
        width: 1200,
        height: 630,
        alt: 'About Milanova Team',
      },
    ],
  },
  twitter: {
    title: 'About Us - Milanova',
    description: 'Learn about Milanova - Nepal\'s leading web development company. Discover our story, mission, vision, and the team.',
    images: ['/images/aboutus.png'],
  },
}

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <OurStorySection />
      <WhatDrivesUsSection />
      <OurProcessSection />
      <WhyWeMatterSection />
    </main>
  )
}
