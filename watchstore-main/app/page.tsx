import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import Benefits from "./components/Benefits";
import ReviewsSection from "./components/ReviewsSection";
import StorySection from "./components/StorySection";
import { CashIcon, ReturnIcon, TruckIcon } from "./components/Icons";
import { catalog } from "./lib/store";

const heroPerks = [
  { Icon: CashIcon, text: "Cash on Delivery", href: "/faq" },
  { Icon: TruckIcon, text: "Delivery Information", href: "/faq#delivery" },
  { Icon: ReturnIcon, text: "Easy Returns", href: "/faq#returns" },
];

export default function Home() {
  return (
    <>
      <section className="bg-ivory md:bg-[linear-gradient(to_right,#f7f5f0_50%,#101010_50%)]">
        <div className="mx-auto grid max-w-[1320px] md:min-h-[480px] md:grid-cols-2 lg:min-h-[560px]">
          {/* Image first on phones, right side on desktop */}
          <div className="relative order-1 aspect-[6/5] bg-night md:order-2 md:aspect-auto">
            <Image src="/hero-mobile.jpg" alt="Gold FK Collection watches on black velvet" fill sizes="100vw" loading="eager" fetchPriority="high" className="object-cover md:hidden" />
            <Image src="/hero-desktop.jpg" alt="" fill sizes="(min-width:1320px) 660px, 50vw" loading="eager" fetchPriority="high" className="hidden object-cover md:block" />
            <div aria-hidden className="absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-ivory to-transparent md:block" />
          </div>
          <div className="order-2 flex flex-col justify-center px-5 py-9 md:order-1 md:px-10 md:py-14 lg:px-16">
            <h1 className="font-display text-[2rem] leading-[1.1] md:text-5xl lg:text-6xl">Luxury in Every Detail</h1>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted md:text-base">Discover stylish watches and accessories for every occasion.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <Link href="/shop/watches" className="inline-flex min-h-12 items-center justify-center rounded-md bg-night px-9 text-sm font-semibold tracking-wide text-white hover:bg-black">SHOP WATCHES</Link>
              <Link href="/shop/accessories" className="inline-flex min-h-11 items-center justify-center border-b border-gold-ink text-sm font-medium text-gold-ink sm:justify-start">Explore Accessories</Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 text-xs text-ink/80">
              {heroPerks.map(({ Icon, text, href }) => (
                <li key={text}><Link href={href} className="inline-flex min-h-9 items-center gap-2 hover:underline"><Icon width={18} height={18} className="text-gold-ink" />{text}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-4 py-14 md:px-8 md:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl md:text-4xl">Our Best Sellers</h2>
            <p className="mt-2 text-sm text-muted">Customer favorites from our collection.</p>
          </div>
          <Link href="/shop/watches" className="inline-flex min-h-11 shrink-0 items-center border-b border-gold-ink text-sm font-medium text-gold-ink">View All</Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 min-[1200px]:grid-cols-4">
          {catalog.map((p, i) => <ProductCard key={p.id} p={p} priority={i < 2} />)}
        </div>
      </section>

      <ReviewsSection />
      <Benefits />
      <StorySection />
    </>
  );
}
