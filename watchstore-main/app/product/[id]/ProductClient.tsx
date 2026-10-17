"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/app/lib/CartContext";
import { DELIVERY_FEE, FREE_DELIVERY_MIN, PHONE_DISPLAY, discountPct, isGiftSet, pkr, waLink, type Product } from "@/app/lib/store";
import Accordion from "@/app/components/Accordion";
import ProductReviews from "@/app/components/ProductReviews";
import { CashIcon, CheckIcon, HeartIcon, ReturnIcon, TruckIcon } from "@/app/components/Icons";

export default function ProductClient({ product }: { product: Product }) {
  const router = useRouter();
  const { add, wish, toggleWish } = useStore();
  const [active, setActive] = useState(0);
  const touchX = useRef(0);
  const [justAdded, setJustAdded] = useState(false);

  const gallery = (product.images?.length ? product.images : [product.image]).slice(0, 5);
  const go = (d: number) => setActive((a) => (a + d + gallery.length) % gallery.length);
  const pct = discountPct(product);
  const wished = wish.includes(product.id);

  const addToCart = () => { add(product); setJustAdded(true); setTimeout(() => setJustAdded(false), 1500); };
  // Same behaviour as before: adds one to the cart, then goes to checkout
  const buyNow = () => { add(product, { openDrawer: false }); router.push("/checkout"); };

  const faqs = [
    { q: "Is cash on delivery available?", a: "Yes. Cash on delivery is available across Pakistan. Easypaisa and JazzCash are also accepted at checkout." },
    { q: "How much is delivery?", a: `Delivery is free on orders above ${pkr(FREE_DELIVERY_MIN)}. Below that it is ${pkr(DELIVERY_FEE)}. The exact amount is shown in your cart and at checkout.` },
    { q: "What is the return policy?", a: "We offer a 7-day return. Message us on WhatsApp and we will arrange it." },
    ...(isGiftSet(product) ? [{ q: "What comes in this gift set?", a: "See the description above for exactly what is included with this set. If you want to confirm anything before ordering, message us on WhatsApp." }] : []),
  ];

  const btn = "min-h-12 flex-1 rounded-md px-6 text-sm font-semibold uppercase tracking-wide transition-colors";

  return (
    <div className="mx-auto max-w-[1320px] px-4 pb-24 pt-5 md:px-8 md:pb-16 md:pt-8">
      <nav aria-label="Breadcrumb" className="mb-5 text-xs text-muted">
        <ol className="flex flex-wrap items-center gap-x-2">
          <li><Link href="/" className="hover:underline">Home</Link></li><li aria-hidden>/</li>
          <li><Link href="/shop/watches" className="hover:underline">Shop Watches</Link></li><li aria-hidden>/</li>
          <li aria-current="page" className="text-ink">{product.name}</li>
        </ol>
      </nav>

      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="md:sticky md:top-24 md:self-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-ivory"
            onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => { const d = e.changedTouches[0].clientX - touchX.current; if (Math.abs(d) > 50 && gallery.length > 1) go(d < 0 ? 1 : -1); }}>
            <Image src={gallery[active]} alt={`${product.name}, photo ${active + 1}`} fill sizes="(min-width:768px) 50vw, 100vw" loading="eager" fetchPriority="high" className="object-cover" />
            {pct > 0 && <span className="absolute left-3 top-3 rounded bg-sale px-2.5 py-1 text-xs font-semibold text-white">{pct}% OFF</span>}
            {gallery.length > 1 && (
              <>
                <button onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl shadow">‹</button>
                <button onClick={() => go(1)} aria-label="Next photo" className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl shadow">›</button>
              </>
            )}
          </div>
          {gallery.length > 1 && (
            <ul className="mt-3 flex gap-2">
              {gallery.map((g, i) => (
                <li key={g}>
                  <button onClick={() => setActive(i)} aria-label={`Show photo ${i + 1}`} aria-current={i === active}
                    className={`relative block h-[72px] w-[60px] overflow-hidden rounded-md border-2 bg-ivory md:h-24 md:w-20 ${i === active ? "border-night" : "border-transparent opacity-70 hover:opacity-100"}`}>
                    <Image src={g} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h1 className="font-display text-3xl leading-tight md:text-4xl">{product.name}</h1>
          <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-3xl font-semibold">{pkr(product.price)}</span>
            {pct > 0 && product.oldPrice && <span className="text-lg text-muted line-through">{pkr(product.oldPrice)}</span>}
            {pct > 0 && <span className="rounded bg-sale px-2 py-0.5 text-xs font-semibold text-white">Save {pct}%</span>}
          </div>
          <p className="mt-5 leading-relaxed text-ink/80">{product.description}</p>

          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm"><CheckIcon width={18} height={18} className="shrink-0 text-gold-ink" />{f}</li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button onClick={addToCart} className={`${btn} bg-gold text-ink hover:brightness-95`}>{justAdded ? "Added ✓" : "Add to Cart"}</button>
            <button onClick={buyNow} className={`${btn} bg-night text-white hover:bg-black`}>Buy Now</button>
            <button onClick={() => toggleWish(product.id)} aria-pressed={wished} aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
              className={`flex h-12 w-12 shrink-0 items-center justify-center self-start rounded-md border border-line ${wished ? "text-sale" : ""}`}><HeartIcon filled={wished} /></button>
          </div>

          <ul className="mt-6 divide-y divide-line rounded-lg border border-line bg-ivory text-sm">
            <li className="flex gap-3 p-4"><CashIcon className="shrink-0 text-gold-ink" /><span><b className="font-medium">Cash on delivery</b> across Pakistan. Easypaisa and JazzCash also accepted.</span></li>
            <li className="flex gap-3 p-4"><TruckIcon className="shrink-0 text-gold-ink" /><span><b className="font-medium">Delivery:</b> free above {pkr(FREE_DELIVERY_MIN)}, otherwise {pkr(DELIVERY_FEE)}.</span></li>
            <li className="flex gap-3 p-4"><ReturnIcon className="shrink-0 text-gold-ink" /><span><b className="font-medium">7-day return.</b> Message us on WhatsApp and we will arrange it.</span></li>
          </ul>
          <p className="mt-3 text-sm text-muted">Questions before you order? <a href={waLink(`Salam! I have a question about: ${product.name}`)} target="_blank" rel="noopener noreferrer" className="text-gold-ink underline">WhatsApp {PHONE_DISPLAY}</a></p>

          <div className="mt-8"><h2 className="mb-3 font-display text-2xl">Frequently asked questions</h2><Accordion items={faqs} /></div>
        </div>
      </div>

      <div className="mt-14 max-w-3xl"><ProductReviews productId={product.id} /></div>

      {/* Sticky buy bar on phones */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-line bg-white px-4 py-3 md:hidden">
        <div className="mr-auto leading-tight">
          {pct > 0 && product.oldPrice && <p className="text-[11px] text-muted line-through">{pkr(product.oldPrice)}</p>}
          <p className="font-semibold">{pkr(product.price)}</p>
        </div>
        <button onClick={addToCart} className="min-h-11 rounded-md bg-gold px-5 text-sm font-semibold text-ink">{justAdded ? "Added ✓" : "Add"}</button>
        <button onClick={buyNow} className="min-h-11 rounded-md bg-night px-5 text-sm font-semibold text-white">Buy Now</button>
      </div>
    </div>
  );
}
