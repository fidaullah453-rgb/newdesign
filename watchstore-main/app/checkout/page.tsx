"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useStore } from "../lib/CartContext";
import { PHONE_DISPLAY, pkr, totals, waLink, type CartItem } from "../lib/store";
import Stepper from "../components/Stepper";
import { CheckIcon, TrashIcon } from "../components/Icons";

type Errors = Partial<Record<"name" | "phone" | "city" | "address" | "tid", string>>;
type Placed = { items: CartItem[]; subtotal: number; delivery: number; total: number; name: string; phone: string; city: string; payment: string; tid: string };

const SHEET_URL = "https://script.google.com/macros/s/AKfycbwP9BI3Jd04FYyfDxSvvJp04uyNOBoHLA4BNadmmIP5peBD7WJcPSMdE_e4xDFHWaTgcA/exec";
const PAY_NUMBER = "03415417696";
const PAY_NAME = "Fida Ullah";

export default function CheckoutPage() {
  const { items: cart, setQty, remove, clear } = useStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [payment, setPayment] = useState("COD");
  const [tid, setTid] = useState("");
  const [placed, setPlaced] = useState<Placed | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const { subtotal, delivery, total, count } = totals(cart);
  const needsTid = payment === "Easypaisa" || payment === "JazzCash";

  const validate = () => {
    const e: Errors = {};
    const p = phone.replace(/[\s-]/g, "");
    if (!/^(03\d{9}|\+923\d{9}|923\d{9})$/.test(p)) e.phone = "Enter a valid mobile number, e.g. 0300 1234567";
    if (name.trim().length < 3 || !/[A-Za-z\u0600-\u06FF]/.test(name)) e.name = "Please enter your full name";
    if (city.trim().length < 3) e.city = "Please enter your city";
    if (address.trim().length < 10) e.address = "Please enter your complete address (house no, street, area)";
    if (needsTid && !/^[A-Za-z0-9]{8,20}$/.test(tid.trim())) e.tid = "Enter the transaction ID from your payment SMS (8-20 letters/numbers)";
    setErrors(e);
    if (Object.keys(e).length) {
      const first = (["phone", "name", "city", "address", "tid"] as const).find((k) => e[k]);
      setTimeout(() => (document.getElementById(`f-${first}`) as HTMLElement | null)?.focus(), 0);
    }
    return Object.keys(e).length === 0;
  };

  const orderNow = () => {
    if (sending || cart.length === 0) return;
    if (!validate()) return;

    const itemsText = cart.map((c) => c.name + " x" + c.qty + " = Rs." + c.price * c.qty).join(", ");
    const orderData = {
      name, phone, city,
      address: postal.trim() ? `${address}, Postal code: ${postal.trim()}` : address,
      watch: itemsText, price: subtotal,
      qty: count, delivery, total,
      payment, tid: tid || "COD",
      date: new Date().toLocaleString(),
    };

    setSending(true); // blocks double submits
    setPlaced({ items: cart, subtotal, delivery, total, name, phone, city, payment, tid });
    clear();
    try { fetch(SHEET_URL, { method: "POST", mode: "no-cors", body: JSON.stringify(orderData) }); } catch {}
    window.scrollTo({ top: 0 });
  };

  const input = (k: keyof Errors) =>
    `w-full rounded-md border bg-white px-3.5 py-3 text-base outline-none focus:border-ink focus:ring-2 focus:ring-ink/10 ${errors[k] ? "border-sale" : "border-line"}`;
  const Err = ({ k }: { k: keyof Errors }) => (errors[k] ? <p id={`e-${k}`} role="alert" className="mt-1 text-sm text-sale">{errors[k]}</p> : null);
  const aria = (k: keyof Errors) => ({ id: `f-${k}`, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `e-${k}` : undefined });
  const label = "mb-1.5 block text-sm font-medium";

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12 md:py-16">
        <div className="rounded-xl border border-line bg-white p-6 text-center shadow-sm md:p-10" role="status">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success text-green-800"><CheckIcon width={28} height={28} /></span>
          <h1 className="mt-4 font-display text-3xl">Order received</h1>
          <p className="mt-2 text-sm text-muted">Thank you, {placed.name}. We will contact you on WhatsApp to confirm your order.</p>
          <dl className="mt-6 space-y-2 border-t border-line pt-5 text-left text-sm">
            {placed.items.map((c) => <div key={c.id} className="flex justify-between gap-4"><dt>{c.name} × {c.qty}</dt><dd className="shrink-0">{pkr(c.price * c.qty)}</dd></div>)}
            <div className="flex justify-between text-muted"><dt>Subtotal</dt><dd>{pkr(placed.subtotal)}</dd></div>
            <div className="flex justify-between text-muted"><dt>Delivery</dt><dd>{placed.delivery === 0 ? "Free" : pkr(placed.delivery)}</dd></div>
            <div className="flex justify-between border-t border-line pt-3 text-base font-semibold"><dt>Total</dt><dd>{pkr(placed.total)}</dd></div>
          </dl>
          <dl className="mt-5 space-y-1 border-t border-line pt-5 text-left text-sm text-muted">
            <div className="flex justify-between"><dt>Payment</dt><dd className="text-ink">{placed.payment === "COD" ? "Cash on Delivery" : `${placed.payment}${placed.tid ? ` (TID ${placed.tid})` : ""}`}</dd></div>
            <div className="flex justify-between"><dt>Phone</dt><dd className="text-ink">{placed.phone}</dd></div>
            <div className="flex justify-between"><dt>City</dt><dd className="text-ink">{placed.city}</dd></div>
          </dl>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="flex min-h-12 flex-1 items-center justify-center rounded-md bg-night text-sm font-semibold uppercase tracking-wide text-white">Continue Shopping</Link>
            <a href={waLink("Salam! I just placed an order on FK Collection.")} target="_blank" rel="noopener noreferrer" className="flex min-h-12 flex-1 items-center justify-center rounded-md bg-gold text-sm font-semibold uppercase tracking-wide text-ink">WhatsApp us</a>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="font-display text-3xl">Your cart is empty</h1>
        <p className="mt-2 text-sm text-muted">Add a product to continue to checkout.</p>
        <Link href="/shop/watches" className="mt-6 inline-flex min-h-12 items-center rounded-md bg-gold px-8 text-sm font-semibold uppercase tracking-wide text-ink">Shop Watches</Link>
      </div>
    );
  }

  const pay = [
    { v: "COD", t: "Cash on Delivery", d: "Pay in cash when your order arrives" },
    { v: "Easypaisa", t: "Easypaisa", d: `Send to ${PAY_NUMBER}` },
    { v: "JazzCash", t: "JazzCash", d: `Send to ${PAY_NUMBER}` },
  ];

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-8 md:px-8 md:py-12">
      <h1 className="font-display text-3xl md:text-4xl">Checkout</h1>
      <div className="mt-6 flex flex-col gap-8 lg:grid lg:grid-cols-[1fr_400px] lg:gap-12">
        {/* Summary first on phones, right column on desktop */}
        <aside className="order-1 h-fit rounded-lg border border-line bg-ivory p-5 lg:order-2 lg:sticky lg:top-24">
          <h2 className="mb-2 font-display text-xl">Order summary ({count} {count === 1 ? "item" : "items"})</h2>
          <ul className="divide-y divide-line">
            {cart.map((c) => (
              <li key={c.id} className="flex gap-3 py-4">
                <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-md bg-white"><Image src={c.image} alt={c.name} fill sizes="64px" className="object-cover" /></div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-medium">{c.name}</p>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                    <Stepper qty={c.qty} name={c.name} onChange={(q) => setQty(c.id, q)} />
                    <span className="text-sm font-semibold">{pkr(c.price * c.qty)}</span>
                  </div>
                  <button onClick={() => remove(c.id)} className="mt-1 inline-flex min-h-9 items-center gap-1 text-xs text-muted underline"><TrashIcon width={14} height={14} />Remove<span className="sr-only"> {c.name}</span></button>
                </div>
              </li>
            ))}
          </ul>
          <dl className="mt-3 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd>{pkr(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Delivery</dt><dd>{delivery === 0 ? "Free" : pkr(delivery)}</dd></div>
            <div className="flex justify-between border-t border-line pt-3 text-lg font-semibold"><dt>Total</dt><dd>{pkr(total)}</dd></div>
          </dl>
        </aside>

        <div ref={formRef} className="order-2 lg:order-1">
          <section>
            <h2 className="mb-3 font-display text-xl">Contact</h2>
            <label htmlFor="f-phone" className={label}>Phone number</label>
            <input {...aria("phone")} type="tel" inputMode="tel" autoComplete="tel" maxLength={16} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0300 1234567" className={input("phone")} />
            <Err k="phone" />
          </section>

          <section className="mt-8">
            <h2 className="mb-3 font-display text-xl">Delivery address</h2>
            <label htmlFor="f-name" className={label}>Full name</label>
            <input {...aria("name")} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={input("name")} />
            <Err k="name" />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="f-city" className={label}>City</label>
                <input {...aria("city")} autoComplete="address-level2" value={city} onChange={(e) => setCity(e.target.value)} className={input("city")} />
                <Err k="city" />
              </div>
              <div>
                <label htmlFor="f-postal" className={label}>Postal code <span className="text-muted">(optional)</span></label>
                <input id="f-postal" autoComplete="postal-code" inputMode="numeric" value={postal} onChange={(e) => setPostal(e.target.value)} className="w-full rounded-md border border-line bg-white px-3.5 py-3 text-base outline-none focus:border-ink focus:ring-2 focus:ring-ink/10" />
              </div>
            </div>
            <label htmlFor="f-address" className={`${label} mt-4`}>Complete address</label>
            <textarea {...aria("address")} autoComplete="street-address" rows={3} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House no, street, area" className={input("address")} />
            <Err k="address" />
          </section>

          <section className="mt-8">
            <h2 className="mb-3 font-display text-xl">Payment method</h2>
            <div role="radiogroup" aria-label="Payment method" className="space-y-3">
              {pay.map((o) => (
                <label key={o.v} className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-lg border p-4 ${payment === o.v ? "border-night bg-ivory" : "border-line"}`}>
                  <input type="radio" name="payment" value={o.v} checked={payment === o.v} onChange={() => setPayment(o.v)} className="h-5 w-5 accent-black" />
                  <span><span className="block text-sm font-medium">{o.t}</span><span className="block text-xs text-muted">{o.d}</span></span>
                </label>
              ))}
            </div>
            {needsTid && (
              <div className="mt-3 rounded-lg border border-gold bg-ivory p-4">
                <p className="text-sm font-medium">Send {pkr(total)} to {PAY_NUMBER}</p>
                <p className="text-xs text-muted">Account: {PAY_NAME} ({payment})</p>
                <label htmlFor="f-tid" className={`${label} mt-3`}>Transaction ID</label>
                <input {...aria("tid")} value={tid} onChange={(e) => setTid(e.target.value)} placeholder="From your payment SMS" className={input("tid")} />
                <Err k="tid" />
              </div>
            )}
          </section>

          {Object.keys(errors).length > 0 && <p role="alert" className="mt-6 text-sm text-sale">Please fix the highlighted fields above.</p>}
          <button disabled={sending} onClick={orderNow} className="mt-6 min-h-14 w-full rounded-md bg-gold text-base font-semibold text-ink hover:brightness-95 disabled:opacity-60">
            {sending ? "Placing order…" : `Place order · ${pkr(total)}`}
          </button>
          <p className="mt-3 text-center text-xs text-muted">We will contact you on WhatsApp to confirm. Questions? {PHONE_DISPLAY}</p>
          <Link href="/cart" className="mt-2 flex min-h-11 items-center justify-center text-sm underline">← Back to cart</Link>
        </div>
      </div>
    </div>
  );
}
