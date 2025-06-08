import { MongoClient } from "mongodb"
import bcrypt from "bcryptjs"

const MONGODB_URI =
  "mongodb+srv://haha:PqPmBm6G179V1HJT@cluster0.6caidgm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const MONGODB_DB = "yashoda"

async function setupYashodaDatabase() {
  const client = new MongoClient(MONGODB_URI)

  try {
    console.log("🚀 Starting YASHODA Database Setup...")
    await client.connect()
    console.log("✅ Connected to MongoDB Atlas successfully")

    const db = client.db(MONGODB_DB)

    // Create collections
    const collections = ["users", "products", "orders", "categories"]

    console.log("📁 Creating collections...")
    for (const collectionName of collections) {
      try {
        await db.createCollection(collectionName)
        console.log(`   ✅ Created collection: ${collectionName}`)
      } catch (error) {
        if (error.code === 48) {
          console.log(`   ℹ️  Collection ${collectionName} already exists`)
        } else {
          throw error
        }
      }
    }

    // Create indexes
    console.log("🔍 Creating database indexes...")
    await db.collection("users").createIndex({ email: 1 }, { unique: true })
    await db.collection("products").createIndex({ name: 1 })
    await db.collection("products").createIndex({ category: 1 })
    await db.collection("orders").createIndex({ userId: 1 })
    console.log("   ✅ Database indexes created")

    // Hash passwords
    console.log("🔐 Creating user accounts...")
    const adminPassword = await bcrypt.hash("admin123", 12)
    const customerPassword = await bcrypt.hash("customer123", 12)

    // Insert admin user
    const adminUser = {
      name: "YASHODA Admin",
      email: "admin@yashoda.com",
      password: adminPassword,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Insert sample customer user
    const customerUser = {
      name: "John Doe",
      email: "customer@yashoda.com",
      password: customerPassword,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    try {
      await db.collection("users").insertOne(adminUser)
      console.log("   ✅ Admin user created: admin@yashoda.com / admin123")
    } catch (error) {
      if (error.code === 11000) {
        console.log("   ℹ️  Admin user already exists")
      } else {
        throw error
      }
    }

    try {
      await db.collection("users").insertOne(customerUser)
      console.log("   ✅ Customer user created: customer@yashoda.com / customer123")
    } catch (error) {
      if (error.code === 11000) {
        console.log("   ℹ️  Customer user already exists")
      } else {
        throw error
      }
    }

    // Insert sample products
    console.log("🛍️  Adding YASHODA products...")
    const sampleProducts = [
      // Fashion Products
      {
        name: "Rainbow Gradient Dress",
        category: "fashion",
        price: 8999, // ₹8,999
        stock: 15,
        status: "active",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop&crop=center&q=80",
        description: "Stunning dress with rainbow gradient patterns that shift with light.",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Rainbow", "Sunset", "Aurora"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Holographic Jacket",
        category: "fashion",
        price: 12999, // ₹12,999
        stock: 20,
        status: "active",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop&crop=center&q=80",
        description: "Futuristic jacket with holographic finish and smart temperature control.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Holographic", "Silver", "Black"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Digital Print Hoodie",
        category: "fashion",
        price: 6999, // ₹6,999
        stock: 25,
        status: "active",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop&crop=center&q=80",
        description: "Comfortable hoodie with animated digital prints.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "Navy", "Purple"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Neon Tracksuit",
        category: "fashion",
        price: 9999, // ₹9,999
        stock: 18,
        status: "active",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=600&fit=crop&crop=center&q=80",
        description: "Athletic tracksuit with neon accents and moisture-wicking fabric.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Neon Green", "Electric Blue", "Hot Pink"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Metallic Mini Skirt",
        category: "fashion",
        price: 4999, // ₹4,999
        stock: 12,
        status: "active",
        image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=600&fit=crop&crop=center&q=80",
        description: "Shimmering metallic mini skirt perfect for parties.",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Gold", "Silver", "Rose Gold"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cyber Punk Boots",
        category: "fashion",
        price: 14999, // ₹14,999
        stock: 22,
        status: "active",
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&h=600&fit=crop&crop=center&q=80",
        description: "High-tech boots with LED accents and all-day comfort.",
        sizes: ["6", "7", "8", "9", "10", "11"],
        colors: ["Black", "Chrome", "Neon"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Electronics
      {
        name: "Holographic Smart Watch",
        category: "electronics",
        price: 29999, // ₹29,999
        stock: 15,
        status: "active",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=600&fit=crop&crop=center&q=80",
        description: "Advanced smartwatch with holographic display and health monitoring.",
        sizes: ["One Size"],
        colors: ["Black", "Silver", "Rose Gold"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "RGB Gaming Headset",
        category: "electronics",
        price: 8999, // ₹8,999
        stock: 30,
        status: "active",
        image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=500&h=600&fit=crop&crop=center&q=80",
        description: "Professional gaming headset with customizable RGB lighting.",
        sizes: ["One Size"],
        colors: ["Black", "White", "RGB"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Wireless Charging Pad",
        category: "electronics",
        price: 3999, // ₹3,999
        stock: 40,
        status: "active",
        image: "https://images.unsplash.com/photo-1609592806787-3d9c5b1b8b8e?w=500&h=600&fit=crop&crop=center&q=80",
        description: "Fast wireless charging pad with LED indicators.",
        sizes: ["One Size"],
        colors: ["Black", "White"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Smart LED Strip",
        category: "electronics",
        price: 2999, // ₹2,999
        stock: 35,
        status: "active",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=600&fit=crop&crop=center&q=80",
        description: "Color-changing LED strip with app control and music sync.",
        sizes: ["5m", "10m"],
        colors: ["RGB", "RGBW"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bluetooth Speaker",
        category: "electronics",
        price: 6999, // ₹6,999
        stock: 25,
        status: "active",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=600&fit=crop&crop=center&q=80",
        description: "Portable Bluetooth speaker with 360-degree sound.",
        sizes: ["One Size"],
        colors: ["Black", "Blue", "Red"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "VR Headset",
        category: "electronics",
        price: 39999, // ₹39,999
        stock: 8,
        status: "active",
        image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=500&h=600&fit=crop&crop=center&q=80",
        description: "Immersive VR headset with 4K display and spatial tracking.",
        sizes: ["One Size"],
        colors: ["White", "Black"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Home Decor
      {
        name: "Neon Wall Art",
        category: "home-decor",
        price: 7999, // ₹7,999
        stock: 20,
        status: "active",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=600&fit=crop&crop=center&q=80",
        description: "Custom neon wall art with programmable colors and patterns.",
        sizes: ["Small", "Medium", "Large"],
        colors: ["Multi-color", "Blue", "Pink"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Smart Mirror",
        category: "home-decor",
        price: 24999, // ₹24,999
        stock: 10,
        status: "active",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=600&fit=crop&crop=center&q=80",
        description: "Interactive smart mirror with weather, news, and fitness tracking.",
        sizes: ["24 inch", "32 inch"],
        colors: ["Black Frame", "Silver Frame"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Holographic Lamp",
        category: "home-decor",
        price: 5999, // ₹5,999
        stock: 15,
        status: "active",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&crop=center&q=80",
        description: "3D holographic lamp with multiple projection modes.",
        sizes: ["One Size"],
        colors: ["Clear", "Tinted"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Floating Shelf Set",
        category: "home-decor",
        price: 8999, // ₹8,999
        stock: 18,
        status: "active",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=600&fit=crop&crop=center&q=80",
        description: "Magnetic floating shelves with LED backlighting.",
        sizes: ["Set of 3", "Set of 5"],
        colors: ["White", "Black", "Wood"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Smart Plant Pot",
        category: "home-decor",
        price: 3999, // ₹3,999
        stock: 25,
        status: "active",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=600&fit=crop&crop=center&q=80",
        description: "Self-watering smart plant pot with growth monitoring.",
        sizes: ["Small", "Medium", "Large"],
        colors: ["White", "Terracotta", "Black"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ambient Light Panel",
        category: "home-decor",
        price: 12999, // ₹12,999
        stock: 12,
        status: "active",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=600&fit=crop&crop=center&q=80",
        description: "Modular light panels that sync with music and create ambient lighting.",
        sizes: ["6 Panel", "9 Panel", "12 Panel"],
        colors: ["RGB", "Warm White", "Cool White"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Skincare
      {
        name: "LED Face Mask",
        category: "skincare",
        price: 15999, // ₹15,999
        stock: 20,
        status: "active",
        image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&h=600&fit=crop&crop=center&q=80",
        description: "Professional LED light therapy mask for anti-aging and acne treatment.",
        sizes: ["One Size"],
        colors: ["White", "Rose Gold"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sonic Facial Cleaner",
        category: "skincare",
        price: 8999, // ₹8,999
        stock: 30,
        status: "active",
        image: "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=500&h=600&fit=crop&crop=center&q=80",
        description: "Ultrasonic facial cleansing device with multiple brush heads.",
        sizes: ["One Size"],
        colors: ["Pink", "White", "Blue"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Smart Skincare Scanner",
        category: "skincare",
        price: 12999, // ₹12,999
        stock: 15,
        status: "active",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=600&fit=crop&crop=center&q=80",
        description: "AI-powered skin analysis device with personalized recommendations.",
        sizes: ["One Size"],
        colors: ["White", "Silver"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hydrating Face Mist",
        category: "skincare",
        price: 2999, // ₹2,999
        stock: 40,
        status: "active",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=600&fit=crop&crop=center&q=80",
        description: "Nano-mist facial hydrator with vitamin infusion technology.",
        sizes: ["50ml", "100ml"],
        colors: ["Clear", "Rose"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Anti-Aging Serum",
        category: "skincare",
        price: 6999, // ₹6,999
        stock: 25,
        status: "active",
        image: "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=500&h=600&fit=crop&crop=center&q=80",
        description: "Advanced anti-aging serum with peptides and hyaluronic acid.",
        sizes: ["30ml", "50ml"],
        colors: ["Clear"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Collagen Face Mask Set",
        category: "skincare",
        price: 4999, // ₹4,999
        stock: 35,
        status: "active",
        image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&h=600&fit=crop&crop=center&q=80",
        description: "Premium collagen face mask set for deep hydration and firming.",
        sizes: ["5 Pack", "10 Pack"],
        colors: ["Gold", "Pearl"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    // Clear existing products and insert new ones
    await db.collection("products").deleteMany({})
    await db.collection("products").insertMany(sampleProducts)
    console.log(`   ✅ Added ${sampleProducts.length} products across 4 categories`)

    console.log("\n🎉 YASHODA Database Setup Complete!")
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    console.log("🔐 LOGIN CREDENTIALS:")
    console.log("   👨‍💼 Admin: admin@yashoda.com / admin123")
    console.log("   👤 Customer: customer@yashoda.com / customer123")
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    console.log("📦 DATABASE CONTENTS:")
    console.log("   • 2 Users (1 Admin, 1 Customer)")
    console.log("   • 24 Products (Fashion, Electronics, Home Decor, Skincare)")
    console.log("   • All prices in Indian Rupees (₹)")
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    console.log("🚀 Your YASHODA e-commerce site is ready to use!")
  } catch (error) {
    console.error("❌ YASHODA Database setup failed:", error)
  } finally {
    await client.close()
  }
}

// Run the setup
setupYashodaDatabase()
