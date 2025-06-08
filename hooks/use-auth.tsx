"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "user"
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  loginAdmin: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const isAuthenticated = !!user

  // Check auth on app load
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("yashoda_token")
      const userData = localStorage.getItem("yashoda_user")

      if (token && userData) {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      localStorage.removeItem("yashoda_token")
      localStorage.removeItem("yashoda_user")
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/demo-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, type: "customer" }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

      // Store token and user data
      localStorage.setItem("yashoda_token", data.token)
      localStorage.setItem("yashoda_user", JSON.stringify(data.user))
      setUser(data.user)

      // Set cookie for server-side authentication
      document.cookie = `token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const loginAdmin = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/demo-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, type: "admin" }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Admin login failed")
      }

      // Store token and user data
      localStorage.setItem("yashoda_token", data.token)
      localStorage.setItem("yashoda_user", JSON.stringify(data.user))
      setUser(data.user)

      // Set cookie for server-side authentication
      document.cookie = `token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`
    } catch (error) {
      console.error("Admin login error:", error)
      throw error
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      // For demo, just create a user and auto-login
      const newUser = {
        id: `user_${Date.now()}`,
        name,
        email,
        role: "user" as const,
      }

      const token = "demo-token-" + Date.now()

      localStorage.setItem("yashoda_token", token)
      localStorage.setItem("yashoda_user", JSON.stringify(newUser))
      setUser(newUser)

      document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("yashoda_token")
    localStorage.removeItem("yashoda_user")
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
    setUser(null)
    router.push("/")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        loginAdmin,
        register,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
