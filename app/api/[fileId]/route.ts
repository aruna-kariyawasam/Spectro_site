import { type NextRequest, NextResponse } from "next/server"
import { getFileById, canUserAccessFile, getMimeType } from "@/lib/downloads-config"
import path from "path"
import { readFile } from "fs/promises"

export async function GET(request: NextRequest, { params }: { params: { fileId: string } }) {
  try {
    const fileId = params.fileId
    const file = getFileById(fileId)

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    // Check authentication for protected files
    if (file.isProtected) {
      const authHeader = request.headers.get("authorization")

      // In a real implementation, you would validate the JWT token here
      // For demo purposes, we'll check a simple header
      const userRole = request.headers.get("x-user-role")

      if (!canUserAccessFile(file, userRole || undefined)) {
        return NextResponse.json({ error: "Access denied. Insufficient permissions." }, { status: 403 })
      }
    }

    // Construct file path (in production, use absolute paths)
    const filePath = path.join(process.cwd(), "public", file.path)

    try {
      // Read file from filesystem
      const fileBuffer = await readFile(filePath)

      // Set appropriate headers
      const headers = new Headers()
      headers.set("Content-Type", getMimeType(file.fileType))
      headers.set("Content-Disposition", `attachment; filename="${file.filename}"`)
      headers.set("Content-Length", fileBuffer.length.toString())

      // Add security headers
      headers.set("X-Content-Type-Options", "nosniff")
      headers.set("X-Frame-Options", "DENY")

      return new NextResponse(fileBuffer, {
        status: 200,
        headers,
      })
    } catch (fileError) {
      console.error("File read error:", fileError)
      return NextResponse.json({ error: "File not accessible" }, { status: 500 })
    }
  } catch (error) {
    console.error("Download API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
