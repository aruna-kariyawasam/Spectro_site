"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { useState, useCallback, useMemo } from "react"
import Image from "next/image"

export function Navbar() {
  const { user, logout, isAdmin, hasAdminAccess } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { setTheme, theme } = useTheme()

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark")
  }, [theme, setTheme])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  // Memoized navigation items for performance
  const navigation = useMemo(() => {
    const baseNavigation = [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Overview", href: "/overview" },
      { name: "Contact", href: "/contact" },
    ]

    if (user) {
      baseNavigation.splice(3, 0, { name: "Live Analysis", href: "/live" }, { name: "Downloads", href: "/downloads" })

      if (hasAdminAccess) {
        baseNavigation.splice(5, 0, { name: "Admin Dashboard", href: "/admin/dashboard" })
      }
    }

    return baseNavigation
  }, [user, hasAdminAccess])

  const userDisplayName = useMemo(() => {
    return user?.name?.split(" ")[0] || ""
  }, [user?.name])

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
              <div className="relative w-8 h-8">
                <Image src="/letter-s.png" alt="SpectroPro Logo" width={32} height={32} className="h-12 w-12" priority />
              </div>
              <span className="font-bold text-xl">SpectroPro</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground/60 hover:text-foreground transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="w-9 h-9">
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {hasAdminAccess && <Shield className="h-4 w-4 text-primary" />}
                  <span className="text-sm text-foreground/60">
                    Welcome, {userDisplayName}
                    {hasAdminAccess && <span className="text-primary font-medium"> (Researcher)</span>}
                  </span>
                </div>
                <Button variant="outline" onClick={logout} size="sm">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-foreground/60 hover:text-foreground transition-colors duration-200"
                  onClick={closeMenu}
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <div className="px-3 py-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    {hasAdminAccess && <Shield className="h-4 w-4 text-primary" />}
                    <p className="text-sm text-foreground/60">
                      Welcome, {user.name}
                      {hasAdminAccess && <span className="text-primary font-medium"> (Researcher)</span>}
                    </p>
                  </div>
                  <Button variant="outline" onClick={logout} className="w-full" size="sm">
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="px-3 py-2 space-y-2">
                  <Link href="/login" onClick={closeMenu}>
                    <Button variant="ghost" className="w-full" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={closeMenu}>
                    <Button className="w-full" size="sm">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
