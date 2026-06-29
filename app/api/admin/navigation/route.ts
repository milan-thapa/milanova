import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { logError } from "@/lib/logger"

export async function GET() {
  try {
    const links = await prisma.navigationLink.findMany({
      orderBy: { order: "asc" },
    })

    return NextResponse.json(links)
  } catch (error) {
    logError("Error fetching navigation", { error })
    return NextResponse.json({ error: "Failed to fetch navigation" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const link = await prisma.navigationLink.create({
      data: {
        name: body.name,
        href: body.href,
        order: body.order,
        isActive: body.isActive ?? true,
      },
    })

    return NextResponse.json(link)
  } catch (error) {
    logError("Error creating navigation link", { error })
    return NextResponse.json({ error: "Failed to create navigation link", details: String(error) }, { status: 500 })
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

    const link = await prisma.navigationLink.update({
      where: { id },
      data: {
        name: body.name,
        href: body.href,
        order: body.order,
        isActive: body.isActive,
      },
    })

    return NextResponse.json(link)
  } catch (error) {
    logError("Error updating navigation link", { error })
    return NextResponse.json({ error: "Failed to update navigation link", details: String(error) }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    await prisma.navigationLink.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    logError("Error deleting navigation link", { error })
    return NextResponse.json({ error: "Failed to delete navigation link", details: String(error) }, { status: 500 })
  }
}
