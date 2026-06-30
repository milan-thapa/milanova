import { NextRequest, NextResponse } from 'next/server'
import { resend } from '@/lib/resend'
import { auth } from '@/lib/auth'
import { logger, logInfo, logError } from '@/lib/logger'

export const dynamic = 'force-dynamic'

// Email templates
const emailTemplates = {
  rejection: (candidateName: string, jobTitle: string, customMessage?: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Application Update - ${jobTitle}</h2>
      <p>Dear ${candidateName},</p>
      <p>Thank you for your interest in the ${jobTitle} position at Milanova.</p>
      <p>After careful consideration of your application, we regret to inform you that we will not be moving forward with your candidacy at this time.</p>
      ${customMessage ? `<p>${customMessage}</p>` : ''}
      <p>We appreciate the time you took to apply and wish you the best in your job search.</p>
      <br/>
      <p>Best regards,<br/>The Milanova Team</p>
    </div>
  `,
  interview: (candidateName: string, jobTitle: string, customMessage?: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Interview Invitation - ${jobTitle}</h2>
      <p>Dear ${candidateName},</p>
      <p>We are pleased to inform you that we would like to invite you for an interview for the ${jobTitle} position at Milanova.</p>
      <p>Your application stood out, and we would like to learn more about your experience and skills.</p>
      ${customMessage ? `<p>${customMessage}</p>` : '<p>We will contact you shortly to schedule a convenient time for the interview.</p>'}
      <br/>
      <p>Best regards,<br/>The Milanova Team</p>
    </div>
  `,
  offer: (candidateName: string, jobTitle: string, customMessage?: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Job Offer - ${jobTitle}</h2>
      <p>Dear ${candidateName},</p>
      <p>We are thrilled to offer you the position of ${jobTitle} at Milanova!</p>
      <p>Your skills and experience impressed us throughout the interview process, and we believe you will be a valuable addition to our team.</p>
      ${customMessage ? `<p>${customMessage}</p>` : '<p>We will be sending you the detailed offer letter shortly. Please review it and let us know if you have any questions.</p>'}
      <br/>
      <p>Congratulations!<br/>The Milanova Team</p>
    </div>
  `,
  custom: (candidateName: string, jobTitle: string, message: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Regarding your application for ${jobTitle}</h2>
      <p>Dear ${candidateName},</p>
      <p>${message}</p>
      <br/>
      <p>Best regards,<br/>The Milanova Team</p>
    </div>
  `
}

export async function POST(req: NextRequest) {
  try {
    logInfo('Admin email send request received')

    // Check authentication
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check admin role
    if (session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 })
    }

    const { to, subject, template, candidateName, jobTitle, customMessage } = await req.json()

    // Validate required fields
    if (!to || !subject || !template || !candidateName || !jobTitle) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(to)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
      logError('Resend not configured for admin email sending')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    // Generate email content based on template
    let htmlContent: string
    switch (template) {
      case 'rejection':
        htmlContent = emailTemplates.rejection(candidateName, jobTitle, customMessage)
        break
      case 'interview':
        htmlContent = emailTemplates.interview(candidateName, jobTitle, customMessage)
        break
      case 'offer':
        htmlContent = emailTemplates.offer(candidateName, jobTitle, customMessage)
        break
      case 'custom':
        htmlContent = emailTemplates.custom(candidateName, jobTitle, customMessage || '')
        break
      default:
        return NextResponse.json({ error: 'Invalid template' }, { status: 400 })
    }

    // Send email via Resend
    const emailResult = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: to,
      subject: subject,
      html: htmlContent,
      reply_to: process.env.RESEND_TO_EMAIL || process.env.RESEND_FROM_EMAIL
    })

    logInfo('Admin email sent successfully', { to, template })

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully',
      emailId: emailResult.data?.id 
    })
  } catch (error) {
    logError('Error sending admin email', { error })
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
