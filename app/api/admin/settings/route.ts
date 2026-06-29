import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { logError } from "@/lib/logger"

export async function GET() {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const settings = await prisma.siteSettings.findFirst()
    return NextResponse.json(settings)
  } catch (error) {
    logError("Error fetching settings", { error })
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    const existing = await prisma.siteSettings.findFirst()

    let settings
    if (existing) {
      settings = await prisma.siteSettings.update({
        where: { id: existing.id },
        data: body,
      })
    } else {
      settings = await prisma.siteSettings.create({
        data: body,
      })
    }

    return NextResponse.json(settings)
  } catch (error) {
    logError("Error saving settings", { error })
    return NextResponse.json({ error: "Failed to save settings", details: String(error) }, { status: 500 })
  }
}
