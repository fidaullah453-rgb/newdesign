import Link from "next/link";
import { reviews } from "../data/reviews";
import Stars from "./Stars";

export default function ReviewsSection() {
  return (
    <section className="bg-ivory py-14 md:py-20">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <h2 className="text-center font-display text-3xl md:text-4xl">What Our Customers Say</h2>
        {reviews.length === 0 ? (
          <div className="mx-auto mt-8 max-w-md rounded-lg border border-line bg-white p-8 text-center">
            <p className="font-display text-xl">No reviews yet</p>
            <p className="mt-2 text-sm text-muted">Bought from us? Open your product and be the first to leave a review.</p>
            <Link href="/shop/watches" className="mt-5 inline-flex min-h-11 items-center rounded-md bg-gold px-6 text-sm font-semibold text-ink">Shop Watches</Link>
          </div>
        ) : (
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <li key={i} className="flex flex-col rounded-lg border border-line bg-white p-6">
                {r.rating ? <Stars value={r.rating} /> : null}
                <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed">“{r.text}”</blockquote>
                <footer className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                  <span className="font-medium">{r.name}</span>
                  {r.city && <span className="text-muted">{r.city}</span>}
                  {r.date && <span className="text-muted">{r.date}</span>}
                  {r.verified && <span className="rounded bg-success px-2 py-0.5 text-xs font-medium text-green-900">Verified purchase</span>}
                </footer>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
