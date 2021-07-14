import { ReactNode } from "react";

export type ShopState = {
  cart: Cart;
  products: Product[];
};

export type Item = {
  id: string;
  quantity: number;
};

export type Cart = {
  items: Item[];
  add: (id: string, visual: ReactNode) => void;
  subtract: (id: string) => void;
  remove: (id: string) => void;
  count: number;
  clear: () => void;
  url?: string;
  visuals: Map<string, ReactNode>;
  isOpen: boolean;
  close: () => void;
  open: () => void;
};

export type Variant = {
  id: string;
  available: boolean;
  price: string;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  images: string[];
  available: boolean;
  variants: Variant[];
  visual?: ReactNode;
};
