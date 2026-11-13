import { ArrowRight } from 'lucide-react';
import { HERO_IMAGE } from '../data/catalog';
import { ResilientImage } from './ResilientImage';

interface HeroProps {
  onShopNow: () => void;
  onReserveClick: () => void;
}

export function Hero({ onShopNow, onReserveClick }: HeroProps) {
  const kpis = [
    { value: '100+', label: 'Products' },
    { value: '30+', label: 'Countries' },
    { value: '5,000+', label: 'Orders Shipped' },
    { value: '4.9', label: 'Rating · Verified Reviews' },
  ];

  return (
    <section id="top" className="border-b border-stone-200 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-12 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Headline & Direct Routes */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-sm font-medium text-emerald-900 tracking-wide mb-4">
                Shipping Worldwide from Nigeria · USA, UK, Canada &amp; more
              </p>

              <h1 className="font-display text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.08] tracking-tight font-semibold text-zinc-900 text-balance mb-5">
                Nigerian Foods, Exported Worldwide
              </h1>

              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl mb-8">
                Authentic Nigerian foodstuffs delivered to your doorstep anywhere in the world —
                from premium dried fish to palm oil, spices, and staples — alongside chef-crafted
                dining in Akure.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onShopNow}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] text-sm font-semibold text-white bg-emerald-900 hover:bg-emerald-950 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#products"
                  className="inline-flex items-center justify-center px-5 py-3 min-h-[44px] text-sm font-semibold text-zinc-900 bg-white border border-stone-300 hover:border-zinc-900 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  View Products
                </a>

                <button
                  type="button"
                  onClick={onReserveClick}
                  className="inline-flex items-center justify-center px-4 py-3 min-h-[44px] text-sm font-semibold text-emerald-900 hover:underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Book a Table
                </button>
              </div>

              <p className="text-xs text-stone-500">
                Global Shipping · USA, UK, Canada &amp; Europe · Akure Flagship Dining Room
              </p>
            </div>
          </div>

          {/* Right Column: Dominant 16:9 Culinary Visual */}
          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[260px] lg:min-h-[400px] rounded-xl overflow-hidden border border-stone-200 bg-stone-200">
              <ResilientImage
                src={HERO_IMAGE}
                alt="Nigerian export foodstuffs including garri, red palm oil, dried fish, suya skewers, and jollof rice"
                className="w-full h-full lg:h-full object-cover"
                fallbackLabel="Authentic Nigerian Export Foodstuffs & Restaurant Kitchen"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 sm:p-6">
                <p className="text-xs font-medium text-stone-200">
                  Akure Kitchen &amp; Export Hub · Ondo State, Nigeria
                </p>
                <p className="text-sm sm:text-base font-medium text-white mt-1">
                  Vacuum-sealed dried seafood, cold-pressed palm oil, and fire-roasted restaurant classics.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Quantitative Proof Strip Below Split */}
        <div className="mt-10 pt-8 border-t border-stone-200 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {kpis.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="font-display text-2xl sm:text-3xl font-semibold text-zinc-900 tabular-nums">
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
