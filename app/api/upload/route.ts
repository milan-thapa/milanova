import { NextResponse } from "next/server"
import { uploadImage } from "@/lib/cloudinary"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = formData.get("folder") as string || "milanova"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // File size validation (max 5MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB in bytes
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File size exceeds 5MB limit" }, { status: 400 })
    }

    // File type validation
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed" }, { status: 400 })
    }

    const result: any = await uploadImage(file, folder)
    return NextResponse.json({ url: result.secure_url, publicId: result.public_id })
  } catch (error) {
    return NextResponse.json({ error: "Failed to upload image", details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}
