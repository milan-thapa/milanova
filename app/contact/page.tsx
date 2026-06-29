import { Metadata } from 'next'
import ContactForm from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us - Milanova',
  description: 'Get in touch with Milanova for your web development needs. Fill out our contact form or reach us directly via phone or WhatsApp.',
}

export default function ContactPage() {
  return <ContactForm />
}
