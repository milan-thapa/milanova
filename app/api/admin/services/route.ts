import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { logError } from "@/lib/logger"

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: "asc" },
    })

    return NextResponse.json(services)
  } catch (error) {
    logError("Error fetching services", { error })
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const service = await prisma.service.create({
      data: {
        title: body.title,
        description: body.description,
        icon: body.icon,
        order: body.order,
        isActive: body.isActive ?? true,
      },
    })

    return NextResponse.json(service)
  } catch (error) {
    logError("Error creating service", { error })
    return NextResponse.json({ error: "Failed to create service", details: String(error) }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    const service = await prisma.service.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        icon: body.icon,
        order: body.order,
        isActive: body.isActive,
      },
    })

    return NextResponse.json(service)
  } catch (error) {
    logError("Error updating service", { error })
    return NextResponse.json({ error: "Failed to update service", details: String(error) }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    await prisma.service.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    logError("Error deleting service", { error })
    return NextResponse.json({ error: "Failed to delete service", details: String(error) }, { status: 500 })
  }
}
