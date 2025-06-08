import { MongoClient } from "mongodb"

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://haha:PqPmBm6G179V1HJT@cluster0.6caidgm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const MONGODB_DB = process.env.MONGODB_DB || "yashoda"

// Connection cache
let cachedClient: MongoClient | null = null
let cachedDb: any = null

export async function connectToDatabase() {
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

      cachedClient = new MongoClient(MONGODB_URI, options)
      console.log("Connecting to MongoDB Atlas...")
      await cachedClient.connect()
      console.log("Connected to MongoDB Atlas successfully")
    }

    // Get the database
    const db = cachedClient.db(MONGODB_DB)
    cachedDb = db

    return { client: cachedClient, db }
  } catch (error) {
    console.error("MongoDB Atlas connection error:", error)
    throw new Error("Failed to connect to MongoDB Atlas. Please check your connection string and network.")
  }
}
