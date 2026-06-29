import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { logError } from '@/lib/logger'

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { email } = await req.json()

    // Verify the email matches the authenticated user
    if (email !== session.user.email) {
      return NextResponse.json({ error: 'Email does not match authenticated user' }, { status: 403 })
    }

    // Delete user's contact submissions
    await prisma.contactSubmission.deleteMany({
      where: { email }
    })

    // Note: If you have a User model, you would delete it here
    // await prisma.user.delete({
    //   where: { email }
    // })

    return NextResponse.json({ success: true, message: 'Your data has been deleted' })
  } catch (error) {
    logError('Error deleting user data', { error })
    return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 })
  }
}
