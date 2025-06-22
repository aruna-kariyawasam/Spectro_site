// File: context/auth-provider.tsx
"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
// import jwtDecode from "jwt-decode"

interface User {
  id: string
  name: string
  email: string
  role: "user" | "researcher"
  studentId?: string
  isApprovedAdmin?: boolean
  lastLogin?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
  isLoading: boolean
  isAdmin: boolean
  hasAdminAccess: boolean
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const isAdmin = useMemo(() => user?.role === "researcher", [user?.role])
  const hasAdminAccess = useMemo(() => Boolean(user?.isApprovedAdmin), [user?.isApprovedAdmin])

  // Load token on first load
  useEffect(() => {
    const token = localStorage.getItem("auth-token")
    const _user = localStorage.getItem("user")
    // if (_user) {
    //   try {
    //     // const decoded: any = jwtDecode(token)
    //     setUser(_user)
    //   } catch (err) {
    //     console.error("Token decode error", err)
    //     localStorage.removeItem("auth-token")
    //   }
    // }
    setUser(_user as User | null)
    setIsLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      localStorage.setItem("auth-token", data.token)
      setUser(data.user)

      return { success: true, message: "Login successful" }
    } catch (err: any) {
      console.error("Login error", err)
      return { success: false, message: err.message || "Login failed" }
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem("auth-token")
    setUser(null)
    router.push("/")
  }, [router])

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev))
  }, [])

  const contextValue = useMemo(
    () => ({ user, login, logout, isLoading, isAdmin, hasAdminAccess, updateUser }),
    [user, login, logout, isLoading, isAdmin, hasAdminAccess, updateUser],
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
