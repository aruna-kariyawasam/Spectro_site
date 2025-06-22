"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import bcrypt from "bcryptjs"
import { isApprovedAdminStudentId, isValidStudentIdFormat } from "@/lib/admin-config"
import { loginUser } from "@/utils/auth"

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
  register: (
    name: string,
    email: string,
    password: string,
    role?: "user" | "researcher",
    studentId?: string,
  ) => Promise<{ success: boolean; message: string }>
  logout: () => void
  isLoading: boolean
  isAdmin: boolean
  hasAdminAccess: boolean
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Optimized storage functions with error handling
const getUsersFromStorage = (): User[] => {
  if (typeof window === "undefined") return []
  try {
    const users = localStorage.getItem("users")
    return users ? JSON.parse(users) : []
  } catch (error) {
    console.error("Error reading users from storage:", error)
    return []
  }
}

const saveUsersToStorage = (users: User[]) => {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem("users", JSON.stringify(users))
  } catch (error) {
    console.error("Error saving users to storage:", error)
  }
}

const getPasswordsFromStorage = (): Record<string, string> => {
  if (typeof window === "undefined") return {}
  try {
    const passwords = localStorage.getItem("user-passwords")
    return passwords ? JSON.parse(passwords) : {}
  } catch (error) {
    console.error("Error reading passwords from storage:", error)
    return {}
  }
}

const savePasswordsToStorage = (passwords: Record<string, string>) => {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem("user-passwords", JSON.stringify(passwords))
  } catch (error) {
    console.error("Error saving passwords to storage:", error)
  }
}

/**
 * Validates and updates user admin status based on student ID
 */
const validateAdminAccess = (user: User): User => {
  const isApproved = user.role === "researcher" && isApprovedAdminStudentId(user.studentId)
  return {
    ...user,
    isApprovedAdmin: isApproved,
    lastLogin: new Date().toISOString(),
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Memoized values for performance
  const isAdmin = useMemo(() => user?.role === "researcher", [user?.role])
  const hasAdminAccess = useMemo(() => Boolean(user?.isApprovedAdmin), [user?.isApprovedAdmin])

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem("auth-token")
        const userData = localStorage.getItem("user-data")

        if (token && userData) {
          const parsedUser = JSON.parse(userData)
          const validatedUser = validateAdminAccess(parsedUser)
          setUser(validatedUser)

          // Update stored user data if admin status changed
          if (validatedUser.isApprovedAdmin !== parsedUser.isApprovedAdmin) {
            localStorage.setItem("user-data", JSON.stringify(validatedUser))
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error)
        localStorage.removeItem("auth-token")
        localStorage.removeItem("user-data")
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {

      const result = await loginUser({ email: email, password: password })
      if (result.user) {
        const userData = result.user
        const validatedUser = validateAdminAccess(userData)
        setUser(validatedUser)
        localStorage.setItem("auth-token", result.token)
        localStorage.setItem("user-data", JSON.stringify(validatedUser))
        return { success: true, message: "Login successful" }
      } else {
          return { success: false, message: "Invalid email or password" }
      }

    } catch (error) {
      console.error("Login error:", error)
      return { success: false, message: "An unexpected error occurred. Please try again." }
    }
  }, [])

  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      role: "user" | "researcher" = "user",
      studentId?: string,
    ): Promise<{ success: boolean; message: string }> => {
      try {
        
        console.log(role) 

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, role, password, studentId}),
        })
        const data = await response.json()

        if (data.user) {
          const userData = data.user
          const validatedUser = validateAdminAccess(userData)
          setUser(validatedUser)
          localStorage.setItem("auth-token", data.token)
          localStorage.setItem("user-data", JSON.stringify(validatedUser))
          return { success: true, message: "Registration successful!" }
        } else {
            return { success: false, message: "Registration Failed" }
        }

      } catch (error) {
        console.error("Registration error:", error)
        return { success: false, message: "An unexpected error occurred. Please try again." }
      }
    },
    [],
  )

  const logout = useCallback(() => {
    try {
      localStorage.removeItem("auth-token")
      localStorage.removeItem("user-data")
      setUser(null)
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }, [router])

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((prevUser) => {
      if (!prevUser) return null
      const updatedUser = { ...prevUser, ...updates }

      try {
        localStorage.setItem("user-data", JSON.stringify(updatedUser))

        // Update in users storage as well
        const users = getUsersFromStorage()
        const updatedUsers = users.map((u) => (u.id === updatedUser.id ? updatedUser : u))
        saveUsersToStorage(updatedUsers)
      } catch (error) {
        console.error("Error updating user:", error)
      }

      return updatedUser
    })
  }, [])

  const contextValue = useMemo(
    () => ({
      user,
      login,
      register,
      logout,
      isLoading,
      isAdmin,
      hasAdminAccess,
      updateUser,
    }),
    [user, login, register, logout, isLoading, isAdmin, hasAdminAccess, updateUser],
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
