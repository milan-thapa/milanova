'use client'

import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
}

const staggerContainer = {
  whileInView: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

export default function ServiceDetails() {
  const services = [
    {
      icon: '🛒',
      title: 'eCommerce Development',
      description: 'Build powerful, scalable online stores that drive sales and customer engagement.',
      features: [
        'Custom Shopify & WooCommerce Solutions',
        'Payment Gateway Integration',
        'Inventory Management Systems',
        'Multi-vendor Marketplaces',
        'Mobile-First Shopping Experience'
      ],
      color: 'from-[#B5E12A] to-[#1A6B55]'
    },
    {
      icon: '💻',
      title: 'Web Development',
      description: 'Create stunning, high-performance websites tailored to your unique business needs.',
      features: [
        'Custom Web Applications',
        'Progressive Web Apps (PWA)',
        'CMS Integration (WordPress, Strapi)',
        'API Development & Integration',
        'Performance Optimization'
      ],
      color: 'from-[#1A6B55] to-[#B5E12A]'
    },
    {
      icon: '📱',
      title: 'Mobile App Development',
      description: 'Develop native and cross-platform mobile applications that users love.',
      features: [
        'React Native & Flutter Apps',
        'iOS & Android Development',
        'UI/UX Design for Mobile',
        'App Store Optimization',
        'Push Notifications & Analytics'
      ],
      color: 'from-[#B5E12A] to-[#1A6B55]'
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Craft intuitive, beautiful interfaces that enhance user experience and drive conversions.',
      features: [
        'User Research & Testing',
        'Wireframing & Prototyping',
        'Design Systems & Guidelines',
        'Responsive Design',
        'Accessibility Compliance'
      ],
      color: 'from-[#1A6B55] to-[#B5E12A]'
    },
    {
      icon: '☁️',
      title: 'SaaS Development',
      description: 'Build scalable Software-as-a-Service solutions that grow with your business.',
      features: [
        'Multi-tenant Architecture',
        'Subscription Management',
        'Analytics & Reporting',
        'API Integration',
        'Security & Compliance'
      ],
      color: 'from-[#B5E12A] to-[#1A6B55]'
    },
    {
      icon: '🔧',
      title: 'Maintenance & Support',
      description: 'Keep your digital products running smoothly with ongoing support and updates.',
      features: [
        '24/7 Technical Support',
        'Security Updates & Patches',
        'Performance Monitoring',
        'Content Updates',
        'Backup & Recovery'
      ],
      color: 'from-[#1A6B55] to-[#B5E12A]'
    }
  ]

  return (
    <section className="py-20 sm:py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B5E12A]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1A6B55]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-block bg-[#1A6B55] text-white px-4 sm:px-6 py-2 rounded-lg mb-6">
              <span className="font-semibold tracking-widest text-xs sm:text-sm">DETAILED SERVICES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0D1F1A] mb-6">
              Comprehensive Solutions
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A6B55] to-[#B5E12A]">For Every Need</span>
            </h2>
            <p className="text-[#3A4A44] text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              From concept to launch and beyond, we provide end-to-end digital solutions tailored to your business goals.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative"
              >
                <div className="relative bg-gradient-to-br from-[#F4F9F4] to-white rounded-3xl p-8 sm:p-10 h-full hover:shadow-2xl transition-all duration-500 border border-[#E8EDE9] hover:border-[#B5E12A]/30 overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Icon */}
                  <div className="text-5xl sm:text-6xl mb-6">{service.icon}</div>
                  
                  {/* Title */}
                  <h3 className="text-[#0D1F1A] font-bold text-xl sm:text-2xl mb-3">{service.title}</h3>
                  
                  {/* Description */}
                  <p className="text-[#3A4A44] text-sm sm:text-base leading-relaxed mb-6">{service.description}</p>
                  
                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm sm:text-base text-[#3A4A44]">
                        <span className="text-[#B5E12A] mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Decorative Corner */}
                  <div className={`absolute bottom-4 right-4 w-16 h-16 bg-gradient-to-br ${service.color} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
