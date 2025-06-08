"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/use-cart"

export default function OrderSuccessPage() {
  const router = useRouter()
  const { items } = useCart()

  // Redirect if no items were in cart (user shouldn't be here)
  useEffect(() => {
    if (items.length > 0) {
      // This is a valid order completion
      return
    }

    // Check if we have order data in session storage
    const orderData = sessionStorage.getItem("lastOrder")
    if (!orderData) {
      // No order data, redirect to home
      router.push("/")
    }
  }, [items, router])

  return (
    <div className="container mx-auto px-4 py-12 min-h-[80vh] flex items-center justify-center">
      <motion.div
        className="max-w-md w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-400 mb-8">
          Thank you for your purchase. Your order has been received and is being processed. You will receive an email
          confirmation shortly.
        </p>

        <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 mb-8">
          <p className="text-sm text-gray-400 mb-2">Order Reference</p>
          <p className="text-xl font-mono font-bold mb-4">
            #SAY
            {Math.floor(Math.random() * 1000000)
              .toString()
              .padStart(6, "0")}
          </p>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Estimated Delivery</span>
            <span>
              {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild variant="outline" className="flex-1">
            <Link href="/orders">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Track Order
            </Link>
          </Button>

          <Button
            asChild
            className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            <Link href="/categories">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
