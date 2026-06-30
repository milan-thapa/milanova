import { prisma } from '@/lib/prisma'
import ProjectCard from './ProjectCard'

export default async function ProjectGrid() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
      {projects.length === 0 && (
        <div className="col-span-full text-center py-12 sm:py-16 text-[#8FA89E]">
          No projects available at the moment.
        </div>
      )}
    </div>
  )
}
