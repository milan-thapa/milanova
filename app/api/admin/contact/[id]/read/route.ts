import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { logError } from '@/lib/logger'

export const dynamic = 'force-dynamic'

// PUT mark contact submission as read
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const submission = await prisma.contactSubmission.update({
      where: { id: params.id },
      data: { isRead: true }
    })

    return NextResponse.json(submission)
  } catch (error) {
    logError('Error marking contact submission as read', { error })
    return NextResponse.json({ error: 'Failed to mark as read' }, { status: 500 })
  }
}
