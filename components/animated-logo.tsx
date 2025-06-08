"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface AnimatedLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  showTagline?: boolean
  className?: string
}

export function AnimatedLogo({ size = "md", showTagline = false, className = "" }: AnimatedLogoProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl md:text-4xl",
    xl: "text-4xl md:text-6xl",
  }

  const taglineSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  }

  if (!mounted) {
    return <div className={`${sizeClasses[size]} font-bold text-white ${className}`}>YASHODA</div>
  }

  return (
    <motion.div
      className={`flex flex-col items-center ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Main Logo */}
      <motion.div
        className={`${sizeClasses[size]} font-black tracking-wider relative`}
        style={{
          fontFamily: "'Inter', sans-serif",
          textShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
        }}
      >
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 blur-lg opacity-50"
          animate={{
            background: [
              "linear-gradient(45deg, #ff0080, #ff8c00, #40e0d0, #9370db, #ff1493)",
              "linear-gradient(45deg, #ff8c00, #40e0d0, #9370db, #ff1493, #ff0080)",
              "linear-gradient(45deg, #40e0d0, #9370db, #ff1493, #ff0080, #ff8c00)",
              "linear-gradient(45deg, #9370db, #ff1493, #ff0080, #ff8c00, #40e0d0)",
              "linear-gradient(45deg, #ff1493, #ff0080, #ff8c00, #40e0d0, #9370db)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Main text with animated gradient */}
        <motion.span
          className="relative z-10 bg-clip-text text-transparent"
          animate={{
            backgroundImage: [
              "linear-gradient(45deg, #ff0080, #ff8c00, #40e0d0, #9370db, #ff1493, #00ff7f)",
              "linear-gradient(45deg, #ff8c00, #40e0d0, #9370db, #ff1493, #00ff7f, #ff0080)",
              "linear-gradient(45deg, #40e0d0, #9370db, #ff1493, #00ff7f, #ff0080, #ff8c00)",
              "linear-gradient(45deg, #9370db, #ff1493, #00ff7f, #ff0080, #ff8c00, #40e0d0)",
              "linear-gradient(45deg, #ff1493, #00ff7f, #ff0080, #ff8c00, #40e0d0, #9370db)",
              "linear-gradient(45deg, #00ff7f, #ff0080, #ff8c00, #40e0d0, #9370db, #ff1493)",
            ],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            backgroundSize: "300% 300%",
          }}
        >
          YASHODA
        </motion.span>

        {/* Individual letter animations */}
        <motion.div className="absolute inset-0 flex justify-center items-center">
          {["Y", "A", "S", "H", "O", "D", "A"].map((letter, index) => (
            <motion.span
              key={index}
              className="inline-block"
              animate={{
                y: [0, -5, 0],
                rotateY: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Tagline */}
      {showTagline && (
        <motion.div
          className={`${taglineSizes[size]} mt-2 text-center opacity-80`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.span
            className="bg-clip-text text-transparent font-medium tracking-wide"
            animate={{
              backgroundImage: [
                "linear-gradient(90deg, #ff0080, #40e0d0, #9370db)",
                "linear-gradient(90deg, #40e0d0, #9370db, #ff0080)",
                "linear-gradient(90deg, #9370db, #ff0080, #40e0d0)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            Your All-Season Hyper Online Digital Apparel
          </motion.span>
        </motion.div>
      )}

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: `hsl(${(i * 60) % 360}, 70%, 60%)`,
              left: `${20 + i * 10}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [-10, -20, -10],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
