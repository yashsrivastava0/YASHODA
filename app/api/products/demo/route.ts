export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"

// Demo products data
const DEMO_PRODUCTS = [
  // Fashion Products
  {
    _id: "f1",
    name: "Rainbow Gradient Dress",
    category: "fashion",
    price: 8999,
    stock: 15,
    status: "active",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop&crop=center&q=80",
    description: "Stunning dress with rainbow gradient patterns that shift with light.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Rainbow", "Sunset", "Aurora"],
  },
  {
    _id: "f2",
    name: "Holographic Jacket",
    category: "fashion",
    price: 12999,
    stock: 20,
    status: "active",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop&crop=center&q=80",
    description: "Futuristic jacket with holographic finish and smart temperature control.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Holographic", "Silver", "Black"],
  },
  {
    _id: "f3",
    name: "Digital Print Hoodie",
    category: "fashion",
    price: 6999,
    stock: 25,
    status: "active",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop&crop=center&q=80",
    description: "Comfortable hoodie with animated digital prints.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Purple"],
  },
  {
    _id: "f4",
    name: "Neon Tracksuit",
    category: "fashion",
    price: 9999,
    stock: 18,
    status: "active",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=600&fit=crop&crop=center&q=80",
    description: "Athletic tracksuit with neon accents and moisture-wicking fabric.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Neon Green", "Electric Blue", "Hot Pink"],
  },
  // Electronics
  {
    _id: "e1",
    name: "Holographic Smart Watch",
    category: "electronics",
    price: 29999,
    stock: 15,
    status: "active",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=600&fit=crop&crop=center&q=80",
    description: "Advanced smartwatch with holographic display and health monitoring.",
    sizes: ["One Size"],
    colors: ["Black", "Silver", "Rose Gold"],
  },
  {
    _id: "e2",
    name: "RGB Gaming Headset",
    category: "electronics",
    price: 8999,
    stock: 30,
    status: "active",
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=500&h=600&fit=crop&crop=center&q=80",
    description: "Professional gaming headset with customizable RGB lighting.",
    sizes: ["One Size"],
    colors: ["Black", "White", "RGB"],
  },
  // Home Decor
  {
    _id: "h1",
    name: "Neon Wall Art",
    category: "home-decor",
    price: 7999,
    stock: 20,
    status: "active",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=600&fit=crop&crop=center&q=80",
    description: "Custom neon wall art with programmable colors and patterns.",
    sizes: ["Small", "Medium", "Large"],
    colors: ["Multi-color", "Blue", "Pink"],
  },
  {
    _id: "h2",
    name: "Smart Mirror",
    category: "home-decor",
    price: 24999,
    stock: 10,
    status: "active",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=600&fit=crop&crop=center&q=80",
    description: "Interactive smart mirror with weather, news, and fitness tracking.",
    sizes: ["24 inch", "32 inch"],
    colors: ["Black Frame", "Silver Frame"],
  },
  // Skincare
  {
    _id: "s1",
    name: "LED Face Mask",
    category: "skincare",
    price: 15999,
    stock: 20,
    status: "active",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&h=600&fit=crop&crop=center&q=80",
    description: "Professional LED light therapy mask for anti-aging and acne treatment.",
    sizes: ["One Size"],
    colors: ["White", "Rose Gold"],
  },
  {
    _id: "s2",
    name: "Sonic Facial Cleaner",
    category: "skincare",
    price: 8999,
    stock: 30,
    status: "active",
    image: "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=500&h=600&fit=crop&crop=center&q=80",
    description: "Ultrasonic facial cleansing device with multiple brush heads.",
    sizes: ["One Size"],
    colors: ["Pink", "White", "Blue"],
  },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : 10

    let products = DEMO_PRODUCTS

    if (category) {
      products = products.filter((p) => p.category === category)
    }

    products = products.slice(0, limit)

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching demo products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
