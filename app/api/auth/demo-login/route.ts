export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Demo users for easy testing
const DEMO_USERS = [
  {
    id: "admin_demo",
    name: "YASHODA Admin",
    email: "admin@yashoda.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: "customer_demo",
    name: "John Customer",
    email: "customer@yashoda.com",
    password: "customer123",
    role: "user",
  },
]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, type } = body

    console.log("Demo login attempt:", { email, type })

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user in demo data
    const user = DEMO_USERS.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password &&
        (type === "admin" ? u.role === "admin" : u.role === "user"),
    )

    if (!user) {
      return NextResponse.json(
        {
          error: type === "admin" ? "Invalid admin credentials" : "Invalid email or password",
        },
        { status: 401 },
      )
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || "demo-secret-key",
      { expiresIn: "7d" },
    )

    console.log(`${type} login successful:`, email)

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
    console.error("Demo login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
