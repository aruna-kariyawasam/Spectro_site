import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Activity, Zap, BarChart3, Shield, Users, BookOpen } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Automated Spectrophotometer for <span className="text-primary">Real-Time Spectral Analysis</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Advanced spectrophotometer system integrating optical signal detection, analogue signal processing, and
              digital data communication with an intuitive user interface for real-time visualization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link href="/overview">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  View System Overview
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Abstract Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Research Abstract</h2>
            <Card>
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  This research presents the development of an automated spectrophotometer for real-time spectral
                  analysis, aiming to provide a compact and efficient tool for scientific and educational applications.
                  The system employs a photodiode (BPX65) to detect light intensity, followed by an analogue
                  amplification stage to enhance the weak signal. An STM32 microcontroller performs analogue-to-digital
                  conversion, and the resulting digital data is transmitted via serial communication to a PC-based GUI.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground mt-4">
                  The graphical interface allows users to connect to the spectrophotometer and visualize spectral data
                  in real time. Testing confirmed the reliability of the communication link and the responsiveness of
                  the interface, demonstrating the system's capability to perform real-time spectral measurements with
                  consistent accuracy.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Activity className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Real-Time Analysis</CardTitle>
                  <CardDescription>
                    Live spectral data visualization with continuous updates every 2 seconds
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Zap className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>High Performance</CardTitle>
                  <CardDescription>
                    STM32 microcontroller with fast ADC conversion and serial communication
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <BarChart3 className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Advanced Metrics</CardTitle>
                  <CardDescription>
                    Peak analysis, centroid calculation, FWHM, SNR, and area under curve
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Secure Access</CardTitle>
                  <CardDescription>Role-based authentication with protected routes for sensitive data</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Multi-User Support</CardTitle>
                  <CardDescription>
                    Separate access levels for researchers and regular users with admin dashboard
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <BookOpen className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Research Resources</CardTitle>
                  <CardDescription>Access to thesis documents, GUI screenshots, and sample data files</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Project Info Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Research Project Details</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">Authors</h3>
                    <p className="text-muted-foreground">K.G.A.K. WICKRAMARATHNA | S.J.H MANADUL</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Institution</h3>
                    <p className="text-muted-foreground">University of Kelaniya, Sri Lanka</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Degree Program</h3>
                    <p className="text-muted-foreground">Bachelor of Honors in Electronics and Computer Science</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Year</h3>
                    <p className="text-muted-foreground">2025</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">System Components</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>BPX65 Photodiode for light detection</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Analogue amplification stage</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>STM32 microcontroller with ADC</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Serial communication interface</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Real-time GUI with data visualization</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Access Levels Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Access Levels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div>
                      <CardTitle>Regular Users</CardTitle>
                      <CardDescription>Standard access for students and researchers</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      <span>Access to live spectral analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      <span>Download research materials</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      <span>Export data and charts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      <span>Contact research team</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Shield className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle>Researchers (Admin)</CardTitle>
                      <CardDescription>Enhanced access for research team members</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>All regular user features</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>Admin dashboard access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>User management capabilities</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>Advanced system controls</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join our research platform to access the live spectral analysis system and download research materials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Create Account
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
