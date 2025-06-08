"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag, Star, Users, Package, Shield, Truck, HeadphonesIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { CategoryPreview } from "@/components/category-preview"
import { TrendingProducts } from "@/components/trending-products"
import { HeroParallax } from "@/components/hero-parallax"
import { AnimatedLogo } from "@/components/animated-logo"
import { CountdownTimer } from "@/components/countdown-timer"

export default function Home() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section with Parallax */}
      <div ref={ref} className="relative h-screen overflow-hidden">
        <HeroParallax />
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10"
          style={{ opacity, scale }}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <AnimatedLogo size="xl" showTagline />
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-200"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Experience tomorrow's style today with our cutting-edge collection
          </motion.p>

          {/* Countdown Timer */}
          <motion.div
            className="mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <CountdownTimer />
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              <Link href="/categories">
                SHOP NOW <ShoppingBag className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, number: "50K+", label: "Happy Customers" },
              { icon: Package, number: "1000+", label: "Products" },
              { icon: Star, number: "4.9", label: "Rating" },
              { icon: Truck, number: "24/7", label: "Fast Delivery" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-purple-600/20 rounded-full">
                    <stat.icon className="h-8 w-8 text-purple-400" />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{stat.number}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 md:px-8 bg-black">
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            EXPLORE CATEGORIES
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <CategoryPreview title="FASHION" imageUrl="" href="/categories/fashion" />
            <CategoryPreview title="ELECTRONICS" imageUrl="" href="/categories/electronics" />
            <CategoryPreview title="HOME DECOR" imageUrl="" href="/categories/home-decor" />
            <CategoryPreview title="SKINCARE" imageUrl="" href="/categories/skincare" />
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-bold"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              TRENDING NOW
            </motion.h2>
            <motion.div initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}>
              <Button variant="ghost" asChild>
                <Link href="/categories" className="flex items-center">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
          <TrendingProducts />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 bg-black">
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            WHY CHOOSE YASHODA
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Secure Shopping",
                description: "Your data is protected with enterprise-grade security",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                description: "Free shipping on orders over ₹5,000 with express delivery",
              },
              {
                icon: HeadphonesIcon,
                title: "24/7 Support",
                description: "Round-the-clock customer support for all your needs",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center p-6 bg-gray-900/50 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-purple-600/20 rounded-full">
                    <feature.icon className="h-8 w-8 text-purple-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Limited Time Offer */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-indigo-900 to-purple-900">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.h2
                className="text-3xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                LIMITED TIME OFFER
              </motion.h2>
              <motion.p
                className="text-xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Get 30% off on our new collection. Use code YASHODA30 at checkout.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Button asChild size="lg" className="rounded-full px-8">
                  <Link href="/categories">SHOP THE COLLECTION</Link>
                </Button>
              </motion.div>
            </div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative h-[400px] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop&crop=center&q=80"
                  alt="Limited time fashion collection"
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 md:px-8 bg-black">
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            STAY IN THE LOOP
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Subscribe to get special offers, free giveaways, and exclusive deals.
          </motion.p>
          <motion.div
            className="max-w-md mx-auto flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
            />
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              Subscribe
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
