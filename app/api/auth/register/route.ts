export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("Customer registration attempt:", { email: body.email, name: body.name })

    const { name, email, password } = body

    // Basic validation
    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: "Name must be at least 2 characters" }, { status: 400 })
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    if (!password || password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({
      email: email.toLowerCase().trim(),
    })

    if (existingUser) {
      console.log("User already exists:", email)
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create customer user (role: "user")
    const result = await db.collection("users").insertOne({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: "user", // Always create as customer
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    console.log("Customer user created successfully:", result.insertedId)

    return NextResponse.json(
      {
        message: "Customer account registered successfully",
        userId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error registering customer:", error)
    return NextResponse.json({ error: "Failed to register customer. Please try again." }, { status: 500 })
  }
}
