import { AuthGuard } from "@/components/auth-guard"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SpectralChart } from "@/components/spectral-chart"

export default function LivePage() {
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Live Spectral Analysis</h1>
              <p className="text-muted-foreground mt-2">Real-time spectrophotometer data visualization and analysis</p>
            </div>

            <SpectralChart isLive={true} />
          </div>
        </main>

        <Footer />
      </div>
    </AuthGuard>
  )
}
