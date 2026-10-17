"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useStore } from "../lib/CartContext";
import { BagIcon, HeartIcon, MenuIcon, SearchIcon } from "./Icons";
import Panel from "./Panel";
import { PHONE_DISPLAY, waLink } from "../lib/store";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/shop/watches", label: "Shop Watches" },
  { href: "/shop/accessories", label: "Shop Accessories" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const { count, wish, openDrawer } = useStore();
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const onCartPage = path === "/cart" || path === "/checkout";
  const iconBtn = "relative flex h-11 w-11 items-center justify-center rounded-md hover:bg-ivory";

  const cart = (
    <>
      <BagIcon />
      {count > 0 && (
        <span className="absolute right-1 top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-night px-1 text-[11px] font-semibold text-white">{count}</span>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="mx-auto grid h-16 max-w-[1320px] grid-cols-[1fr_auto_1fr] items-center px-2 md:grid-cols-[auto_1fr_auto] md:px-6">
        <button onClick={() => setMenu(true)} aria-label="Open menu" className={`${iconBtn} md:hidden`}><MenuIcon /></button>

        <Link href="/" className="flex items-center gap-2 md:col-start-1 md:row-start-1" aria-label="FK Collection home">
          <Image src="/logo.png" alt="" width={36} height={36} className="h-9 w-9 object-contain" />
          <span className="font-display text-[17px] font-semibold tracking-[0.12em] md:text-lg">FK COLLECTION</span>
        </Link>

        <nav aria-label="Main" className="hidden justify-center gap-8 md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={path === n.href ? "page" : undefined}
              className={`border-b-2 py-1 text-sm ${path === n.href ? "border-gold font-medium" : "border-transparent text-ink/80 hover:text-ink"}`}>{n.label}</Link>
          ))}
        </nav>

        <div className="flex items-center justify-end">
          <Link href="/search" aria-label="Search" className={iconBtn}><SearchIcon /></Link>
          <Link href="/wishlist" aria-label={`Wishlist, ${wish.length} items`} className={`${iconBtn} hidden md:flex`}><HeartIcon /></Link>
          {onCartPage
            ? <Link href="/cart" aria-label={`Cart, ${count} items`} className={iconBtn}>{cart}</Link>
            : <button onClick={openDrawer} aria-label={`Open cart, ${count} items`} className={iconBtn}>{cart}</button>}
        </div>
      </div>

      <Panel open={menu} onClose={() => setMenu(false)} side="left" label="Menu">
        <nav aria-label="Mobile" className="flex flex-col p-3">
          {[...NAV, { href: "/wishlist", label: "Wishlist" }, { href: "/faq", label: "FAQ" }].map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setMenu(false)}
              className={`flex min-h-12 items-center rounded-md px-3 text-base ${path === n.href ? "bg-ivory font-medium" : ""}`}>{n.label}</Link>
          ))}
        </nav>
        <div className="m-5 rounded-lg border border-line bg-ivory p-4 text-sm">
          <p className="font-medium">Need help ordering?</p>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="mt-1 block text-gold-ink underline">WhatsApp {PHONE_DISPLAY}</a>
        </div>
      </Panel>
    </header>
  );
}
