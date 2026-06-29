import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { logError } from '@/lib/logger'

// PUT update author
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, slug, email, bio, image, role, twitter, linkedin, github, isActive } = body

    const author = await prisma.author.update({
      where: { id: params.id },
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
        isActive
      }
    })

    return NextResponse.json(author)
  } catch (error) {
    logError('Error updating author', { error })
    return NextResponse.json({ error: 'Failed to update author' }, { status: 500 })
  }
}

// DELETE author
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.author.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    logError('Error deleting author', { error })
    return NextResponse.json({ error: 'Failed to delete author' }, { status: 500 })
  }
}
