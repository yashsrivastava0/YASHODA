"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const resetTime = new Date()
      resetTime.setHours(24, 0, 0, 0) // Next midnight

      const difference = resetTime.getTime() - now.getTime()

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ hours, minutes, seconds })
      } else {
        setTimeLeft({ hours: 24, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (time: number) => time.toString().padStart(2, "0")

  return (
    <motion.div
      className="flex items-center gap-2 bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30 rounded-lg px-4 py-2"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        className="text-red-400 text-lg"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
      >
        🔥
      </motion.span>
      <span className="text-white font-medium">Sale ends in:</span>
      <div className="flex items-center gap-1 font-mono font-bold text-lg">
        <motion.span
          className="bg-red-600/30 px-2 py-1 rounded text-red-300"
          key={timeLeft.hours}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {formatTime(timeLeft.hours)}
        </motion.span>
        <span className="text-red-400">:</span>
        <motion.span
          className="bg-red-600/30 px-2 py-1 rounded text-red-300"
          key={timeLeft.minutes}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {formatTime(timeLeft.minutes)}
        </motion.span>
        <span className="text-red-400">:</span>
        <motion.span
          className="bg-red-600/30 px-2 py-1 rounded text-red-300"
          key={timeLeft.seconds}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {formatTime(timeLeft.seconds)}
        </motion.span>
      </div>
    </motion.div>
  )
}
