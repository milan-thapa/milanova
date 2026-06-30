import { NextResponse } from "next/server"
import { uploadImage } from "@/lib/cloudinary"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = formData.get("folder") as string || "milanova"
    const fileType = formData.get("fileType") as string || "image"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (fileType === "document") {
      // Document upload for resumes
      const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB for documents
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: "File size exceeds 10MB limit" }, { status: 400 })
      }

      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ error: "Invalid file type. Only PDF, DOC, and DOCX are allowed" }, { status: 400 })
      }

      // For documents, we'll use a different approach - upload to Cloudinary as raw
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      
      // Convert to base64 for Cloudinary upload
      const base64 = buffer.toString('base64')
      const dataUri = `data:${file.type};base64,${base64}`

      const result: any = await uploadImage(dataUri, folder)
      return NextResponse.json({ url: result.secure_url, publicId: result.public_id })
    } else {
      // Image upload
      const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB for images
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: "File size exceeds 5MB limit" }, { status: 400 })
      }

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ error: "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed" }, { status: 400 })
      }

      const result: any = await uploadImage(file, folder)
      return NextResponse.json({ url: result.secure_url, publicId: result.public_id })
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to upload file", details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}
