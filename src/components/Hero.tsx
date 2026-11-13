import { ArrowRight } from 'lucide-react';
import { HERO_IMAGE, RESTAURANT_AMBIANCE_IMAGE } from '../data/catalog';
import { ResilientImage } from './ResilientImage';

interface HeroProps {
  onShopNow: () => void;
  onReserveClick: () => void;
}

export function Hero({ onShopNow, onReserveClick }: HeroProps) {
  const kpis = [
    { value: '100+', label: 'Products & Fresh Dishes' },
    { value: 'Trusted Across Nigeria', label: 'All 36 States · Worldwide Dispatch' },
    { value: '5,000+', label: 'Orders Shipped & Served' },
    { value: '4.9', label: 'Rating · Verified Guests' },
  ];

  return (
    <section id="top" className="border-b border-stone-200 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-12 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Headline & Direct Routes */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-sm font-medium text-emerald-900 tracking-wide mb-4">
                Akure Flagship Restaurant &amp; Pantry · Trusted Across Nigeria
              </p>

              <h1 className="font-display text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.08] tracking-tight font-semibold text-zinc-900 text-balance mb-5">
                Hyper Tasty Nigerian Meals &amp; Pantry Staples
              </h1>

              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl mb-8">
                Dine inside our warm Akure dining room or order authentic Nigerian foodstuffs —
                from vacuum-sealed dried catfish and cold-pressed red palm oil to wood-fired party
                jollof and pounded yam delivered to your door.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onShopNow}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] text-sm font-semibold text-white bg-emerald-900 hover:bg-emerald-950 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
                >
                  <span>Order Online</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#menu"
                  className="inline-flex items-center justify-center px-5 py-3 min-h-[44px] text-sm font-semibold text-zinc-900 bg-white border border-stone-300 hover:border-zinc-900 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  View Menu
                </a>

                <button
                  type="button"
                  onClick={onReserveClick}
                  className="inline-flex items-center justify-center px-4 py-3 min-h-[44px] text-sm font-semibold text-emerald-900 hover:underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Reserve a Table
                </button>
              </div>

              <p className="text-xs text-stone-500">
                Fonts Hall Complex, Akure-Ilesha Road · Nationwide &amp; International Shipping
              </p>
            </div>
          </div>

          {/* Right Column: Dual Culinary & Dining Ambiance Showcase */}
          <div className="lg:col-span-6 grid grid-cols-1 gap-4">
            <div className="relative min-h-[240px] lg:min-h-[290px] rounded-xl overflow-hidden border border-stone-200 bg-stone-200">
              <ResilientImage
                src={HERO_IMAGE}
                alt="Nigerian culinary feast with red palm oil, garri, grilled suya skewers, and jollof rice"
                className="w-full h-full object-cover"
                fallbackLabel="Authentic Nigerian Cuisine & Export Foodstuffs"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-4 sm:p-5">
                <p className="text-xs font-medium text-stone-200">
                  Signature Kitchen &amp; Pantry Bundles
                </p>
                <p className="text-sm font-medium text-white mt-0.5">
                  Hand-selected ingredients and open-fire Nigerian classics prepared fresh daily.
                </p>
              </div>
            </div>

            <div className="relative h-40 sm:h-44 rounded-xl overflow-hidden border border-stone-200 bg-stone-200">
              <ResilientImage
                src={RESTAURANT_AMBIANCE_IMAGE}
                alt="Warm contemporary oak dining room interior at HTML Foods in Akure"
                className="w-full h-full object-cover"
                fallbackLabel="HTML Foods Akure Dining Room Ambiance"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-4 py-3 flex items-center justify-between gap-4">
                <span className="text-xs sm:text-sm font-medium text-white">
                  Akure Dining Room · Tue–Sun, 11:30 AM – 10:30 PM
                </span>
                <button
                  type="button"
                  onClick={onReserveClick}
                  className="text-xs font-semibold text-amber-300 hover:text-white underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Book Table
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Quantitative Proof Strip Below Split */}
        <div className="mt-10 pt-8 border-t border-stone-200 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {kpis.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="font-display text-xl sm:text-2xl font-semibold text-zinc-900 tabular-nums">
                {item.value}
              </div>
              <div className="text-xs sm:text-sm text-stone-600">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
