"use client";
import { useEffect, useState } from "react";
import Stars from "./Stars";
import { readJSON } from "../lib/store";

type Rev = { name: string; city: string; days: string; rating: number; text: string };

export default function ProductReviews({ productId }: { productId: number }) {
  const key = `fk_reviews_${productId}`;
  const [reviews, setReviews] = useState<Rev[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [err, setErr] = useState("");
  const [form, setForm] = useState({ name: "", city: "", rating: 5, text: "" });

  useEffect(() => { setReviews(readJSON<Rev[]>(key, [])); }, [key]);

  const submit = () => {
    if (!form.name.trim() || !form.text.trim()) return setErr("Please enter your name and a review.");
    const next = [{ name: form.name.trim(), city: form.city.trim() || "Pakistan", days: "Just now", rating: form.rating, text: form.text.trim() }, ...reviews];
    setReviews(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
    setForm({ name: "", city: "", rating: 5, text: "" });
    setErr(""); setShowForm(false);
  };

  const avg = reviews.length ? reviews.reduce((a, b) => a + b.rating, 0) / reviews.length : 0;
  const input = "w-full rounded-md border border-line bg-white px-3 py-3 text-base";

  return (
    <section aria-labelledby="reviews-h" className="border-t border-line pt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="reviews-h" className="font-display text-2xl">Customer Reviews</h2>
          {reviews.length > 0 && <p className="mt-1 flex items-center gap-2 text-sm"><Stars value={Math.round(avg)} /> {avg.toFixed(1)} · {reviews.length} {reviews.length === 1 ? "review" : "reviews"}</p>}
        </div>
        <button onClick={() => setShowForm(!showForm)} aria-expanded={showForm} className="min-h-11 rounded-md border border-ink px-5 text-sm font-semibold">{showForm ? "Close" : "Write a review"}</button>
      </div>

      {showForm && (
        <div className="mt-5 space-y-3 rounded-lg border border-line bg-ivory p-4">
          <input aria-label="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className={input} />
          <input aria-label="Your city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City (optional)" className={input} />
          <div role="radiogroup" aria-label="Rating" className="flex">
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} role="radio" aria-checked={form.rating === s} aria-label={`${s} star${s > 1 ? "s" : ""}`} onClick={() => setForm({ ...form, rating: s })}
                className={`flex h-11 w-11 items-center justify-center text-xl ${s <= form.rating ? "text-gold" : "text-line"}`}>★</button>
            ))}
          </div>
          <textarea aria-label="Your review" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} placeholder="Share your experience" rows={4} className={input} />
          {err && <p role="alert" className="text-sm text-sale">{err}</p>}
          <button onClick={submit} className="min-h-12 w-full rounded-md bg-night text-sm font-semibold text-white">Submit review</button>
          <p className="text-xs text-muted">Reviews are saved on this device.</p>
        </div>
      )}

      {reviews.length === 0 ? (
        <p className="mt-5 text-sm text-muted">No reviews yet. Be the first to share your experience.</p>
      ) : (
        <ul className="mt-5 space-y-4">
          {reviews.map((r, i) => (
            <li key={i} className="rounded-lg border border-line p-4">
              <Stars value={r.rating} />
              <p className="mt-2 text-sm leading-relaxed">“{r.text}”</p>
              <p className="mt-2 text-xs text-muted">{r.name} · {r.city} · {r.days}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
