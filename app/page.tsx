import { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import TrustedByStrip from '@/components/home/TrustedByStrip'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import OurServices from '@/components/home/OurServices'
import MilanovaEdge from '@/components/home/MilanovaEdge'
import Testimonials from '@/components/home/Testimonials'
import StartProject from '@/components/home/StartProject'
import BlogsPreview from '@/components/home/BlogsPreview'
import FAQPreview from '@/components/home/FAQPreview'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Milanova - Nepal\'s leading web development company. Transform your business with expert eCommerce, SaaS development, and UI/UX design services.',
  keywords: ['web development Nepal', 'eCommerce Nepal', 'SaaS development', 'UI/UX design', 'custom web development', 'digital agency'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Milanova - Digital Solutions for Every Mission-Driven Team',
    description: 'Transform your business with expert web development, eCommerce, SaaS, and UI/UX design services.',
    url: 'https://milanova.com',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Milanova - Digital Solutions for Every Mission-Driven Team',
      },
    ],
  },
  twitter: {
    title: 'Milanova - Digital Solutions for Every Mission-Driven Team',
    description: 'Transform your business with expert web development, eCommerce, SaaS, and UI/UX design services.',
    images: ['/images/og-image.jpg'],
  },
}

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustedByStrip />
      <FeaturedProjects />
      <OurServices />
      <MilanovaEdge />
      <Testimonials />
      <StartProject />
      <BlogsPreview />
      <FAQPreview />
    </main>
  )
}
