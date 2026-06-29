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
    <main className="min-h-screen bg-gradient-to-b from-cream to-white">
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
      {/* Hero Header */}
      <section className="bg-[#082E23] py-16 md:py-24" style={{ borderBottomLeftRadius: '80px', borderBottomRightRadius: '80px' }}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link href="/blogs" className="text-white/60 hover:text-white transition-colors">
                  Insights
                </Link>
              </li>
              <li className="text-white/40">/</li>
              <li className="text-white/80 font-medium truncate max-w-xs">{blog.title}</li>
            </ol>
          </nav>

          {/* Header */}
          <header className="max-w-4xl">
            <div className="flex flex-wrap gap-3 mb-6">
              {blog.tags?.map((tag) => (
                <span
                  key={tag}
                  className="bg-lime/20 text-lime text-xs font-semibold uppercase tracking-wider rounded-full px-4 py-2"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight">
              {blog.title}
            </h1>
            
            <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-8 max-w-3xl">
              {blog.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm border-t border-b border-white/20 py-4">
              <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-teal rounded-full flex items-center justify-center text-white font-semibold">
                  {blog.author?.charAt(0) || 'A'}
                </div>
                <div>
                  <p className="text-white font-medium">{blog.author || 'Milanova Team'}</p>
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

      <article className="max-w-7xl mx-auto px-6 py-16 md:py-24">

        {/* Cover Image */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="aspect-video bg-gradient-to-br from-off-white to-cream rounded-3xl overflow-hidden shadow-2xl relative">
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
              <div className="w-full h-full bg-gradient-to-br from-teal/10 to-lime/20 flex items-center justify-center">
                <svg className="w-32 h-32 text-teal/30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v2H8V8zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-headings:font-bold prose-headings:text-text-dark prose-p:text-text-body prose-a:text-teal prose-a:no-underline hover:prose-a:underline max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>

          {/* Share Section */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-text-muted text-sm uppercase tracking-wider mb-4">Share this article</p>
            <BlogShareButtons title={blog.title} />
          </div>

          {/* Related Posts */}
          {relatedBlogs.length > 0 && (
            <div className="mt-20 pt-12 border-t border-gray-200">
              <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-8">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedBlogs.map((relatedBlog) => (
                  <Link key={relatedBlog.id} href={`/blogs/${relatedBlog.slug}`} className="group">
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                      {relatedBlog.coverImage && (
                        <div className="aspect-video relative">
                          <Image
                            src={relatedBlog.coverImage}
                            alt={relatedBlog.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        {relatedBlog.categoryRel && (
                          <span className="text-teal text-xs font-semibold uppercase tracking-wider mb-2 block">
                            {relatedBlog.categoryRel.name}
                          </span>
                        )}
                        <h3 className="font-bold text-text-dark mb-2 line-clamp-2 group-hover:text-teal transition-colors">
                          {relatedBlog.title}
                        </h3>
                        <p className="text-text-body text-sm line-clamp-2">
                          {relatedBlog.excerpt}
                        </p>
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
