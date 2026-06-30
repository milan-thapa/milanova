import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import JobDetailClient from './JobDetailClient'

interface PageProps {
  params: { slug: string }
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const job = await prisma.jobPosting.findUnique({
      where: { slug: params.slug }
    })

    if (!job) {
      return {
        title: 'Job Not Found | Milanova'
      }
    }

    return {
      title: `${job.title} | Careers | Milanova`,
      description: job.description?.substring(0, 160) || '',
      openGraph: {
        title: `${job.title} | Careers | Milanova`,
        description: job.description?.substring(0, 160) || '',
      },
    }
  } catch (error) {
    console.error('Error generating job metadata:', error)
    return {
      title: 'Job Not Found | Milanova'
    }
  }
}

export default async function JobDetailPage({ params }: PageProps) {
  try {
    const job = await prisma.jobPosting.findUnique({
      where: { slug: params.slug }
    })

    if (!job) {
      notFound()
    }

    return <JobDetailClient job={job} />
  } catch (error) {
    console.error('Job detail page error:', error)
    notFound()
  }
}
