import Link from "next/link"
import { Activity } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">SpectroPro</span>
            </div>
            <p className="text-foreground/60 max-w-md">
              Advanced automated spectrophotometer system for real-time spectral analysis. Developed at the University
              of Kelaniya for scientific and educational applications.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-foreground/60 hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-foreground/60 hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/overview" className="text-foreground/60 hover:text-foreground">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-foreground/60 hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Research</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/live" className="text-foreground/60 hover:text-foreground">
                  Live Analysis
                </Link>
              </li>
              <li>
                <Link href="/downloads" className="text-foreground/60 hover:text-foreground">
                  Downloads
                </Link>
              </li>
              <li>
                <span className="text-foreground/60">University of Kelaniya</span>
              </li>
              <li>
                <span className="text-foreground/60">Department of Physics</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-foreground/60 text-sm">
              © 2025 K.G.A.K. WICKRAMARATHNA | S.J.H. MANADUL. University of Kelaniya. All rights reserved.
            </p>
            <p className="text-foreground/60 text-sm mt-2 md:mt-0">Automated Spectrophotometer Research Project</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
