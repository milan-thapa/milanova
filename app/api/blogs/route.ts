import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { logError } from "@/lib/logger"

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { publishedAt: 'desc' }
    })

    return NextResponse.json(blogs)
  } catch (error) {
    logError("Error fetching blogs", { error })
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}
