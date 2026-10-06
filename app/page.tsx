'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Check, ChevronRight, Headphones, PackageCheck, ShieldCheck, Sparkles, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CategoryPreview } from '@/components/category-preview'
import { TrendingProducts } from '@/components/trending-products'
import { HeroParallax } from '@/components/hero-parallax'
import { CountdownTimer } from '@/components/countdown-timer'

const stats = [['50K+', 'members styling their everyday'], ['4.9/5', 'average customer rating'], ['24h', 'dispatch on in-stock orders'], ['30 day', 'easy returns, no questions']]
const benefits = [
  { icon: ShieldCheck, title: 'Verified quality', text: 'Every item is reviewed by our team before it reaches the studio.' },
  { icon: Truck, title: 'Fast, thoughtful delivery', text: 'Live order updates and protective packaging from checkout to door.' },
  { icon: Headphones, title: 'Human support', text: 'Talk to a real stylist whenever you need a second opinion.' },
]

export default function Home() {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, 90])
  return (
    <main className="overflow-hidden">
      <section className="relative isolate min-h-[min(760px,calc(100vh-4rem))] overflow-hidden border-b border-border bg-background">
        <motion.div style={{ y: heroY }} className="absolute inset-0 -z-10 opacity-55"><HeroParallax /></motion.div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,hsl(var(--background))_4%,hsl(var(--background)/.82)_35%,transparent_78%)]" />
        <div className="container relative flex min-h-[min(760px,calc(100vh-4rem))] items-center px-6 py-20 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }} className="max-w-3xl">
            <Badge variant="outline" className="mb-7 gap-2 rounded-full border-primary/35 bg-primary/10 px-4 py-2 text-primary"><Sparkles className="size-3" /> The Yashoda edit / 2026</Badge>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-[-.065em] text-foreground sm:text-7xl lg:text-[6.6rem] lg:leading-[.94]">Objects with <span className="text-primary">character.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">A considered marketplace for bold wardrobe pieces, useful objects, and the details that make your space feel like yours.</p>
            <div className="mt-9 flex flex-wrap gap-3"><Button asChild size="lg" className="rounded-full px-7"><Link href="/categories">Explore the edit <ArrowUpRight data-icon="inline-end" /></Link></Button><Button asChild variant="outline" size="lg" className="rounded-full px-7"><Link href="/categories/fashion">Shop fashion <ChevronRight data-icon="inline-end" /></Link></Button></div>
            <div className="mt-10 flex items-center gap-3 text-sm text-muted-foreground"><PackageCheck className="size-4 text-primary" /> Free delivery over ₹5,000 <span className="text-border">/</span> Secure checkout</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .2, duration: .75 }} className="absolute bottom-8 right-8 hidden w-64 rounded-2xl border border-border/70 bg-card/85 p-5 shadow-2xl backdrop-blur-xl lg:block"><p className="text-xs font-medium uppercase tracking-[.2em] text-muted-foreground">Next drop</p><p className="mt-2 text-2xl font-semibold">Studio / 04</p><p className="mt-1 text-sm text-muted-foreground">Limited pieces, made to move.</p><div className="mt-4"><CountdownTimer /></div></motion.div>
        </div>
      </section>
      <section className="border-b border-border bg-card/40"><div className="container grid grid-cols-2 divide-x divide-border px-6 py-8 lg:grid-cols-4 lg:px-10">{stats.map(([value, label]) => <div key={value} className="px-4 first:pl-0 last:pr-0 lg:px-7"><p className="text-2xl font-semibold tracking-tight">{value}</p><p className="mt-1 text-sm text-muted-foreground">{label}</p></div>)}</div></section>
      <section className="container px-6 py-24 lg:px-10"><div className="mb-10 flex items-end justify-between gap-4"><div><p className="eyebrow">Start here</p><h2 className="mt-3 text-4xl font-semibold tracking-tight">Find your next favorite.</h2></div><Button asChild variant="ghost" className="hidden rounded-full sm:flex"><Link href="/categories">View all categories <ArrowUpRight data-icon="inline-end" /></Link></Button></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"><CategoryPreview title="FASHION" imageUrl="" href="/categories/fashion" /><CategoryPreview title="ELECTRONICS" imageUrl="" href="/categories/electronics" /><CategoryPreview title="HOME DECOR" imageUrl="" href="/categories/home-decor" /><CategoryPreview title="SKINCARE" imageUrl="" href="/categories/skincare" /></div></section>
      <section className="border-y border-border bg-card/30"><div className="container px-6 py-24 lg:px-10"><div className="mb-10 flex items-end justify-between"><div><p className="eyebrow">Curated weekly</p><h2 className="mt-3 text-4xl font-semibold tracking-tight">Trending now</h2></div><Button asChild variant="outline" className="rounded-full"><Link href="/categories">See the full edit <ArrowUpRight data-icon="inline-end" /></Link></Button></div><TrendingProducts /></div></section>
      <section className="container grid gap-12 px-6 py-24 lg:grid-cols-[.8fr_1.2fr] lg:px-10"><div><p className="eyebrow">The Yashoda standard</p><h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">More intention. Less noise.</h2><p className="mt-5 max-w-md leading-7 text-muted-foreground">We make discovering great things feel calm, useful, and a little bit exciting.</p></div><div className="grid gap-4 sm:grid-cols-3">{benefits.map(({ icon: Icon, title, text }) => <motion.article whileHover={{ y: -5 }} key={title} className="rounded-2xl border border-border bg-card p-6"><Icon className="size-6 text-primary" /><h3 className="mt-6 font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></motion.article>)}</div></section>
      <section className="container px-6 pb-24 lg:px-10"><div className="relative overflow-hidden rounded-3xl bg-primary px-7 py-12 text-primary-foreground sm:px-12"><div className="relative z-10 max-w-xl"><p className="text-sm font-medium uppercase tracking-[.2em] opacity-75">Member offer</p><h2 className="mt-4 text-4xl font-semibold tracking-tight">A little something for your first order.</h2><p className="mt-4 leading-7 opacity-80">Take 15% off your first Yashoda order with code <strong>FIRSTLOOK</strong>.</p><Button asChild size="lg" variant="secondary" className="mt-8 rounded-full"><Link href="/categories">Shop the collection <Check data-icon="inline-end" /></Link></Button></div><div className="absolute -right-24 -top-24 size-80 rounded-full border-[40px] border-primary-foreground/10" /></div></section>
    </main>
  )
}
