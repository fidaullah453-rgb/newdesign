"use client";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "../lib/CartContext";
import { DELIVERY_FEE, FREE_DELIVERY_MIN, pkr, totals } from "../lib/store";
import { TrashIcon } from "./Icons";
import Stepper from "./Stepper";

export function CartEmpty({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="px-6 py-16 text-center">
      <p className="font-display text-2xl">Your cart is empty</p>
      <p className="mt-2 text-sm text-muted">Add a watch or gift set and it will appear here.</p>
      <Link href="/shop/watches" onClick={onNavigate} className="mt-6 inline-flex min-h-12 items-center rounded-md bg-gold px-8 text-sm font-semibold uppercase tracking-wide text-ink hover:brightness-95">Shop Watches</Link>
    </div>
  );
}

export function CartItems({ onNavigate }: { onNavigate?: () => void }) {
  const { items, setQty, remove } = useStore();
  return (
    <ul className="divide-y divide-line">
      {items.map((c) => (
        <li key={c.id} className="flex gap-4 py-5">
          <Link href={`/product/${c.id}`} onClick={onNavigate} className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md bg-ivory">
            <Image src={c.image} alt={c.name} fill sizes="80px" className="object-cover" />
          </Link>
          <div className="flex min-w-0 flex-1 flex-col">
            <Link href={`/product/${c.id}`} onClick={onNavigate} className="line-clamp-2 text-sm font-medium leading-snug">{c.name}</Link>
            <p className="mt-1 text-sm text-muted">{pkr(c.price)} each</p>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3">
              <Stepper qty={c.qty} name={c.name} onChange={(q) => setQty(c.id, q)} />
              <p className="text-base font-semibold">{pkr(c.price * c.qty)}</p>
            </div>
            <button onClick={() => remove(c.id)} className="mt-2 inline-flex min-h-9 items-center gap-1 self-start text-xs text-muted underline hover:text-ink">
              <TrashIcon width={15} height={15} />Remove<span className="sr-only"> {c.name}</span>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function CartTotals() {
  const { items } = useStore();
  const { subtotal, delivery, total } = totals(items);
  const toFree = FREE_DELIVERY_MIN + 1 - subtotal;
  return (
    <div>
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd>{pkr(subtotal)}</dd></div>
        <div className="flex justify-between"><dt className="text-muted">Delivery</dt><dd>{delivery === 0 ? "Free" : pkr(delivery)}</dd></div>
        <div className="flex justify-between border-t border-line pt-3 text-base font-semibold"><dt>Total payable</dt><dd>{pkr(total)}</dd></div>
      </dl>
      <p className="mt-3 text-xs text-muted">
        {delivery === 0
          ? `Free delivery applied (orders above ${pkr(FREE_DELIVERY_MIN)}).`
          : `Delivery is ${pkr(DELIVERY_FEE)}. Add ${pkr(toFree)} more to get free delivery.`}
      </p>
    </div>
  );
}
