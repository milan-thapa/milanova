import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JobDetailClient from './JobDetailClient'

interface PageProps {
  params: { slug: string }
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/jobs/${params.slug}`, {
    cache: 'no-store'
  })
  
  if (!res.ok) {
    return {
      title: 'Job Not Found | Milanova'
    }
  }

  const data = await res.json()
  const job = data.job

  return {
    title: `${job.title} | Careers | Milanova`,
    description: job.description,
    openGraph: {
      title: `${job.title} | Careers | Milanova`,
      description: job.description,
    },
  }
}

export default async function JobDetailPage({ params }: PageProps) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/jobs/${params.slug}`, {
      cache: 'no-store'
    })

    if (!res.ok) {
      notFound()
    }

    const data = await res.json()
    const job = data.job

    return <JobDetailClient job={job} />
  } catch (error) {
    console.error('Job detail page error:', error)
    notFound()
  }
}
