// File: context/AuthRedirect.tsx
"use client"

import { useEffect } from "react"
import { useAuth } from "@/context/auth-provider"
import { usePathname, useRouter } from "next/navigation"

interface Props {
  children: React.ReactNode
}

const protectedRoutes = ["/dashboard", "/admin", "/profile"] // adjust as needed
const authRoutes = ["/login", "/register"]

export default function AuthRedirect({ children }: Props) {
  const { user, isLoading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return // wait for auth state to load

    const isAuthPage = authRoutes.includes(pathname)
    const isProtected = protectedRoutes.includes(pathname)

    if (!user && isProtected) {
      router.push("/login") // redirect to login
    } else if (user && isAuthPage) {
      router.push("/live") // redirect authenticated users
    }
  }, [user, pathname, router, isLoading])

  return <>{children}</>
}
