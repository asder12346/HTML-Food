import { CHEF_PORTRAIT_IMAGE } from '../data/catalog';
import { ResilientImage } from './ResilientImage';

interface ChefSectionProps {
  onBookChefTable: () => void;
}

export function ChefSection({ onBookChefTable }: ChefSectionProps) {
  const culinaryBrigade = [
    {
      name: 'Chef Tunde Adebayo',
      role: 'Executive Head Chef',
      experience: '18 Years · Ondo Heritage & Open-Fire Cuisine',
    },
    {
      name: 'Chef Amaka Nwosu',
      role: 'Sous Chef & Soup Master',
      experience: '11 Years · Traditional Egusi, Ogbono & Seafood Broths',
    },
    {
      name: 'Chef Ibrahim Danjuma',
      role: 'Grill & Spice Specialist',
      experience: '9 Years · Charcoal Suya & Export Spice Roasting',
    },
  ];

  return (
    <section id="chefs" className="py-16 lg:py-20 border-b border-stone-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Portrait Column */}
          <div className="lg:col-span-5">
            <div className="h-full min-h-[360px] lg:min-h-[480px] rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
              <ResilientImage
                src={CHEF_PORTRAIT_IMAGE}
                alt="Executive Head Chef Tunde Adebayo in the HTML Foods kitchen"
                className="w-full h-full lg:h-full object-cover object-top"
                fallbackLabel="Executive Head Chef Tunde Adebayo"
              />
            </div>
          </div>

          {/* Story & Brigade Column */}
          <div className="lg:col-span-7 flex flex-col justify-between py-1">
            <div>
              <p className="text-xs font-semibold tracking-wider uppercase text-emerald-900 mb-2">
                Meet Our Best Chef
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 text-balance mb-4">
                Chef Tunde Adebayo Leads Our Kitchen &amp; Export Pantry
              </h2>

              <p className="text-base text-stone-600 leading-relaxed mb-5">
                Trained across traditional Ondo State kitchens and modern Lagos dining rooms,
                Executive Chef Tunde Adebayo oversees every dish plated at Fonts Hall Complex
                as well as the smoking, spice-blending, and moisture inspection of our
                international foodstuff bundles.
              </p>

              <p className="text-base text-stone-600 leading-relaxed mb-8">
                Whether you are seated for his signature hand-pounded yam and stockfish egusi
                or unboxing a 50kg family export parcel in London or Houston, every ingredient
                meets the same kitchen standard.
              </p>

              {/* Culinary Brigade List — Clean Hairline Rows */}
              <div className="border-t border-stone-200 divide-y divide-stone-200 mb-8">
                {culinaryBrigade.map((member) => (
                  <div
                    key={member.name}
                    className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                  >
                    <div>
                      <span className="text-sm font-semibold text-zinc-900">
                        {member.name}
                      </span>
                      <span className="text-stone-400 mx-2" aria-hidden="true">
                        ·
                      </span>
                      <span className="text-sm font-medium text-emerald-900">
                        {member.role}
                      </span>
                    </div>
                    <span className="text-xs text-stone-500">{member.experience}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onBookChefTable}
                className="inline-flex items-center justify-center px-6 py-3 min-h-[44px] text-sm font-semibold text-white bg-emerald-900 hover:bg-emerald-950 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
              >
                Reserve Chef&apos;s Table
              </button>
              <a
                href="#menu"
                className="text-sm font-semibold text-zinc-900 hover:text-emerald-900 underline underline-offset-4 transition-colors whitespace-nowrap"
              >
                Explore Signature Dishes
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
