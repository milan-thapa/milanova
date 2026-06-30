import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')
    const filename = searchParams.get('filename') || 'resume.pdf'

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    console.log('Attempting to download from:', url)

    // Fetch the file from Cloudinary with proper headers
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    })
    
    if (!response.ok) {
      console.error('Failed to fetch file:', response.status, response.statusText)
      return NextResponse.json({ error: `Failed to fetch file: ${response.statusText}` }, { status: response.status })
    }

    const blob = await response.blob()
    const contentType = response.headers.get('Content-Type') || 'application/pdf'

    console.log('File fetched successfully, size:', blob.size, 'type:', contentType)

    // Return the file with download headers
    return new NextResponse(blob, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'public, max-age=31536000',
      },
    })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json({ 
      error: "Failed to download file", 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
