"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { type DownloadableFile, canUserAccessFile } from "@/lib/downloads-config"

interface DownloadState {
  isDownloading: boolean
  progress: number
  error: string | null
}

export function useDownload() {
  const [downloadStates, setDownloadStates] = useState<Record<string, DownloadState>>({})
  const { user } = useAuth()
  const { toast } = useToast()

  const downloadFile = async (file: DownloadableFile) => {
    // Check permissions
    if (!canUserAccessFile(file, user?.role)) {
      toast({
        title: "Access Denied",
        description: "You do not have permission to download this file.",
        variant: "destructive",
      })
      return
    }

    // Set downloading state
    setDownloadStates((prev) => ({
      ...prev,
      [file.id]: { isDownloading: true, progress: 0, error: null },
    }))

    try {
      // For protected files, we would use the API route
      if (file.isProtected) {
        const response = await fetch(`/api/downloads/${file.id}`, {
          headers: {
            "x-user-role": user?.role || "",
            // In production, include JWT token
            // 'Authorization': `Bearer ${token}`
          },
        })

        if (!response.ok) {
          throw new Error(`Download failed: ${response.statusText}`)
        }

        const blob = await response.blob()
        downloadBlob(blob, file.filename)
      } else {
        // For public files, direct download
        const link = document.createElement("a")
        link.href = file.path
        link.download = file.filename
        link.target = "_blank"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }

      // Success
      setDownloadStates((prev) => ({
        ...prev,
        [file.id]: { isDownloading: false, progress: 100, error: null },
      }))

      toast({
        title: "Download Started",
        description: `Downloading ${file.title}...`,
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Download failed"

      setDownloadStates((prev) => ({
        ...prev,
        [file.id]: { isDownloading: false, progress: 0, error: errorMessage },
      }))

      toast({
        title: "Download Failed",
        description: errorMessage,
        variant: "destructive",
      })
    }
  }

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const getDownloadState = (fileId: string): DownloadState => {
    return downloadStates[fileId] || { isDownloading: false, progress: 0, error: null }
  }

  return {
    downloadFile,
    getDownloadState,
  }
}
