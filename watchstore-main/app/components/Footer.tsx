import Link from "next/link";
import { PHONE_DISPLAY, PHONE_TEL, waLink } from "../lib/store";

const h = "text-sm font-semibold text-white";
const l = "inline-flex min-h-9 items-center hover:text-white";

export default function Footer() {
  return (
    <footer className="on-dark mt-auto bg-night text-neutral-400">
      <div className="mx-auto grid max-w-[1320px] gap-8 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:gap-10 md:px-8 md:py-16">
        <div>
          <p className="font-display text-xl font-semibold tracking-[0.12em] text-white">FK COLLECTION</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">Stylish watches and gift sets with rings and bracelets, delivered across Pakistan.</p>
        </div>
        <div>
          <p className={h}>Shop</p>
          <ul className="mt-2 text-sm">
            <li><Link className={l} href="/shop/watches">Shop Watches</Link></li>
            <li><Link className={l} href="/shop/accessories">Shop Accessories</Link></li>
            <li><Link className={l} href="/wishlist">Wishlist</Link></li>
            <li><Link className={l} href="/cart">Cart</Link></li>
          </ul>
        </div>
        <div>
          <p className={h}>Support</p>
          <ul className="mt-2 text-sm">
            <li><Link className={l} href="/faq">FAQ</Link></li>
            <li><Link className={l} href="/faq#delivery">Delivery information</Link></li>
            <li><Link className={l} href="/faq#returns">Returns policy</Link></li>
            <li><Link className={l} href="/about">About us</Link></li>
          </ul>
        </div>
        <div>
          <p className={h}>Contact</p>
          <ul className="mt-2 text-sm">
            <li><a className={l} href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp: {PHONE_DISPLAY}</a></li>
            <li><a className={l} href={`tel:${PHONE_TEL}`}>Call: {PHONE_DISPLAY}</a></li>
            <li className="flex min-h-9 items-center">Swat, Pakistan</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-3 px-5 py-5 text-xs md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} FK Collection. All rights reserved.</p>
          <ul className="flex flex-wrap gap-2" aria-label="Accepted payment methods">
            {["Cash on Delivery", "Easypaisa", "JazzCash"].map((m) => <li key={m} className="rounded border border-white/20 px-2 py-0.5">{m}</li>)}
          </ul>
        </div>
      </div>
    </footer>
  );
}
