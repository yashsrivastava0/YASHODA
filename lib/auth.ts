import jwt from "jsonwebtoken"

interface DecodedToken {
  userId: string
  email: string
  role: string
  iat: number
  exp: number
}

export async function verifyAuth(token: string): Promise<DecodedToken> {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as DecodedToken

    return decoded
  } catch (error) {
    console.error("Auth error:", error)
    throw new Error("Invalid token")
  }
}
