import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductGrid } from "@/components/product-grid"

interface CategoryPageProps {
  params: {
    category: string
  }
}

// Validate category and get metadata
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = params.category

  // Validate category
  const validCategories = ["fashion", "electronics", "home-decor", "skincare"]
  if (!validCategories.includes(category)) {
    return {
      title: "Category Not Found | YASHODA",
    }
  }

  // Format category name for display
  const formattedCategory = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return {
    title: `${formattedCategory} | YASHODA`,
    description: `Browse our ${formattedCategory} collection at YASHODA`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params

  // Validate category
  const validCategories = ["fashion", "electronics", "home-decor", "skincare"]
  if (!validCategories.includes(category)) {
    notFound()
  }

  // Format category name for display
  const formattedCategory = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">{formattedCategory}</h1>
      <ProductGrid category={category} />
    </div>
  )
}
