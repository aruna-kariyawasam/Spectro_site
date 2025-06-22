import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cpu, Zap, BarChart3, Wifi, Eye, Download } from "lucide-react"

export default function OverviewPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">System Overview</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive overview of the automated spectrophotometer system architecture, components, and GUI
              features.
            </p>
          </div>

          {/* System Block Diagram */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">System Block Diagram</h2>
            <Card className="max-w-6xl mx-auto">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="bg-primary/10 p-6 rounded-lg mb-4">
                      <Eye className="h-12 w-12 text-primary mx-auto" />
                    </div>
                    <h3 className="font-semibold mb-2">Light Detection</h3>
                    <p className="text-sm text-muted-foreground">BPX65 Photodiode</p>
                    <Badge variant="outline" className="mt-2">
                      Input Stage
                    </Badge>
                  </div>

                  <div className="text-center">
                    <div className="bg-primary/10 p-6 rounded-lg mb-4">
                      <Zap className="h-12 w-12 text-primary mx-auto" />
                    </div>
                    <h3 className="font-semibold mb-2">Signal Processing</h3>
                    <p className="text-sm text-muted-foreground">Analogue Amplification</p>
                    <Badge variant="outline" className="mt-2">
                      Processing
                    </Badge>
                  </div>

                  <div className="text-center">
                    <div className="bg-primary/10 p-6 rounded-lg mb-4">
                      <Cpu className="h-12 w-12 text-primary mx-auto" />
                    </div>
                    <h3 className="font-semibold mb-2">Digital Conversion</h3>
                    <p className="text-sm text-muted-foreground">STM32 Microcontroller</p>
                    <Badge variant="outline" className="mt-2">
                      Control Unit
                    </Badge>
                  </div>

                  <div className="text-center">
                    <div className="bg-primary/10 p-6 rounded-lg mb-4">
                      <BarChart3 className="h-12 w-12 text-primary mx-auto" />
                    </div>
                    <h3 className="font-semibold mb-2">Data Visualization</h3>
                    <p className="text-sm text-muted-foreground">PC-based GUI</p>
                    <Badge variant="outline" className="mt-2">
                      Interface
                    </Badge>
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-0.5 bg-primary"></div>
                    <Wifi className="h-6 w-6 text-primary" />
                    <div className="w-8 h-0.5 bg-primary"></div>
                    <span className="text-sm font-medium">Serial Communication</span>
                    <div className="w-8 h-0.5 bg-primary"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Hardware Components */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Hardware Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    BPX65 Photodiode
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• High-sensitivity light detection</li>
                    <li>• Wide spectral response range</li>
                    <li>• Low noise characteristics</li>
                    <li>• Fast response time</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Amplification Stage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Signal conditioning and enhancement</li>
                    <li>• Low-noise operational amplifiers</li>
                    <li>• Adjustable gain control</li>
                    <li>• High input impedance</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-primary" />
                    STM32 Microcontroller
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• 12-bit ADC conversion</li>
                    <li>• Real-time data processing</li>
                    <li>• Serial communication interface</li>
                    <li>• Programmable sampling rates</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* GUI Features */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">GUI Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Real-Time Visualization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <BarChart3 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Live Plotting</h4>
                      <p className="text-sm text-muted-foreground">
                        Dynamic spectral data visualization with real-time updates every 2 seconds
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Interactive Controls</h4>
                      <p className="text-sm text-muted-foreground">
                        Start/stop/pause scanning, data clearing, and export functionality
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Eye className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Multi-Channel Display</h4>
                      <p className="text-sm text-muted-foreground">
                        Support for multiple spectral channels with customizable wavelength ranges
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Download className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Export Capabilities</h4>
                      <p className="text-sm text-muted-foreground">
                        CSV data export, PNG image export, and comprehensive reporting
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <BarChart3 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Live Metrics</h4>
                      <p className="text-sm text-muted-foreground">
                        Real-time calculation of peak wavelength, intensity, centroid, FWHM, and SNR
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Wifi className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Serial Communication</h4>
                      <p className="text-sm text-muted-foreground">
                        Robust serial interface with automatic detection and error handling
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Technical Specifications */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">Technical Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Hardware Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Photodiode:</span>
                      <span className="text-muted-foreground">BPX65</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Microcontroller:</span>
                      <span className="text-muted-foreground">STM32</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">ADC Resolution:</span>
                      <span className="text-muted-foreground">12-bit</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Communication:</span>
                      <span className="text-muted-foreground">Serial UART</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Wavelength Range:</span>
                      <span className="text-muted-foreground">400-700 nm</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Software Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Frontend:</span>
                      <span className="text-muted-foreground">Next.js + TypeScript</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Charts:</span>
                      <span className="text-muted-foreground">Recharts</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Styling:</span>
                      <span className="text-muted-foreground">Tailwind CSS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Update Rate:</span>
                      <span className="text-muted-foreground">2 seconds</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Export Formats:</span>
                      <span className="text-muted-foreground">CSV, PNG</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
