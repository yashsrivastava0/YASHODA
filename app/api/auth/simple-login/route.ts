import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // For demo purposes, we'll use hardcoded users
    const demoUsers = [
      {
        id: "admin_1",
        name: "Admin User",
        email: "admin@yashoda.com",
        password: "admin123", // Plain text for demo
        role: "admin",
      },
      {
        id: "user_1",
        name: "John Doe",
        email: "user@example.com",
        password: "password123", // Plain text for demo
        role: "user",
      },
    ]

    const user = demoUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      "demo-secret-key",
      { expiresIn: "7d" },
    )

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
