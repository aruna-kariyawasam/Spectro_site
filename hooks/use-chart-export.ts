"use client"

import { useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

interface ExportOptions {
  filename?: string
  quality?: number
  backgroundColor?: string
  scale?: number
}

export function useChartExport() {
  const { toast } = useToast()

  const exportToPNG = useCallback(
    async (elementId: string, options: ExportOptions = {}) => {
      const {
        filename = `spectral-chart-${new Date().toISOString().split("T")[0]}.png`,
        quality = 1.0,
        backgroundColor = "#ffffff",
        scale = 2,
      } = options

      try {
        // Check if we're in a browser environment
        if (typeof window === "undefined") {
          throw new Error("PNG export is only available in the browser")
        }

        // Show loading toast
        toast({
          title: "Generating Image",
          description: "Capturing chart as PNG...",
        })

        // Dynamic import with error handling
        let html2canvas
        try {
          const module = await import("html2canvas")
          html2canvas = module.default
        } catch (importError) {
          throw new Error("html2canvas library is not available. Please install it with: npm install html2canvas")
        }

        const element = document.getElementById(elementId)
        if (!element) {
          throw new Error("Chart element not found")
        }

        // Configure html2canvas options for better quality
        const canvas = await html2canvas(element, {
          backgroundColor,
          scale,
          useCORS: true,
          allowTaint: true,
          logging: false,
          width: element.offsetWidth,
          height: element.offsetHeight,
          onclone: (clonedDoc) => {
            // Ensure fonts are loaded in the cloned document
            const clonedElement = clonedDoc.getElementById(elementId)
            if (clonedElement) {
              clonedElement.style.fontFamily = "system-ui, -apple-system, sans-serif"
            }
          },
        })

        // Convert canvas to blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              throw new Error("Failed to generate image")
            }

            // Create download link
            const url = URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            link.download = filename
            link.style.display = "none"

            // Trigger download
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            // Cleanup
            URL.revokeObjectURL(url)

            toast({
              title: "PNG Exported",
              description: `Chart saved as ${filename}`,
            })
          },
          "image/png",
          quality,
        )
      } catch (error) {
        console.error("PNG export error:", error)
        toast({
          title: "Export Failed",
          description: error instanceof Error ? error.message : "Failed to export chart as PNG",
          variant: "destructive",
        })
      }
    },
    [toast],
  )

  const exportToSVG = useCallback(
    async (elementId: string, filename = `spectral-chart-${new Date().toISOString().split("T")[0]}.svg`) => {
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

        // Clone the SVG to avoid modifying the original
        const clonedSvg = svgElement.cloneNode(true) as SVGElement

        // Set proper dimensions and styling
        clonedSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg")
        clonedSvg.style.backgroundColor = "white"

        // Serialize SVG to string
        const serializer = new XMLSerializer()
        const svgString = serializer.serializeToString(clonedSvg)

        // Create blob and download
        const blob = new Blob([svgString], { type: "image/svg+xml" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = filename
        link.click()
        URL.revokeObjectURL(url)

        toast({
          title: "SVG Exported",
          description: `Chart saved as ${filename}`,
        })
      } catch (error) {
        console.error("SVG export error:", error)
        toast({
          title: "Export Failed",
          description: error instanceof Error ? error.message : "Failed to export chart as SVG",
          variant: "destructive",
        })
      }
    },
    [toast],
  )

  return {
    exportToPNG,
    exportToSVG,
  }
}
