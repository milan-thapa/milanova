import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQs - Milanova',
  description: 'Find answers to frequently asked questions about web development, pricing, timelines, and our services at Milanova.',
}

export default function FAQsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
