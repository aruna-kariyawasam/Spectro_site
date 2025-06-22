"use client"

import { useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

export function useFallbackExport() {
  const { toast } = useToast()

  const exportChartAsDataURL = useCallback(
    (elementId: string, filename = "spectral-chart.png") => {
      try {
        const element = document.getElementById(elementId)
        if (!element) {
          throw new Error("Chart element not found")
        }

        // Find the SVG element within the chart
        const svgElement = element.querySelector("svg")
        if (!svgElement) {
          throw new Error("SVG element not found in chart")
        }

        // Get SVG dimensions
        const svgRect = svgElement.getBoundingClientRect()
        const svgData = new XMLSerializer().serializeToString(svgElement)

        // Create canvas
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        if (!ctx) {
          throw new Error("Could not get canvas context")
        }

        // Set canvas size
        canvas.width = svgRect.width * 2 // 2x for better quality
        canvas.height = svgRect.height * 2
        ctx.scale(2, 2)

        // Create image from SVG
        const img = new Image()
        img.onload = () => {
          // Fill background
          ctx.fillStyle = "#ffffff"
          ctx.fillRect(0, 0, svgRect.width, svgRect.height)

          // Draw SVG
          ctx.drawImage(img, 0, 0, svgRect.width, svgRect.height)

          // Convert to blob and download
          canvas.toBlob((blob) => {
            if (!blob) {
              throw new Error("Failed to generate image")
            }

            const url = URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            link.download = filename
            link.click()
            URL.revokeObjectURL(url)

            toast({
              title: "Chart Exported",
              description: `Chart saved as ${filename}`,
            })
          }, "image/png")
        }

        img.onerror = () => {
          throw new Error("Failed to load SVG image")
        }

        // Convert SVG to data URL
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
        const svgUrl = URL.createObjectURL(svgBlob)
        img.src = svgUrl
      } catch (error) {
        console.error("Fallback export error:", error)
        toast({
          title: "Export Failed",
          description: error instanceof Error ? error.message : "Failed to export chart",
          variant: "destructive",
        })
      }
    },
    [toast],
  )

  return { exportChartAsDataURL }
}
