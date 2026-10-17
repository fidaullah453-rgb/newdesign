import type { Metadata } from "next";
import Link from "next/link";
import ShopView from "../../components/ShopView";

export const metadata: Metadata = {
  title: "Shop Accessories",
  description: "FK Collection accessories: rings and bracelets, available in our watch gift sets.",
  alternates: { canonical: "/shop/accessories" },
};

export default function Page() {
  return (
    <ShopView category="accessories" title="Shop Accessories" intro="Rings, bracelets and more to go with your watch."
      emptyCategory={
        <div className="rounded-lg border border-line bg-ivory p-10 text-center">
          <p className="font-display text-2xl">Standalone accessories are coming soon</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">For now, our rings and bracelets come together with a watch in our gift sets.</p>
          <Link href="/shop/watches" className="mt-6 inline-flex min-h-12 items-center rounded-md bg-gold px-8 text-sm font-semibold uppercase tracking-wide text-ink">Shop Watches</Link>
        </div>
      } />
  );
}
