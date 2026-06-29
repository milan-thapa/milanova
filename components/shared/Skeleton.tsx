export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 ${className || ''}`}
      {...props}
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  )
}

export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" style={{ width: `${Math.random() * 40 + 60}%` }} />
      ))}
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="space-y-6 text-center">
      <Skeleton className="h-8 w-48 mx-auto" />
      <Skeleton className="h-16 w-3/4 mx-auto" />
      <Skeleton className="h-6 w-1/2 mx-auto" />
      <Skeleton className="h-14 w-48 mx-auto rounded-full" />
    </div>
  )
}

export function FeaturedProjectsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-80" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" />
          <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" />
        </div>
      </div>
      {/* Carousel skeleton */}
      <div className="flex gap-4 sm:gap-6">
        <Skeleton className="min-w-full md:min-w-[calc(33.333%-16px)] min-h-[400px] sm:min-h-[480px] rounded-3xl" />
        <Skeleton className="min-w-full md:min-w-[calc(33.333%-16px)] min-h-[400px] sm:min-h-[480px] rounded-3xl hidden md:block" />
        <Skeleton className="min-w-full md:min-w-[calc(33.333%-16px)] min-h-[400px] sm:min-h-[480px] rounded-3xl hidden md:block" />
      </div>
    </div>
  )
}

export function ServicesSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>
      {/* Bento grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[38%_1fr_1fr] gap-3.5">
        <Skeleton className="min-h-[280px] sm:min-h-[320px] md:min-h-[350px] lg:min-h-[480px] rounded-2xl md:col-span-2 lg:col-span-1 lg:row-span-2" />
        <Skeleton className="min-h-[180px] sm:min-h-[200px] md:min-h-[220px] rounded-2xl" />
        <Skeleton className="min-h-[180px] sm:min-h-[200px] md:min-h-[220px] rounded-2xl" />
      </div>
    </div>
  )
}

export function TestimonialsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-10 w-80" />
        <Skeleton className="h-4 w-96" />
      </div>
      {/* Testimonial card skeleton */}
      <div className="bg-[#FDFDE8] border border-[#E8E8D0] rounded-3xl shadow-sm p-8 md:p-12">
        <div className="text-right mb-8">
          <Skeleton className="h-4 w-16 ml-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Image skeleton */}
          <div className="relative flex items-center justify-center">
            <Skeleton className="w-full aspect-square max-w-[220px] rounded-2xl" />
          </div>
          {/* Content skeleton */}
          <div className="relative min-h-[280px] flex flex-col justify-center">
            <Skeleton className="h-20 w-full mb-6" />
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-32 mb-1" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
        {/* Navigation skeleton */}
        <div className="flex items-center justify-between mt-12">
          <div className="flex gap-2">
            <Skeleton className="w-3 h-3 rounded-full" />
            <Skeleton className="w-3 h-3 rounded-full" />
            <Skeleton className="w-3 h-3 rounded-full" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="w-12 h-12 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function ContactSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>
      {/* Stats skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Skeleton className="h-24 rounded" />
        <Skeleton className="h-24 rounded" />
        <Skeleton className="h-24 md:col-span-2" />
      </div>
      {/* Search and filter skeleton */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Skeleton className="h-10 flex-1" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
      {/* Submissions list skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border rounded-lg p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-6 w-12 rounded-full" />
                </div>
                <div className="flex flex-wrap gap-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
