"use client"

import { AuthGuard } from "@/components/auth-guard"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import { useState, useEffect } from "react"
import { Users, Activity, Download, Settings, BarChart3, Shield } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "user" | "researcher"
  studentId?: string
  joinDate: string
}

export default function AdminDashboard() {
  const { user, hasAdminAccess } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState({
    totalUsers: 0,
    researchers: 0,
    regularUsers: 0,
    activeToday: 0,
  })

  useEffect(() => {
    // Load users from localStorage
    const loadUsers = () => {
      const storedUsers = localStorage.getItem("users")
      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers).map((u: any) => ({
          ...u,
          joinDate: new Date().toISOString().split("T")[0], // Mock join date
        }))
        setUsers(parsedUsers)

        // Calculate stats
        const researchers = parsedUsers.filter((u: User) => u.role === "researcher").length
        const regularUsers = parsedUsers.filter((u: User) => u.role === "user").length

        setStats({
          totalUsers: parsedUsers.length,
          researchers,
          regularUsers,
          activeToday: Math.floor(parsedUsers.length * 0.7), // Mock active users
        })
      }
    }

    loadUsers()
  }, [])

  const handleDeleteUser = (userId: string) => {
    const updatedUsers = users.filter((u) => u.id !== userId)
    setUsers(updatedUsers)
    localStorage.setItem("users", JSON.stringify(updatedUsers))

    // Update stats
    const researchers = updatedUsers.filter((u) => u.role === "researcher").length
    const regularUsers = updatedUsers.filter((u) => u.role === "user").length

    setStats({
      totalUsers: updatedUsers.length,
      researchers,
      regularUsers,
      activeToday: Math.floor(updatedUsers.length * 0.7),
    })
  }

  return (
    <AuthGuard requireAdmin={true}>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              </div>
              <p className="text-muted-foreground">Welcome, {user?.name}. Manage users and monitor system activity.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers}</div>
                  <p className="text-xs text-muted-foreground">Registered accounts</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Researchers</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.researchers}</div>
                  <p className="text-xs text-muted-foreground">Admin accounts</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Regular Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.regularUsers}</div>
                  <p className="text-xs text-muted-foreground">Standard accounts</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Today</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeToday}</div>
                  <p className="text-xs text-muted-foreground">Users online</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Admin Access</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">Authorized</div>
                  <p className="text-xs text-muted-foreground">Student ID: {user?.studentId}</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    System Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">View detailed analytics and usage statistics</p>
                  <Button className="w-full">View Analytics</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Export Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Export user data and system logs</p>
                  <Button variant="outline" className="w-full">
                    Export Reports
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    System Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Configure system parameters and preferences</p>
                  <Button variant="outline" className="w-full">
                    Open Settings
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* User Management */}
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <p className="text-sm text-muted-foreground">Manage registered users and their access levels</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No users found</p>
                  ) : (
                    users.map((userData) => (
                      <div key={userData.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            {userData.role === "researcher" ? (
                              <Shield className="h-5 w-5 text-primary" />
                            ) : (
                              <Users className="h-5 w-5 text-primary" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{userData.name}</h3>
                            <p className="text-sm text-muted-foreground">{userData.email}</p>
                            {userData.studentId && (
                              <p className="text-xs text-muted-foreground">ID: {userData.studentId}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={userData.role === "researcher" ? "default" : "secondary"}>
                            {userData.role === "researcher" ? "Researcher" : "User"}
                          </Badge>
                          <span className="text-sm text-muted-foreground">Joined: {userData.joinDate}</span>
                          {userData.id !== user?.id && (
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteUser(userData.id)}>
                              Remove
                            </Button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </AuthGuard>
  )
}
