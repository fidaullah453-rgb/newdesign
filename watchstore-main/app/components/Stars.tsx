import { StarIcon } from "./Icons";

export default function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5 text-gold" role="img" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon key={n} width={size} height={size} className={n <= value ? "" : "text-line"} />
      ))}
    </span>
  );
}
