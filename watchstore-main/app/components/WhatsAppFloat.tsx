"use client";
import { usePathname } from "next/navigation";
import { waLink } from "../lib/store";
import { WhatsAppIcon } from "./Icons";

const MESSAGE = "Salam FK Collection! Mujhe watch order karni hai. Please details dein.";

export default function WhatsAppFloat() {
  const path = usePathname();
  // Lift it above the sticky buy bar (product) and the order button area (checkout) on phones
  const lifted = path.startsWith("/product/") || path === "/checkout";
  return (
    <a href={waLink(MESSAGE)} target="_blank" rel="noopener noreferrer" aria-label="Chat with FK Collection on WhatsApp"
      className={`fixed right-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:brightness-95 md:bottom-6 md:right-6 md:h-14 md:w-14 ${lifted ? "bottom-24" : "bottom-5"}`}>
      <WhatsAppIcon width={28} height={28} />
    </a>
  );
}
