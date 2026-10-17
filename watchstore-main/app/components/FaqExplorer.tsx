"use client";
import Link from "next/link";
import { useState } from "react";
import Accordion from "./Accordion";
import { DELIVERY_FEE, FREE_DELIVERY_MIN, PHONE_DISPLAY, pkr, waLink } from "../lib/store";

const wa = <a href={waLink()} target="_blank" rel="noopener noreferrer" className="text-gold-ink underline">WhatsApp {PHONE_DISPLAY}</a>;

const ITEMS = [
  { q: "How do I place an order?", t: "order checkout buy", a: <>Open a product and choose Add to Cart or Buy Now, then enter your name, phone number and delivery address at checkout. No account is needed. After you order, we contact you on WhatsApp to confirm.</> },
  { q: "Is Cash on Delivery available?", t: "cod cash payment easypaisa jazzcash", a: <>Yes, Cash on Delivery is available across Pakistan. Easypaisa and JazzCash are also accepted; you enter the transaction ID at checkout.</> },
  { id: "delivery", q: "How long does delivery take?", t: "delivery time days shipping", a: <>We do not publish a fixed delivery time. After you order we contact you on WhatsApp, and you can ask us for an estimate for your city on {wa}.</> },
  { q: "Is delivery free?", t: "free delivery shipping charge", a: <>Delivery is free on orders above {pkr(FREE_DELIVERY_MIN)}. On smaller orders a delivery charge of {pkr(DELIVERY_FEE)} applies. Your exact total is shown in the cart and at checkout.</> },
  { id: "returns", q: "What is the return policy?", t: "return refund exchange", a: <>We offer a 7-day return. Message us on WhatsApp and we will arrange it.</> },
  { q: "How do I contact customer support?", t: "contact support phone whatsapp help", a: <>The quickest way is WhatsApp: {wa}. You can also call us on the same number, or visit our <Link href="/contact" className="text-gold-ink underline">contact page</Link>.</> },
  { q: "What should I do if my order arrives damaged?", t: "damaged broken problem", a: <>Please message us on {wa} straight away with the name and phone number you used for the order, and tell us what is wrong. Your 7-day return window applies.</> },
];

export default function FaqExplorer() {
  const [q, setQ] = useState("");
  const t = q.trim().toLowerCase();
  const shown = ITEMS.filter((i) => !t || `${i.q} ${i.t}`.toLowerCase().includes(t));
  return (
    <>
      <label className="block">
        <span className="sr-only">Search questions</span>
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search questions, e.g. delivery" className="min-h-12 w-full rounded-md border border-line bg-white px-4 text-base" />
      </label>
      <div className="mt-6" aria-live="polite">
        {shown.length ? <Accordion items={shown} /> : <p className="rounded-lg bg-ivory p-8 text-center text-sm text-muted">No questions match “{q}”. Ask us directly on {wa}.</p>}
      </div>
    </>
  );
}
