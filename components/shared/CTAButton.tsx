import Link from 'next/link'

interface CTAButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'lime' | 'teal' | 'dark'
  className?: string
}

export default function CTAButton({ href, children, variant = 'lime', className = '' }: CTAButtonProps) {
  const variants = {
    lime: 'bg-lime text-text-dark hover:brightness-110',
    teal: 'bg-teal text-white hover:brightness-110',
    dark: 'bg-[#1A2E26] text-white hover:brightness-110',
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
