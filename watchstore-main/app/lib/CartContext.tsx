"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CART_KEY, SYNC_EVENT, WISH_KEY, readJSON, totals, type CartItem, type Product } from "./store";

type Ctx = {
  items: CartItem[];
  count: number;
  add: (p: Product, opts?: { openDrawer?: boolean }) => void;
  setQty: (id: number, qty: number) => void;
  remove: (id: number) => void;
  clear: () => void;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  wish: number[];
  toggleWish: (id: number) => void;
};

const CartCtx = createContext<Ctx | null>(null);
export const useStore = () => {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useStore must be used inside <CartProvider>");
  return c;
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wish, setWish] = useState<number[]>([]);
  const [drawerOpen, setDrawer] = useState(false);

  useEffect(() => {
    const load = () => {
      setItems(readJSON<CartItem[]>(CART_KEY, []));
      setWish(readJSON<number[]>(WISH_KEY, []));
    };
    load();
    window.addEventListener("storage", load);
    window.addEventListener(SYNC_EVENT, load);
    return () => {
      window.removeEventListener("storage", load);
      window.removeEventListener(SYNC_EVENT, load);
    };
  }, []);

  const commit = useCallback((next: CartItem[]) => {
    try { localStorage.setItem(CART_KEY, JSON.stringify(next)); } catch {}
    setItems(next);
  }, []);

  const add = useCallback((p: Product, opts?: { openDrawer?: boolean }) => {
    const current = readJSON<CartItem[]>(CART_KEY, []);
    const found = current.find((c) => c.id === p.id);
    commit(found ? current.map((c) => (c.id === p.id ? { ...c, qty: c.qty + 1 } : c)) : [...current, { ...p, qty: 1 }]);
    if (opts?.openDrawer !== false) setDrawer(true);
  }, [commit]);

  const setQty = useCallback((id: number, qty: number) => {
    commit(readJSON<CartItem[]>(CART_KEY, []).map((c) => (c.id === id ? { ...c, qty: Math.max(1, qty) } : c)));
  }, [commit]);
  const remove = useCallback((id: number) => {
    commit(readJSON<CartItem[]>(CART_KEY, []).filter((c) => c.id !== id));
  }, [commit]);
  const clear = useCallback(() => {
    try { localStorage.removeItem(CART_KEY); } catch {}
    setItems([]);
  }, []);

  const toggleWish = useCallback((id: number) => {
    const cur = readJSON<number[]>(WISH_KEY, []);
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
    try { localStorage.setItem(WISH_KEY, JSON.stringify(next)); } catch {}
    setWish(next);
  }, []);

  const value = useMemo<Ctx>(() => ({
    items, count: totals(items).count, add, setQty, remove, clear,
    drawerOpen, openDrawer: () => setDrawer(true), closeDrawer: () => setDrawer(false),
    wish, toggleWish,
  }), [items, add, setQty, remove, clear, drawerOpen, wish, toggleWish]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}
