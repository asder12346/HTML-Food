import heroImg from '../assets/images/hero_nigerian_feast_1794560054440.jpg';
import driedSeafoodImg from '../assets/images/export_dried_seafood_1794560055353.jpg';
import oilsSpicesImg from '../assets/images/export_oils_spices_1794560056682.jpg';
import staplesBundleImg from '../assets/images/export_staples_bundle_1794560055749.jpg';
import restaurantDishesImg from '../assets/images/restaurant_signature_dishes_1794560056779.jpg';
import restaurantAmbianceImg from '../assets/images/restaurant_dining_ambiance_1794560623018.jpg';
import chefTundeImg from '../assets/images/chef_head_portrait_1794560057166.jpg';
import chefNgoziImg from '../assets/images/chef_amaka_nwosu_1794560622097.jpg';
import chefIbrahimImg from '../assets/images/chef_ibrahim_danjuma_1794560622663.jpg';

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

export interface ChefProfile {
  id: string;
  name: string;
  role: string;
  experience: string;
  bio: string;
  signatureDishes: string[];
  featuredProductId: string;
  image: string;
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

export const BRAND_LOGO_URL = '/assets/aistudio/image_43a63e31.png';
export const WHATSAPP_URL =
  'https://wa.me/2349067019742?text=Hello%20HTML%20Foods%2C%20I%20would%20like%20to%20inquire%20about%20your%20meals%20and%20orders.';

export const HERO_IMAGE = heroImg;
export const RESTAURANT_DISHES_IMAGE = restaurantDishesImg;
export const RESTAURANT_AMBIANCE_IMAGE = restaurantAmbianceImg;

export const CHEF_PROFILES: ChefProfile[] = [
  {
    id: 'chef-tunde',
    name: 'Chef Tunde Adebayo',
    role: 'Executive Head Chef',
    experience: '18 Years Experience',
    bio: 'Trained across traditional Ondo State kitchens and modern Lagos dining rooms, Chef Tunde leads HTML Foods with an unwavering respect for open-fire aromatics, hand-pounded swallows, and unhurried spice extraction.',
    signatureDishes: ['Akure Pounded Yam & Egusi Royal', 'Smoky Wood-Fired Party Jollof'],
    featuredProductId: 'dish-pounded-yam-egusi',
    image: chefTundeImg,
  },
  {
    id: 'chef-ngozi',
    name: 'Chef Ngozi Okafor',
    role: 'Sous Chef & Soup Master',
    experience: '11 Years Experience',
    bio: 'Passionate about heritage Nigerian broths and fermented condiments, Chef Ngozi oversees every slow-simmered soup pot and inspects the moisture grade of our dried seafood and melon seed collections.',
    signatureDishes: ['Akure Catfish Pepper Soup', 'Local Ofada Rice & Ayamase Stew'],
    featuredProductId: 'dish-catfish-peppersoup',
    image: chefNgoziImg,
  },
  {
    id: 'chef-ibrahim',
    name: 'Chef Ibrahim Danjuma',
    role: 'Grill & Spice Specialist',
    experience: '9 Years Experience',
    bio: 'A third-generation suya spice roaster, Chef Ibrahim blends toasted groundnuts, ginger, cloves, and Cameroon pepper fresh daily—bringing bold charcoal depth to both our dine-in grill and export spice jars.',
    signatureDishes: ['Kilishi-Glazed Beef Suya Platter', 'Spiced Puff-Puff & Zobo Flight'],
    featuredProductId: 'dish-suya-skewers',
    image: chefIbrahimImg,
  },
];

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
    description: 'Complete foodstuff bundles for households across Nigeria & abroad',
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
      'Plantain flour, chin chin, and dried plantain chips - 15kg variety pack for fast dispatch',
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
      'Before switching to HTML Foods, half of our dried catfish parcels arrived crushed or stale. Their 5kg vacuum-sealed pack landed in Houston in 5 days smelling like fresh Akure market smoke.',
    author: 'Dr. Bukola Adeyemi',
    role: 'Consultant Pediatrician',
    location: 'Houston & Ibadan',
    context: '5kg Dried Fish & 25L Palm Oil Order',
  },
  {
    id: 'test-2',
    quote:
      'We booked the Chef’s Tasting Table for our parents’ anniversary at Fonts Hall Complex. Chef Tunde served hand-pounded yam and egusi that reminded everyone of village festivals, with zero wait time.',
    author: 'Chukwuemeka Okafor',
    role: 'Principal Architect',
    location: 'Akure, Ondo State',
    context: 'Table Reservation · 8 Guests',
  },
  {
    id: 'test-3',
    quote:
      'Whether ordering hot Party Jollof to our office in Victoria Island or restocking our family kitchen with the 50kg Ultimate Bundle, the packaging and flavor consistency are unmatched.',
    author: 'Folake Balogun-Wright',
    role: 'Operations Director',
    location: 'Lagos & London',
    context: '50kg Mega Pack · Quarterly Reorder',
  },
];

export const LEGAL_DOCUMENTS: Record<string, { title: string; updated: string; paragraphs: string[] }> = {
  'Shipping Policy': {
    title: 'Shipping Policy',
    updated: 'Updated November 2026',
    paragraphs: [
      'HTML Foods delivers hot meals across Akure within 35–45 minutes and dispatches nationwide Nigerian orders plus international foodstuff bundles to the USA, UK, Canada, and Europe.',
      'All dried seafood, spices, and grains are moisture-checked, double vacuum-sealed, and packed in export-certified food-grade boxes. Palm oil orders ship in triple-sealed tamper-proof HDPE containers.',
      'Interstate orders within Nigeria arrive within 24–48 hours; international air freight arrives within 4–7 business days with tracking.',
    ],
  },
  'Terms of Service': {
    title: 'Terms of Service',
    updated: 'Updated November 2026',
    paragraphs: [
      'By placing a foodstuff order, local restaurant delivery order, or table reservation with HTML Foods, you confirm that shipping and contact information provided is accurate.',
      'Table reservations are held for 20 minutes past the scheduled seating time. For parties of 6 or more, we recommend booking at least 24 hours in advance.',
      'Catalog pricing is displayed transparently in Naira (₦), with delivery fees calculated prior to final payment confirmation.',
    ],
  },
  'Refund Policy': {
    title: 'Refund Policy',
    updated: 'Updated November 2026',
    paragraphs: [
      'If any package arrives damaged, unsealed, or missing items, notify htmlfoods@gmail.com or 0906 701 9742 within 48 hours of delivery with order photos for an immediate replacement or full refund.',
      'Restaurant dine-in pre-orders cancelled at least 4 hours prior to seating time are refunded in full.',
    ],
  },
  'Privacy Policy': {
    title: 'Privacy Policy',
    updated: 'Updated November 2026',
    paragraphs: [
      'HTML Foods collects only the contact, delivery address, and reservation details strictly necessary to fulfill your dining booking or foodstuff order.',
      'We never sell customer records or phone numbers to third-party brokers. Order updates are sent directly to your provided email or phone number.',
    ],
  },
};

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`;
}
