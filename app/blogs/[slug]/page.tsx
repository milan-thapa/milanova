import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { BlogPostingStructuredData, BreadcrumbStructuredData } from '@/components/seo/StructuredData'
import BlogShareButtons from '@/components/blogs/BlogShareButtons'

interface BlogPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const blog = await prisma.blog.findUnique({
    where: { slug: params.slug },
  })

  if (!blog) {
    return {
      title: 'Blog Post Not Found',
    }
  }

  return {
    title: blog.title,
    description: blog.excerpt,
    keywords: blog.tags || ['web development', 'technology', 'design'],
    alternates: {
      canonical: `/blogs/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: `https://milanova.com/blogs/${blog.slug}`,
      type: 'article',
      publishedTime: blog.publishedAt?.toISOString(),
      authors: [blog.author || 'Milanova Team'],
      images: blog.coverImage ? [
        {
          url: blog.coverImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ] : undefined,
    },
    twitter: {
      title: blog.title,
      description: blog.excerpt,
      images: blog.coverImage ? [blog.coverImage] : ['/images/og-image.jpg'],
    },
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const blog = await prisma.blog.findUnique({
    where: { slug: params.slug },
    include: {
      categoryRel: true,
      authorRel: true,
      relatedPosts: {
        include: {
          relatedBlog: {
            include: {
              categoryRel: true,
              authorRel: true
            }
          }
        }
      }
    }
  })

  if (!blog) {
    notFound()
  }

  const relatedBlogs = blog.relatedPosts.map(rp => rp.relatedBlog)

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <main className="min-h-screen bg-white">
      <BlogPostingStructuredData
        headline={blog.title}
        image={blog.coverImage || 'https://milanova.com/images/og-image.jpg'}
        author={blog.author || 'Milanova Team'}
        datePublished={blog.publishedAt.toISOString()}
        description={blog.excerpt}
        url={`https://milanova.com/blogs/${blog.slug}`}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', item: 'https://milanova.com' },
          { name: 'Insights', item: 'https://milanova.com/blogs' },
          { name: blog.title, item: `https://milanova.com/blogs/${blog.slug}` },
        ]}
      />
      {/* Curved Green Background for Navbar */}
      <div className="bg-gradient-to-br from-[#082E23] via-[#1A3028] to-[#0D1F1A] h-16 sm:h-20 rounded-b-[2rem] sm:rounded-b-[3rem] md:rounded-b-[4rem]" />
      
      {/* Hero Header */}
      <section className="relative pt-8 sm:pt-12 md:pt-16 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-b from-gray-50 to-white">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#B5E12A]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#1A6B55]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-6 sm:mb-8">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link href="/blogs" className="text-[#8FA89E] hover:text-[#1A6B55] transition-colors">
                  Insights
                </Link>
              </li>
              <li className="text-[#8FA89E]">/</li>
              <li className="text-[#3A4A44] font-medium truncate max-w-xs">{blog.title}</li>
            </ol>
          </nav>

          {/* Header */}
          <header className="max-w-4xl">
            {blog.categoryRel && (
              <div className="inline-flex items-center gap-2 bg-[#B5E12A]/10 border border-[#B5E12A]/20 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-[#B5E12A] rounded-full" />
                <span className="text-[#1A6B55] text-sm font-semibold tracking-wide uppercase">{blog.categoryRel.name}</span>
              </div>
            )}

            <h1 className="text-[#0D1F1A] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 sm:mb-8 tracking-tight">
              {blog.title}
            </h1>
            
            <p className="text-[#3A4A44] text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10 max-w-3xl">
              {blog.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-[#8FA89E] text-sm border-t border-gray-200 pt-6">
              <div className="flex items-center gap-3">
               <div className="w-12 h-12 bg-gradient-to-br from-[#B5E12A] to-[#1A6B55] rounded-full flex items-center justify-center text-white font-semibold text-base">
                  {blog.authorRel?.name?.charAt(0) || blog.author?.charAt(0) || 'M'}
                </div>
                <div>
                  <p className="text-[#0D1F1A] font-medium">{blog.authorRel?.name || blog.author || 'Milanova Team'}</p>
                  <p className="text-xs">{formatDate(blog.publishedAt)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{blog.readingTime} min read</span>
              </div>
            </div>
          </header>
        </div>
      </section>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-24">

        {/* Cover Image */}
        <div className="max-w-6xl mx-auto mb-12 sm:mb-16">
          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg relative">
            {blog.coverImage ? (
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#B5E12A]/10 to-[#1A6B55]/10 flex items-center justify-center">
                <svg className="w-24 h-24 sm:w-32 sm:h-32 text-[#1A6B55]/30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v2H8V8zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-sm sm:prose-base lg:prose-lg prose-headings:font-bold prose-headings:text-[#0D1F1A] prose-p:text-[#3A4A44] prose-a:text-[#1A6B55] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#0D1F1A] max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-[#8FA89E] text-sm uppercase tracking-wider mb-4">Tags</p>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-[#3A4A44] text-sm font-medium rounded-full px-4 py-2 hover:bg-[#B5E12A]/10 hover:text-[#1A6B55] transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-[#8FA89E] text-sm uppercase tracking-wider mb-4">Share this article</p>
            <BlogShareButtons title={blog.title} />
          </div>

          {/* Related Posts */}
          {relatedBlogs.length > 0 && (
            <div className="mt-16 sm:mt-20 pt-12 border-t border-gray-200">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0D1F1A] mb-8">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {relatedBlogs.map((relatedBlog) => (
                  <Link key={relatedBlog.id} href={`/blogs/${relatedBlog.slug}`} className="group">
                    <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#B5E12A]/30">
                      <div className="aspect-video relative bg-gradient-to-br from-gray-100 to-gray-50">
                        {relatedBlog.coverImage ? (
                          <Image
                            src={relatedBlog.coverImage}
                            alt={relatedBlog.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#B5E12A]/10 to-[#1A6B55]/10 flex items-center justify-center">
                            <svg className="w-12 h-12 sm:w-16 sm:h-16 text-[#1A6B55]/40" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v2H8V8zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="p-4 sm:p-5">
                        {relatedBlog.categoryRel && (
                          <span className="inline-block bg-[#B5E12A]/10 text-[#1A6B55] text-xs font-bold uppercase tracking-wider rounded-full px-3 py-1 mb-3">
                            {relatedBlog.categoryRel.name}
                          </span>
                        )}
                        <h3 className="font-bold text-[#0D1F1A] mb-2 line-clamp-2 group-hover:text-[#1A6B55] transition-colors text-base sm:text-lg leading-tight">
                          {relatedBlog.title}
                        </h3>
                        <p className="text-[#3A4A44] text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
                          {relatedBlog.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-[#1A6B55] font-semibold text-xs sm:text-sm group-hover:gap-3 transition-all">
                          <span>Read More</span>
                          <svg
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </main>
  )
}
