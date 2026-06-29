import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { logError } from "@/lib/logger"

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findFirst()
    
    if (!settings) {
      return NextResponse.json({ error: "No settings found" }, { status: 404 })
    }

    return NextResponse.json(settings)
  } catch (error) {
    logError("Error fetching settings", { error })
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}
