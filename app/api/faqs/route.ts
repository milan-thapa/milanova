import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logError } from '@/lib/logger'

export async function GET() {
  try {
    const faqs = await prisma.fAQ.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(faqs)
  } catch (error) {
    logError('Error fetching FAQs', { error })
    return NextResponse.json([], { status: 500 })
  }
}
