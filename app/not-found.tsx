import Link from "next/link"
import { ArrowLeft, Compass } from "lucide-react"

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-24">
      <section className="flex max-w-lg flex-col items-center text-center">
        <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Compass aria-hidden="true" className="size-8" />
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">404</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">This page moved on.</h1>
        <p className="mt-4 text-muted-foreground">
          The page you are looking for does not exist or is no longer available. Explore the latest from YASHODA instead.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to home
        </Link>
      </section>
    </main>
  )
}
