import Image from "next/image";
import Link from "next/link";

export default function StorySection() {
  return (
    <section className="bg-ivory py-14 md:py-20">
      <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-5 md:grid-cols-2 md:gap-16 md:px-8">
        <div className="md:max-w-[520px]">
          <h2 className="font-display text-3xl leading-tight md:text-5xl">From Swat’s Heart to Every Favourite Wrist</h2>
          <p className="mt-5 leading-relaxed text-muted">
            FK Collection brings together stylish watches and accessories for customers who appreciate thoughtful design, practical value, and gift-ready presentation.
          </p>
          <Link href="/about" className="mt-6 inline-flex min-h-11 items-center border-b border-gold-ink text-sm font-medium text-gold-ink">Learn more about us</Link>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-beige md:max-h-[560px]">
          <Image src="/watch2.jpg" alt="A FK Collection watch set in its gift box, held in hand" fill sizes="(min-width:768px) 45vw, 100vw" className="object-cover" loading="lazy" />
        </div>
      </div>
    </section>
  );
}
