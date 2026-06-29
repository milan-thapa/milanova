import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { logError } from "@/lib/logger"

export async function GET() {
  try {
    const links = await prisma.navigationLink.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    })

    return NextResponse.json(links)
  } catch (error) {
    logError("Error fetching navigation", { error })
    return NextResponse.json({ error: "Failed to fetch navigation" }, { status: 500 })
  }
}
