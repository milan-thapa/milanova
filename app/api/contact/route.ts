import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { resend } from '@/lib/resend'
import { rateLimit } from '@/lib/rate-limit'
import { logger, logError, logWarn, logInfo } from '@/lib/logger'
import { validateCSRFToken } from '@/lib/csrf'

export async function POST(req: NextRequest) {
  try {
    logInfo('Contact form submission received')

    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    const rateLimitResult = rateLimit({
      identifier: `contact-${ip}`,
      limit: 5, // 5 requests per minute
      window: 60000,
    })

    if (!rateLimitResult.success) {
      logWarn('Rate limit exceeded', { ip })
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const { fullName, email, phone, projectDetails, csrfToken } = await req.json()

    // Validate CSRF token
    if (!csrfToken || !(await validateCSRFToken(csrfToken))) {
      logWarn('Invalid CSRF token', { email })
      return NextResponse.json({ error: 'Invalid request' }, { status: 403 })
    }

    // Validate
    if (!fullName || !email || !projectDetails) {
      logWarn('Missing required fields', { email })
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      logWarn('Invalid email format', { email })
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Save to DB (with error handling)
    try {
      await prisma.contactSubmission.create({
        data: { fullName, email, phone: phone || null, projectDetails }
      })
    } catch (dbError) {
      logError('Database error saving contact submission', { error: dbError })
      // Continue even if DB fails - we'll still try to send email
    }

    // Send notification to team
    if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL && process.env.RESEND_TO_EMAIL) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
          to: process.env.RESEND_TO_EMAIL,
          subject: `New Project Inquiry from ${fullName}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Project Details:</strong></p>
            <p>${projectDetails}</p>
          `
        })

        // Send confirmation to user
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
          to: email,
          subject: `We received your inquiry, ${fullName}!`,
          html: `
            <h2>Thanks for reaching out to Milanova!</h2>
            <p>Hi ${fullName},</p>
            <p>We've received your project inquiry and will get back to you within 24 hours.</p>
            <p>In the meantime, feel free to WhatsApp us at +977-9801816685.</p>
            <br/>
            <p>Best regards,<br/>The Milanova Team</p>
          `
        })
      } catch (emailError) {
        logError('Email error sending contact notifications', { error: emailError })
        // Continue even if email fails - submission was still successful
      }
    } else {
      logWarn('Resend not configured - skipping email notifications')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    logError('Contact form error', { error })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
