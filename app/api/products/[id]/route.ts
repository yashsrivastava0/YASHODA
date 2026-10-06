export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { connectToDatabase } from "@/lib/mongodb"

const DEMO_PRODUCTS = [
  { _id: "f1", name: "Rainbow Gradient Dress", category: "fashion", price: 8999, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=900&h=1100&fit=crop&crop=center&q=85", description: "A fluid gradient dress designed to move with the light.", sizes: ["XS", "S", "M", "L"], colors: ["Rainbow", "Sunset", "Aurora"] },
  { _id: "f2", name: "Holographic Jacket", category: "fashion", price: 12999, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&h=1100&fit=crop&crop=center&q=85", description: "A polished outer layer with a reflective finish.", sizes: ["S", "M", "L", "XL"], colors: ["Holographic", "Silver", "Black"] },
  { _id: "f3", name: "Digital Print Hoodie", category: "fashion", price: 6999, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&h=1100&fit=crop&crop=center&q=85", description: "Soft heavyweight cotton with a graphic print.", sizes: ["S", "M", "L", "XL"], colors: ["Black", "Navy", "Purple"] },
  { _id: "e1", name: "Holographic Smart Watch", category: "electronics", price: 29999, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&h=1100&fit=crop&crop=center&q=85", description: "A precise everyday wearable with a vivid display.", sizes: ["One Size"], colors: ["Black", "Silver", "Rose Gold"] },
  { _id: "h1", name: "Neon Wall Art", category: "home-decor", price: 7999, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&h=1100&fit=crop&crop=center&q=85", description: "A sculptural accent that brings color into a room.", sizes: ["Small", "Medium", "Large"], colors: ["Multi-color", "Blue", "Pink"] },
  { _id: "s1", name: "LED Face Mask", category: "skincare", price: 15999, image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=900&h=1100&fit=crop&crop=center&q=85", description: "A considered at-home light therapy ritual.", sizes: ["One Size"], colors: ["White", "Rose Gold"] },
]

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const { db } = await connectToDatabase()

    const product = ObjectId.isValid(id)
      ? await db.collection("products").findOne({ _id: new ObjectId(id) })
      : null

    const resolvedProduct = product ?? DEMO_PRODUCTS.find((item) => item._id === id)
    if (!resolvedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(resolvedProduct)
  } catch (error) {
    console.error("Error fetching product:", error)
    const demoProduct = DEMO_PRODUCTS.find((item) => item._id === id)
    if (demoProduct) return NextResponse.json(demoProduct)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { db } = await connectToDatabase()
    const { id } = await params
    const updateData = await request.json()

    const result = await db.collection("products").updateOne({ _id: new ObjectId(id) }, { $set: updateData })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Product updated successfully" })
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { db } = await connectToDatabase()
    const { id } = await params

    const result = await db.collection("products").deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
