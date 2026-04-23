import Icon from "@/components/ui/icon";
import { CartItem, Product, products } from "./types";

interface CartDrawerProps {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  checkoutOpen: boolean;
  setCheckoutOpen: (v: boolean) => void;
  orderDone: boolean;
  form: { name: string; phone: string; address: string; comment: string };
  setForm: (f: { name: string; phone: string; address: string; comment: string }) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  deleteFromCart: (id: number) => void;
  handleOrder: () => void;
  setActiveSection: (s: string) => void;
}

export default function CartDrawer({
  cart,
  cartCount,
  cartTotal,
  cartOpen,
  setCartOpen,
  checkoutOpen,
  setCheckoutOpen,
  orderDone,
  form,
  setForm,
  addToCart,
  removeFromCart,
  deleteFromCart,
  handleOrder,
  setActiveSection,
}: CartDrawerProps) {
  return (
    <>
      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black bg-opacity-40" onClick={() => setCartOpen(false)} />
          <div className="w-full max-w-md h-full flex flex-col animate-fade-in"
            style={{ background: "var(--cream)", boxShadow: "-10px 0 40px rgba(45,74,45,0.15)" }}>

            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "rgba(74,124,74,0.15)" }}>
              <h2 className="font-cormorant text-2xl font-medium" style={{ color: "var(--green-deep)" }}>
                Корзина {cartCount > 0 && <span className="text-base font-golos font-normal opacity-60">({cartCount})</span>}
              </h2>
              <button onClick={() => setCartOpen(false)} className="p-2 rounded-full hover:bg-black hover:bg-opacity-5 transition-colors">
                <Icon name="X" size={20} style={{ color: "var(--green-deep)" }} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="text-5xl mb-4">🛒</div>
                  <p className="font-cormorant text-2xl mb-2" style={{ color: "var(--green-deep)" }}>Корзина пуста</p>
                  <p className="font-golos text-sm opacity-60">Добавьте товары из каталога</p>
                  <button onClick={() => { setCartOpen(false); setActiveSection("catalog"); }}
                    className="mt-6 font-golos font-medium px-6 py-3 rounded-full"
                    style={{ background: "var(--green-deep)", color: "var(--cream)" }}>
                    Перейти в каталог
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-4 rounded-2xl"
                      style={{ background: "rgba(74,124,74,0.06)", border: "1px solid rgba(74,124,74,0.1)" }}>
                      <div className="text-3xl">{item.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-golos font-medium text-sm truncate" style={{ color: "var(--green-deep)" }}>{item.name}</p>
                        <p className="font-golos text-sm" style={{ color: "var(--green-mid)" }}>{item.price} ₽</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => removeFromCart(item.id)}
                          className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-lg leading-none transition-all hover:scale-110"
                          style={{ background: "rgba(74,124,74,0.15)", color: "var(--green-deep)" }}>
                          −
                        </button>
                        <span className="font-golos font-medium w-5 text-center" style={{ color: "var(--green-deep)" }}>{item.quantity}</span>
                        <button onClick={() => {
                          const p = products.find(pr => pr.id === item.id);
                          if (p) addToCart(p);
                        }}
                          className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-lg leading-none transition-all hover:scale-110"
                          style={{ background: "var(--green-mid)", color: "var(--cream)" }}>
                          +
                        </button>
                      </div>
                      <button onClick={() => deleteFromCart(item.id)} className="p-1 opacity-40 hover:opacity-80 transition-opacity">
                        <Icon name="Trash2" size={16} style={{ color: "var(--earth-dark)" }} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t" style={{ borderColor: "rgba(74,124,74,0.15)" }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-golos font-medium" style={{ color: "var(--green-deep)" }}>Итого:</span>
                  <span className="font-cormorant text-2xl font-semibold" style={{ color: "var(--green-deep)" }}>{cartTotal} ₽</span>
                </div>
                <button onClick={() => setCheckoutOpen(true)}
                  className="w-full font-golos font-medium py-4 rounded-full transition-all hover:scale-105 hover:shadow-lg"
                  style={{ background: "var(--green-deep)", color: "var(--cream)" }}>
                  Оформить заказ
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {checkoutOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)", zIndex: 60 }}>
          <div className="w-full max-w-md rounded-3xl p-8 animate-scale-in" style={{ background: "var(--cream)" }}>
            {orderDone ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🌿</div>
                <h3 className="font-cormorant text-3xl font-light mb-2" style={{ color: "var(--green-deep)" }}>Заказ оформлен!</h3>
                <p className="font-golos text-sm opacity-70">Скоро свяжемся с вами</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-cormorant text-2xl font-medium" style={{ color: "var(--green-deep)" }}>Оформление заказа</h2>
                  <button onClick={() => setCheckoutOpen(false)} className="p-2 opacity-50 hover:opacity-80 transition-opacity">
                    <Icon name="X" size={18} style={{ color: "var(--green-deep)" }} />
                  </button>
                </div>
                <div className="space-y-4 mb-6">
                  {[
                    { key: "name", label: "Ваше имя", placeholder: "Иван Иванов", type: "text" },
                    { key: "phone", label: "Телефон", placeholder: "+7 (000) 000-00-00", type: "tel" },
                    { key: "address", label: "Адрес доставки", placeholder: "г. Москва, ул. ...", type: "text" },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="block font-golos text-xs font-medium mb-1 uppercase tracking-wide opacity-60"
                        style={{ color: "var(--green-deep)" }}>{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.key as keyof typeof form]}
                        onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl font-golos text-sm outline-none"
                        style={{
                          background: "rgba(74,124,74,0.06)",
                          border: "1px solid rgba(74,124,74,0.2)",
                          color: "var(--green-deep)"
                        }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block font-golos text-xs font-medium mb-1 uppercase tracking-wide opacity-60"
                      style={{ color: "var(--green-deep)" }}>Комментарий</label>
                    <textarea
                      placeholder="Пожелания к заказу..."
                      value={form.comment}
                      onChange={e => setForm({ ...form, comment: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl font-golos text-sm outline-none resize-none"
                      style={{ background: "rgba(74,124,74,0.06)", border: "1px solid rgba(74,124,74,0.2)", color: "var(--green-deep)" }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4 py-3 border-t border-b" style={{ borderColor: "rgba(74,124,74,0.15)" }}>
                  <span className="font-golos font-medium" style={{ color: "var(--green-deep)" }}>Сумма заказа</span>
                  <span className="font-cormorant text-xl font-semibold" style={{ color: "var(--green-deep)" }}>{cartTotal} ₽</span>
                </div>
                <button
                  onClick={handleOrder}
                  disabled={!form.name || !form.phone || !form.address}
                  className="w-full font-golos font-medium py-4 rounded-full transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: "var(--green-deep)", color: "var(--cream)" }}>
                  Подтвердить заказ
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
