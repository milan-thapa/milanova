import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logger, logInfo, logError } from '@/lib/logger'

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    logInfo('Fetching job posting', { slug: params.slug })

    const job = await prisma.jobPosting.findUnique({
      where: { slug: params.slug },
      include: {
        applications: {
          select: {
            id: true,
            fullName: true,
            email: true,
            status: true,
            createdAt: true
          }
        }
      }
    })

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }

    return NextResponse.json({ job })
  } catch (error) {
    logError('Error fetching job posting', { error })
    return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 })
  }
}
