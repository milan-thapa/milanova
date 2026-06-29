import { Metadata } from 'next'
import BlogsPageClient from './BlogsPageClient'

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Explore our latest thoughts, industry trends, and expert perspectives on web development, design, technology, and innovation.',
  keywords: ['web development blog', 'tech insights', 'design trends', 'SaaS development', 'eCommerce tips'],
  alternates: {
    canonical: '/blogs',
  },
  openGraph: {
    title: 'Insights - Milanova',
    description: 'Explore our latest thoughts, industry trends, and expert perspectives on design, technology, and innovation.',
    url: 'https://milanova.com/blogs',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Milanova Insights Blog',
      },
    ],
  },
  twitter: {
    title: 'Insights - Milanova',
    description: 'Explore our latest thoughts, industry trends, and expert perspectives on design, technology, and innovation.',
    images: ['/images/og-image.jpg'],
  },
}

export default function BlogsPage() {
  return <BlogsPageClient />
}
