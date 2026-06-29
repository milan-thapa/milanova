import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  try {
    const project = await prisma.project.findUnique({
      where: { slug: params.slug },
    })

    if (!project) {
      return {
        title: 'Project Not Found',
      }
    }

    return {
      title: `${project.title} - Milanova`,
      description: project.description,
    }
  } catch (error) {
    return {
      title: 'Project - Milanova',
    }
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  try {
    const project = await prisma.project.findUnique({
      where: { slug: params.slug },
    })

    if (!project) {
      notFound()
    }

  return (
    <main>
      {/* Hero Image */}
      <section className="relative aspect-[16/7] bg-gradient-to-br from-hero-dark to-teal">
        {project.mockupImage || project.coverImage ? (
          <Image
            src={project.mockupImage || project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-hero-dark/80 to-transparent" />
      </section>

      {/* Tags + Title + CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-off-white text-text-body text-sm rounded-full px-4 py-2"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-text-dark text-4xl md:text-5xl font-extrabold mb-6">
            {project.title}
          </h1>
          <p className="text-text-body text-lg max-w-3xl mb-8 leading-relaxed">
            {project.description}
          </p>
          <a
            href={'#'}
            className="inline-block bg-lime text-text-dark rounded-full px-8 py-4 font-bold hover:brightness-110 transition-all"
          >
            {'View Project Details'}
          </a>
        </div>
      </section>

      {/* Meta Grid */}
      <section className="py-12 bg-off-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-text-muted text-sm font-medium mb-4">PROJECT</h3>
              <p className="text-text-dark font-medium">{project.title}</p>
            </div>
            <div>
              <h3 className="text-text-muted text-sm font-medium mb-4">AGENCY</h3>
              <p className="text-text-dark font-medium">Milanova</p>
            </div>
            <div>
              <h3 className="text-text-muted text-sm font-medium mb-4">CATEGORY</h3>
              <p className="text-text-dark font-medium">{project.category}</p>
            </div>
            <div>
              <h3 className="text-text-muted text-sm font-medium mb-4">YEAR</h3>
              <p className="text-text-dark font-medium">{project.year}</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-text-dark text-3xl font-bold mb-6">The Challenge</h2>
          <p className="text-text-body text-lg max-w-3xl mb-12 leading-relaxed">
            {project.challenge}
          </p>
        </div>
      </section>

      {/* What We Did */}
      <section className="py-16 bg-off-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-text-dark text-3xl font-bold mb-12">What We Did</h2>
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: project.whatWeDid || '<p>Our approach to solving these challenges.</p>' }} />
          </div>
        </div>
      </section>
    </main>
  )
  } catch (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Database Not Configured</h1>
          <p className="text-lg text-gray-600">Please set up your database to view project details.</p>
        </div>
      </main>
    )
  }
}
