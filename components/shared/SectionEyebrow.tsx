interface SectionEyebrowProps {
  label: string
}

export default function SectionEyebrow({ label }: SectionEyebrowProps) {
  return (
    <p className="text-xs font-medium uppercase tracking-widest text-[#8FA89E] mb-3">
      {label}
    </p>
  )
}
