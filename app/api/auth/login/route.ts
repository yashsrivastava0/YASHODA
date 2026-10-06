export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("Customer login attempt:", { email: body.email })

    const { email, password } = body

    // Basic validation
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    if (!password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Find customer user (role: "user")
    const user = await db.collection("users").findOne({
      email: email.toLowerCase().trim(),
      role: "user", // Only allow customer login
    })

    if (!user) {
      console.log("Customer user not found:", email)
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      console.log("Invalid password for customer:", email)
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      console.error("JWT_SECRET is not configured")
      return NextResponse.json({ error: "Authentication is temporarily unavailable" }, { status: 503 })
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      },
      jwtSecret,
      { expiresIn: "7d" },
    )


    console.log("Customer login successful:", email)

    // Return user info and token
    return NextResponse.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    })
  } catch (error) {
    console.error("Error logging in customer:", error)
    return NextResponse.json({ error: "Failed to log in. Please try again." }, { status: 500 })
  }
}
