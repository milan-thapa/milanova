export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-lime focus:text-[#0D1F1A] focus:rounded-lg focus:font-medium"
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  )
}
