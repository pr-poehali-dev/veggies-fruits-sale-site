import { useState } from "react";
import Header from "@/components/store/Header";
import Sections from "@/components/store/Sections";
import CartDrawer from "@/components/store/CartDrawer";
import { Section, CartItem, Product, navItems, products } from "@/components/store/types";

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [activeCategory, setActiveCategory] = useState("Все");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", comment: "" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1, emoji: product.emoji }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => {
      const item = prev.find(i => i.id === id);
      if (item && item.quantity > 1) return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
      return prev.filter(i => i.id !== id);
    });
  };

  const deleteFromCart = (id: number) => setCart(prev => prev.filter(i => i.id !== id));

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const handleOrder = () => {
    setOrderDone(true);
    setCart([]);
    setForm({ name: "", phone: "", address: "", comment: "" });
    setTimeout(() => { setCheckoutOpen(false); setOrderDone(false); setCartOpen(false); }, 2000);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)", fontFamily: "'Golos Text', sans-serif" }}>

      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <Sections
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        addToCart={addToCart}
      />

      {/* FOOTER */}
      <footer className="py-12 mt-8" style={{ background: "var(--green-deep)", color: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🌿</span>
                <span className="font-cormorant text-2xl font-semibold">Зелёный Путь</span>
              </div>
              <p className="font-golos text-sm opacity-70 max-w-xs leading-relaxed">
                Органические продукты и экологичные товары для осознанной жизни
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="font-golos text-xs uppercase tracking-widest opacity-50 mb-3">Навигация</p>
                {navItems.map(item => (
                  <button key={item.key} onClick={() => setActiveSection(item.key)}
                    className="block font-golos text-sm opacity-80 hover:opacity-100 mb-2 transition-opacity">
                    {item.label}
                  </button>
                ))}
              </div>
              <div>
                <p className="font-golos text-xs uppercase tracking-widest opacity-50 mb-3">Контакты</p>
                <p className="font-golos text-sm opacity-80 mb-1">8 800 123-45-67</p>
                <p className="font-golos text-sm opacity-80 mb-1">hello@zeleniyput.ru</p>
                <p className="font-golos text-sm opacity-80">Москва, ул. Лесная, 12</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white border-opacity-10 pt-6 font-golos text-xs opacity-40 text-center">
            © 2024 Зелёный Путь. Все права защищены.
          </div>
        </div>
      </footer>

      <CartDrawer
        cart={cart}
        cartCount={cartCount}
        cartTotal={cartTotal}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        checkoutOpen={checkoutOpen}
        setCheckoutOpen={setCheckoutOpen}
        orderDone={orderDone}
        form={form}
        setForm={setForm}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        deleteFromCart={deleteFromCart}
        handleOrder={handleOrder}
        setActiveSection={setActiveSection}
        products={products}
      />

    </div>
  );
}
