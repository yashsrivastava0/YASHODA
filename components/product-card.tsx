"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
}

interface ProductCardProps {
  product: Product
}

// Format price in Indian Rupees
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="bg-black/50 backdrop-blur-sm rounded-lg overflow-hidden card-hover border border-gray-800"
      variants={item}
    >
      <Link href={`/product/${product.id}`} className="block relative h-[250px]">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          priority={false}
          onError={(e) => {
            console.error(`Failed to load product image:`, product.image)
            e.currentTarget.src = "/placeholder.svg?height=250&width=300"
          }}
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-medium mb-1">{product.name}</h3>
        <p className="text-xl font-bold mb-4">{formatPrice(product.price)}</p>
        <Button
          onClick={() => addToCart(product)}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </div>
    </motion.div>
  )
}
