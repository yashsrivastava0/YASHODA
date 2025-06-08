"use client"

// Auto-initialize database on first visit
export class AutoInitDB {
  private static initialized = false

  static async initialize() {
    if (typeof window === "undefined" || this.initialized) return

    try {
      // Check if we already have data
      const existingUsers = localStorage.getItem("yashoda_users")
      const existingProducts = localStorage.getItem("yashoda_products")

      if (existingUsers && existingProducts) {
        console.log("Database already initialized")
        this.initialized = true
        return
      }

      console.log("Initializing YASHODA local database...")

      // Create admin user
      const adminUser = {
        id: "admin_1",
        name: "Admin User",
        email: "admin@yashoda.com",
        password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qK", // admin123
        role: "admin",
        createdAt: new Date().toISOString(),
      }

      // Create sample user
      const sampleUser = {
        id: "user_1",
        name: "John Doe",
        email: "user@example.com",
        password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qK", // password123
        role: "user",
        createdAt: new Date().toISOString(),
      }

      const users = [adminUser, sampleUser]

      // Create sample products with new categories
      const products = [
        // Fashion Products
        {
          id: "f1",
          name: "Rainbow Gradient Dress",
          price: 8999,
          image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop&crop=center&q=80",
          category: "fashion",
          description: "Stunning dress with rainbow gradient patterns that shift with light.",
          sizes: ["XS", "S", "M", "L"],
          colors: ["Rainbow", "Sunset", "Aurora"],
          stock: 15,
          status: "active",
          createdAt: new Date().toISOString(),
        },
        {
          id: "f2",
          name: "Holographic Jacket",
          price: 12999,
          image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop&crop=center&q=80",
          category: "fashion",
          description: "Futuristic jacket with holographic finish and smart temperature control.",
          sizes: ["S", "M", "L", "XL"],
          colors: ["Holographic", "Silver", "Black"],
          stock: 20,
          status: "active",
          createdAt: new Date().toISOString(),
        },
        {
          id: "f3",
          name: "Digital Print Hoodie",
          price: 6999,
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop&crop=center&q=80",
          category: "fashion",
          description: "Comfortable hoodie with animated digital prints.",
          sizes: ["S", "M", "L", "XL", "XXL"],
          colors: ["Black", "Navy", "Purple"],
          stock: 25,
          status: "active",
          createdAt: new Date().toISOString(),
        },
        {
          id: "f4",
          name: "Neon Tracksuit",
          price: 9999,
          image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=600&fit=crop&crop=center&q=80",
          category: "fashion",
          description: "Athletic tracksuit with neon accents and moisture-wicking fabric.",
          sizes: ["S", "M", "L", "XL"],
          colors: ["Neon Green", "Electric Blue", "Hot Pink"],
          stock: 18,
          status: "active",
          createdAt: new Date().toISOString(),
        },
        {
          id: "f5",
          name: "Metallic Mini Skirt",
          price: 4999,
          image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=600&fit=crop&crop=center&q=80",
          category: "fashion",
          description: "Shimmering metallic mini skirt perfect for parties.",
          sizes: ["XS", "S", "M", "L"],
          colors: ["Gold", "Silver", "Rose Gold"],
          stock: 12,
          status: "active",
          createdAt: new Date().toISOString(),
        },
        {
          id: "f6",
          name: "Cyber Punk Boots",
          price: 14999,
          image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&h=600&fit=crop&crop=center&q=80",
          category: "fashion",
          description: "High-tech boots with LED accents and all-day comfort.",
          sizes: ["6", "7", "8", "9", "10", "11"],
          colors: ["Black", "Chrome", "Neon"],
          stock: 22,
          status: "active",
          createdAt: new Date().toISOString(),
        },

        // Electronics
        {
          id: "e1",
          name: "Holographic Smart Watch",
          price: 29999,
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=600&fit=crop&crop=center&q=80",
          category: "electronics",
          description: "Advanced smartwatch with holographic display and health monitoring.",
          sizes: ["One Size"],
          colors: ["Black", "Silver", "Rose Gold"],
          stock: 15,
          status: "active",
          createdAt: new Date().toISOString(),
        },
        {
          id: "e2",
          name: "RGB Gaming Headset",
          price: 8999,
          image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=500&h=600&fit=crop&crop=center&q=80",
          category: "electronics",
          description: "Professional gaming headset with customizable RGB lighting.",
          sizes: ["One Size"],
          colors: ["Black", "White", "RGB"],
          stock: 30,
          status: "active",
          createdAt: new Date().toISOString(),
        },
        {
          id: "e3",
          name: "Wireless Charging Pad",
          price: 3999,
          image: "https://images.unsplash.com/photo-1609592806787-3d9c5b1b8b8e?w=500&h=600&fit=crop&crop=center&q=80",
          category: "electronics",
          description: "Fast wireless charging pad with LED indicators.",
          sizes: ["One Size"],
          colors: ["Black", "White"],
          stock: 40,
          status: "active",
          createdAt: new Date().toISOString(),
        },
        {
          id: "e4",
          name: "Smart LED Strip",
          price: 2999,
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=600&fit=crop&crop=center&q=80",
          category: "electronics",
          description: "Color-changing LED strip with app control and music sync.",
          sizes: ["5m", "10m"],
          colors: ["RGB", "RGBW"],
          stock: 35,
          status: "active",
          createdAt: new Date().toISOString(),
        },
        {
          id: "e5",
          name: "Bluetooth Speaker",
          price: 6999,
          image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=600&fit=crop&crop=center&q=80",
          category: "electronics",
          description: "Portable Bluetooth speaker with 360-degree sound.",
          sizes: ["One Size"],
          colors: ["Black", "Blue", "Red"],
          stock: 25,
          status: "active",
          createdAt: new Date().toISOString(),
        },
        {
          id: "e6",
          name: "VR Headset",
          price: 39999,
          image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=500&h=600&fit=crop&crop=center&q=80",
          category: "electronics",
          description: "Immersive VR headset with 4K display and spatial tracking.",
          sizes: ["One Size"],
          colors: ["White", "Black"],
          stock: 8,
          status: "active",
          createdAt: new Date().toISOString(),
        },

        // Home Decor
        {
          id: "h1",
          name: "Neon Wall Art",
          price: 7999,
          image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=600&fit=crop&crop=center&q=80",
          category: "home-decor",
          description: "Custom neon wall art with programmable colors and patterns.",
          sizes: ["Small", "Medium", "Large"],
          colors: ["Multi-color", "Blue", "Pink"],
          stock: 20,
          status: "active",
          createdAt: new Date().toISOString(),
        },
        {
          id: "h2",
          name: "Smart Mirror",
          price: 24999,
          image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=600&fit=crop&crop=center&q=80",
          category: "home-decor",
          description: "Interactive smart mirror with weather, news, and fitness tracking.",
          sizes: ["24 inch", "32 inch"],
          colors: ["Black Frame", "Silver Frame"],
          stock: 10,
          status: "active",
          createdAt: new Date().toISOString(),
        },
        {
          id: "h3",
          name: "Holographic Lamp",
          price: 5999,
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&crop=center&q=80",
          category: "home-decor",
          description: "3D holographic lamp with multiple projection modes.",
          sizes: ["One Size"],
          colors: ["Clear", "Tinted"],
          stock: 15,
          status: "active",
          createdAt: new Date().toISOString(),
        },
        {
          id: "h4",
          name: "Floating Shelf Set",
          price: 8999,
          image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=600&fit=crop&crop=center&q=80",
          category: "home-decor",
          description: "Magnetic floating shelves with LED backlighting.",
          sizes: ["Set of 3", "Set of 5"],
          colors: ["White", "Black", "Wood"],
          stock: 18,
          status: "active",
          createdAt: new Date().toISOString(),
        },
        {
          id: "h5",
          name: "Smart Plant Pot",
          price: 3999,
          image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=600&fit=crop&crop=center&q=80",
          category: "home-decor",
          description: "Self-watering smart plant pot with growth monitoring.",
          sizes: ["Small", "Medium", "Large"],
          colors: ["White", "Terracotta", "Black"],
          stock: 25,
          status: "active",
          createdAt: new Date().toISOString(),
        },
        {
          id: "h6",
          name: "Ambient Light Panel",
          price: 12999,
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=600&fit=crop&crop=center&q=80",
          category: "home-decor",
          description: "Modular light panels that sync with music and create ambient lighting.",
          sizes: ["6 Panel", "9 Panel", "12 Panel"],
          colors: ["RGB", "Warm White", "Cool White"],
          stock: 12,
          status: "active",
          createdAt: new Date().toISOString(),
        },

        // Skincare
        {
          id: "s1",
          name: "LED Face Mask",
          price: 15999,
          image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&h=600&fit=crop&crop=center&q=80",
          category: "skincare",
          description: "Professional LED light therapy mask for anti-aging and acne treatment.",
          sizes: ["One Size"],
          colors: ["White", "Rose Gold"],
          stock: 20,
          status: "active",
          createdAt: new Date().toISOString(),
        },
        {
          id: "s2",
          name: "Sonic Facial Cleaner",
          price: 8999,
          image: "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=500&h=600&fit=crop&crop=center&q=80",
          category: "skincare",
          description: "Ultrasonic facial cleansing device with multiple brush heads.",
          sizes: ["One Size"],
          colors: ["Pink", "White", "Blue"],
          stock: 30,
          status: "active",
          createdAt: new Date().toISOString(),
        },
        {
          id: "s3",
          name: "Smart Skincare Scanner",
          price: 12999,
          image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=600&fit=crop&crop=center&q=80",
          category: "skincare",
          description: "AI-powered skin analysis device with personalized recommendations.",
          sizes: ["One Size"],
          colors: ["White", "Silver"],
          stock: 15,
          status: "active",
          createdAt: new Date().toISOString(),
        },
        {
          id: "s4",
          name: "Hydrating Face Mist",
          price: 2999,
          image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=600&fit=crop&crop=center&q=80",
          category: "skincare",
          description: "Nano-mist facial hydrator with vitamin infusion technology.",
          sizes: ["50ml", "100ml"],
          colors: ["Clear", "Rose"],
          stock: 40,
          status: "active",
          createdAt: new Date().toISOString(),
        },
        {
          id: "s5",
          name: "Anti-Aging Serum",
          price: 6999,
          image: "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=500&h=600&fit=crop&crop=center&q=80",
          category: "skincare",
          description: "Advanced anti-aging serum with peptides and hyaluronic acid.",
          sizes: ["30ml", "50ml"],
          colors: ["Clear"],
          stock: 25,
          status: "active",
          createdAt: new Date().toISOString(),
        },
        {
          id: "s6",
          name: "Collagen Face Mask Set",
          price: 4999,
          image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&h=600&fit=crop&crop=center&q=80",
          category: "skincare",
          description: "Premium collagen face mask set for deep hydration and firming.",
          sizes: ["5 Pack", "10 Pack"],
          colors: ["Gold", "Pearl"],
          stock: 35,
          status: "active",
          createdAt: new Date().toISOString(),
        },
      ]

      // Save to localStorage
      localStorage.setItem("yashoda_users", JSON.stringify(users))
      localStorage.setItem("yashoda_products", JSON.stringify(products))
      localStorage.setItem("yashoda_orders", JSON.stringify([]))
      localStorage.setItem("yashoda_initialized", "true")

      console.log("✅ YASHODA Database initialized successfully!")
      console.log("👤 Admin Login: admin@yashoda.com / admin123")
      console.log("👤 User Login: user@example.com / password123")
      console.log(`📦 ${products.length} products loaded across 4 categories`)

      this.initialized = true
    } catch (error) {
      console.error("Failed to initialize YASHODA database:", error)
    }
  }

  static getUsers() {
    if (typeof window === "undefined") return []
    const users = localStorage.getItem("yashoda_users")
    return users ? JSON.parse(users) : []
  }

  static getProducts(category?: string) {
    if (typeof window === "undefined") return []
    const products = localStorage.getItem("yashoda_products")
    const allProducts = products ? JSON.parse(products) : []
    return category ? allProducts.filter((p: any) => p.category === category) : allProducts
  }

  static addUser(user: any) {
    if (typeof window === "undefined") return
    const users = this.getUsers()
    users.push(user)
    localStorage.setItem("yashoda_users", JSON.stringify(users))
  }

  static findUserByEmail(email: string) {
    const users = this.getUsers()
    return users.find((user: any) => user.email.toLowerCase() === email.toLowerCase())
  }
}
