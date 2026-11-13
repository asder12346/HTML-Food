import { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import {
  EXPORT_CATEGORIES,
  EXPORT_PRODUCTS,
  RESTAURANT_MENU,
  formatNaira,
  type ProductItem,
} from '../data/catalog';
import { ResilientImage } from './ResilientImage';

interface CatalogSectionProps {
  activeExportFilter: string;
  onSelectExportFilter: (filter: string) => void;
  onAddToCart: (item: ProductItem) => void;
  onBookTable: () => void;
}

export function CatalogSection({
  activeExportFilter,
  onSelectExportFilter,
  onAddToCart,
  onBookTable,
}: CatalogSectionProps) {
  const [activeMenuFilter, setActiveMenuFilter] = useState<string>('All');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const exportFilterOptions = [
    'All',
    'Seafood',
    'Soup Essentials',
    'Oils',
    'Staples',
    'Spices',
    'Snacks',
    'Bundle',
  ];

  const menuFilterOptions = ['All', 'Soups & Swallows', 'Rice & Grills', 'Small Plates & Drinks'];

  const filteredProducts =
    activeExportFilter === 'All'
      ? EXPORT_PRODUCTS
      : EXPORT_PRODUCTS.filter((p) => p.category === activeExportFilter);

  const filteredMenu =
    activeMenuFilter === 'All'
      ? RESTAURANT_MENU
      : RESTAURANT_MENU.filter((d) => d.category === activeMenuFilter);

  const handleAdd = (item: ProductItem) => {
    onAddToCart(item);
    setRecentlyAddedId(item.id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === item.id ? null : prev));
    }, 1400);
  };

  return (
    <>
      {/* Export Categories + Featured Export Bundles */}
      <section id="products" className="py-16 lg:py-20 border-b border-stone-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Export Categories */}
          <div className="mb-14">
            <div className="max-w-2xl mb-8">
              <p className="text-xs font-semibold tracking-wider uppercase text-emerald-900 mb-2">
                Export Categories
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 text-balance">
                Authentic Nigerian Foodstuffs
              </h2>
              <p className="text-base text-stone-600 mt-2">
                Premium quality products shipped worldwide from Nigeria
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {EXPORT_CATEGORIES.map((category) => {
                const isActive = activeExportFilter === category.filterKey;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      onSelectExportFilter(
                        isActive ? 'All' : category.filterKey
                      );
                      document
                        .getElementById('featured-bundles')
                        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className={`group text-left rounded-xl border transition-all duration-200 overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900 ${
                      isActive
                        ? 'border-emerald-900 bg-stone-50 shadow-sm'
                        : 'border-stone-200 bg-stone-50/70 hover:border-stone-400 hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-stone-200">
                      <ResilientImage
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        fallbackLabel={category.name}
                      />
                    </div>
                    <div className="p-5">
                      <div className="text-xs font-medium text-emerald-900 tabular-nums mb-1">
                        {category.productCountLabel}
                      </div>
                      <h3 className="font-display text-lg font-semibold text-zinc-900 mb-1.5">
                        {category.name}
                      </h3>
                      <p className="text-sm text-stone-600 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Featured Products: Popular Export Bundles */}
          <div id="featured-bundles" className="pt-10 border-t border-stone-200">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
              <div className="max-w-xl">
                <p className="text-xs font-semibold tracking-wider uppercase text-emerald-900 mb-2">
                  Featured Products
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 text-balance">
                  Popular Export Bundles
                </h2>
                <p className="text-base text-stone-600 mt-2">
                  Our bestselling Nigerian foodstuff packages shipped worldwide
                </p>
              </div>

              {/* Category Filter Tabs */}
              <div
                role="tablist"
                aria-label="Filter export products by category"
                className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-lg border border-stone-200/80"
              >
                {exportFilterOptions.map((option) => {
                  const selected = activeExportFilter === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => onSelectExportFilter(option)}
                      className={`px-3 py-1.5 min-h-[36px] text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        selected
                          ? 'bg-white text-zinc-900 shadow-xs'
                          : 'text-stone-600 hover:text-zinc-900'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const isJustAdded = recentlyAddedId === product.id;
                return (
                  <article
                    key={product.id}
                    className="flex flex-col justify-between rounded-xl border border-stone-200 bg-stone-50/50 overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div>
                      <div className="aspect-[4/3] w-full overflow-hidden bg-stone-200">
                        <ResilientImage
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          fallbackLabel={product.name}
                        />
                      </div>

                      <div className="p-5 pb-3">
                        <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-2">
                          <span className="font-medium text-emerald-900">
                            {product.badgeLabel}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{product.packSize}</span>
                          <span aria-hidden="true">·</span>
                          <span>{product.category}</span>
                        </div>

                        <h3 className="font-display text-lg font-semibold text-zinc-900 leading-snug mb-2">
                          {product.name}
                        </h3>

                        <p className="text-sm text-stone-600 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-3 mt-auto flex items-center justify-between gap-3 border-t border-stone-200/70">
                      <span className="text-base font-semibold text-zinc-900 tabular-nums">
                        {formatNaira(product.priceNaira)}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleAdd(product)}
                        className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900 ${
                          isJustAdded
                            ? 'bg-emerald-800 text-white'
                            : 'bg-zinc-900 text-white hover:bg-emerald-900'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Dining Menu Section */}
      <section id="menu" className="py-16 lg:py-20 border-b border-stone-200 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-xl">
              <p className="text-xs font-semibold tracking-wider uppercase text-emerald-900 mb-2">
                Akure Flagship Kitchen
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 text-balance">
                Restaurant Dining Menu
              </h2>
              <p className="text-base text-stone-600 mt-2">
                Cooked fresh daily at Fonts Hall Complex. Order for local delivery or reserve your table for dine-in service.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div
                role="tablist"
                aria-label="Filter restaurant menu by course"
                className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-lg border border-stone-200"
              >
                {menuFilterOptions.map((option) => {
                  const selected = activeMenuFilter === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActiveMenuFilter(option)}
                      className={`px-3 py-1.5 min-h-[36px] text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        selected
                          ? 'bg-emerald-900 text-white'
                          : 'text-stone-600 hover:text-zinc-900'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={onBookTable}
                className="px-4 py-2 min-h-[40px] text-xs font-semibold text-emerald-900 border border-emerald-900/30 bg-white hover:bg-emerald-900 hover:text-white rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Reserve a Table
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenu.map((dish) => {
              const isJustAdded = recentlyAddedId === dish.id;
              return (
                <article
                  key={dish.id}
                  className="flex flex-col justify-between rounded-xl border border-stone-200 bg-white overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div>
                    <div className="aspect-[4/3] w-full overflow-hidden bg-stone-200">
                      <ResilientImage
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover"
                        fallbackLabel={dish.name}
                      />
                    </div>

                    <div className="p-5 pb-3">
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500 mb-2">
                        <span className="font-medium text-emerald-900">{dish.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{dish.spiceLevel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{dish.prepTime}</span>
                      </div>

                      <h3 className="font-display text-lg font-semibold text-zinc-900 leading-snug mb-2">
                        {dish.name}
                      </h3>

                      <p className="text-sm text-stone-600 leading-relaxed">
                        {dish.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-3 mt-auto flex items-center justify-between gap-3 border-t border-stone-100">
                    <span className="text-base font-semibold text-zinc-900 tabular-nums">
                      {formatNaira(dish.priceNaira)}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleAdd(dish)}
                      className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isJustAdded
                          ? 'bg-emerald-800 text-white'
                          : 'bg-stone-100 text-zinc-900 hover:bg-emerald-900 hover:text-white'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added to Order</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Order Dish</span>
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
