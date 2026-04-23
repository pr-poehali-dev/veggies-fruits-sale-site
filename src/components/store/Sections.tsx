import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Section, Product, products, categories, navItems, HERO_IMG, PRODUCTS_IMG, ABOUT_IMG } from "./types";

interface ProductCardProps {
  product: Product;
  isFav: boolean;
  onFav: () => void;
  onAdd: () => void;
}

export function ProductCard({ product, isFav, onFav, onAdd }: ProductCardProps) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAdd();
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="rounded-3xl overflow-hidden card-hover"
      style={{ background: "rgba(245,240,232,0.9)", border: "1px solid rgba(74,124,74,0.12)" }}>
      <div className="relative p-6 flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, rgba(74,124,74,0.08), rgba(196,168,130,0.12))", minHeight: 100 }}>
        <span className="text-5xl">{product.emoji}</span>
        {product.tag && (
          <span className="absolute top-3 left-3 font-golos text-xs px-2 py-1 rounded-full font-medium"
            style={{ background: "var(--green-mid)", color: "var(--cream)" }}>
            {product.tag}
          </span>
        )}
        <button onClick={onFav}
          className="absolute top-3 right-3 p-1.5 rounded-full transition-all hover:scale-110"
          style={{ background: isFav ? "rgba(220,50,50,0.1)" : "rgba(255,255,255,0.6)" }}>
          <Icon name="Heart" size={14}
            style={{ color: isFav ? "#dc3232" : "var(--earth-mid)", fill: isFav ? "#dc3232" : "transparent" }} />
        </button>
      </div>
      <div className="p-4">
        <p className="font-golos text-xs uppercase tracking-wide mb-1" style={{ color: "var(--green-mid)", opacity: 0.8 }}>{product.category}</p>
        <h3 className="font-cormorant text-lg font-medium leading-tight mb-3" style={{ color: "var(--green-deep)" }}>{product.name}</h3>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-cormorant text-xl font-semibold" style={{ color: "var(--green-deep)" }}>{product.price} ₽</span>
            <span className="font-golos text-xs ml-1 opacity-50" style={{ color: "var(--earth-dark)" }}>/{product.unit}</span>
          </div>
          <button onClick={handleAdd}
            className="flex items-center gap-1 font-golos text-xs font-medium px-3 py-2 rounded-full transition-all hover:scale-105"
            style={{
              background: added ? "var(--green-mid)" : "var(--green-deep)",
              color: "var(--cream)"
            }}>
            {added ? "✓" : <Icon name="Plus" size={14} />}
            {added ? "Добавлено" : "В корзину"}
          </button>
        </div>
      </div>
    </div>
  );
}

interface SectionsProps {
  activeSection: Section;
  setActiveSection: (s: Section) => void;
  activeCategory: string;
  setActiveCategory: (c: string) => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
  addToCart: (product: Product) => void;
}

export default function Sections({
  activeSection,
  setActiveSection,
  activeCategory,
  setActiveCategory,
  favorites,
  toggleFavorite,
  addToCart,
}: SectionsProps) {
  const filteredProducts = activeCategory === "Все"
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <main className="pt-20">

      {/* ===== HOME ===== */}
      {activeSection === "home" && (
        <div>
          {/* Hero */}
          <section className="relative min-h-screen flex items-center overflow-hidden">
            <div className="absolute inset-0">
              <img src={HERO_IMG} alt="Природный магазин" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(245,240,232,0.95) 45%, rgba(245,240,232,0.4) 100%)" }} />
            </div>
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
              <div className="max-w-xl animate-fade-up">
                <p className="text-sm font-golos font-medium tracking-widest uppercase mb-4" style={{ color: "var(--green-mid)" }}>
                  Органический магазин
                </p>
                <h1 className="font-cormorant text-6xl md:text-7xl font-light leading-tight mb-6"
                  style={{ color: "var(--green-deep)" }}>
                  Живите<br /><em style={{ color: "var(--green-mid)" }}>в гармонии</em><br />с природой
                </h1>
                <p className="font-golos text-lg leading-relaxed mb-10" style={{ color: "var(--earth-dark)", opacity: 0.85 }}>
                  Натуральные продукты, органическая косметика и экологичные аксессуары — всё, что нужно для осознанной жизни.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => setActiveSection("catalog")}
                    className="font-golos font-medium px-8 py-4 rounded-full transition-all hover:scale-105 hover:shadow-lg"
                    style={{ background: "var(--green-deep)", color: "var(--cream)" }}>
                    Смотреть каталог
                  </button>
                  <button onClick={() => setActiveSection("about")}
                    className="font-golos font-medium px-8 py-4 rounded-full border-2 transition-all hover:scale-105"
                    style={{ borderColor: "var(--green-deep)", color: "var(--green-deep)" }}>
                    О нас
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-20 max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <h2 className="font-cormorant text-4xl md:text-5xl font-light mb-4" style={{ color: "var(--green-deep)" }}>
                Почему выбирают нас
              </h2>
              <div className="leaf-divider mx-auto w-40 mt-4" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "100% органика", desc: "Только сертифицированные натуральные продукты без химии и ГМО", emoji: "🌿" },
                { title: "Быстрая доставка", desc: "Доставим свежими в течение 1-2 дней по всей России", emoji: "🚚" },
                { title: "Любовь к природе", desc: "Экологичная упаковка, поддержка фермеров и устойчивое производство", emoji: "🌱" },
              ].map((val) => (
                <div key={val.title} className="text-center p-8 rounded-3xl card-hover"
                  style={{ background: "rgba(74,124,74,0.06)", border: "1px solid rgba(74,124,74,0.12)" }}>
                  <div className="text-4xl mb-4">{val.emoji}</div>
                  <h3 className="font-cormorant text-2xl font-medium mb-3" style={{ color: "var(--green-deep)" }}>{val.title}</h3>
                  <p className="font-golos text-sm leading-relaxed" style={{ color: "var(--earth-dark)", opacity: 0.8 }}>{val.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Featured products */}
          <section className="py-16" style={{ background: "rgba(74,124,74,0.05)" }}>
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex items-center justify-between mb-10">
                <h2 className="font-cormorant text-4xl font-light" style={{ color: "var(--green-deep)" }}>Популярное</h2>
                <button onClick={() => setActiveSection("catalog")} className="font-golos text-sm font-medium flex items-center gap-1 transition-colors hover:opacity-70"
                  style={{ color: "var(--green-mid)" }}>
                  Весь каталог <Icon name="ArrowRight" size={16} />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {products.slice(0, 3).map(product => (
                  <ProductCard key={product.id} product={product}
                    isFav={favorites.includes(product.id)}
                    onFav={() => toggleFavorite(product.id)}
                    onAdd={() => addToCart(product)} />
                ))}
              </div>
            </div>
          </section>

          {/* About preview */}
          <section className="py-20 max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img src={PRODUCTS_IMG} alt="Наши продукты" className="w-full rounded-3xl object-cover"
                  style={{ height: 400, border: "3px solid rgba(74,124,74,0.15)" }} />
                <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full flex items-center justify-center text-3xl"
                  style={{ background: "var(--green-mid)" }}>🌿</div>
              </div>
              <div>
                <p className="text-sm font-golos font-medium tracking-widest uppercase mb-3" style={{ color: "var(--green-mid)" }}>Наша история</p>
                <h2 className="font-cormorant text-4xl font-light leading-tight mb-5" style={{ color: "var(--green-deep)" }}>
                  От природы — прямо к вам
                </h2>
                <p className="font-golos leading-relaxed mb-6" style={{ color: "var(--earth-dark)", opacity: 0.85 }}>
                  Мы верим, что природа даёт всё необходимое для здоровой и счастливой жизни. Наши продукты — это связь между вами и первозданной чистотой.
                </p>
                <button onClick={() => setActiveSection("about")}
                  className="font-golos font-medium px-6 py-3 rounded-full transition-all hover:scale-105"
                  style={{ background: "var(--earth-mid)", color: "var(--cream)" }}>
                  Читать подробнее
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ===== CATALOG ===== */}
      {activeSection === "catalog" && (
        <section className="min-h-screen py-16 max-w-6xl mx-auto px-6">
          <div className="mb-10 animate-fade-up">
            <p className="text-sm font-golos font-medium tracking-widest uppercase mb-2" style={{ color: "var(--green-mid)" }}>Органический магазин</p>
            <h1 className="font-cormorant text-5xl font-light" style={{ color: "var(--green-deep)" }}>Каталог товаров</h1>
          </div>

          {favorites.length > 0 && (
            <div className="mb-6 p-4 rounded-2xl flex items-center gap-3 animate-fade-in"
              style={{ background: "rgba(74,124,74,0.08)", border: "1px solid rgba(74,124,74,0.2)" }}>
              <Icon name="Heart" size={16} style={{ color: "var(--green-mid)" }} />
              <span className="font-golos text-sm" style={{ color: "var(--green-deep)" }}>
                В избранном: {favorites.length} {favorites.length === 1 ? "товар" : "товара"}
              </span>
            </div>
          )}

          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className="font-golos text-sm px-5 py-2 rounded-full border transition-all hover:scale-105"
                style={{
                  background: activeCategory === cat ? "var(--green-deep)" : "transparent",
                  color: activeCategory === cat ? "var(--cream)" : "var(--green-deep)",
                  borderColor: activeCategory === cat ? "var(--green-deep)" : "rgba(74,124,74,0.3)"
                }}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product}
                isFav={favorites.includes(product.id)}
                onFav={() => toggleFavorite(product.id)}
                onAdd={() => addToCart(product)} />
            ))}
          </div>
        </section>
      )}

      {/* ===== DELIVERY ===== */}
      {activeSection === "delivery" && (
        <section className="min-h-screen py-16 max-w-5xl mx-auto px-6">
          <div className="mb-12 animate-fade-up">
            <p className="text-sm font-golos font-medium tracking-widest uppercase mb-2" style={{ color: "var(--green-mid)" }}>Информация</p>
            <h1 className="font-cormorant text-5xl font-light mb-4" style={{ color: "var(--green-deep)" }}>Доставка и оплата</h1>
            <div className="leaf-divider w-40 mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              {
                emoji: "🚀", title: "Экспресс-доставка",
                items: ["По Москве — 1-2 дня", "По России — 3-7 дней", "Стоимость от 290 ₽", "Бесплатно от 3 000 ₽"]
              },
              {
                emoji: "🏪", title: "Самовывоз",
                items: ["г. Москва, ул. Лесная, 12", "Пн-Пт: 9:00–20:00", "Сб-Вс: 10:00–18:00", "Бесплатно"]
              },
              {
                emoji: "💳", title: "Способы оплаты",
                items: ["Картой онлайн", "Наличными при получении", "СБП (QR-код)", "Apple Pay / Google Pay"]
              },
              {
                emoji: "🔄", title: "Возврат",
                items: ["В течение 14 дней", "Без объяснения причин", "Полный возврат средств", "Обмен товара"]
              },
            ].map(block => (
              <div key={block.title} className="p-8 rounded-3xl card-hover"
                style={{ background: "rgba(74,124,74,0.06)", border: "1px solid rgba(74,124,74,0.12)" }}>
                <div className="text-3xl mb-4">{block.emoji}</div>
                <h3 className="font-cormorant text-2xl font-medium mb-4" style={{ color: "var(--green-deep)" }}>{block.title}</h3>
                <ul className="space-y-2">
                  {block.items.map(item => (
                    <li key={item} className="flex items-center gap-2 font-golos text-sm"
                      style={{ color: "var(--earth-dark)", opacity: 0.85 }}>
                      <span style={{ color: "var(--green-mid)" }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-3xl text-center"
            style={{ background: "linear-gradient(135deg, var(--green-deep) 0%, var(--green-mid) 100%)", color: "var(--cream)" }}>
            <div className="text-3xl mb-3">🌿</div>
            <h3 className="font-cormorant text-3xl font-light mb-2">Экологичная упаковка</h3>
            <p className="font-golos text-sm opacity-85 max-w-md mx-auto">
              Все товары упакованы в перерабатываемые и биоразлагаемые материалы. Мы заботимся о природе на каждом шагу.
            </p>
          </div>
        </section>
      )}

      {/* ===== ABOUT ===== */}
      {activeSection === "about" && (
        <section className="min-h-screen py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-12 animate-fade-up">
              <p className="text-sm font-golos font-medium tracking-widest uppercase mb-2" style={{ color: "var(--green-mid)" }}>Знакомьтесь</p>
              <h1 className="font-cormorant text-5xl font-light" style={{ color: "var(--green-deep)" }}>О нас</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
              <div>
                <img src={ABOUT_IMG} alt="О магазине" className="w-full rounded-3xl object-cover"
                  style={{ height: 420, border: "3px solid rgba(74,124,74,0.15)" }} />
              </div>
              <div className="space-y-6">
                <div className="p-6 rounded-2xl" style={{ background: "rgba(74,124,74,0.06)" }}>
                  <h3 className="font-cormorant text-2xl font-medium mb-3" style={{ color: "var(--green-deep)" }}>Наша миссия</h3>
                  <p className="font-golos leading-relaxed" style={{ color: "var(--earth-dark)", opacity: 0.85 }}>
                    Мы помогаем людям перейти к более осознанному потреблению, выбирая продукты, которые хороши для здоровья и бережны к планете.
                  </p>
                </div>
                <div className="p-6 rounded-2xl" style={{ background: "rgba(196,168,130,0.15)" }}>
                  <h3 className="font-cormorant text-2xl font-medium mb-3" style={{ color: "var(--green-deep)" }}>Наши ценности</h3>
                  <p className="font-golos leading-relaxed" style={{ color: "var(--earth-dark)", opacity: 0.85 }}>
                    Натуральность, прозрачность, уважение к природе и честные отношения с поставщиками — основа всего, что мы делаем.
                  </p>
                </div>
                <div className="p-6 rounded-2xl" style={{ background: "rgba(74,124,74,0.06)" }}>
                  <h3 className="font-cormorant text-2xl font-medium mb-3" style={{ color: "var(--green-deep)" }}>С нами работают</h3>
                  <p className="font-golos leading-relaxed" style={{ color: "var(--earth-dark)", opacity: 0.85 }}>
                    Более 50 фермерских хозяйств и небольших производств по всей России. Каждый поставщик проходит строгую проверку.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
              {[
                { num: "5+", label: "Лет работы" },
                { num: "200+", label: "Товаров" },
                { num: "15K+", label: "Покупателей" },
                { num: "50+", label: "Поставщиков" },
              ].map(stat => (
                <div key={stat.label} className="text-center p-6 rounded-2xl"
                  style={{ background: "rgba(74,124,74,0.06)", border: "1px solid rgba(74,124,74,0.12)" }}>
                  <div className="font-cormorant text-4xl font-light mb-1" style={{ color: "var(--green-mid)" }}>{stat.num}</div>
                  <div className="font-golos text-sm" style={{ color: "var(--earth-dark)", opacity: 0.7 }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="p-8 rounded-3xl text-center"
              style={{ background: "linear-gradient(135deg, rgba(74,124,74,0.1), rgba(196,168,130,0.15))", border: "1px solid rgba(74,124,74,0.2)" }}>
              <h3 className="font-cormorant text-3xl font-light mb-3" style={{ color: "var(--green-deep)" }}>Связаться с нами</h3>
              <p className="font-golos text-sm mb-6" style={{ color: "var(--earth-dark)", opacity: 0.8 }}>
                Есть вопросы? Мы всегда рады помочь!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="tel:+78001234567" className="flex items-center gap-2 font-golos font-medium px-6 py-3 rounded-full transition-all hover:scale-105"
                  style={{ background: "var(--green-deep)", color: "var(--cream)" }}>
                  <Icon name="Phone" size={16} /> 8 800 123-45-67
                </a>
                <a href="mailto:hello@zeleniyput.ru" className="flex items-center gap-2 font-golos font-medium px-6 py-3 rounded-full border-2 transition-all hover:scale-105"
                  style={{ borderColor: "var(--green-deep)", color: "var(--green-deep)" }}>
                  <Icon name="Mail" size={16} /> Написать письмо
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
