import type { Metadata } from "next"
import { CategoryGrid } from "@/components/category-grid"

export const metadata: Metadata = {
  title: "Categories | YASHODA",
  description: "Browse all categories at YASHODA - Your All-Season Hyper Online Digital Apparel",
}

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Categories</h1>
      <CategoryGrid />
    </div>
  )
}
