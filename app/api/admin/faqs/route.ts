import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { faqSchema } from "@/lib/validations/faq"
import { logError } from "@/lib/logger"

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const faqs = await prisma.fAQ.findMany({
      orderBy: { order: "asc" },
    })

    return NextResponse.json(faqs)
  } catch (error) {
    logError("Error fetching FAQs", { error })
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = faqSchema.parse(body)

    const faq = await prisma.fAQ.create({
      data: validatedData,
    })

    return NextResponse.json(faq)
  } catch (error) {
    logError("Error creating FAQ", { error })
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: "Validation error", details: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 })
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

    const faq = await prisma.fAQ.update({
      where: { id },
      data: {
        question: data.question,
        answer: data.answer,
        order: data.order,
      },
    })

    return NextResponse.json(faq)
  } catch (error) {
    logError("Error updating FAQ", { error })
    return NextResponse.json({ error: "Failed to update FAQ", details: String(error) }, { status: 500 })
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

    await prisma.fAQ.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    logError("Error deleting FAQ", { error })
    return NextResponse.json({ error: "Failed to delete FAQ", details: String(error) }, { status: 500 })
  }
}
