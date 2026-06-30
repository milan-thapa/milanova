interface SectionEyebrowProps {
  label: string
  variant?: 'default' | 'light'
}

export default function SectionEyebrow({ label, variant = 'default' }: SectionEyebrowProps) {
  return (
    <p className={`text-xs font-medium uppercase tracking-widest mb-3 ${
      variant === 'light' ? 'text-gray-500' : 'text-[#8FA89E]'
    }`}>
      {label}
    </p>
  )
}
