import type { Metadata } from "next";
import ShopView from "../components/ShopView";

export const metadata: Metadata = { title: "Search", robots: { index: false, follow: true }, alternates: { canonical: "/search" } };

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const { q } = await searchParams;
  return <ShopView category="all" searchMode initialQuery={Array.isArray(q) ? q[0] : q ?? ""} title="Search" intro="Search our watches and gift sets by name or what’s included." />;
}
