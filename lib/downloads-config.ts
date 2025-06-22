/**
 * Downloads Configuration
 * Centralized configuration for all downloadable resources
 */

export interface DownloadableFile {
  id: string
  title: string
  description: string
  filename: string
  category: "thesis" | "gui" | "data" | "source" | "images"
  fileType: "pdf" | "png" | "jpg" | "csv" | "zip" | "txt"
  size: string
  path: string
  isProtected: boolean
  requiredRole?: "user" | "researcher"
  metadata?: {
    pages?: number
    dimensions?: string
    dataPoints?: number
    language?: string
    version?: string
  }
}

export const DOWNLOAD_CATEGORIES = {
  thesis: {
    title: "Thesis Documents",
    description: "Complete research documentation and abstracts",
    icon: "FileText",
  },
  gui: {
    title: "GUI Screenshots",
    description: "Interface screenshots and mockups",
    icon: "ImageIcon",
  },
  data: {
    title: "Sample Data",
    description: "Research data and calibration files",
    icon: "Database",
  },
  source: {
    title: "Source Code",
    description: "Application and firmware source code",
    icon: "Code",
  },
  images: {
    title: "Project Images",
    description: "Hardware photos and diagrams",
    icon: "Camera",
  },
} as const

export const DOWNLOADABLE_FILES: DownloadableFile[] = [
  // Thesis Documents
  {
    id: "thesis-complete",
    title: "Complete Thesis PDF",
    description: "Full dissertation document with all chapters and appendices",
    filename: "Automated_Spectrophotometer_Thesis_2025.pdf",
    category: "thesis",
    fileType: "pdf",
    size: "2.4 MB",
    path: "/downloads/documents/thesis/Automated_Spectrophotometer_Thesis_2025.pdf",
    isProtected: false,
    metadata: {
      pages: 45,
      language: "English",
      version: "1.0",
    },
  },
  {
    id: "thesis-abstract",
    title: "Research Abstract",
    description: "Executive summary and key findings",
    filename: "Research_Abstract_2025.pdf",
    category: "thesis",
    fileType: "pdf",
    size: "156 KB",
    path: "/downloads/documents/thesis/Research_Abstract_2025.pdf",
    isProtected: false,
    metadata: {
      pages: 3,
      language: "English",
    },
  },

  // GUI Screenshots
  {
    id: "gui-main-interface",
    title: "Main Interface Screenshot",
    description: "Complete GUI overview showing all components",
    filename: "GUI_Main_Interface_v2.png",
    category: "gui",
    fileType: "png",
    size: "1.2 MB",
    path: "/downloads/images/gui/GUI_Main_Interface_v2.png",
    isProtected: false,
    metadata: {
      dimensions: "1920x1080",
    },
  },
  {
    id: "gui-live-plotting",
    title: "Live Plotting Interface",
    description: "Real-time data visualization interface",
    filename: "GUI_Live_Plotting_v2.png",
    category: "gui",
    fileType: "png",
    size: "890 KB",
    path: "/downloads/images/gui/GUI_Live_Plotting_v2.png",
    isProtected: false,
    metadata: {
      dimensions: "1920x1080",
    },
  },
  {
    id: "gui-metrics-panel",
    title: "Metrics Panel",
    description: "Live calculations and statistics display",
    filename: "GUI_Metrics_Panel_v2.png",
    category: "gui",
    fileType: "png",
    size: "654 KB",
    path: "/downloads/images/gui/GUI_Metrics_Panel_v2.png",
    isProtected: false,
    metadata: {
      dimensions: "800x600",
    },
  },

  // Sample Data
  {
    id: "sample-spectral-data",
    title: "Sample Spectral Data",
    description: "Representative measurement data from the spectrophotometer",
    filename: "Sample_Spectral_Data_2025.csv",
    category: "data",
    fileType: "csv",
    size: "45 KB",
    path: "/downloads/data/spectral/Sample_Spectral_Data_2025.csv",
    isProtected: false,
    metadata: {
      dataPoints: 1200,
    },
  },
  {
    id: "calibration-data",
    title: "Calibration Data",
    description: "System calibration measurements and reference standards",
    filename: "Calibration_Data_2025.csv",
    category: "data",
    fileType: "csv",
    size: "28 KB",
    path: "/downloads/data/calibration/Calibration_Data_2025.csv",
    isProtected: true,
    requiredRole: "researcher",
    metadata: {
      dataPoints: 750,
    },
  },

  // Source Code
  {
    id: "frontend-source",
    title: "Frontend Source Code",
    description: "Complete Next.js application source code",
    filename: "SpectroPro_Frontend_Source_v2.zip",
    category: "source",
    fileType: "zip",
    size: "2.1 MB",
    path: "/downloads/source/frontend/SpectroPro_Frontend_Source_v2.zip",
    isProtected: true,
    requiredRole: "researcher",
    metadata: {
      language: "TypeScript",
      version: "2.0",
    },
  },
  {
    id: "firmware-source",
    title: "STM32 Firmware",
    description: "Microcontroller firmware implementation",
    filename: "STM32_Spectrophotometer_Firmware_v1.zip",
    category: "source",
    fileType: "zip",
    size: "85 KB",
    path: "/downloads/source/firmware/STM32_Spectrophotometer_Firmware_v1.zip",
    isProtected: true,
    requiredRole: "researcher",
    metadata: {
      language: "C/C++",
      version: "1.0",
    },
  },

  // Project Images
  {
    id: "hardware-setup",
    title: "Hardware Setup Photo",
    description: "Complete spectrophotometer hardware assembly",
    filename: "Hardware_Setup_2025.jpg",
    category: "images",
    fileType: "jpg",
    size: "3.2 MB",
    path: "/downloads/images/hardware/Hardware_Setup_2025.jpg",
    isProtected: false,
    metadata: {
      dimensions: "4032x3024",
    },
  },
]

/**
 * Get files by category
 */
export function getFilesByCategory(category: keyof typeof DOWNLOAD_CATEGORIES): DownloadableFile[] {
  return DOWNLOADABLE_FILES.filter((file) => file.category === category)
}

/**
 * Get file by ID
 */
export function getFileById(id: string): DownloadableFile | undefined {
  return DOWNLOADABLE_FILES.find((file) => file.id === id)
}

/**
 * Check if user can access file
 */
export function canUserAccessFile(file: DownloadableFile, userRole?: string): boolean {
  if (!file.isProtected) return true
  if (!file.requiredRole) return true
  return userRole === file.requiredRole || userRole === "researcher"
}

/**
 * Get file extension from filename
 */
export function getFileExtension(filename: string): string {
  return filename.split(".").pop()?.toLowerCase() || ""
}

/**
 * Get MIME type for file
 */
export function getMimeType(fileType: string): string {
  const mimeTypes: Record<string, string> = {
    pdf: "application/pdf",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    csv: "text/csv",
    zip: "application/zip",
    txt: "text/plain",
  }
  return mimeTypes[fileType.toLowerCase()] || "application/octet-stream"
}
