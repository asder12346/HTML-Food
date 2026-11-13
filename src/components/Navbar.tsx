import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BRAND_LOGO_URL } from '../data/catalog';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Menu', href: '#menu' },
    { label: 'Products', href: '#products' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Chefs', href: '#chefs' },
    { label: 'Reserve', href: '#reserve' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Uploaded HTML Foods Logo */}
        <a
          href="#top"
          aria-label="HTML Foods Home"
          className="inline-flex items-center shrink-0 rounded-md bg-black px-2 py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-900"
        >
          <img
            src={BRAND_LOGO_URL}
            alt="HTML Foods — hyper tasty meal language"
            referrerPolicy="no-referrer"
            className="h-8 w-auto object-contain"
          />
        </a>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-zinc-900 hover:underline underline-offset-4 decoration-stone-400 transition-colors whitespace-nowrap shrink-0 py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] text-sm font-medium text-white bg-emerald-900 hover:bg-emerald-950 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
          >
            <span>Order Now</span>
            <span className="tabular-nums opacity-85 font-semibold">{cartCount}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-stone-200 text-zinc-900 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden border-t border-stone-200 bg-stone-50 px-4 py-4 flex flex-col gap-1"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-2.5 px-2 text-base font-medium text-zinc-800 hover:bg-stone-100 rounded-md transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
