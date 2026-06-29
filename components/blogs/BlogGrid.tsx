import { prisma } from '@/lib/prisma'
import BlogCard from './BlogCard'
import { logError } from '@/lib/logger'

interface BlogGridProps {
  category?: string
}

export default async function BlogGrid({ category }: BlogGridProps) {
  let blogs: any[] = []

  try {
    if (category && category !== 'All Stories') {
      // Filter by category name
      const categoryRecord = await prisma.category.findUnique({
        where: { name: category }
      })

      if (categoryRecord) {
        blogs = await prisma.blog.findMany({
          where: { categoryId: categoryRecord.id },
          orderBy: { publishedAt: 'desc' },
          include: {
            categoryRel: true,
            authorRel: true
          }
        })
      }
    } else {
      blogs = await prisma.blog.findMany({
        orderBy: { publishedAt: 'desc' },
        include: {
          categoryRel: true,
          authorRel: true
        }
      })
    }
  } catch (error) {
    logError('Error fetching blogs', { error, category })
    blogs = []
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16 md:py-20">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-off-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-text-muted text-base sm:text-lg mb-2">
          {category ? `No blogs in "${category}" category.` : 'No blogs found.'}
        </p>
        <p className="text-text-muted text-sm">
          {category ? 'Try selecting a different category.' : 'Add your first blog via the admin panel.'}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  )
}
