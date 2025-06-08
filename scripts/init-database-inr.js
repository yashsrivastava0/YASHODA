import { MongoClient } from "mongodb"
import bcrypt from "bcryptjs"

const MONGODB_URI =
  "mongodb+srv://haha:asdfg.hjkl@cluster0.6caidgm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const MONGODB_DB = "sayonara"

async function initializeDatabase() {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log("Connected to MongoDB successfully")

    const db = client.db(MONGODB_DB)

    // Create collections
    const collections = ["users", "products", "orders", "categories"]

    for (const collectionName of collections) {
      try {
        await db.createCollection(collectionName)
        console.log(`Created collection: ${collectionName}`)
      } catch (error) {
        if (error.code === 48) {
          console.log(`Collection ${collectionName} already exists`)
        } else {
          throw error
        }
      }
    }

    // Create indexes
    await db.collection("users").createIndex({ email: 1 }, { unique: true })
    await db.collection("products").createIndex({ name: 1 })
    await db.collection("products").createIndex({ category: 1 })
    await db.collection("orders").createIndex({ userId: 1 })

    console.log("Database indexes created")

    // Hash password for admin user
    const hashedPassword = await bcrypt.hash("admin123", 12)

    // Insert sample admin user
    const adminUser = {
      name: "Admin User",
      email: "admin@sayonara.com",
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    try {
      await db.collection("users").insertOne(adminUser)
      console.log("Admin user created successfully")
      console.log("Admin credentials: admin@sayonara.com / admin123")
    } catch (error) {
      if (error.code === 11000) {
        console.log("Admin user already exists")
      } else {
        throw error
      }
    }

    // Insert sample products with Indian Rupee prices
    const sampleProducts = [
      {
        name: "Neon Horizon Jacket",
        category: "men",
        price: 10799, // ₹10,799
        stock: 25,
        status: "active",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop&crop=center&q=80",
        description: "A futuristic jacket with neon accents, perfect for the urban explorer.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "Neon Blue", "Silver"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cyber Pulse Dress",
        category: "women",
        price: 9999, // ₹9,999
        stock: 15,
        status: "active",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop&crop=center&q=80",
        description: "An elegant dress with digital patterns that shift with movement.",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Holographic", "Black", "Electric Purple"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Quantum Sneakers",
        category: "accessories",
        price: 12499, // ₹12,499
        stock: 30,
        status: "active",
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&h=600&fit=crop&crop=center&q=80",
        description: "High-tech sneakers with responsive cushioning and adaptive fit.",
        sizes: ["7", "8", "9", "10", "11"],
        colors: ["White/Neon", "All Black", "Holographic"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Digital Wave Hoodie",
        category: "men",
        price: 6699, // ₹6,699
        stock: 20,
        status: "active",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop&crop=center&q=80",
        description: "Premium streetwear hoodie with digital wave patterns.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "Navy", "Charcoal"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Holographic Mini Dress",
        category: "women",
        price: 7499, // ₹7,499
        stock: 12,
        status: "active",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop&crop=center&q=80",
        description: "Stunning mini dress with holographic finish.",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Holographic", "Silver", "Rose Gold"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cyber Smart Watch",
        category: "accessories",
        price: 24999, // ₹24,999
        stock: 8,
        status: "active",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=600&fit=crop&crop=center&q=80",
        description: "Advanced smartwatch with holographic display.",
        sizes: ["One Size"],
        colors: ["Black", "Silver", "Rose Gold"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    // Clear existing products and insert new ones
    await db.collection("products").deleteMany({})
    await db.collection("products").insertMany(sampleProducts)
    console.log(`Inserted ${sampleProducts.length} sample products with Indian Rupee pricing`)

    console.log("Database initialization completed successfully!")
    console.log("All prices are now in Indian Rupees (₹)")
  } catch (error) {
    console.error("Database initialization failed:", error)
  } finally {
    await client.close()
  }
}

// Run the initialization
initializeDatabase()
