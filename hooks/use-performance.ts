"use client"

import { useEffect, useState } from "react"

interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  memoryUsage?: number
}

export function usePerformance() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
  })

  useEffect(() => {
    const startTime = performance.now()

    // Measure load time
    const handleLoad = () => {
      const loadTime = performance.now() - startTime
      setMetrics((prev) => ({ ...prev, loadTime }))
    }

    // Measure render time
    const renderTime = performance.now() - startTime
    setMetrics((prev) => ({ ...prev, renderTime }))

    // Measure memory usage if available
    if ("memory" in performance) {
      const memoryUsage = (performance as any).memory.usedJSHeapSize / 1024 / 1024
      setMetrics((prev) => ({ ...prev, memoryUsage }))
    }

    window.addEventListener("load", handleLoad)
    return () => window.removeEventListener("load", handleLoad)
  }, [])

  return metrics
}
