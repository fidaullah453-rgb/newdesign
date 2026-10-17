import type { Metadata } from "next";
import FaqExplorer from "../components/FaqExplorer";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about ordering, cash on delivery, delivery charges, returns and support at FK Collection.",
  alternates: { canonical: "/faq" },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-8 md:py-16">
      <h1 className="font-display text-3xl md:text-5xl">Frequently Asked Questions</h1>
      <p className="mb-8 mt-3 text-muted">Everything about ordering, delivery and returns.</p>
      <FaqExplorer />
    </div>
  );
}
