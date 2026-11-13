import { useState } from 'react';
import { EXPORT_PRODUCTS, type ProductItem } from './data/catalog';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { ChefSection } from './components/ChefSection';
import { ReservationSection, type ReservationData } from './components/ReservationSection';
import { HowItWorksAndTestimonials } from './components/HowItWorksAndTestimonials';
import { CartDrawer, type CartEntry } from './components/CartDrawer';
import { LegalModal } from './components/LegalModal';
import { SupportChatWidget } from './components/SupportChatWidget';
import { Footer } from './components/Footer';

export default function App() {
  const [cartEntries, setCartEntries] = useState<CartEntry[]>([
    { item: EXPORT_PRODUCTS[0], quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeExportFilter, setActiveExportFilter] = useState<string>('All');
  const [preferredExperience, setPreferredExperience] = useState<string>('Main Dining Room');
  const [externalReservation, setExternalReservation] = useState<ReservationData | null>(null);
  const [activeLegalKey, setActiveLegalKey] = useState<string | null>(null);

  const totalCartItems = cartEntries.reduce((sum, entry) => sum + entry.quantity, 0);

  const handleAddToCart = (product: ProductItem) => {
    setCartEntries((prev) => {
      const existing = prev.find((e) => e.item.id === product.id);
      if (existing) {
        return prev.map((e) =>
          e.item.id === product.id ? { ...e, quantity: e.quantity + 1 } : e
        );
      }
      return [...prev, { item: product, quantity: 1 }];
    });
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCartEntries((prev) =>
      prev
        .map((entry) =>
          entry.item.id === id ? { ...entry, quantity: entry.quantity + delta } : entry
        )
        .filter((entry) => entry.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartEntries((prev) => prev.filter((entry) => entry.item.id !== id));
  };

  const handleClearCart = () => {
    setCartEntries([]);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleBookChefTable = () => {
    setPreferredExperience("Chef's Tasting Counter");
    scrollToSection('reserve');
  };

  const handleOrderSignatureDish = (dish: ProductItem) => {
    handleAddToCart(dish);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-zinc-900">
      <Navbar cartCount={totalCartItems} onOpenCart={() => setIsCartOpen(true)} />

      <main className="flex-1">
        <Hero
          onShopNow={() => scrollToSection('featured-bundles')}
          onReserveClick={() => {
            setPreferredExperience('Main Dining Room');
            scrollToSection('reserve');
          }}
        />

        <CatalogSection
          activeExportFilter={activeExportFilter}
          onSelectExportFilter={setActiveExportFilter}
          onAddToCart={handleAddToCart}
          onBookTable={() => {
            setPreferredExperience('Main Dining Room');
            scrollToSection('reserve');
          }}
        />

        <ChefSection
          onBookChefTable={handleBookChefTable}
          onOrderSignatureDish={handleOrderSignatureDish}
        />

        <ReservationSection
          preferredExperience={preferredExperience}
          externalReservation={externalReservation}
        />

        <HowItWorksAndTestimonials />
      </main>

      <Footer onOpenLegal={(key) => setActiveLegalKey(key)} />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        entries={cartEntries}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <LegalModal activeKey={activeLegalKey} onClose={() => setActiveLegalKey(null)} />

      <SupportChatWidget
        cartEntries={cartEntries}
        onBookingConfirmed={(reservation) => setExternalReservation(reservation)}
      />
    </div>
  );
}
