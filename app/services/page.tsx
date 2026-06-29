import { Metadata } from 'next'
import { motion } from 'framer-motion'
import OurServices from '@/components/home/OurServices'
import ServiceDetails from '@/components/services/ServiceDetails'

export const metadata: Metadata = {
  title: 'Our Services - Milanova',
  description: 'Discover our comprehensive web development services including eCommerce, custom web applications, SaaS development, and UI/UX design.',
}

export default function ServicesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] bg-gradient-to-br from-[#082E23] via-[#1A3028] to-[#0D1F1A] flex items-center pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#B5E12A]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#1A6B55]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#B5E12A]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-[#B5E12A] rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium tracking-wide">OUR SERVICES</span>
            </div>

            {/* Headline */}
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 sm:mb-8">
              World-Class
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B5E12A] to-[#1A6B55]">Digital Solutions</span>
              <br />
              for Your Business
            </h1>

            {/* Description */}
            <p className="text-white/80 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed mb-8 sm:mb-10 max-w-3xl">
              Nepal's leading web development company — trusted by 40+ businesses across Nepal & beyond to deliver exceptional digital experiences.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-8 border-t border-white/10">
              <div>
                <div className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold text-[#B5E12A]">40+</div>
                <div className="text-white/70 text-sm sm:text-base mt-1">Happy Clients</div>
              </div>
              <div>
                <div className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold text-[#B5E12A]">100+</div>
                <div className="text-white/70 text-sm sm:text-base mt-1">Projects Delivered</div>
              </div>
              <div>
                <div className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold text-[#B5E12A]">5+</div>
                <div className="text-white/70 text-sm sm:text-base mt-1">Years Experience</div>
              </div>
              <div>
                <div className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold text-[#B5E12A]">4.9/5</div>
                <div className="text-white/70 text-sm sm:text-base mt-1">Client Rating</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#EDF3EE] to-transparent" />
      </section>

      {/* Services Section */}
      <OurServices />
      
      {/* Service Details */}
      <ServiceDetails />
    </main>
  )
}
