"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ProductCard } from "./product-card"

export function TrendingProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products?limit=4", {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        })

        if (!response.ok) throw new Error("Product API unavailable")
        const data = await response.json()
        setProducts(Array.isArray(data) ? data : [])
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return

        try {
          const response = await fetch("/api/products/demo?limit=4", {
            signal: controller.signal,
            headers: { Accept: "application/json" },
          })
          const data = await response.json()
          setProducts(Array.isArray(data) ? data : [])
        } catch (fallbackError) {
          if (!(fallbackError instanceof DOMException && fallbackError.name === "AbortError")) {
            setProducts([])
          }
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    fetchProducts()
    return () => controller.abort()
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-lg bg-gray-800 animate-pulse h-[350px]"></div>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={{ ...product, id: product._id }} />
      ))}
    </motion.div>
  )
}
