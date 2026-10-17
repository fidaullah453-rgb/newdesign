import { products } from "../data/products";

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  images?: string[];
  description: string;
  features: string[];
  /** Optional. Defaults to "watches". Set to "accessories" for standalone accessories. */
  category?: "watches" | "accessories";
}
export type CartItem = Product & { qty: number };

export const catalog: Product[] = products;

export const CART_KEY = "fk_cart";
export const WISH_KEY = "fk_wish";
export const SYNC_EVENT = "fk-sync";

/** Same rule the checkout has always used: free when subtotal is above the minimum. */
export const FREE_DELIVERY_MIN = 5000;
export const DELIVERY_FEE = 199;

export const PHONE_DISPLAY = "0309 9956578";
export const PHONE_TEL = "+923099956578";
export const WHATSAPP_NUMBER = "923099956578";
export const waLink = (msg?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${msg ? `?text=${encodeURIComponent(msg)}` : ""}`;

export const pkr = (n: number) => "Rs. " + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const discountPct = (p: Pick<Product, "price" | "oldPrice">) =>
  p.oldPrice && p.oldPrice > p.price ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;

export const categoryOf = (p: Product) => p.category ?? "watches";
export const isGiftSet = (p: Product) => /ring|bracelet/i.test(p.name);

export const totals = (items: CartItem[]) => {
  const subtotal = items.reduce((s, c) => s + c.price * c.qty, 0);
  const delivery = items.length === 0 ? 0 : subtotal > FREE_DELIVERY_MIN ? 0 : DELIVERY_FEE;
  return { subtotal, delivery, total: subtotal + delivery, count: items.reduce((s, c) => s + c.qty, 0) };
};

export const readJSON = <T,>(key: string, fallback: T): T => {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
};
