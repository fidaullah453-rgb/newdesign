export default function Accordion({ items }: { items: { id?: string; q: string; a: React.ReactNode }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map(({ id, q, a }) => (
        <details key={q} id={id} className="group scroll-mt-24">
          <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-3 text-[15px] font-medium">
            {q}
            <svg viewBox="0 0 24 24" width="18" height="18" className="shrink-0 text-gold-ink" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M5 12h14" /><path d="M12 5v14" className="origin-center transition-transform group-open:scale-y-0" />
            </svg>
          </summary>
          <div className="pb-5 pr-8 text-sm leading-relaxed text-muted">{a}</div>
        </details>
      ))}
    </div>
  );
}
