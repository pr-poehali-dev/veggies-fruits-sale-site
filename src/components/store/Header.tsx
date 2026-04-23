import Icon from "@/components/ui/icon";
import { Section, navItems } from "./types";

interface HeaderProps {
  activeSection: Section;
  setActiveSection: (s: Section) => void;
  cartCount: number;
  onCartOpen: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
}

export default function Header({
  activeSection,
  setActiveSection,
  cartCount,
  onCartOpen,
  mobileMenuOpen,
  setMobileMenuOpen,
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40" style={{ background: "rgba(245,240,232,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(74,124,74,0.12)" }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => setActiveSection("home")} className="flex items-center gap-2">
          <span className="text-2xl">🌿</span>
          <span className="font-cormorant text-2xl font-semibold" style={{ color: "var(--green-deep)" }}>Зелёный Путь</span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className="font-golos text-sm font-medium transition-colors relative"
              style={{ color: activeSection === item.key ? "var(--green-mid)" : "var(--green-deep)" }}
            >
              {item.label}
              {activeSection === item.key && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full" style={{ background: "var(--green-mid)" }} />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => { onCartOpen(); setMobileMenuOpen(false); }}
            className="relative p-2 rounded-full transition-all hover:scale-105"
            style={{ background: "rgba(74,124,74,0.1)" }}
          >
            <Icon name="ShoppingBag" size={20} style={{ color: "var(--green-deep)" }} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-xs w-5 h-5 flex items-center justify-center rounded-full font-golos font-bold"
                style={{ background: "var(--green-mid)", color: "var(--cream)" }}>
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} style={{ color: "var(--green-deep)" }} />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3 animate-fade-in" style={{ borderTop: "1px solid rgba(74,124,74,0.12)" }}>
          {navItems.map(item => (
            <button key={item.key} onClick={() => { setActiveSection(item.key); setMobileMenuOpen(false); }}
              className="text-left font-golos py-2 font-medium"
              style={{ color: activeSection === item.key ? "var(--green-mid)" : "var(--green-deep)" }}>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
