"use client";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "../lib/CartContext";
import { discountPct, pkr, type Product } from "../lib/store";
import { HeartIcon } from "./Icons";

export default function ProductCard({ p, priority = false }: { p: Product; priority?: boolean }) {
  const { add, wish, toggleWish } = useStore();
  const pct = discountPct(p);
  const wished = wish.includes(p.id);
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-line bg-white">
      <div className="relative aspect-[4/5] bg-ivory">
        <Link href={`/product/${p.id}`} className="absolute inset-0" aria-label={p.name}>
          <Image src={p.image} alt={p.name} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"
            className="object-cover" loading={priority ? "eager" : "lazy"} />
        </Link>
        {pct > 0 && <span className="absolute left-2 top-2 rounded bg-sale px-2 py-1 text-xs font-semibold text-white">{pct}% OFF</span>}
        <button onClick={() => toggleWish(p.id)} aria-pressed={wished} aria-label={wished ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`}
          className={`absolute right-1 top-1 flex h-11 w-11 items-center justify-center ${wished ? "text-sale" : "text-ink"}`}>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm"><HeartIcon width={18} height={18} filled={wished} /></span>
        </button>
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <Link href={`/product/${p.id}`} className="line-clamp-2 min-h-[2.6em] text-sm font-medium leading-snug sm:text-[15px]">{p.name}</Link>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-2">
          <span className="text-base font-semibold">{pkr(p.price)}</span>
          {pct > 0 && p.oldPrice && <span className="text-xs text-muted line-through">{pkr(p.oldPrice)}</span>}
        </div>
        <button onClick={() => add(p)} className="mt-3 min-h-11 w-full rounded-md bg-gold text-xs font-semibold uppercase tracking-wide text-ink hover:brightness-95 sm:text-[13px]">Add to Cart</button>
      </div>
    </article>
  );
}
