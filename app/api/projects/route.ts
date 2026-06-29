import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { logError } from "@/lib/logger"

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    })

    // Serialize dates to strings
    const serializedProjects = projects.map(project => ({
      ...project,
      createdAt: project.createdAt?.toISOString(),
    }))

    return NextResponse.json(serializedProjects)
  } catch (error) {
    logError("Error fetching projects", { error })
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}
