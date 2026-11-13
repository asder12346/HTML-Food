import { useState } from 'react';
import { HOW_IT_WORKS_STEPS, TESTIMONIALS } from '../data/catalog';

const DELIVERY_ZONES: Record<string, string> = {
  akure: 'Akure, Ondo State · Hot restaurant meals & foodstuffs delivered in 35–45 mins',
  lagos: 'Lagos, Ibadan & Abuja · Express interstate courier delivery in 24 hours',
  uk: 'United Kingdom (London, Manchester, Birmingham) · Air freight in 4–5 business days',
  usa: 'United States (Houston, Atlanta, New York) · Tracked air export in 5–7 business days',
  canada: 'Canada (Toronto, Calgary, Ottawa) · Tracked air export in 5–7 business days',
};

export function HowItWorksAndTestimonials() {
  const [locationInput, setLocationInput] = useState('Akure, Ondo State');
  const [checkedZone, setCheckedZone] = useState(DELIVERY_ZONES.akure);

  const handleCheckLocation = (val: string) => {
    setLocationInput(val);
    const normalized = val.toLowerCase();
    if (normalized.includes('akure') || normalized.includes('ondo')) {
      setCheckedZone(DELIVERY_ZONES.akure);
    } else if (
      normalized.includes('lagos') ||
      normalized.includes('ibadan') ||
      normalized.includes('abuja') ||
      normalized.includes('nigeria')
    ) {
      setCheckedZone(DELIVERY_ZONES.lagos);
    } else if (
      normalized.includes('uk') ||
      normalized.includes('london') ||
      normalized.includes('manchester')
    ) {
      setCheckedZone(DELIVERY_ZONES.uk);
    } else if (
      normalized.includes('us') ||
      normalized.includes('houston') ||
      normalized.includes('new york') ||
      normalized.includes('atlanta')
    ) {
      setCheckedZone(DELIVERY_ZONES.usa);
    } else if (normalized.includes('canada') || normalized.includes('toronto')) {
      setCheckedZone(DELIVERY_ZONES.canada);
    } else if (val.trim().length > 2) {
      setCheckedZone(
        `${val.trim()} · Nationwide & worldwide dispatch available with vacuum-sealed packaging`
      );
    }
  };

  return (
    <>
      {/* How It Works */}
      <section id="how-it-works" className="py-16 lg:py-20 border-b border-stone-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-xl">
              <p className="text-xs font-semibold tracking-wider uppercase text-emerald-900 mb-2">
                How It Works
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 text-balance">
                Order in 3 Easy Steps
              </h2>
              <p className="text-base text-stone-600 mt-2">
                Getting your favorite food has never been easier
              </p>
            </div>

            {/* Interactive Location Availability Check */}
            <div className="w-full lg:w-auto lg:min-w-[380px]">
              <label
                htmlFor="shipping-zone-input"
                className="block text-xs font-semibold text-zinc-800 mb-1.5"
              >
                Check Delivery Availability in Your Area
              </label>
              <div className="flex gap-2">
                <input
                  id="shipping-zone-input"
                  type="text"
                  value={locationInput}
                  onChange={(e) => handleCheckLocation(e.target.value)}
                  placeholder="Enter city or state (e.g. Akure, Lagos, Abuja, London)"
                  className="flex-1 h-11 px-3 rounded-lg border border-stone-300 bg-stone-50 text-sm text-zinc-900 focus:outline-2 focus:outline-emerald-900"
                />
              </div>
              <p className="text-xs text-emerald-900 font-medium mt-2">{checkedZone}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_WORKS_STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-stone-200 bg-stone-50/60 p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <span className="font-display text-3xl font-semibold text-emerald-900 tabular-nums block mb-4">
                    {item.step}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-zinc-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section id="testimonials" className="py-16 lg:py-20 border-b border-stone-200 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-semibold tracking-wider uppercase text-emerald-900 mb-2">
              Guest &amp; Customer Reviews
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 text-balance">
              Trusted Across Nigeria &amp; Our Akure Dining Room
            </h2>
            <p className="text-base text-stone-600 mt-2">
              Rated 4.9 out of 5 across 5,000+ foodstuff shipments and dining reservations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((review) => (
              <figure
                key={review.id}
                className="rounded-xl border border-stone-200 bg-white p-6 flex flex-col justify-between gap-6"
              >
                <blockquote className="text-sm sm:text-base text-zinc-800 leading-relaxed">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>

                <figcaption className="pt-4 border-t border-stone-100">
                  <div className="text-sm font-semibold text-zinc-900">{review.author}</div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    {review.role} · {review.location}
                  </div>
                  <div className="text-xs font-medium text-emerald-900 mt-1.5">
                    {review.context}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
