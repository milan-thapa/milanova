import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { resend } from '@/lib/resend'
import { rateLimit } from '@/lib/rate-limit'
import { logger, logError, logWarn, logInfo } from '@/lib/logger'
import { validateCSRFToken } from '@/lib/csrf'

export async function POST(req: NextRequest) {
  try {
    logInfo('Newsletter subscription received')

    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    const rateLimitResult = rateLimit({
      identifier: `newsletter-${ip}`,
      limit: 3, // 3 requests per minute
      window: 60000,
    })

    if (!rateLimitResult.success) {
      logWarn('Rate limit exceeded', { ip })
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const { email, csrfToken } = await req.json()

    // Validate CSRF token
    if (!csrfToken || !(await validateCSRFToken(csrfToken))) {
      logWarn('Invalid CSRF token', { email })
      return NextResponse.json({ error: 'Invalid request' }, { status: 403 })
    }

    // Validate email
    if (!email) {
      logWarn('Missing email', { email })
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      logWarn('Invalid email format', { email })
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Check if email already exists
    const existingSubscription = await prisma.newsletterSubscription.findUnique({
      where: { email }
    })

    if (existingSubscription) {
      if (existingSubscription.isActive) {
        logWarn('Email already subscribed', { email })
        return NextResponse.json({ error: 'Email is already subscribed' }, { status: 409 })
      } else {
        // Reactivate inactive subscription
        await prisma.newsletterSubscription.update({
          where: { email },
          data: { isActive: true }
        })
        logInfo('Reactivated newsletter subscription', { email })
      }
    } else {
      // Create new subscription
      await prisma.newsletterSubscription.create({
        data: { email }
      })
      logInfo('Created newsletter subscription', { email })
    }

    // Send confirmation email if Resend is configured
    if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
          to: email,
          subject: 'Welcome to Milanova Newsletter!',
          html: `
            <h2>Welcome to Milanova!</h2>
            <p>Thank you for subscribing to our newsletter.</p>
            <p>You'll receive the latest updates, insights, and news from us directly in your inbox.</p>
            <br/>
            <p>Best regards,<br/>The Milanova Team</p>
          `
        })
        logInfo('Newsletter confirmation email sent', { email })
      } catch (emailError) {
        logError('Email error sending newsletter confirmation', { error: emailError })
        // Continue even if email fails - subscription was still successful
      }
    } else {
      logWarn('Resend not configured - skipping confirmation email')
    }

    return NextResponse.json({ success: true, message: 'Successfully subscribed to newsletter' })
  } catch (error) {
    logError('Newsletter subscription error', { error })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
