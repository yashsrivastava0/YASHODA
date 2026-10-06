"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const images: Record<string, string> = {
  fashion: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=700&h=900&fit=crop&crop=center&q=85",
  electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=700&h=900&fit=crop&crop=center&q=85",
  "home decor": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&h=900&fit=crop&crop=center&q=85",
  skincare: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=700&h=900&fit=crop&crop=center&q=85",
}

export function CategoryPreview({ title, imageUrl, href }: { title: string; imageUrl: string; href: string }) {
  const image = images[title.toLowerCase()] || imageUrl || "/placeholder.svg"
  return <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -6 }} transition={{ duration: .45 }} viewport={{ once: true }} className="group relative h-[390px] overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
    <Link href={href} className="block h-full"><Image src={image} alt={`${title} collection`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" /><div className="absolute bottom-0 left-0 p-6 text-white"><p className="text-xs tracking-[.2em] text-white/70">COLLECTION</p><h3 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h3><p className="mt-2 text-sm text-white/75">Explore the edit <span aria-hidden="true">→</span></p></div></Link>
  </motion.div>
}
