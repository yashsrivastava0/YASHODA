"use client"

import { motion } from "framer-motion"

interface AnimatedLogoProps { size?: "sm" | "md" | "lg" | "xl"; showTagline?: boolean; className?: string }
export function AnimatedLogo({ size = "md", showTagline = false, className = "" }: AnimatedLogoProps) {
  const sizes = { sm: "text-lg", md: "text-xl", lg: "text-3xl", xl: "text-5xl" }
  return <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }} className={`flex flex-col ${className}`}>
    <span className={`${sizes[size]} font-semibold tracking-[-.08em] text-foreground`}>YASHODA<span className="text-primary">.</span></span>
    {showTagline && <span className="mt-1 text-[9px] uppercase tracking-[.25em] text-muted-foreground">Objects with character</span>}
  </motion.div>
}
