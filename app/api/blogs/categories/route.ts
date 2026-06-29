import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { logError } from "@/lib/logger"

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      select: { name: true }
    })

    const categoryNames = categories.map(cat => cat.name)
    return NextResponse.json(categoryNames)
  } catch (error) {
    logError("Error fetching categories", { error })
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}
