import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { logError } from '@/lib/logger'

export async function GET() {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        name: true,
        email: true,
        image: true,
        createdAt: true
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    logError('Error fetching profile', { error })
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, image } = body

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        image
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    logError('Error updating profile', { error })
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
