import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { testimonialSchema } from "@/lib/validations/testimonial"
import { logError } from "@/lib/logger"

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const testimonials = await prisma.testimonial.findMany({
      orderBy: { order: "asc" },
    })

    return NextResponse.json(testimonials)
  } catch (error) {
    logError("Error fetching testimonials", { error })
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = testimonialSchema.parse(body)

    const testimonial = await prisma.testimonial.create({
      data: {
        ...validatedData,
        image: validatedData.image || "",
      },
    })

    return NextResponse.json(testimonial)
  } catch (error) {
    logError("Error creating testimonial", { error })
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: "Validation error", details: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { id, ...data } = body
    const validatedData = testimonialSchema.parse(data)

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        ...validatedData,
        image: validatedData.image || "",
      },
    })

    return NextResponse.json(testimonial)
  } catch (error) {
    logError("Error updating testimonial", { error })
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: "Validation error", details: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 })
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

    await prisma.testimonial.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    logError("Error deleting testimonial", { error })
    return NextResponse.json({ error: "Failed to delete testimonial", details: String(error) }, { status: 500 })
  }
}
