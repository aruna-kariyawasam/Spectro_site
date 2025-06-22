"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useChartExport } from "@/hooks/use-chart-export"
import { Camera, Download } from "lucide-react"

interface ExportDialogProps {
  elementId: string
  hasData: boolean
  children: React.ReactNode
}

export function ExportDialog({ elementId, hasData, children }: ExportDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [exportFormat, setExportFormat] = useState<"png" | "svg">("png")
  const [filename, setFilename] = useState(`spectral-chart-${new Date().toISOString().split("T")[0]}`)
  const [quality, setQuality] = useState([1.0])
  const [scale, setScale] = useState([2])
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")
  const [isExporting, setIsExporting] = useState(false)

  const { exportToPNG, exportToSVG } = useChartExport()

  const handleExport = async () => {
    if (!hasData) return

    setIsExporting(true)
    try {
      if (exportFormat === "png") {
        await exportToPNG(elementId, {
          filename: `${filename}.png`,
          quality: quality[0],
          backgroundColor,
          scale: scale[0],
        })
      } else {
        await exportToSVG(elementId, `${filename}.svg`)
      }
      setIsOpen(false)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Export Chart
          </DialogTitle>
          <DialogDescription>Configure export settings for your spectral chart</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="format" className="text-right">
              Format
            </Label>
            <Select value={exportFormat} onValueChange={(value: "png" | "svg") => setExportFormat(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="png">PNG (Raster)</SelectItem>
                <SelectItem value="svg">SVG (Vector)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="filename" className="text-right">
              Filename
            </Label>
            <Input
              id="filename"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="col-span-3"
              placeholder="Enter filename"
            />
          </div>

          {exportFormat === "png" && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quality" className="text-right">
                  Quality
                </Label>
                <div className="col-span-3 space-y-2">
                  <Slider value={quality} onValueChange={setQuality} max={1} min={0.1} step={0.1} className="w-full" />
                  <div className="text-sm text-muted-foreground text-center">{Math.round(quality[0] * 100)}%</div>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="scale" className="text-right">
                  Scale
                </Label>
                <div className="col-span-3 space-y-2">
                  <Slider value={scale} onValueChange={setScale} max={4} min={1} step={1} className="w-full" />
                  <div className="text-sm text-muted-foreground text-center">{scale[0]}x</div>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="background" className="text-right">
                  Background
                </Label>
                <div className="col-span-3 flex gap-2">
                  <Input
                    id="background"
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-16 h-10 p-1 border rounded"
                  />
                  <Input
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="flex-1"
                    placeholder="#ffffff"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={!hasData || isExporting} className="flex items-center gap-2">
            {isExporting ? (
              "Exporting..."
            ) : (
              <>
                <Download className="h-4 w-4" />
                Export {exportFormat.toUpperCase()}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
