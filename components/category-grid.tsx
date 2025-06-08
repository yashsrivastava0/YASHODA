"use client"

import { motion } from "framer-motion"
import { CategoryPreview } from "./category-preview"

const categories = [
  {
    id: "fashion",
    title: "FASHION",
    imageUrl: "/placeholder.svg?height=600&width=400",
    href: "/categories/fashion",
  },
  {
    id: "electronics",
    title: "ELECTRONICS",
    imageUrl: "/placeholder.svg?height=600&width=400",
    href: "/categories/electronics",
  },
  {
    id: "home-decor",
    title: "HOME DECOR",
    imageUrl: "/placeholder.svg?height=600&width=400",
    href: "/categories/home-decor",
  },
  {
    id: "skincare",
    title: "SKINCARE",
    imageUrl: "/placeholder.svg?height=600&width=400",
    href: "/categories/skincare",
  },
]

export function CategoryGrid() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {categories.map((category) => (
        <CategoryPreview key={category.id} title={category.title} imageUrl={category.imageUrl} href={category.href} />
      ))}
    </motion.div>
  )
}
