import type { SVGProps } from "react";

const base = (p: SVGProps<SVGSVGElement>) => ({
  viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5,
  strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true, width: 22, height: 22, ...p,
});
type P = SVGProps<SVGSVGElement>;

export const MenuIcon = (p: P) => <svg {...base(p)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
export const CloseIcon = (p: P) => <svg {...base(p)}><path d="M6 6l12 12M18 6L6 18" /></svg>;
export const SearchIcon = (p: P) => <svg {...base(p)}><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></svg>;
export const BagIcon = (p: P) => <svg {...base(p)}><path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8V6.5a3 3 0 016 0V8" /></svg>;
export const HeartIcon = ({ filled, ...p }: P & { filled?: boolean }) => (
  <svg {...base(p)} fill={filled ? "currentColor" : "none"}><path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" /></svg>
);
export const PlusIcon = (p: P) => <svg {...base(p)}><path d="M12 5v14M5 12h14" /></svg>;
export const MinusIcon = (p: P) => <svg {...base(p)}><path d="M5 12h14" /></svg>;
export const TruckIcon = (p: P) => <svg {...base(p)}><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7" /><circle cx="7.5" cy="17.5" r="1.8" /><circle cx="17.5" cy="17.5" r="1.8" /></svg>;
export const CashIcon = (p: P) => <svg {...base(p)}><rect x="3" y="6.5" width="18" height="11" rx="1.5" /><circle cx="12" cy="12" r="2.5" /></svg>;
export const ReturnIcon = (p: P) => <svg {...base(p)}><path d="M9 7L4.5 11.5 9 16" /><path d="M5 11.5h9a5 5 0 010 10h-2" transform="translate(0 -4)" /></svg>;
export const ChatIcon = (p: P) => <svg {...base(p)}><path d="M4 5h16v11H9l-5 4V5z" /></svg>;
export const CheckIcon = (p: P) => <svg {...base(p)}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>;
export const ChevronIcon = (p: P) => <svg {...base(p)}><path d="M9 6l6 6-6 6" /></svg>;
export const SlidersIcon = (p: P) => <svg {...base(p)}><path d="M4 7h10M18 7h2M4 17h2M10 17h10" /><circle cx="16" cy="7" r="2" /><circle cx="8" cy="17" r="2" /></svg>;
export const SortIcon = (p: P) => <svg {...base(p)}><path d="M8 5v14M5 16l3 3 3-3M16 19V5M13 8l3-3 3 3" /></svg>;
export const TrashIcon = (p: P) => <svg {...base(p)}><path d="M5 7h14M10 7V5h4v2M7 7l1 13h8l1-13" /></svg>;
export const PhoneIcon = (p: P) => <svg {...base(p)}><path d="M6 4h3l1.5 4-2 1.5a11 11 0 006 6L16 13.5l4 1.5v3a2 2 0 01-2 2A14 14 0 014 6a2 2 0 012-2z" /></svg>;
export const PinIcon = (p: P) => <svg {...base(p)}><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0113 0C18.5 15 12 21 12 21z" /><circle cx="12" cy="10" r="2.3" /></svg>;
export const StarIcon = (p: P) => <svg {...base(p)} fill="currentColor" strokeWidth={0}><path d="M12 3l2.7 5.7 6.3.8-4.6 4.3 1.2 6.2L12 17l-5.6 3 1.2-6.2L3 9.5l6.3-.8L12 3z" /></svg>;
export const WhatsAppIcon = (p: P) => (
  <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden width={24} height={24} {...p}>
    <path d="M19.11 17.2c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.61.13-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.13-1.13-.42-2.16-1.33-.8-.71-1.33-1.59-1.49-1.86-.16-.27-.02-.42.11-.55.11-.11.27-.32.4-.48.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.13-.61-1.47-.84-2.02-.22-.52-.44-.45-.61-.46h-.52c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.66 1.12 2.84c.13.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.57.65.21 1.25.18 1.72.11.52-.08 1.6-.65 1.83-1.29.22-.64.22-1.18.16-1.29-.06-.11-.24-.18-.51-.31zM16.03 4C9.42 4 4.04 9.37 4.04 16c0 2.11.55 4.17 1.6 5.98L4 28l6.19-1.62A11.93 11.93 0 0016.03 28c6.61 0 12-5.37 12-12s-5.39-12-12-12zm0 21.67c-1.81 0-3.58-.49-5.12-1.41l-.37-.22-3.67.96.98-3.58-.24-.37a9.68 9.68 0 01-1.51-5.15c0-5.34 4.35-9.68 9.69-9.68 5.34 0 9.68 4.34 9.68 9.68 0 5.34-4.34 9.67-9.68 9.67z" />
  </svg>
);
