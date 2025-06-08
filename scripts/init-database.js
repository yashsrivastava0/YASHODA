import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://your-connection-string"
const MONGODB_DB = process.env.MONGODB_DB || "sayonara"

async function initializeDatabase() {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

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

    // Insert sample admin user
    const adminUser = {
      name: "Admin User",
      email: "admin@sayonara.com",
      password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // admin123
      role: "admin",
      createdAt: new Date(),
    }

    try {
      await db.collection("users").insertOne(adminUser)
      console.log("Admin user created")
    } catch (error) {
      if (error.code === 11000) {
        console.log("Admin user already exists")
      } else {
        throw error
      }
    }

    // Insert sample products
    const sampleProducts = [
      {
        name: "Neon Horizon Jacket",
        category: "men",
        price: 129.99,
        stock: 25,
        status: "active",
        image: "/placeholder.svg?height=400&width=300",
        description: "A futuristic jacket with neon accents, perfect for the urban explorer.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "Blue", "Silver"],
        createdAt: new Date(),
      },
      {
        name: "Cyber Pulse Dress",
        category: "women",
        price: 119.99,
        stock: 15,
        status: "active",
        image: "/placeholder.svg?height=400&width=300",
        description: "An elegant dress with digital patterns that shift with movement.",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Purple", "Black", "Silver"],
        createdAt: new Date(),
      },
      {
        name: "Quantum Sneakers",
        category: "accessories",
        price: 149.99,
        stock: 30,
        status: "active",
        image: "/placeholder.svg?height=400&width=300",
        description: "High-tech sneakers with responsive cushioning and adaptive fit.",
        sizes: ["7", "8", "9", "10", "11"],
        colors: ["White", "Black", "Neon"],
        createdAt: new Date(),
      },
    ]

    try {
      await db.collection("products").insertMany(sampleProducts)
      console.log("Sample products inserted")
    } catch (error) {
      console.log("Sample products may already exist")
    }

    console.log("Database initialization completed successfully!")
  } catch (error) {
    console.error("Database initialization failed:", error)
  } finally {
    await client.close()
  }
}

// Run the initialization
initializeDatabase()
