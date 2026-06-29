import { Metadata } from 'next'
import ProjectGrid from '@/components/projects/ProjectGrid'

export const metadata: Metadata = {
  title: 'Projects - Milanova',
  description: 'Explore our portfolio of successful web development projects. From eCommerce platforms to SaaS applications, see how we help businesses grow.',
}

export default function ProjectsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-hero-dark py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-white text-2xl md:text-3xl max-w-2xl leading-relaxed">
            Every project is a collaboration. We help brands tell their story, solve real problems, and create meaningful user experiences.
          </p>
          <a
            href="#projects"
            className="inline-block mt-8 bg-[#1A2E26] text-white rounded-full px-6 py-3 font-medium hover:brightness-110 transition-all"
          >
            Recent projects ↗
          </a>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ProjectGrid />
        </div>
      </section>
    </main>
  )
}
