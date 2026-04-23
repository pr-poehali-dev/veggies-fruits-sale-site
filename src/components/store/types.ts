export const HERO_IMG = "https://cdn.poehali.dev/projects/d9915bc8-64e5-4633-bfa0-1c2e0e596eb1/files/fc498c24-d9f0-4c50-a102-9e286b881d03.jpg";
export const PRODUCTS_IMG = "https://cdn.poehali.dev/projects/d9915bc8-64e5-4633-bfa0-1c2e0e596eb1/files/bcc52d93-08a8-49f7-9c82-5f5589ea5f87.jpg";
export const ABOUT_IMG = "https://cdn.poehali.dev/projects/d9915bc8-64e5-4633-bfa0-1c2e0e596eb1/files/86f4959b-f9a6-42f7-8720-1d2294fc45ae.jpg";

export const products = [
  { id: 1, name: "Травяной чай «Лесной»", category: "Напитки", price: 490, unit: "50г", emoji: "🌿", tag: "Хит" },
  { id: 2, name: "Натуральный мёд акации", category: "Продукты", price: 780, unit: "350г", emoji: "🍯", tag: "" },
  { id: 3, name: "Крем с алоэ вера", category: "Уход", price: 1290, unit: "100мл", emoji: "🌱", tag: "Новинка" },
  { id: 4, name: "Деревянная расчёска", category: "Аксессуары", price: 650, unit: "шт", emoji: "🪵", tag: "" },
  { id: 5, name: "Кедровое масло", category: "Уход", price: 960, unit: "50мл", emoji: "🌲", tag: "" },
  { id: 6, name: "Семена микрозелени", category: "Продукты", price: 340, unit: "100г", emoji: "🌾", tag: "Хит" },
];

export const categories = ["Все", "Напитки", "Продукты", "Уход", "Аксессуары"];

export type Section = "home" | "catalog" | "delivery" | "about";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  emoji: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  emoji: string;
  tag: string;
}

export const navItems: { key: Section; label: string }[] = [
  { key: "home", label: "Главная" },
  { key: "catalog", label: "Каталог" },
  { key: "delivery", label: "Доставка" },
  { key: "about", label: "О нас" },
];
