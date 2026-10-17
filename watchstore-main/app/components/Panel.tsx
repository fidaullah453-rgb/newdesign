"use client";
import { useEffect, useRef } from "react";
import { CloseIcon } from "./Icons";

type Props = {
  open: boolean;
  onClose: () => void;
  side: "left" | "right" | "bottom";
  label: string;
  children: React.ReactNode;
};

/** Accessible overlay: Esc to close, focus trap, scroll lock, focus returns to the trigger. */
export default function Panel({ open, onClose, side, label, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return closeRef.current();
      if (e.key !== "Tab" || !ref.current) return;
      const f = ref.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [open]);

  if (!open) return null;
  const pos =
    side === "right" ? "right-0 top-0 h-full w-full max-w-[420px] fk-right"
    : side === "left" ? "left-0 top-0 h-full w-[86%] max-w-[360px] fk-left"
    : "bottom-0 left-0 right-0 max-h-[85vh] rounded-t-xl fk-up";

  return (
    <div className="fixed inset-0 z-50">
      <div className="fk-fade absolute inset-0 bg-black/50" onClick={onClose} aria-hidden />
      <div ref={ref} role="dialog" aria-modal="true" aria-label={label} tabIndex={-1}
        className={`absolute flex flex-col bg-white outline-none ${pos}`}>
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <h2 className="font-display text-lg">{label}</h2>
          <button onClick={onClose} aria-label={`Close ${label}`} className="-mr-2 flex h-11 w-11 items-center justify-center"><CloseIcon /></button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
