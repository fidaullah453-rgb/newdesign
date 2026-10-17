"use client";
import { useEffect, useState } from "react";
import { CashIcon, ReturnIcon, TruckIcon } from "./Icons";
import { FREE_DELIVERY_MIN, pkr } from "../lib/store";

const MESSAGES = [
  { Icon: CashIcon, text: "Cash on Delivery Across Pakistan" },
  { Icon: TruckIcon, text: `Free Delivery Above ${pkr(FREE_DELIVERY_MIN)}` },
  { Icon: ReturnIcon, text: "7-Day Easy Returns" },
];

export default function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % MESSAGES.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="on-dark bg-night text-white">
      {/* Desktop: all three */}
      <ul className="mx-auto hidden h-9 max-w-[1320px] items-center justify-center gap-10 px-4 text-xs md:flex">
        {MESSAGES.map(({ Icon, text }) => (
          <li key={text} className="flex items-center gap-2"><Icon width={15} height={15} className="text-gold" />{text}</li>
        ))}
      </ul>
      {/* Mobile: one at a time */}
      <p className="flex h-8 items-center justify-center gap-2 px-4 text-[11px] md:hidden">
        {(() => { const { Icon, text } = MESSAGES[i]; return <><Icon width={14} height={14} className="text-gold" />{text}</>; })()}
      </p>
    </div>
  );
}
