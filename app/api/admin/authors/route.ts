import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { logError } from '@/lib/logger'

// GET all authors
export async function GET() {
  try {
    const authors = await prisma.author.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { blogs: true }
        }
      }
    })
    return NextResponse.json(authors)
  } catch (error) {
    logError('Error fetching authors', { error })
    return NextResponse.json({ error: 'Failed to fetch authors' }, { status: 500 })
  }
}

// POST create author
export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, slug, email, bio, image, role, twitter, linkedin, github, isActive } = body

    const author = await prisma.author.create({
      data: {
        name,
        slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
        email,
        bio,
        image,
        role,
        twitter,
        linkedin,
        github,
        isActive: isActive ?? true
      }
    })

    return NextResponse.json(author)
  } catch (error) {
    logError('Error creating author', { error })
    return NextResponse.json({ error: 'Failed to create author' }, { status: 500 })
  }
}
