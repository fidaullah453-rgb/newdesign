import { MinusIcon, PlusIcon } from "./Icons";

export default function Stepper({ qty, name, onChange }: { qty: number; name: string; onChange: (q: number) => void }) {
  const b = "flex h-11 w-11 items-center justify-center hover:bg-ivory disabled:opacity-40";
  return (
    <div className="inline-flex items-center rounded-md border border-line" role="group" aria-label={`Quantity for ${name}`}>
      <button onClick={() => onChange(qty - 1)} disabled={qty <= 1} aria-label="Decrease quantity" className={b}><MinusIcon width={18} height={18} /></button>
      <span className="min-w-8 text-center text-sm font-medium" aria-live="polite">{qty}</span>
      <button onClick={() => onChange(qty + 1)} aria-label="Increase quantity" className={b}><PlusIcon width={18} height={18} /></button>
    </div>
  );
}
