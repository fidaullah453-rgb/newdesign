"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import Panel from "./Panel";
import { SearchIcon, SlidersIcon, SortIcon } from "./Icons";
import { catalog, categoryOf, discountPct, isGiftSet, pkr, type Product } from "../lib/store";

type Sort = "featured" | "low" | "high" | "discount";
type Kind = "all" | "gift-set" | "watch";
type Band = "all" | "u3" | "m" | "o5";

const SORTS: [Sort, string][] = [["featured", "Featured"], ["low", "Price: Low to High"], ["high", "Price: High to Low"], ["discount", "Biggest discount"]];
const KINDS: [Kind, string][] = [["all", "All styles"], ["gift-set", "Gift sets (with rings & bracelet)"], ["watch", "Watches only"]];
const BANDS: [Band, string][] = [["all", "Any price"], ["u3", "Under Rs. 3,000"], ["m", "Rs. 3,000 – 5,000"], ["o5", "Over Rs. 5,000"]];
const inBand = (p: Product, b: Band) => b === "all" || (b === "u3" ? p.price < 3000 : b === "m" ? p.price >= 3000 && p.price <= 5000 : p.price > 5000);

type Props = {
  category: "watches" | "accessories" | "all";
  title: string;
  intro: string;
  initialQuery?: string;
  searchMode?: boolean;
  emptyCategory?: React.ReactNode;
};

export default function ShopView({ category, title, intro, initialQuery = "", searchMode = false, emptyCategory }: Props) {
  const [q, setQ] = useState(initialQuery);
  const [sort, setSort] = useState<Sort>("featured");
  const [kind, setKind] = useState<Kind>("all");
  const [band, setBand] = useState<Band>("all");
  const [sheet, setSheet] = useState<null | "filter" | "sort">(null);

  const pool = useMemo(() => catalog.filter((p) => category === "all" || categoryOf(p) === category), [category]);
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    const out = pool.filter((p) =>
      (!t || [p.name, p.description, ...p.features].join(" ").toLowerCase().includes(t)) &&
      (kind === "all" || (kind === "gift-set") === isGiftSet(p)) && inBand(p, band));
    if (sort === "low") out.sort((a, b) => a.price - b.price);
    if (sort === "high") out.sort((a, b) => b.price - a.price);
    if (sort === "discount") out.sort((a, b) => discountPct(b) - discountPct(a));
    return out;
  }, [pool, q, kind, band, sort]);

  const active = (kind !== "all" ? 1 : 0) + (band !== "all" ? 1 : 0);
  const reset = () => { setQ(""); setKind("all"); setBand("all"); setSort("featured"); };

  const Chips = <T extends string>({ value, opts, set, label }: { value: T; opts: [T, string][]; set: (v: T) => void; label: string }) => (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {opts.map(([v, text]) => (
        <button key={v} role="radio" aria-checked={value === v} onClick={() => set(v)}
          className={`min-h-11 rounded-md border px-4 text-sm ${value === v ? "border-night bg-night text-white" : "border-line bg-white hover:border-ink"}`}>{text}</button>
      ))}
    </div>
  );

  const field = "min-h-11 rounded-md border border-line bg-white px-3 text-base md:text-sm";

  return (
    <div className="mx-auto max-w-[1320px] px-4 py-10 md:px-8 md:py-14">
      <h1 className="font-display text-3xl md:text-5xl">{title}</h1>
      <p className="mt-2 max-w-xl text-sm text-muted md:text-base">{intro}</p>

      {pool.length === 0 && emptyCategory ? <div className="mt-10">{emptyCategory}</div> : (
        <>
          <div className="mt-7 flex flex-col gap-3 md:flex-row md:items-center">
            <label className="relative block flex-1">
              <span className="sr-only">Search products</span>
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" width={20} height={20} />
              <input type="search" value={q} onChange={(e) => setQ(e.target.value)} autoFocus={searchMode}
                placeholder="Search by name or what’s included" className={`${field} w-full pl-10 ${searchMode ? "md:min-h-14 md:text-lg" : ""}`} />
            </label>
            {/* Desktop controls */}
            <div className="hidden items-center gap-3 md:flex">
              <label className="sr-only" htmlFor="sort">Sort by</label>
              <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)} className={field}>
                {SORTS.map(([v, t]) => <option key={v} value={v}>{t}</option>)}
              </select>
            </div>
            {/* Phone controls */}
            <div className="grid grid-cols-2 gap-3 md:hidden">
              <button onClick={() => setSheet("filter")} className={`${field} flex items-center justify-center gap-2 font-medium`}><SlidersIcon width={18} height={18} />Filter{active ? ` (${active})` : ""}</button>
              <button onClick={() => setSheet("sort")} className={`${field} flex items-center justify-center gap-2 font-medium`}><SortIcon width={18} height={18} />Sort</button>
            </div>
          </div>

          <div className="mt-4 hidden flex-wrap items-center gap-x-8 gap-y-3 border-y border-line py-4 md:flex">
            <Chips label="Style" value={kind} opts={KINDS} set={setKind} />
            <Chips label="Price" value={band} opts={BANDS} set={setBand} />
          </div>

          <p className="mt-5 text-sm text-muted" aria-live="polite">{list.length} {list.length === 1 ? "product" : "products"}</p>

          {list.length === 0 ? (
            <div className="mt-6 rounded-lg border border-line bg-ivory p-10 text-center">
              <p className="font-display text-2xl">No products match</p>
              <p className="mt-2 text-sm text-muted">Try a different word or clear your filters.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button onClick={reset} className="min-h-11 rounded-md bg-gold px-6 text-sm font-semibold text-ink">Clear search and filters</button>
                {searchMode && <Link href="/shop/watches" className="inline-flex min-h-11 items-center rounded-md border border-ink px-6 text-sm font-semibold">Shop Watches</Link>}
              </div>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 min-[1200px]:grid-cols-4">
              {list.map((p, i) => <ProductCard key={p.id} p={p} priority={i < 2} />)}
            </div>
          )}
        </>
      )}

      <Panel open={sheet !== null} onClose={() => setSheet(null)} side="bottom" label={sheet === "sort" ? "Sort" : "Filter"}>
        <div className="space-y-6 p-5">
          {sheet === "sort" ? <Chips label="Sort by" value={sort} opts={SORTS} set={(v) => { setSort(v); setSheet(null); }} /> : (
            <>
              <div><p className="mb-2 text-sm font-semibold">Style</p><Chips label="Style" value={kind} opts={KINDS} set={setKind} /></div>
              <div><p className="mb-2 text-sm font-semibold">Price</p><Chips label="Price" value={band} opts={BANDS} set={setBand} /></div>
              <div className="flex gap-3">
                <button onClick={() => { setKind("all"); setBand("all"); }} className="min-h-12 flex-1 rounded-md border border-ink text-sm font-semibold">Clear</button>
                <button onClick={() => setSheet(null)} className="min-h-12 flex-1 rounded-md bg-night text-sm font-semibold text-white">Show {list.length} {list.length === 1 ? "product" : "products"}</button>
              </div>
            </>
          )}
        </div>
      </Panel>
    </div>
  );
}
