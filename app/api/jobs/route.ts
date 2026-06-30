import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logger, logInfo, logError } from '@/lib/logger'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    logInfo('Fetching job postings')

    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type')
    const department = searchParams.get('department')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')

    const where: any = {
      isActive: true
    }

    if (type) {
      where.type = type
    }

    if (department) {
      where.department = department
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { department: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (featured === 'true') {
      where.isFeatured = true
    }

    const jobs = await prisma.jobPosting.findMany({
      where,
      orderBy: [
        { isFeatured: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json({ jobs })
  } catch (error) {
    logError('Error fetching job postings', { error })
    console.error('Jobs API error:', error)
    return NextResponse.json({ error: 'Failed to fetch jobs', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}
