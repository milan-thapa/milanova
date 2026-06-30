import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { sanitizeHtml } from '@/lib/security/input-sanitizer'

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://milanova.vercel.app'
  
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
      openGraph: {
        title: `${project.title} - Milanova`,
        description: project.description,
        url: `${baseUrl}/projects/${project.slug}`,
        type: 'website',
        images: project.coverImage || project.mockupImage ? [
          {
            url: project.coverImage || project.mockupImage,
            width: 1200,
            height: 630,
            alt: project.title,
          },
        ] : [
          {
            url: `${baseUrl}/images/og-image.png`,
            width: 1200,
            height: 630,
            alt: project.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${project.title} - Milanova`,
        description: project.description,
        images: project.coverImage || project.mockupImage ? [project.coverImage || project.mockupImage] : [`${baseUrl}/images/og-image.png`],
      },
    }
  } catch (error) {
    return {
      title: 'Project - Milanova',
      openGraph: {
        title: 'Project - Milanova',
        url: `${baseUrl}/projects/${params.slug}`,
        images: [
          {
            url: `${baseUrl}/images/og-image.png`,
            width: 1200,
            height: 630,
            alt: 'Milanova',
          },
        ],
      },
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
    <main className="min-h-screen bg-white">
      {/* Curved Green Background for Navbar */}
      <div className="bg-gradient-to-br from-[#082E23] via-[#1A3028] to-[#0D1F1A] h-16 sm:h-20 rounded-b-[2rem] sm:rounded-b-[3rem] md:rounded-b-[4rem]" />
      
      {/* Hero Image */}
      <section className="relative aspect-[16/7] sm:aspect-[16/8] md:aspect-[16/9] bg-gradient-to-br from-[#082E23] to-[#1A3028]">
        {project.mockupImage || project.coverImage ? (
          <Image
            src={project.mockupImage || project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#B5E12A]/10 to-[#1A6B55]/10 flex items-center justify-center">
            <svg className="w-24 h-24 sm:w-32 sm:h-32 text-[#1A6B55]/30" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v2H8V8zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#082E23]/90 to-transparent" />
      </section>

      {/* Tags + Title + CTA */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-[#B5E12A]/10 text-[#1A6B55] text-sm font-medium rounded-full px-4 py-2"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-[#0D1F1A] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
            {project.title}
          </h1>
          <p className="text-[#3A4A44] text-base sm:text-lg md:text-xl max-w-3xl mb-8 sm:mb-10 leading-relaxed">
            {project.description}
          </p>
          <a
            href={'#'}
            className="inline-flex items-center gap-2 bg-[#B5E12A] text-[#0D1F1A] rounded-full px-6 sm:px-8 py-3 sm:py-4 font-bold hover:bg-[#A3D01F] transition-all hover:scale-105"
          >
            {'View Project Details'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </section>

      {/* Meta Grid */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
              <h3 className="text-[#8FA89E] text-xs sm:text-sm font-medium mb-2 uppercase tracking-wider">PROJECT</h3>
              <p className="text-[#0D1F1A] font-semibold text-sm sm:text-base">{project.title}</p>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
              <h3 className="text-[#8FA89E] text-xs sm:text-sm font-medium mb-2 uppercase tracking-wider">AGENCY</h3>
              <p className="text-[#0D1F1A] font-semibold text-sm sm:text-base">Milanova</p>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
              <h3 className="text-[#8FA89E] text-xs sm:text-sm font-medium mb-2 uppercase tracking-wider">CATEGORY</h3>
              <p className="text-[#0D1F1A] font-semibold text-sm sm:text-base">{project.category}</p>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
              <h3 className="text-[#8FA89E] text-xs sm:text-sm font-medium mb-2 uppercase tracking-wider">YEAR</h3>
              <p className="text-[#0D1F1A] font-semibold text-sm sm:text-base">{project.year}</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-4xl">
            <h2 className="text-[#0D1F1A] text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">The Challenge</h2>
            <p className="text-[#3A4A44] text-base sm:text-lg md:text-xl leading-relaxed">
              {project.challenge}
            </p>
          </div>
        </div>
      </section>

      {/* What We Did */}
      <section className="py-16 sm:py-20 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-4xl">
            <h2 className="text-[#0D1F1A] text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12">What We Did</h2>
            <div className="prose prose-sm sm:prose-base lg:prose-lg prose-headings:text-[#0D1F1A] prose-p:text-[#3A4A44] max-w-none">
              <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(project.whatWeDid || '<p>Our approach to solving these challenges.</p>') }} />
            </div>
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
