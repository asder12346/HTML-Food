import heroImg from '../assets/images/hero_nigerian_feast_1794560054440.jpg';
import driedSeafoodImg from '../assets/images/export_dried_seafood_1794560055353.jpg';
import oilsSpicesImg from '../assets/images/export_oils_spices_1794560056682.jpg';
import staplesBundleImg from '../assets/images/export_staples_bundle_1794560055749.jpg';
import restaurantDishesImg from '../assets/images/restaurant_signature_dishes_1794560056779.jpg';
import chefPortraitImg from '../assets/images/chef_head_portrait_1794560057166.jpg';

export interface ExportCategory {
  id: string;
  name: string;
  description: string;
  productCountLabel: string;
  filterKey: string;
  image: string;
}

export interface ProductItem {
  id: string;
  name: string;
  badgeLabel: string;
  packSize: string;
  category: string;
  description: string;
  priceNaira: number;
  image: string;
  kind: 'export' | 'dish';
  spiceLevel?: string;
  prepTime?: string;
}

export interface StepItem {
  step: string;
  title: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  context: string;
}

export const HERO_IMAGE = heroImg;
export const CHEF_PORTRAIT_IMAGE = chefPortraitImg;
export const RESTAURANT_DISHES_IMAGE = restaurantDishesImg;

export const EXPORT_CATEGORIES: ExportCategory[] = [
  {
    id: 'cat-seafood',
    name: 'Dried Seafood',
    description: 'Stockfish, crayfish, dried catfish, smoked fish - vacuum sealed',
    productCountLabel: '20+ products',
    filterKey: 'Seafood',
    image: driedSeafoodImg,
  },
  {
    id: 'cat-staples',
    name: 'Staples & Grains',
    description: 'Garri, yam flour, egusi, ogbono, beans, and more',
    productCountLabel: '25+ products',
    filterKey: 'Staples',
    image: staplesBundleImg,
  },
  {
    id: 'cat-oils-spices',
    name: 'Oils & Spices',
    description: 'Palm oil, groundnut oil, suya spice, cameroon pepper',
    productCountLabel: '15+ products',
    filterKey: 'Oils',
    image: oilsSpicesImg,
  },
  {
    id: 'cat-bundles',
    name: 'Bundle Packages',
    description: 'Complete foodstuff bundles for families abroad',
    productCountLabel: '10+ bundles',
    filterKey: 'Bundle',
    image: heroImg,
  },
];

export const EXPORT_PRODUCTS: ProductItem[] = [
  {
    id: 'exp-dried-fish',
    name: 'Premium Dried Fish Bundle',
    badgeLabel: 'Bestseller',
    packSize: '5kg Pack',
    category: 'Seafood',
    description:
      'Assorted Nigerian dried fish (stockfish, crayfish, dried catfish) - 5kg export pack, vacuum sealed for freshness',
    priceNaira: 500,
    image: driedSeafoodImg,
    kind: 'export',
  },
  {
    id: 'exp-ogbono-egusi',
    name: 'Ogbono & Egusi Collection',
    badgeLabel: 'Popular',
    packSize: '10kg Pack',
    category: 'Soup Essentials',
    description:
      'Ground ogbono seeds and egusi (melon seeds) combo - 10kg total, perfect for authentic Nigerian soups',
    priceNaira: 1000,
    image: oilsSpicesImg,
    kind: 'export',
  },
  {
    id: 'exp-palm-oil',
    name: 'Premium Palm Oil',
    badgeLabel: 'Organic',
    packSize: '25L',
    category: 'Oils',
    description:
      'Pure Nigerian red palm oil, cold-pressed and unrefined - 25 liters in export-grade containers',
    priceNaira: 2500,
    image: oilsSpicesImg,
    kind: 'export',
  },
  {
    id: 'exp-yam-garri',
    name: 'Yam Flour & Garri Bundle',
    badgeLabel: 'Essential',
    packSize: '20kg Pack',
    category: 'Staples',
    description:
      'Authentic pounded yam flour and premium garri (cassava flakes) - 20kg combo pack',
    priceNaira: 2000,
    image: staplesBundleImg,
    kind: 'export',
  },
  {
    id: 'exp-spice-set',
    name: 'Nigerian Spice Collection',
    badgeLabel: 'Complete Set',
    packSize: '5kg Assorted',
    category: 'Spices',
    description:
      'Complete spice set: suya spice, cameroon pepper, locust beans (iru), dried pepper - 5kg assorted',
    priceNaira: 500,
    image: oilsSpicesImg,
    kind: 'export',
  },
  {
    id: 'exp-smoked-fish',
    name: 'Smoked Fish Premium Box',
    badgeLabel: 'Premium',
    packSize: '8kg Pack',
    category: 'Seafood',
    description:
      'Premium smoked mackerel and catfish, traditionally smoked - 8kg vacuum-sealed export pack',
    priceNaira: 800,
    image: driedSeafoodImg,
    kind: 'export',
  },
  {
    id: 'exp-plantain-snacks',
    name: 'Plantain & Snacks Export Box',
    badgeLabel: 'Family Size',
    packSize: '15kg Pack',
    category: 'Snacks',
    description:
      'Plantain flour, chin chin, and dried plantain chips - 15kg variety pack for international shipping',
    priceNaira: 1500,
    image: staplesBundleImg,
    kind: 'export',
  },
  {
    id: 'exp-ultimate-mega',
    name: 'Ultimate Nigerian Foodstuff Bundle',
    badgeLabel: 'Best Value',
    packSize: '50kg Mega Pack',
    category: 'Bundle',
    description:
      'Complete package: dried fish, palm oil, spices, garri, egusi, ogbono, and more - 50kg mega pack',
    priceNaira: 5000,
    image: heroImg,
    kind: 'export',
  },
];

export const RESTAURANT_MENU: ProductItem[] = [
  {
    id: 'dish-pounded-yam-egusi',
    name: 'Akure Pounded Yam & Egusi Royal',
    badgeLabel: 'Chef Signature',
    packSize: 'Dine-in · Takeout',
    category: 'Soups & Swallows',
    description:
      'Silky hand-pounded Ondo white yam served with toasted egusi melon seed soup, stockfish, smoked catfish, and braised beef.',
    priceNaira: 6500,
    image: restaurantDishesImg,
    kind: 'dish',
    spiceLevel: 'Medium Heat',
    prepTime: '20 mins',
  },
  {
    id: 'dish-party-jollof',
    name: 'Smoky Wood-Fired Party Jollof',
    badgeLabel: 'House Favorite',
    packSize: 'Full Platter',
    category: 'Rice & Grills',
    description:
      'Long-grain parboiled rice simmered over open embers in roasted red pepper reduction, served with caramelized dodo and suya chicken.',
    priceNaira: 5800,
    image: heroImg,
    kind: 'dish',
    spiceLevel: 'Mild Smoky',
    prepTime: '15 mins',
  },
  {
    id: 'dish-catfish-peppersoup',
    name: 'Akure Catfish Pepper Soup',
    badgeLabel: 'Evening Classic',
    packSize: 'Clay Pot',
    category: 'Soups & Swallows',
    description:
      'Fresh river catfish poached in aromatic uda, uziza leaf, and calabash nutmeg broth with boiled yam medallions.',
    priceNaira: 7200,
    image: driedSeafoodImg,
    kind: 'dish',
    spiceLevel: 'Bold Spice',
    prepTime: '25 mins',
  },
  {
    id: 'dish-suya-skewers',
    name: 'Kilishi-Glazed Beef Suya Platter',
    badgeLabel: 'Charcoal Grill',
    packSize: '4 Skewers',
    category: 'Rice & Grills',
    description:
      'Prime sirloin strips dusted in house-roasted yaji peanut spice, seared over hardwood charcoal with red onions and roasted plantain.',
    priceNaira: 4900,
    image: heroImg,
    kind: 'dish',
    spiceLevel: 'Spicy',
    prepTime: '18 mins',
  },
  {
    id: 'dish-ofada-ayamase',
    name: 'Local Ofada Rice & Ayamase Stew',
    badgeLabel: 'Heritage Dish',
    packSize: 'Single Bowl',
    category: 'Rice & Grills',
    description:
      'Unpolished Ogun heirloom rice paired with green bell pepper designer sauce, iru locust beans, assorted meats, and boiled egg.',
    priceNaira: 6200,
    image: restaurantDishesImg,
    kind: 'dish',
    spiceLevel: 'Medium Heat',
    prepTime: '20 mins',
  },
  {
    id: 'dish-zobo-puffpuff',
    name: 'Spiced Puff-Puff & Zobo Flight',
    badgeLabel: 'Small Plate',
    packSize: 'Sharing Duo',
    category: 'Small Plates & Drinks',
    description:
      'Warm golden nutmeg puff-puff bites served with ginger-pineapple hibiscus zobo chilled in stoneware.',
    priceNaira: 2800,
    image: staplesBundleImg,
    kind: 'dish',
    spiceLevel: 'Sweet & Spiced',
    prepTime: '10 mins',
  },
];

export const HOW_IT_WORKS_STEPS: StepItem[] = [
  {
    step: '01',
    title: 'Choose Your Location',
    description: "Enter your address and we'll show you available items in your area",
  },
  {
    step: '02',
    title: 'Pick & Pay',
    description: 'Browse our menu, add items to cart, and checkout securely',
  },
  {
    step: '03',
    title: 'Fast Delivery',
    description: 'Sit back and relax while we deliver fresh food to your doorstep',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    quote:
      'Before switching to HTML Foods, half of our dried catfish shipments to Houston arrived crushed or stale. Their 5kg vacuum-sealed pack landed in 5 days smelling like fresh Akure market smoke.',
    author: 'Dr. Bukola Adeyemi',
    role: 'Consultant Pediatrician',
    location: 'Houston, USA',
    context: '5kg Dried Fish & 25L Palm Oil Export',
  },
  {
    id: 'test-2',
    quote:
      'We booked the Chef’s Tasting Table for our parents’ anniversary at Fonts Hall Complex. Chef Tunde served hand-pounded yam and egusi that reminded everyone of village festivals, with zero wait time.',
    author: 'Chukwuemeka Okafor',
    role: 'Principal Architect',
    location: 'Akure, Nigeria',
    context: 'Table Reservation · 8 Guests',
  },
  {
    id: 'test-3',
    quote:
      'Our family pantry in North London runs entirely on the 50kg Ultimate Nigerian Foodstuff Bundle. Unrefined red palm oil arrived leak-free, and the ogbono draws cleanly every single pot.',
    author: 'Folake Balogun-Wright',
    role: 'Operations Director',
    location: 'London, UK',
    context: '50kg Mega Pack · Quarterly Reorder',
  },
];

export const LEGAL_DOCUMENTS: Record<string, { title: string; updated: string; paragraphs: string[] }> = {
  'Shipping Policy': {
    title: 'Shipping Policy',
    updated: 'Updated November 2026',
    paragraphs: [
      'HTML Foods dispatches international export packages from Akure and Lagos hubs via tracked air freight partners to the USA, UK, Canada, Europe, and 30+ destinations worldwide.',
      'All dried seafood, spices, and grains are moisture-checked, double vacuum-sealed, and packed in export-certified food-grade boxes. Palm oil orders ship in triple-sealed tamper-proof HDPE containers.',
      'International transit takes 4–7 business days depending on customs clearance. Local restaurant orders within Akure, Ondo State are delivered within 35–50 minutes.',
    ],
  },
  'Terms of Service': {
    title: 'Terms of Service',
    updated: 'Updated November 2026',
    paragraphs: [
      'By placing a foodstuff export order, local delivery order, or restaurant table reservation with HTML Foods, you confirm that shipping and contact information provided is accurate.',
      'Table reservations are held for 20 minutes past the scheduled seating time. For parties of 6 or more, we recommend booking at least 24 hours in advance.',
      'Export pricing reflects standard Naira catalog rates; international air-freight surcharges are calculated transparently prior to final payment confirmation.',
    ],
  },
  'Refund Policy': {
    title: 'Refund Policy',
    updated: 'Updated November 2026',
    paragraphs: [
      'If any export package arrives damaged, unsealed, or missing items, notify htmlfoods@gmail.com or +234 906 701 9742 within 48 hours of delivery with order photos for an immediate replacement or full refund.',
      'Restaurant dine-in deposits or pre-orders cancelled at least 4 hours prior to seating time are refunded in full.',
    ],
  },
  'Privacy Policy': {
    title: 'Privacy Policy',
    updated: 'Updated November 2026',
    paragraphs: [
      'HTML Foods collects only the contact, delivery address, and reservation details strictly necessary to fulfill your dining booking or foodstuff shipment.',
      'We never sell customer records or phone numbers to third-party brokers. Shipment tracking notifications are sent directly to your provided email or phone number.',
    ],
  },
};

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`;
}
