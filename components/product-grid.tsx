"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ProductCard } from "./product-card"

interface ProductGridProps {
  category: string
}

export function ProductGrid({ category }: ProductGridProps) {
  const [products, setProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Try MongoDB first, fallback to demo data
        let response = await fetch(`/api/products?category=${category}`)

        if (!response.ok) {
          // Fallback to demo data
          response = await fetch(`/api/products/demo?category=${category}`)
        }

        if (response.ok) {
          const data = await response.json()
          setProducts(data)
        } else {
          console.error("Failed to fetch products")
          setProducts([])
        }
      } catch (error) {
        console.error("Error fetching products:", error)
        // Try demo data as final fallback
        try {
          const response = await fetch(`/api/products/demo?category=${category}`)
          if (response.ok) {
            const data = await response.json()
            setProducts(data)
          }
        } catch (demoError) {
          console.error("Demo data also failed:", demoError)
          setProducts([])
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [category])

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="rounded-lg bg-gray-800 animate-pulse h-[350px]"></div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-medium">No products found</h2>
        <p className="mt-4 text-gray-400">Check back later for new arrivals</p>
      </div>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={{ ...product, id: product._id }} />
      ))}
    </motion.div>
  )
}
