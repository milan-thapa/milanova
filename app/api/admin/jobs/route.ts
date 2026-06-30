import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { logError } from "@/lib/logger"

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const jobs = await prisma.jobPosting.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(jobs)
  } catch (error) {
    logError("Error fetching jobs", { error })
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    const job = await prisma.jobPosting.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        requirements: body.requirements,
        responsibilities: body.responsibilities,
        benefits: body.benefits,
        location: body.location,
        type: body.type,
        experience: body.experience,
        salary: body.salary || null,
        department: body.department,
        isActive: body.isActive !== undefined ? body.isActive : true,
        isFeatured: body.isFeatured !== undefined ? body.isFeatured : false,
      },
    })

    return NextResponse.json(job)
  } catch (error) {
    logError("Error creating job", { error })
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { id, ...rest } = body

    const job = await prisma.jobPosting.update({
      where: { id },
      data: {
        title: rest.title,
        slug: rest.slug,
        description: rest.description,
        requirements: rest.requirements,
        responsibilities: rest.responsibilities,
        benefits: rest.benefits,
        location: rest.location,
        type: rest.type,
        experience: rest.experience,
        salary: rest.salary || null,
        department: rest.department,
        isActive: rest.isActive !== undefined ? rest.isActive : true,
        isFeatured: rest.isFeatured !== undefined ? rest.isFeatured : false,
      },
    })

    return NextResponse.json(job)
  } catch (error) {
    logError("Error updating job", { error })
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 })
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

    await prisma.jobPosting.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    logError("Error deleting job", { error })
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 })
  }
}
