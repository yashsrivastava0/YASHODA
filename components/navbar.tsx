"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ShoppingBag, Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/hooks/use-cart"
import { UserMenu } from "@/components/auth/user-menu"
import { AnimatedLogo } from "@/components/animated-logo"

const navItems = [{ name: "Fashion", href: "/categories/fashion" }, { name: "Electronics", href: "/categories/electronics" }, { name: "Home", href: "/categories/home-decor" }, { name: "Skincare", href: "/categories/skincare" }]
export function Navbar() {
  const [open, setOpen] = useState(false); const { totalItems } = useCart()
  return <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl"><div className="container flex h-16 items-center justify-between px-6 lg:px-10"><Link href="/" aria-label="Yashoda home"><AnimatedLogo size="md" /></Link><div className="hidden items-center gap-7 md:flex">{navItems.map(item => <Link key={item.href} href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{item.name}</Link>)}</div><div className="flex items-center gap-1"><div className="relative hidden lg:block"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input aria-label="Search products" placeholder="Search the edit" className="h-9 w-44 rounded-full bg-card pl-9 text-sm" /></div><Link href="/cart" aria-label={`Shopping bag, ${totalItems} items`}><Button variant="ghost" size="icon" className="relative rounded-full"><ShoppingBag />{totalItems > 0 && <span className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">{totalItems}</span>}</Button></Link><UserMenu /><Button variant="ghost" size="icon" className="rounded-full md:hidden" onClick={() => setOpen(v => !v)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</Button></div></div><AnimatePresence>{open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-border bg-background md:hidden"><div className="flex flex-col gap-1 px-6 py-4">{navItems.map(item => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-muted-foreground hover:bg-muted hover:text-foreground">{item.name}</Link>)}</div></motion.div>}</AnimatePresence></nav>
}
