"use client";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "../lib/CartContext";
import { catalog, pkr } from "../lib/store";
import { TrashIcon } from "../components/Icons";

export default function WishlistPage() {
  const { wish, toggleWish, add } = useStore();
  const saved = catalog.filter((p) => wish.includes(p.id));
  return (
    <div className="mx-auto max-w-[1000px] px-4 py-10 md:px-8 md:py-14">
      <h1 className="font-display text-3xl md:text-5xl">Wishlist</h1>
      {saved.length === 0 ? (
        <div className="mt-8 rounded-lg border border-line bg-ivory p-10 text-center">
          <p className="font-display text-2xl">Nothing saved yet</p>
          <p className="mt-2 text-sm text-muted">Tap the heart on any product to keep it here.</p>
          <Link href="/shop/watches" className="mt-6 inline-flex min-h-12 items-center rounded-md bg-gold px-8 text-sm font-semibold uppercase tracking-wide text-ink">Shop Watches</Link>
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {saved.map((p) => (
            <li key={p.id} className="flex gap-4 py-5">
              <Link href={`/product/${p.id}`} className="relative h-28 w-24 shrink-0 overflow-hidden rounded-md bg-ivory"><Image src={p.image} alt={p.name} fill sizes="96px" className="object-cover" /></Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <Link href={`/product/${p.id}`} className="line-clamp-2 text-sm font-medium md:text-base">{p.name}</Link>
                <p className="mt-1 font-semibold">{pkr(p.price)}</p>
                <div className="mt-auto flex flex-wrap items-center gap-3 pt-3">
                  <button onClick={() => add(p)} className="min-h-11 rounded-md bg-gold px-5 text-xs font-semibold uppercase tracking-wide text-ink">Add to Cart</button>
                  <button onClick={() => toggleWish(p.id)} className="inline-flex min-h-11 items-center gap-1 text-sm text-muted underline"><TrashIcon width={16} height={16} />Remove</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
