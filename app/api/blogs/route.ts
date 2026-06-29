import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { logError } from "@/lib/logger"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    let blogs: any[]
    if (category && category !== 'All Stories') {
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
      } else {
        blogs = []
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

    return NextResponse.json(blogs)
  } catch (error) {
    logError("Error fetching blogs", { error })
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}
