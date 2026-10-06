import { jwtVerify } from "jose"

interface DecodedToken {
  userId: string
  email: string
  role: string
  iat: number
  exp: number
}

export async function verifyAuth(token: string): Promise<DecodedToken> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")
    const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] })

    return payload as unknown as DecodedToken
  } catch (error) {
    console.error("Auth error:", error)
    throw new Error("Invalid token")
  }
}
