import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { logError } from "@/lib/logger"

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: { isFeatured: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(projects)
  } catch (error) {
    logError("Error fetching projects", { error })
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}
