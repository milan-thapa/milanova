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

    const applications = await prisma.jobApplication.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            department: true,
          }
        }
      }
    })

    return NextResponse.json(applications)
  } catch (error) {
    logError("Error fetching applications", { error })
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { id, status } = body

    const application = await prisma.jobApplication.update({
      where: { id },
      data: { status }
    })

    return NextResponse.json(application)
  } catch (error) {
    logError("Error updating application status", { error })
    return NextResponse.json({ error: "Failed to update application status" }, { status: 500 })
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

    await prisma.jobApplication.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    logError("Error deleting application", { error })
    return NextResponse.json({ error: "Failed to delete application" }, { status: 500 })
  }
}
