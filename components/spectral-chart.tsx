"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Camera, Play, Square, Pause, Activity } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SpectralData {
  wavelength: number
  intensity: number
  timestamp: number
}

interface SpectralChartProps {
  isLive?: boolean
}

export function SpectralChart({ isLive = false }: SpectralChartProps) {
  const [data, setData] = useState<SpectralData[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const { toast } = useToast()

  // Memoized metrics calculation for performance
  const metrics = useMemo(() => {
    if (data.length === 0) {
      return {
        peakWavelength: 0,
        maxIntensity: 0,
        centroid: 0,
        fwhm: 0,
        auc: 0,
        snr: 0,
      }
    }

    const intensities = data.map((d) => d.intensity)
    const maxIntensity = Math.max(...intensities)
    const maxIndex = intensities.indexOf(maxIntensity)
    const peakWavelength = data[maxIndex].wavelength

    // Simple centroid calculation
    const totalIntensity = intensities.reduce((sum, val) => sum + val, 0)
    const weightedSum = data.reduce((sum, point) => sum + point.wavelength * point.intensity, 0)
    const centroid = weightedSum / totalIntensity

    // Simplified metrics
    const auc = totalIntensity / data.length
    const mean = totalIntensity / data.length
    const variance = intensities.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length
    const snr = mean / Math.sqrt(variance)

    return {
      peakWavelength: Math.round(peakWavelength),
      maxIntensity: Math.round(maxIntensity),
      centroid: Math.round(centroid),
      fwhm: Math.round(Math.random() * 50 + 20), // Simulated FWHM
      auc: Math.round(auc),
      snr: Math.round(snr * 10) / 10,
    }
  }, [data])

  // Optimized data generation with useCallback
  const generateDataPoint = useCallback((): SpectralData => {
    const wavelength = 400 + Math.random() * 300 // 400-700nm range
    const baseIntensity = 500 + Math.sin((wavelength - 400) / 50) * 300
    const noise = (Math.random() - 0.5) * 100
    const intensity = Math.max(0, baseIntensity + noise)

    return {
      wavelength: Math.round(wavelength),
      intensity: Math.round(intensity),
      timestamp: Date.now(),
    }
  }, [])

  // Simulate real-time data generation
  useEffect(() => {
    if (!isLive || !isRunning || isPaused) return

    const interval = setInterval(() => {
      const newDataPoint = generateDataPoint()
      setData((prevData) => [...prevData, newDataPoint].slice(-100)) // Keep last 100 points
    }, 2000) // Update every 2 seconds

    return () => clearInterval(interval)
  }, [isLive, isRunning, isPaused, generateDataPoint])

  const handleStart = useCallback(() => {
    setIsRunning(true)
    setIsPaused(false)
    toast({
      title: "Scan Started",
      description: "Real-time spectral analysis is now active.",
    })
  }, [toast])

  const handlePause = useCallback(() => {
    setIsPaused((prev) => {
      const newPaused = !prev
      toast({
        title: newPaused ? "Scan Paused" : "Scan Resumed",
        description: newPaused ? "Data collection paused." : "Data collection resumed.",
      })
      return newPaused
    })
  }, [toast])

  const handleStop = useCallback(() => {
    setIsRunning(false)
    setIsPaused(false)
    toast({
      title: "Scan Stopped",
      description: "Spectral analysis has been stopped.",
    })
  }, [toast])

  const handleClear = useCallback(() => {
    setData([])
    toast({
      title: "Data Cleared",
      description: "All spectral data has been cleared.",
    })
  }, [toast])

  const handleExportCSV = useCallback(() => {
    if (data.length === 0) {
      toast({
        title: "No Data",
        description: "No spectral data available to export.",
        variant: "destructive",
      })
      return
    }

    const csvContent = [
      "Wavelength (nm),Intensity,Timestamp",
      ...data.map((d) => `${d.wavelength},${d.intensity},${d.timestamp}`),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `spectral-data-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "CSV Exported",
      description: "Spectral data has been exported successfully.",
    })
  }, [data, toast])

  const handleExportPNG = useCallback(async () => {
    if (data.length === 0) {
      toast({
        title: "No Data",
        description: "No spectral data available to export.",
        variant: "destructive",
      })
      return
    }

    try {
      // Simple fallback export using canvas
      const element = document.getElementById("spectral-chart-container")
      if (!element) {
        throw new Error("Chart element not found")
      }

      const svgElement = element.querySelector("svg")
      if (!svgElement) {
        throw new Error("SVG element not found")
      }

      // Create canvas and convert SVG to PNG
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        throw new Error("Could not get canvas context")
      }

      const svgData = new XMLSerializer().serializeToString(svgElement)
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
      const svgUrl = URL.createObjectURL(svgBlob)

      const img = new Image()
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)

        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `spectral-chart-${new Date().toISOString().split("T")[0]}.png`
            a.click()
            URL.revokeObjectURL(url)

            toast({
              title: "PNG Exported",
              description: "Chart image has been exported successfully.",
            })
          }
        }, "image/png")

        URL.revokeObjectURL(svgUrl)
      }

      img.src = svgUrl
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export chart as PNG. Please try again.",
        variant: "destructive",
      })
    }
  }, [data, toast])

  // Memoized wavelength range for performance
  const wavelengthRange = useMemo(() => {
    if (data.length === 0) return null
    const wavelengths = data.map((d) => d.wavelength)
    return {
      min: Math.min(...wavelengths),
      max: Math.max(...wavelengths),
    }
  }, [data])

  return (
    <div className="space-y-6">
      {isLive && (
        <div className="flex flex-wrap gap-4 items-center">
          {!isRunning ? (
            <Button onClick={handleStart} className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Start Scan
            </Button>
          ) : (
            <>
              <Button
                onClick={handlePause}
                variant={isPaused ? "default" : "secondary"}
                className="flex items-center gap-2"
              >
                <Pause className="h-4 w-4" />
                {isPaused ? "Resume" : "Pause"}
              </Button>
              <Button onClick={handleStop} variant="destructive" className="flex items-center gap-2">
                <Square className="h-4 w-4" />
                Stop Scan
              </Button>
            </>
          )}

          <Button onClick={handleClear} variant="outline" className="flex items-center gap-2">
            Clear Data
          </Button>

          <div className="flex gap-2">
            <Button onClick={handleExportCSV} variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>

            <Button onClick={handleExportPNG} variant="outline" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Export PNG
            </Button>
          </div>

          {isRunning && (
            <div className="flex items-center gap-2 text-sm">
              <div
                className={`w-2 h-2 rounded-full ${isPaused ? "bg-yellow-500" : "bg-green-500 animate-pulse"}`}
              ></div>
              <span
                className={isPaused ? "text-yellow-600 dark:text-yellow-400" : "text-green-600 dark:text-green-400"}
              >
                {isPaused ? "Scan Paused" : "Live Scanning..."}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Spectral Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96" id="spectral-chart-container">
                {data.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="wavelength"
                        label={{ value: "Wavelength (nm)", position: "insideBottom", offset: -10 }}
                      />
                      <YAxis label={{ value: "Intensity", angle: -90, position: "insideLeft" }} />
                      <Tooltip
                        formatter={(value, name) => [Math.round(Number(value)), name]}
                        labelFormatter={(label) => `Wavelength: ${Math.round(Number(label))} nm`}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="intensity"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={false}
                        name="Intensity"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No spectral data available</p>
                      <p className="text-sm">Start a scan to begin data collection</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Live Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Peak Wavelength</p>
                <p className="text-2xl font-bold">{metrics.peakWavelength} nm</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Max Intensity</p>
                <p className="text-2xl font-bold">{metrics.maxIntensity}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Centroid</p>
                <p className="text-xl font-semibold">{metrics.centroid} nm</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">FWHM</p>
                <p className="text-xl font-semibold">{metrics.fwhm} nm</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">AUC</p>
                <p className="text-xl font-semibold">{metrics.auc}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">SNR</p>
                <p className="text-xl font-semibold">{metrics.snr}</p>
              </div>
            </CardContent>
          </Card>

          {data.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Data Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Data Points:</span>
                    <span className="font-medium">{data.length}</span>
                  </div>
                  {wavelengthRange && (
                    <div className="flex justify-between">
                      <span>Wavelength Range:</span>
                      <span className="font-medium">
                        {wavelengthRange.min} - {wavelengthRange.max} nm
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span
                      className={`font-medium ${isRunning ? (isPaused ? "text-yellow-600" : "text-green-600") : "text-gray-600"}`}
                    >
                      {isRunning ? (isPaused ? "Paused" : "Active") : "Stopped"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
