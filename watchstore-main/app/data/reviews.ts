export interface Review {
  name: string;
  city?: string;
  text: string;
  /** 1-5. Only shown when present. */
  rating?: number;
  /** e.g. "12 Oct 2026". Only shown when present. */
  date?: string;
  /** Only set true for reviews tied to a real order. Controls the "Verified purchase" badge. */
  verified?: boolean;
}

/**
 * Homepage reviews. These four were already in the old homepage code.
 * They have no rating/date/verified data, so none is displayed.
 * Replace with real reviews, or leave the array empty to show the "no reviews yet" message.
 */
export const reviews: Review[] = [
  { name: "Ahmed Khan", city: "Lahore", text: "Watch quality zabardast hai! Original jaisi lagti hai, sab poch rahe hain kahan se li!" },
  { name: "Bilal Ahmed", city: "Karachi", text: "FK Collection best hai! 3rd watch li hai, har bar fast delivery. COD best option hai." },
  { name: "Usman Ali", city: "Islamabad", text: "Premium packaging or watch dono A1! Price ke hisab se bohat achi deal hai. Recommended!" },
  { name: "Faisal Raza", city: "Multan", text: "7 days return ka bola tha, lekin return ki zarorat hi nahi padi. Quality 10/10!" },
];
