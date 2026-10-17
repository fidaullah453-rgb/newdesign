import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "FK Collection is a Swat-based store for stylish watches and accessories with gift-ready presentation, delivered across Pakistan.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return (
    <>
      <section className="bg-ivory">
        <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-5 py-14 md:grid-cols-2 md:gap-16 md:px-8 md:py-24">
          <div>
            <h1 className="font-display text-4xl leading-tight md:text-6xl">From Swat’s Heart to Every Favourite Wrist</h1>
            <p className="mt-6 max-w-lg leading-relaxed text-muted">FK Collection brings together stylish watches and accessories for customers who appreciate thoughtful design, practical value, and gift-ready presentation.</p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-beige md:max-h-[560px]">
            <Image src="/watch1-2.jpg" alt="A FK Collection watch set in its zipped gift case" fill sizes="(min-width:768px) 45vw, 100vw" className="object-cover" loading="eager" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-14 md:py-20">
        <h2 className="font-display text-3xl">Why we started</h2>
        <p className="mt-4 leading-relaxed text-muted">FK Collection started with a simple idea: a good-looking watch should not cost a fortune. We are based in Swat and put each deal together as a ready-to-gift set, so it arrives looking right.</p>
        <h2 className="mt-12 font-display text-3xl">What we sell</h2>
        <p className="mt-4 leading-relaxed text-muted">Watches, and gift sets that pair a watch with rings and a bracelet. Every product page shows the price, what is included and the delivery and return terms before you order.</p>
        <h2 className="mt-12 font-display text-3xl">How we work with you</h2>
        <p className="mt-4 leading-relaxed text-muted">You order without creating an account, and pay by Cash on Delivery, Easypaisa or JazzCash. We confirm every order with you on WhatsApp, and we offer a 7-day return.</p>
      </section>

      <section className="on-dark bg-night text-white">
        <div className="mx-auto max-w-[1320px] px-5 py-12 md:px-8 md:py-16">
          <div className="relative aspect-[1600/685] overflow-hidden rounded-xl">
            <Image src="/banner.jpeg" alt="FK Collection logo with gold watches on black velvet" fill sizes="(min-width:1320px) 1280px, 100vw" className="object-cover" loading="lazy" />
          </div>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-2xl md:text-3xl">Ready to find yours?</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/shop/watches" className="inline-flex min-h-12 items-center rounded-md bg-gold px-8 text-sm font-semibold uppercase tracking-wide text-ink">Shop Collection</Link>
              <Link href="/contact" className="inline-flex min-h-12 items-center rounded-md border border-white/40 px-8 text-sm font-semibold uppercase tracking-wide">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
