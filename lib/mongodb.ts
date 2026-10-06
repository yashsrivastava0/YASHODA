import { MongoClient } from "mongodb"

// Connection cache
let cachedClient: MongoClient | null = null
let cachedDb: any = null

export async function connectToDatabase() {
  const mongodbUri = process.env.MONGODB_URI
  const mongodbDb = process.env.MONGODB_DB

  if (!mongodbUri || !mongodbDb) {
    throw new Error("MONGODB_URI and MONGODB_DB must be configured")
  }

  // If we have a cached connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  try {
    // If no cached connection, create a new one
    if (!cachedClient) {
      const options = {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      }

      cachedClient = new MongoClient(mongodbUri, options)
      console.log("Connecting to MongoDB Atlas...")
      await cachedClient.connect()
      console.log("Connected to MongoDB Atlas successfully")
    }

    // Get the database
    const db = cachedClient.db(mongodbDb)
    cachedDb = db

    return { client: cachedClient, db }
  } catch (error) {
    console.error("MongoDB Atlas connection error:", error)
    throw new Error("Failed to connect to MongoDB Atlas. Please check your connection string and network.")
  }
}
