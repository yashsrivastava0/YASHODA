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

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET ||
        "c5e42c5a8430be9345f7ea089ff603334342aa1c916b80236524cc949b77b119d547e1e7ebe03acd47b1b1f7ae6cb3a1613917f211309ef3cbe75bacf969018a232d869b0309585357b60bfe9eec071b0a1451009a33e0953675680b06ac4cb837587781dff906a05f465fae7b62b05d96c24cd07dddd0f6c7868153be6ed4d522b81b116b18d456d8fcda67139af8c500ae54c131647fedc7737707d8ba36848bff0c864a5a77faf588e6372c6adae02c59c18c559bc9820dc8ad6aa8f34e79",
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
