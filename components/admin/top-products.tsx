"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const topProducts = [
  {
    id: "1",
    name: "Neon Horizon Jacket",
    sales: 156,
    revenue: 20244,
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "2",
    name: "Cyber Pulse Dress",
    sales: 134,
    revenue: 16066,
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "3",
    name: "Quantum Sneakers",
    sales: 98,
    revenue: 14702,
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "4",
    name: "Digital Wave Hoodie",
    sales: 87,
    revenue: 6953,
    image: "/placeholder.svg?height=50&width=50",
  },
]

export function TopProducts() {
  return (
    <Card className="bg-black/50 backdrop-blur-sm border-gray-800">
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topProducts.map((product, index) => (
            <div key={product.id} className="flex items-center gap-4 p-3 bg-gray-800/50 rounded-lg">
              <div className="flex items-center justify-center w-6 h-6 bg-purple-600/20 text-purple-400 rounded-full text-sm font-bold">
                {index + 1}
              </div>
              <div className="relative h-12 w-12 rounded overflow-hidden">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{product.name}</p>
                <p className="text-xs text-gray-400">{product.sales} sales</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm">${product.revenue.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
