import { CHEF_PROFILES, RESTAURANT_MENU, type ProductItem } from '../data/catalog';
import { ResilientImage } from './ResilientImage';

interface ChefSectionProps {
  onBookChefTable: () => void;
  onOrderSignatureDish: (dish: ProductItem) => void;
}

export function ChefSection({ onBookChefTable, onOrderSignatureDish }: ChefSectionProps) {
  const findDish = (id: string) =>
    RESTAURANT_MENU.find((dish) => dish.id === id) || RESTAURANT_MENU[0];

  return (
    <section id="chefs" className="py-16 lg:py-20 border-b border-stone-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider uppercase text-emerald-900 mb-2">
              Meet Our Chefs
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 text-balance">
              Culinary Craft Led by Passionate Masters
            </h2>
            <p className="text-base text-stone-600 mt-2">
              Every dish plated in our Akure dining room and every spice blend sealed for delivery
              passes through the hands of our culinary team.
            </p>
          </div>

          <button
            type="button"
            onClick={onBookChefTable}
            className="inline-flex items-center justify-center px-6 py-3 min-h-[44px] text-sm font-semibold text-white bg-emerald-900 hover:bg-emerald-950 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
          >
            Reserve Chef&apos;s Table
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CHEF_PROFILES.map((chef) => {
            const signatureItem = findDish(chef.featuredProductId);
            return (
              <article
                key={chef.id}
                className="flex flex-col justify-between rounded-xl border border-stone-200 bg-stone-50/60 overflow-hidden"
              >
                <div>
                  <div className="aspect-[3/4] w-full overflow-hidden bg-stone-200">
                    <ResilientImage
                      src={chef.image}
                      alt={`${chef.name} — ${chef.role}`}
                      className="w-full h-full object-cover object-top"
                      fallbackLabel={chef.name}
                    />
                  </div>

                  <div className="p-6 pb-4">
                    <div className="text-xs font-medium text-emerald-900 mb-1.5">
                      {chef.role} · {chef.experience}
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-zinc-900 mb-3">
                      {chef.name}
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed mb-5">{chef.bio}</p>

                    <div className="pt-4 border-t border-stone-200">
                      <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                        Signature Dishes
                      </p>
                      <ul className="space-y-1 text-sm font-medium text-zinc-900">
                        {chef.signatureDishes.map((dishName) => (
                          <li key={dishName}>{dishName}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 flex items-center justify-between gap-3 border-t border-stone-200/70">
                  <button
                    type="button"
                    onClick={() => onOrderSignatureDish(signatureItem)}
                    className="w-full py-2.5 min-h-[40px] text-xs font-semibold text-zinc-900 bg-white border border-stone-300 hover:border-emerald-900 hover:bg-emerald-900 hover:text-white rounded-lg transition-colors cursor-pointer"
                  >
                    Order {signatureItem.name.split('&')[0].trim()}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
