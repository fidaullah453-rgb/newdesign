import { CashIcon, ChatIcon, ReturnIcon, TruckIcon } from "./Icons";
import { FREE_DELIVERY_MIN, DELIVERY_FEE, pkr } from "../lib/store";

const items = [
  { Icon: CashIcon, h: "Cash on Delivery", d: "Pay when your order arrives." },
  { Icon: TruckIcon, h: "Delivery Information", d: `Free above ${pkr(FREE_DELIVERY_MIN)}, otherwise ${pkr(DELIVERY_FEE)}.` },
  { Icon: ReturnIcon, h: "Returns Policy", d: "7-day returns. Message us to arrange." },
  { Icon: ChatIcon, h: "Customer Support", d: "Chat with us on WhatsApp." },
];

export default function Benefits() {
  return (
    <section aria-label="Why shop with us" className="border-y border-line bg-white">
      <ul className="mx-auto grid max-w-[1320px] grid-cols-2 gap-x-4 gap-y-8 px-5 py-10 md:grid-cols-4 md:gap-8 md:px-8 md:py-12">
        {items.map(({ Icon, h, d }) => (
          <li key={h} className="flex flex-col items-center text-center">
            <Icon width={30} height={30} strokeWidth={1.2} className="text-gold" />
            <h3 className="mt-3 text-sm font-semibold">{h}</h3>
            <p className="mt-1 max-w-[200px] text-xs leading-relaxed text-muted">{d}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
