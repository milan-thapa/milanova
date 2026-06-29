import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { logError } from "@/lib/logger"
import { calculateReadingTime } from "@/lib/reading-time"

export async function GET() {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        categoryRel: true,
        authorRel: true,
        relatedPosts: {
          include: {
            relatedBlog: true
          }
        }
      }
    })

    return NextResponse.json(blogs)
  } catch (error) {
    logError("Error fetching blogs", { error })
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { categoryId, authorId, relatedPosts, ...rest } = body

    // Auto-calculate reading time from content
    const calculatedReadingTime = calculateReadingTime(rest.content || '')

    const blog = await prisma.blog.create({
      data: {
        title: rest.title,
        slug: rest.slug,
        excerpt: rest.excerpt,
        content: rest.content,
        tags: rest.tags || [],
        publishedAt: rest.publishedAt ? new Date(rest.publishedAt) : new Date(),
        coverImage: rest.coverImage || "",
        readingTime: calculatedReadingTime,
        categoryId: categoryId || null,
        authorId: authorId || null,
        relatedPosts: relatedPosts && relatedPosts.length > 0 ? {
          create: relatedPosts.map((relatedBlogId: string) => ({
            relatedBlogId
          }))
        } : undefined
      },
    })

    return NextResponse.json(blog)
  } catch (error) {
    logError("Error creating blog", { error })
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { id, categoryId, authorId, relatedPosts, ...rest } = body

    // Auto-calculate reading time from content
    const calculatedReadingTime = calculateReadingTime(rest.content || '')

    // First, delete existing related posts
    await prisma.blogRelatedPost.deleteMany({
      where: { blogId: id }
    })

    const blog = await prisma.blog.update({
      where: { id },
      data: {
        title: rest.title,
        slug: rest.slug,
        excerpt: rest.excerpt,
        content: rest.content,
        tags: rest.tags || [],
        publishedAt: rest.publishedAt ? new Date(rest.publishedAt) : new Date(),
        coverImage: rest.coverImage || "",
        readingTime: calculatedReadingTime,
        categoryId: categoryId || null,
        authorId: authorId || null,
        relatedPosts: relatedPosts && relatedPosts.length > 0 ? {
          create: relatedPosts.map((relatedBlogId: string) => ({
            relatedBlogId
          }))
        } : undefined
      },
    })

    return NextResponse.json(blog)
  } catch (error) {
    logError("Error updating blog", { error })
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    await prisma.blog.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    logError("Error deleting blog", { error })
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 })
  }
}
