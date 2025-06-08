// Simple local storage database alternative
interface User {
  id: string
  name: string
  email: string
  password: string
  role: string
  createdAt: string
}

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  description: string
  sizes: string[]
  colors: string[]
}

export class LocalStorageDB {
  private static instance: LocalStorageDB

  static getInstance(): LocalStorageDB {
    if (!LocalStorageDB.instance) {
      LocalStorageDB.instance = new LocalStorageDB()
    }
    return LocalStorageDB.instance
  }

  // Initialize with sample data
  init() {
    if (typeof window === "undefined") return

    // Initialize users if not exists
    if (!localStorage.getItem("users")) {
      const sampleUsers: User[] = [
        {
          id: "1",
          name: "Admin User",
          email: "admin@sayonara.com",
          password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qK", // admin123
          role: "admin",
          createdAt: new Date().toISOString(),
        },
      ]
      localStorage.setItem("users", JSON.stringify(sampleUsers))
    }

    // Initialize products if not exists
    if (!localStorage.getItem("products")) {
      const sampleProducts: Product[] = [
        {
          id: "w1",
          name: "Cyber Pulse Dress",
          price: 9999,
          image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop&crop=center&q=80",
          category: "women",
          description: "An elegant dress with digital patterns that shift with movement.",
          sizes: ["XS", "S", "M", "L"],
          colors: ["Holographic", "Black", "Electric Purple"],
        },
        // Add more products as needed
      ]
      localStorage.setItem("products", JSON.stringify(sampleProducts))
    }
  }

  // User operations
  async createUser(userData: Omit<User, "id" | "createdAt">): Promise<User> {
    if (typeof window === "undefined") throw new Error("Not in browser environment")

    const users = this.getUsers()
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))
    return newUser
  }

  async findUserByEmail(email: string): Promise<User | null> {
    if (typeof window === "undefined") return null

    const users = this.getUsers()
    return users.find((user) => user.email.toLowerCase() === email.toLowerCase()) || null
  }

  private getUsers(): User[] {
    if (typeof window === "undefined") return []

    const users = localStorage.getItem("users")
    return users ? JSON.parse(users) : []
  }

  // Product operations
  async getProducts(category?: string): Promise<Product[]> {
    if (typeof window === "undefined") return []

    const products = this.getProductsFromStorage()
    return category ? products.filter((p) => p.category === category) : products
  }

  private getProductsFromStorage(): Product[] {
    if (typeof window === "undefined") return []

    const products = localStorage.getItem("products")
    return products ? JSON.parse(products) : []
  }
}
