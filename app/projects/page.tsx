import { Metadata } from 'next'
import ProjectHero from '@/components/projects/ProjectHero'
import ProjectGrid from '@/components/projects/ProjectGrid'

export const metadata: Metadata = {
  title: 'Projects - Milanova',
  description: 'Explore our portfolio of successful web development projects. From eCommerce platforms to SaaS applications, see how we help businesses grow.',
}

export default function ProjectsPage() {
  return (
    <main>
      <ProjectHero />
      <section id="projects" className="py-20 sm:py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <ProjectGrid />
        </div>
      </section>
    </main>
  )
}
