"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface CategoryPreviewProps {
  title: string
  imageUrl: string
  href: string
}

export function CategoryPreview({ title, imageUrl, href }: CategoryPreviewProps) {
  // Define category-specific high-quality images
  const getCategoryImage = (title: string) => {
    switch (title.toLowerCase()) {
      case "fashion":
        return "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop&crop=center&q=80"
      case "electronics":
        return "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=800&fit=crop&crop=center&q=80"
      case "home decor":
      case "home-decor":
        return "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=800&fit=crop&crop=center&q=80"
      case "skincare":
        return "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&h=800&fit=crop&crop=center&q=80"
      default:
        return imageUrl
    }
  }

  const finalImageUrl = getCategoryImage(title)

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg h-[400px] card-hover"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03 }}
    >
      <Link href={href} className="block h-full">
        <Image
          src={finalImageUrl || "/placeholder.svg"}
          alt={`${title} category`}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          priority={false}
          onError={(e) => {
            console.error(`Failed to load image for ${title}:`, finalImageUrl)
            // Fallback to placeholder
            e.currentTarget.src = "/placeholder.svg?height=400&width=300"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6">
          <h3 className="text-2xl font-bold text-white">{title}</h3>
          <p className="text-white/80 mt-2">Explore Collection</p>
        </div>
      </Link>
    </motion.div>
  )
}
