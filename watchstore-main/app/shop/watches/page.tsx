import type { Metadata } from "next";
import ShopView from "../../components/ShopView";

export const metadata: Metadata = {
  title: "Shop Watches",
  description: "Browse FK Collection watches and watch gift sets with rings and bracelets. Cash on delivery across Pakistan.",
  alternates: { canonical: "/shop/watches" },
};

export default function Page() {
  return <ShopView category="watches" title="Shop Watches" intro="Watches and gift sets with rings and bracelets, priced in PKR with cash on delivery." />;
}
