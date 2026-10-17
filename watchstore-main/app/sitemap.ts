import type { MetadataRoute } from "next";
import { products } from "./data/products";
import { SITE } from "./lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/shop/watches", "/shop/accessories", "/about", "/faq", "/contact"];
  return [
    { url: SITE, changeFrequency: "weekly", priority: 1 },
    ...pages.map(p => ({ url: `${SITE}${p}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...products.map(p => ({ url: `${SITE}/product/${p.id}`, changeFrequency: "weekly" as const, priority: 0.8 })),
  ];
}
