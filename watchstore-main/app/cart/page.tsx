"use client";
import Link from "next/link";
import { useStore } from "../lib/CartContext";
import { CartEmpty, CartItems, CartTotals } from "../components/CartLines";

export default function CartPage() {
  const { items } = useStore();
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 md:px-8 md:py-14">
      <h1 className="font-display text-3xl md:text-5xl">Your Cart</h1>
      {items.length === 0 ? <CartEmpty /> : (
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px] lg:gap-12">
          <div>
            <CartItems />
            <Link href="/shop/watches" className="mt-4 inline-flex min-h-11 items-center text-sm underline">← Continue Shopping</Link>
          </div>
          <aside className="h-fit rounded-lg border border-line bg-ivory p-5 lg:sticky lg:top-24">
            <h2 className="mb-4 font-display text-xl">Order summary</h2>
            <CartTotals />
            <Link href="/checkout" className="mt-5 flex min-h-12 items-center justify-center rounded-md bg-night text-sm font-semibold uppercase tracking-wide text-white hover:bg-black">Proceed to Checkout</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
