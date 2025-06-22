"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useDownload } from "@/hooks/use-download"
import { useAuth } from "@/components/auth-provider"
import { type DownloadableFile, canUserAccessFile } from "@/lib/downloads-config"
import { Download, Lock, FileText, ImageIcon, Database, Code, Camera, AlertCircle } from "lucide-react"

interface DownloadCardProps {
  file: DownloadableFile
  showMetadata?: boolean
}

const iconMap = {
  FileText,
  ImageIcon,
  Database,
  Code,
  Camera,
}

export function DownloadCard({ file, showMetadata = true }: DownloadCardProps) {
  const { downloadFile, getDownloadState } = useDownload()
  const { user } = useAuth()
  const downloadState = getDownloadState(file.id)
  const canAccess = canUserAccessFile(file, user?.role)

  const handleDownload = () => {
    downloadFile(file)
  }

  const getFileTypeColor = (fileType: string) => {
    const colors: Record<string, string> = {
      pdf: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      png: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      jpg: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      csv: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      zip: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      txt: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    }
    return colors[fileType.toLowerCase()] || "bg-gray-100 text-gray-800"
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              {file.category === "thesis" && <FileText className="h-5 w-5 text-primary" />}
              {file.category === "gui" && <ImageIcon className="h-5 w-5 text-primary" />}
              {file.category === "data" && <Database className="h-5 w-5 text-primary" />}
              {file.category === "source" && <Code className="h-5 w-5 text-primary" />}
              {file.category === "images" && <Camera className="h-5 w-5 text-primary" />}
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg leading-tight">{file.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{file.description}</p>
            </div>
          </div>
          {file.isProtected && <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* File Information */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className={getFileTypeColor(file.fileType)}>
            {file.fileType.toUpperCase()}
          </Badge>
          <Badge variant="outline">{file.size}</Badge>
          {file.isProtected && (
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              Protected
            </Badge>
          )}
        </div>

        {/* Metadata */}
        {showMetadata && file.metadata && (
          <div className="text-sm text-muted-foreground space-y-1">
            {file.metadata.pages && (
              <div className="flex justify-between">
                <span>Pages:</span>
                <span>{file.metadata.pages}</span>
              </div>
            )}
            {file.metadata.dimensions && (
              <div className="flex justify-between">
                <span>Dimensions:</span>
                <span>{file.metadata.dimensions}</span>
              </div>
            )}
            {file.metadata.dataPoints && (
              <div className="flex justify-between">
                <span>Data Points:</span>
                <span>{file.metadata.dataPoints.toLocaleString()}</span>
              </div>
            )}
            {file.metadata.language && (
              <div className="flex justify-between">
                <span>Language:</span>
                <span>{file.metadata.language}</span>
              </div>
            )}
            {file.metadata.version && (
              <div className="flex justify-between">
                <span>Version:</span>
                <span>{file.metadata.version}</span>
              </div>
            )}
          </div>
        )}

        {/* Access Denied Alert */}
        {!canAccess && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This file requires {file.requiredRole} access. Please contact an administrator.
            </AlertDescription>
          </Alert>
        )}

        {/* Download Progress */}
        {downloadState.isDownloading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Downloading...</span>
              <span>{downloadState.progress}%</span>
            </div>
            <Progress value={downloadState.progress} className="h-2" />
          </div>
        )}

        {/* Error Display */}
        {downloadState.error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{downloadState.error}</AlertDescription>
          </Alert>
        )}

        {/* Download Button */}
        <Button
          onClick={handleDownload}
          disabled={!canAccess || downloadState.isDownloading}
          className="w-full"
          variant={canAccess ? "default" : "secondary"}
        >
          {downloadState.isDownloading ? (
            "Downloading..."
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Download {file.fileType.toUpperCase()}
            </>
          )}
        </Button>

        {/* File Name */}
        <p className="text-xs text-muted-foreground text-center">{file.filename}</p>
      </CardContent>
    </Card>
  )
}
