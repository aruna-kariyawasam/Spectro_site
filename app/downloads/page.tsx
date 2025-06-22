"use client"

import { AuthGuard } from "@/components/auth-guard"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DownloadCard } from "@/components/download-card"
import { DOWNLOAD_CATEGORIES, getFilesByCategory } from "@/lib/downloads-config"
import { FileText, ImageIcon, Database, Code, Camera } from "lucide-react"

const iconMap = {
  FileText,
  ImageIcon,
  Database,
  Code,
  Camera,
}

export default function DownloadsPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Downloads</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Access research materials, thesis documents, GUI screenshots, sample data files, and source code.
              </p>
            </div>

            {/* Download Categories */}
            {Object.entries(DOWNLOAD_CATEGORIES).map(([categoryKey, category]) => {
              const files = getFilesByCategory(categoryKey as keyof typeof DOWNLOAD_CATEGORIES)

              if (files.length === 0) return null

              const IconComponent = iconMap[category.icon as keyof typeof iconMap]

              return (
                <section key={categoryKey} className="mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <IconComponent className="h-8 w-8 text-primary" />
                    <div>
                      <h2 className="text-3xl font-bold">{category.title}</h2>
                      <p className="text-muted-foreground">{category.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {files.map((file) => (
                      <DownloadCard key={file.id} file={file} />
                    ))}
                  </div>
                </section>
              )
            })}

            {/* Download Statistics */}
            <section className="mt-16">
              <Card>
                <CardHeader>
                  <CardTitle>Download Center Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                    {Object.entries(DOWNLOAD_CATEGORIES).map(([categoryKey, category]) => {
                      const files = getFilesByCategory(categoryKey as keyof typeof DOWNLOAD_CATEGORIES)
                      return (
                        <div key={categoryKey} className="space-y-2">
                          <div className="text-2xl font-bold text-primary">{files.length}</div>
                          <div className="text-sm text-muted-foreground">{category.title}</div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </AuthGuard>
  )
}
