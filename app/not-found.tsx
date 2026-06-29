import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cream to-white">
      <div className="text-center px-6">
        <h1 className="text-9xl font-bold text-lime mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-text-dark mb-4">Page Not Found</h2>
        <p className="text-text-muted mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-teal text-white rounded-lg font-semibold hover:bg-[#145a45] transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
