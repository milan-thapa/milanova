import Link from 'next/link'

interface CTAButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'white' | 'dark'
  className?: string
}

export default function CTAButton({ href, children, variant = 'white', className = '' }: CTAButtonProps) {
  const variants = {
    white: 'bg-white text-gray-900 hover:bg-gray-100',
    dark: 'bg-gray-900 text-white hover:bg-gray-800',
  }

  return (
    <Link
      href={href}
      className={`${variants[variant]} rounded-full font-bold transition-all duration-300 hover:scale-105 ${className}`}
    >
      {children}
    </Link>
  )
}
