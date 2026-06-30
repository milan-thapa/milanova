import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { logError } from '@/lib/logger'

export const dynamic = 'force-dynamic'

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

    // Fetch user's contact submissions
    const contactSubmissions = await prisma.contactSubmission.findMany({
      where: { email }
    })

    // Compile user data
    const userData = {
      email,
      contactSubmissions: contactSubmissions.map(sub => ({
        fullName: sub.fullName,
        email: sub.email,
        phone: sub.phone,
        projectDetails: sub.projectDetails,
        createdAt: sub.createdAt,
      })),
      exportDate: new Date().toISOString(),
    }

    return NextResponse.json(userData)
  } catch (error) {
    logError('Error exporting user data', { error })
    return NextResponse.json({ error: 'Failed to export data' }, { status: 500 })
  }
}
