import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://your-connection-string"
const MONGODB_DB = process.env.MONGODB_DB || "sayonara"

async function updateProductImages() {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db(MONGODB_DB)

    // Updated products with high-quality images
    const updatedProducts = [
      {
        name: "Neon Horizon Jacket",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop&crop=center&q=80",
        category: "men",
        price: 129.99,
        stock: 25,
        status: "active",
        description: "A futuristic jacket with neon accents, perfect for the urban explorer.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "Neon Blue", "Silver"],
      },
      {
        name: "Cyber Pulse Dress",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop&crop=center&q=80",
        category: "women",
        price: 119.99,
        stock: 15,
        status: "active",
        description: "An elegant dress with digital patterns that shift with movement.",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Holographic", "Black", "Electric Purple"],
      },
      {
        name: "Quantum Sneakers",
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&h=600&fit=crop&crop=center&q=80",
        category: "accessories",
        price: 149.99,
        stock: 30,
        status: "active",
        description: "High-tech sneakers with responsive cushioning and adaptive fit.",
        sizes: ["7", "8", "9", "10", "11"],
        colors: ["White/Neon", "All Black", "Holographic"],
      },
      {
        name: "Digital Wave Hoodie",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop&crop=center&q=80",
        category: "men",
        price: 79.99,
        stock: 20,
        status: "active",
        description: "Premium streetwear hoodie with digital wave patterns.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "Navy", "Charcoal"],
      },
      {
        name: "Holographic Mini Dress",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop&crop=center&q=80",
        category: "women",
        price: 89.99,
        stock: 12,
        status: "active",
        description: "Stunning mini dress with holographic finish.",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Holographic", "Silver", "Rose Gold"],
      },
      {
        name: "Cyber Smart Watch",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=600&fit=crop&crop=center&q=80",
        category: "accessories",
        price: 299.99,
        stock: 8,
        status: "active",
        description: "Advanced smartwatch with holographic display.",
        sizes: ["One Size"],
        colors: ["Black", "Silver", "Rose Gold"],
      },
    ]

    // Clear existing products and insert new ones
    await db.collection("products").deleteMany({})
    console.log("Cleared existing products")

    await db.collection("products").insertMany(
      updatedProducts.map((product) => ({
        ...product,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    )

    console.log("Updated products with high-quality images")
    console.log(`Inserted ${updatedProducts.length} products`)
  } catch (error) {
    console.error("Database update failed:", error)
  } finally {
    await client.close()
  }
}

// Run the update
updateProductImages()
