"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ProductCard } from "./product-card"
type Product = Record<string, unknown> & {
  _id?: string
  id?: string
  name: string
  price: number
  image: string
  category: string
}

let productCache: Product[] | null = null
let productRequest: Promise<Product[]> | null = null

async function loadProducts(signal: AbortSignal) {
  if (productCache) return productCache
  if (!productRequest) {
    productRequest = fetch("/api/products?limit=4", {
      signal,
      headers: { Accept: "application/json" },
      cache: "force-cache",
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Product API unavailable")
        const data = await response.json()
        return Array.isArray(data) ? data : []
      })
      .catch(async (error) => {
        if (error instanceof DOMException && error.name === "AbortError") throw error
        const response = await fetch("/api/products/demo?limit=4", {
          signal,
          headers: { Accept: "application/json" },
          cache: "force-cache",
        })
        const data = await response.json()
        return Array.isArray(data) ? data : []
      })
  }

  const products = await productRequest
  productCache = products
  return products
}

export function TrendingProducts() {
  const [products, setProducts] = useState<Product[]>(productCache ?? [])
  const [isLoading, setIsLoading] = useState(!productCache)

  useEffect(() => {
    const controller = new AbortController()

    loadProducts(controller.signal)
      .then((nextProducts) => {
        if (!controller.signal.aborted) setProducts(nextProducts)
      })
      .catch((error) => {
        if (!(error instanceof DOMException && error.name === "AbortError") && !controller.signal.aborted) {
          setProducts([])
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false)
      })

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
      {products.map((product) => {
        const id = String(product._id ?? product.id ?? "")
        return <ProductCard key={id} product={{ ...product, id }} />
      })}
    </motion.div>
  )
}
