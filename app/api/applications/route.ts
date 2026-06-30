import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { resend } from '@/lib/resend'
import { rateLimit } from '@/lib/rate-limit'
import { logger, logError, logWarn, logInfo } from '@/lib/logger'
import { validateCSRFToken } from '@/lib/csrf'

export async function POST(req: NextRequest) {
  try {
    logInfo('Job application received')

    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    const rateLimitResult = rateLimit({
      identifier: `application-${ip}`,
      limit: 3, // 3 applications per hour
      window: 3600000,
    })

    if (!rateLimitResult.success) {
      logWarn('Rate limit exceeded', { ip })
      return NextResponse.json({ error: 'Too many applications. Please try again later.' }, { status: 429 })
    }

    const { jobId, fullName, email, phone, resumeUrl, coverLetter, linkedinUrl, portfolioUrl, csrfToken } = await req.json()

    // Validate CSRF token
    if (!csrfToken || !(await validateCSRFToken(csrfToken))) {
      logWarn('Invalid CSRF token', { email })
      return NextResponse.json({ error: 'Invalid request' }, { status: 403 })
    }

    // Validate required fields
    if (!jobId || !fullName || !email || !phone || !resumeUrl) {
      logWarn('Missing required fields', { email })
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      logWarn('Invalid email format', { email })
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Check if job exists
    const job = await prisma.jobPosting.findUnique({
      where: { id: jobId }
    })

    if (!job) {
      logWarn('Job not found', { jobId })
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }

    // Save application to database
    const application = await prisma.jobApplication.create({
      data: {
        jobId,
        fullName,
        email,
        phone,
        resumeUrl,
        coverLetter: coverLetter || null,
        linkedinUrl: linkedinUrl || null,
        portfolioUrl: portfolioUrl || null
      }
    })

    logInfo('Job application created', { applicationId: application.id })

    // Send notification email to team
    if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL && process.env.RESEND_TO_EMAIL) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
          to: process.env.RESEND_TO_EMAIL,
          subject: `New Job Application: ${job.title}`,
          html: `
            <h2>New Job Application Received</h2>
            <p><strong>Position:</strong> ${job.title}</p>
            <p><strong>Applicant:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>LinkedIn:</strong> ${linkedinUrl || 'Not provided'}</p>
            <p><strong>Portfolio:</strong> ${portfolioUrl || 'Not provided'}</p>
            <p><strong>Cover Letter:</strong></p>
            <p>${coverLetter || 'Not provided'}</p>
            <p><strong>Resume:</strong> <a href="${resumeUrl}">Download Resume</a></p>
          `
        })

        // Send confirmation email to applicant
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
          to: email,
          subject: `Application Received: ${job.title}`,
          html: `
            <h2>Thank you for applying to Milanova!</h2>
            <p>Hi ${fullName},</p>
            <p>We've received your application for the <strong>${job.title}</strong> position.</p>
            <p>Our team will review your application and get back to you within 5-7 business days.</p>
            <br/>
            <p>Best regards,<br/>The Milanova Team</p>
          `
        })
        logInfo('Application notification emails sent', { applicationId: application.id })
      } catch (emailError) {
        logError('Email error sending application notifications', { error: emailError })
        // Continue even if email fails - application was still successful
      }
    } else {
      logWarn('Resend not configured - skipping email notifications')
    }

    return NextResponse.json({ success: true, applicationId: application.id })
  } catch (error) {
    logError('Job application error', { error })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
