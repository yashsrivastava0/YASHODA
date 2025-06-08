import type { Metadata } from "next"
import { ProductDetail } from "@/components/product-detail"

interface ProductPageProps {
  params: {
    id: string
  }
}

// Get product from our auto-initialized data
async function getProduct(id: string) {
  // This will be handled client-side since we're using localStorage
  // We'll return a placeholder that gets replaced by the client component
  return { id, placeholder: true }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  return {
    title: `Product | Sayonara`,
    description: "Futuristic fashion product details",
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  return <ProductDetail productId={params.id} />
}
