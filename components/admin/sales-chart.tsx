"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SalesChart() {
  // Mock sales data
  const salesData = [
    { month: "Jan", sales: 12000 },
    { month: "Feb", sales: 15000 },
    { month: "Mar", sales: 18000 },
    { month: "Apr", sales: 22000 },
    { month: "May", sales: 25000 },
    { month: "Jun", sales: 28000 },
  ]

  const maxSales = Math.max(...salesData.map((d) => d.sales))

  return (
    <Card className="bg-black/50 backdrop-blur-sm border-gray-800">
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {salesData.map((data) => (
            <div key={data.month} className="flex items-center gap-4">
              <div className="w-12 text-sm text-gray-400">{data.month}</div>
              <div className="flex-1 bg-gray-800 rounded-full h-6 relative overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all duration-500"
                  style={{
                    width: `${(data.sales / maxSales) * 100}%`,
                  }}
                />
              </div>
              <div className="w-20 text-sm font-medium text-right">${data.sales.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
