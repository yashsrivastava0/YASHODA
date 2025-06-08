"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

export function HeroParallax() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Parallax effect values
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {/* Background layer */}
      <motion.div className="absolute inset-0 w-full h-full" style={{ y: bgY }}>
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop&crop=center&q=80"
          alt="Futuristic fashion store interior"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      {/* Floating elements for futuristic effect */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-500/20 blur-xl"
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 8,
          ease: "easeInOut",
        }}
        style={{ opacity }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full bg-indigo-500/20 blur-xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 10,
          ease: "easeInOut",
        }}
        style={{ opacity }}
      />

      <motion.div
        className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-pink-500/20 blur-xl"
        animate={{
          x: [0, 15, 0],
          y: [0, 15, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 7,
          ease: "easeInOut",
        }}
        style={{ opacity }}
      />
    </div>
  )
}
