import type { Metadata } from "next";
import Link from "next/link";
import { PHONE_DISPLAY, PHONE_TEL, waLink } from "../lib/store";
import { ChatIcon, PhoneIcon, PinIcon } from "../components/Icons";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact FK Collection on WhatsApp or by phone. Based in Swat, delivering across Pakistan.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  const card = "rounded-lg border border-line p-6";
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-8 md:py-16">
      <h1 className="font-display text-3xl md:text-5xl">Contact Us</h1>
      <p className="mt-3 max-w-xl text-muted">The quickest way to reach us is WhatsApp. Tell us what you need and, for an existing order, the name and phone number you used.</p>
      <a href={waLink("Salam FK Collection! I need some help.")} target="_blank" rel="noopener noreferrer"
        className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-md bg-gold px-8 text-sm font-semibold uppercase tracking-wide text-ink hover:brightness-95"><ChatIcon width={20} height={20} />Message us on WhatsApp</a>
      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        <div className={card}><ChatIcon className="text-gold-ink" /><h2 className="mt-3 font-semibold">WhatsApp</h2>
          <a className="mt-1 inline-block min-h-9 text-sm underline" href={waLink()} target="_blank" rel="noopener noreferrer">{PHONE_DISPLAY}</a></div>
        <div className={card}><PhoneIcon className="text-gold-ink" /><h2 className="mt-3 font-semibold">Phone</h2>
          <a className="mt-1 inline-block min-h-9 text-sm underline" href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a></div>
        <div className={card}><PinIcon className="text-gold-ink" /><h2 className="mt-3 font-semibold">Location</h2>
          <p className="mt-1 text-sm text-muted">Swat, Pakistan. We deliver across Pakistan.</p></div>
      </div>
      <p className="mt-8 text-sm text-muted">Orders, delivery questions and returns are all handled on WhatsApp. See our <Link href="/faq" className="text-gold-ink underline">FAQ</Link> for quick answers.</p>
    </div>
  );
}
