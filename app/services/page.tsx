import { Metadata } from 'next'
import OurServices from '@/components/home/OurServices'

export const metadata: Metadata = {
  title: 'Our Services - Milanova',
  description: 'Discover our comprehensive web development services including eCommerce, custom web applications, SaaS development, and UI/UX design.',
}

export default function ServicesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-hero-dark py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-white text-4xl md:text-5xl font-extrabold mb-4">
            Our Services
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Nepal's leading web development company — trusted by 40+ businesses across Nepal & beyond.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <OurServices />
    </main>
  )
}
