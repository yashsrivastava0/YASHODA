"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, LogOut, Settings, ShoppingBag, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" asChild>
          <Link href="/login">Sign In</Link>
        </Button>
        <Button
          asChild
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
        >
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="relative">
      <Button variant="ghost" onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 px-3 py-2">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-white" />
        </div>
        <span className="hidden md:block">{user.name}</span>
        <ChevronDown className="h-4 w-4" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-64 bg-black/90 backdrop-blur-xl border border-gray-800 rounded-lg shadow-xl z-50"
            >
              <div className="p-4 border-b border-gray-800">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
                {user.role === "admin" && (
                  <span className="inline-block mt-1 px-2 py-1 text-xs bg-purple-600/20 text-purple-400 rounded">
                    Admin
                  </span>
                )}
              </div>

              <div className="p-2">
                <Link
                  href="/account"
                  className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-800/50 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-4 w-4" />
                  My Account
                </Link>

                <Link
                  href="/orders"
                  className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-800/50 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <ShoppingBag className="h-4 w-4" />
                  My Orders
                </Link>

                <Link
                  href="/settings"
                  className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-800/50 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>

                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-800/50 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
                    Admin Dashboard
                  </Link>
                )}

                <button
                  onClick={() => {
                    logout()
                    setIsOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-800/50 rounded-md transition-colors text-red-400"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
