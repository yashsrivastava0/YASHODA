import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyAuth } from "./lib/auth"

// Paths that require authentication
const protectedPaths = ["/account", "/checkout", "/admin"]

// Paths that require admin role
const adminPaths = ["/admin"]

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Check if path is protected
  const isProtectedPath = protectedPaths.some((pp) => path.startsWith(pp))
  const isAdminPath = adminPaths.some((ap) => path.startsWith(ap))

  if (!isProtectedPath) {
    return NextResponse.next()
  }

  // Get token from cookies
  const token = request.cookies.get("token")?.value

  // If no token and path is protected, redirect to login
  if (!token) {
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", path)
    return NextResponse.redirect(url)
  }

  try {
    // Verify token and get user info
    const verifiedToken = await verifyAuth(token)

    // Check if admin path but user is not admin
    if (isAdminPath && verifiedToken.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url))
    }

    // User is authenticated and authorized
    return NextResponse.next()
  } catch (error) {
    // Token is invalid, redirect to login
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", path)
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: ["/account/:path*", "/checkout/:path*", "/admin/:path*"],
}
