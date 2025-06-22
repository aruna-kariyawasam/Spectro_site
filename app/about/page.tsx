import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">About the Research Project</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get an idea about the team, timeline, behind the Automated Spectrophotometer for Real-Time
              Spectral Analysis project.
            </p>
          </div>

          {/* Team Information */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Research Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              <Card className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary/10">
                      <Image
                        src="/images/team/jayathilaka.jpg"
                        alt="Portrait of Prof. K. M. D. C. Jayathilaka, Principal Investigator"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 96px, 96px"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Prof. K. M. D. C. JAYATHILAKA</CardTitle>
                      <p className="text-sm text-muted-foreground">Principal Investigator</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Department:</strong> Physics and Electronics
                    </p>
                    <p>
                      <strong>Role:</strong> Expert guidance and project supervision
                    </p>
                    <p>
                      <strong>Contribution:</strong> Visionary leadership and continuous encouragement
                    </p>
                  </div>
                </CardContent>
              </Card>

<Card className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary/10">
                      <Image
                        src="/images/team/priyadharshana.png"
                        alt="Portrait of Dr. P. A. N. S. Priyadharshana, Co-Principal Investigator"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 96px, 96px"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Dr. P. A. N. S. PRIYADARSHANA</CardTitle>
                      <p className="text-sm text-muted-foreground">Co-Principal Investigator</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Department:</strong> Physics and Electronics
                    </p>
                    <p>
                      <strong>Role:</strong> Technical guidance and research direction
                    </p>
                    <p>
                      <strong>Contribution:</strong> Constructive feedback and technical insight
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary/10">
                      <Image
                        src="/images/team/wickramarathna.png"
                        alt="Portrait of K.G.A.K. WICKRAMARATHNA, Principal Researcher"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 96px, 96px"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">K.G.A.K. WICKRAMARATHNA</CardTitle>
                      <p className="text-sm text-muted-foreground">Principal Researcher</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Program:</strong> Bachelor of Honors in Electronics and Computer Science
                    </p>
                    <p>
                      <strong>Role:</strong> System design, implementation, and GUI development
                    </p>
                    <p>
                      <strong>Focus:</strong> Real-time data visualization and hardware integration
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary/10">
                      <Image
                        src="/images/team/manadul.png"
                        alt="Portrait of S.J.H. MANADUL, Principal Researcher"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 96px, 96px"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">S.J.H. MANADUL</CardTitle>
                      <p className="text-sm text-muted-foreground">Principal Researcher</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Program:</strong> Bachelor of Honors in Electronics and Computer Science
                    </p>
                    <p>
                      <strong>Role:</strong> Monocrometer, stepper motor control part, filter circuit design and
                      implementation
                    </p>
                    <p>
                      <strong>Focus:</strong> Handling the monocrometer part to give a better light beam to the
                      Photodiode
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Project Timeline */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Project Timeline</h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Calendar className="h-6 w-6 text-primary mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">Research Initiation</h3>
                          <Badge variant="outline">2024</Badge>
                        </div>
                        <p className="text-muted-foreground">
                          Project conception and literature review on spectrophotometry automation
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Calendar className="h-6 w-6 text-primary mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">Hardware Development</h3>
                          <Badge variant="outline">Early 2025</Badge>
                        </div>
                        <p className="text-muted-foreground">
                          Design and implementation of photodiode detection system with STM32 microcontroller
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Calendar className="h-6 w-6 text-primary mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">GUI Development</h3>
                          <Badge variant="outline">Mid 2025</Badge>
                        </div>
                        <p className="text-muted-foreground">
                          Creation of real-time visualization interface using PyQt5 and Matplotlib
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Calendar className="h-6 w-6 text-primary mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">Testing & Validation</h3>
                          <Badge variant="outline">July 2025</Badge>
                        </div>
                        <p className="text-muted-foreground">
                          System integration, performance evaluation, and thesis completion
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Institution Information */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Institution</h2>
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <MapPin className="h-8 w-8 text-primary mt-1" />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">University of Kelaniya</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Department</h4>
                        <p className="text-muted-foreground">Department of Physics and Electronics</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Location</h4>
                        <p className="text-muted-foreground">Kelaniya, Sri Lanka</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Degree Program</h4>
                        <p className="text-muted-foreground">Bachelor of Honors in Electronics and Computer Science</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Research Focus</h4>
                        <p className="text-muted-foreground">Scientific Instrumentation & Automation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Acknowledgements
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">Acknowledgements</h2>
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Special Thanks</h3>
                    <p className="text-muted-foreground">
                      Sincere appreciation to Dr. H. C. Weerasinghe for bringing the 3D printing machine to the
                      university and facilitating access to 3D printing tools, which enabled the practical realization
                      of several aspects of the project.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Academic Support</h3>
                    <p className="text-muted-foreground">
                      Grateful to the academic and technical staff of the Department of Physics and Electronics,
                      University of Kelaniya, for providing the necessary facilities and an encouraging research
                      environment.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Peer Collaboration</h3>
                    <p className="text-muted-foreground">
                      Special thanks to friends and peers for their consistent support, especially during the
                      challenging phases of the project. Their collaboration, motivation, and shared dedication made
                      this journey both successful and memorable.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section> */}
        </div>
      </main>

      <Footer />
    </div>
  )
}
