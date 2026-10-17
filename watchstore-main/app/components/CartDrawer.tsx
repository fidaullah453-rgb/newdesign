"use client";
import Link from "next/link";
import { useStore } from "../lib/CartContext";
import Panel from "./Panel";
import { CartEmpty, CartItems, CartTotals } from "./CartLines";

export default function CartDrawer() {
  const { items, drawerOpen, closeDrawer } = useStore();
  return (
    <Panel open={drawerOpen} onClose={closeDrawer} side="right" label="Your cart">
      {items.length === 0 ? <CartEmpty onNavigate={closeDrawer} /> : (
        <div className="flex min-h-full flex-col px-5">
          <div className="flex-1"><CartItems onNavigate={closeDrawer} /></div>
          <div className="sticky bottom-0 -mx-5 border-t border-line bg-white px-5 py-4">
            <CartTotals />
            <Link href="/checkout" onClick={closeDrawer} className="mt-4 flex min-h-12 items-center justify-center rounded-md bg-night text-sm font-semibold uppercase tracking-wide text-white hover:bg-black">Proceed to Checkout</Link>
            <Link href="/cart" onClick={closeDrawer} className="mt-2 flex min-h-11 items-center justify-center text-sm underline">View full cart</Link>
          </div>
        </div>
      )}
    </Panel>
  );
}
