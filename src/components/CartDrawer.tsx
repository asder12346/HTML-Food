import { useState, type FormEvent } from 'react';
import { CheckCircle2, Minus, Plus, Trash2, X } from 'lucide-react';
import { formatNaira, type ProductItem } from '../data/catalog';
import { ResilientImage } from './ResilientImage';

export interface CartEntry {
  item: ProductItem;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  entries: CartEntry[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  entries,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [fulfillment, setFulfillment] = useState<'export' | 'local'>('export');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [destination, setDestination] = useState('');
  const [error, setError] = useState('');
  const [orderConfirmation, setOrderConfirmation] = useState<{
    orderNumber: string;
    total: number;
    destination: string;
    fulfillment: 'export' | 'local';
  } | null>(null);

  if (!isOpen) return null;

  const subtotal = entries.reduce(
    (sum, entry) => sum + entry.item.priceNaira * entry.quantity,
    0
  );

  const handleCheckout = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (entries.length === 0) {
      setError('Your cart is empty. Add an export bundle or dish first.');
      return;
    }
    if (!customerName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!customerPhone.trim() || customerPhone.trim().length < 7) {
      setError('Please enter a valid contact phone number.');
      return;
    }
    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      setError('Please enter a valid email address for tracking updates.');
      return;
    }
    if (!destination.trim()) {
      setError('Please enter your delivery street address and country.');
      return;
    }

    const orderNumber = `HF-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderConfirmation({
      orderNumber,
      total: subtotal,
      destination: destination.trim(),
      fulfillment,
    });
    onClearCart();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Order cart and checkout"
    >
      <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl border-l border-stone-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-zinc-900">Your Order</h2>
            <p className="text-xs text-stone-500">
              Export foodstuffs &amp; Akure kitchen delivery
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setOrderConfirmation(null);
              onClose();
            }}
            aria-label="Close order drawer"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-stone-500 hover:text-zinc-900 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {orderConfirmation ? (
            <div className="py-6 space-y-5">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-7 h-7 text-emerald-800 shrink-0" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-900">
                    Order Confirmed
                  </p>
                  <h3 className="font-display text-2xl font-semibold text-zinc-900 tabular-nums">
                    Order #{orderConfirmation.orderNumber}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-stone-600 leading-relaxed">
                {orderConfirmation.fulfillment === 'export'
                  ? 'Preparing your vacuum-sealed export parcel from our Akure hub. Tracking details will arrive via email shortly.'
                  : 'Our kitchen has received your order and is preparing it fresh for dispatch in Akure.'}
              </p>

              <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-500">Destination</span>
                  <span className="font-medium text-zinc-900 text-right max-w-[200px]">
                    {orderConfirmation.destination}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200">
                  <span className="text-stone-500">Total Paid</span>
                  <span className="font-semibold text-zinc-900 tabular-nums">
                    {formatNaira(orderConfirmation.total)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setOrderConfirmation(null);
                  onClose();
                }}
                className="w-full py-3 min-h-[44px] text-sm font-semibold text-white bg-emerald-900 hover:bg-emerald-950 rounded-lg transition-colors cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          ) : entries.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <p className="font-display text-xl font-semibold text-zinc-900">
                Your order bag is empty
              </p>
              <p className="text-sm text-stone-600">
                Add any Nigerian export foodstuff bundle or restaurant dish to begin checkout.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 px-5 py-2.5 min-h-[40px] text-xs font-semibold text-white bg-emerald-900 rounded-lg hover:bg-emerald-950 transition-colors cursor-pointer"
              >
                Browse Products &amp; Menu
              </button>
            </div>
          ) : (
            <>
              {/* Itemized List */}
              <ul className="divide-y divide-stone-200">
                {entries.map(({ item, quantity }) => (
                  <li key={item.id} className="py-4 flex gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                      <ResilientImage
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-zinc-900 leading-snug">
                          {item.name}
                        </h3>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="text-stone-400 hover:text-red-700 p-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">{item.packSize}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center border border-stone-300 rounded-md">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.id, -1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="w-8 h-8 flex items-center justify-center text-stone-700 hover:bg-stone-100 cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold tabular-nums text-zinc-900">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.id, 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="w-8 h-8 flex items-center justify-center text-stone-700 hover:bg-stone-100 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-sm font-semibold text-zinc-900 tabular-nums">
                          {formatNaira(item.priceNaira * quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Delivery Mode & Checkout Form */}
              <form id="cart-checkout-form" onSubmit={handleCheckout} noValidate className="space-y-4 pt-4 border-t border-stone-200">
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                    Delivery Method
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFulfillment('export')}
                      className={`py-2 px-3 min-h-[40px] text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                        fulfillment === 'export'
                          ? 'border-emerald-900 bg-emerald-900 text-white'
                          : 'border-stone-200 bg-stone-50 text-zinc-800'
                      }`}
                    >
                      Worldwide Export
                    </button>
                    <button
                      type="button"
                      onClick={() => setFulfillment('local')}
                      className={`py-2 px-3 min-h-[40px] text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                        fulfillment === 'local'
                          ? 'border-emerald-900 bg-emerald-900 text-white'
                          : 'border-stone-200 bg-stone-50 text-zinc-800'
                      }`}
                    >
                      Akure Kitchen Delivery
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label htmlFor="checkout-name" className="block text-xs font-medium text-zinc-800 mb-1">
                      Full Name
                    </label>
                    <input
                      id="checkout-name"
                      type="text"
                      placeholder="Tomiwa Adeyemi"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-stone-300 text-sm focus:outline-2 focus:outline-emerald-900"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="checkout-phone" className="block text-xs font-medium text-zinc-800 mb-1">
                        Phone
                      </label>
                      <input
                        id="checkout-phone"
                        type="tel"
                        placeholder="0906 701 9742"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full h-10 px-3 rounded-lg border border-stone-300 text-sm tabular-nums focus:outline-2 focus:outline-emerald-900"
                      />
                    </div>
                    <div>
                      <label htmlFor="checkout-email" className="block text-xs font-medium text-zinc-800 mb-1">
                        Email
                      </label>
                      <input
                        id="checkout-email"
                        type="email"
                        placeholder="you@email.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full h-10 px-3 rounded-lg border border-stone-300 text-sm focus:outline-2 focus:outline-emerald-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="checkout-address" className="block text-xs font-medium text-zinc-800 mb-1">
                      Delivery Address &amp; Country
                    </label>
                    <input
                      id="checkout-address"
                      type="text"
                      placeholder="Street, City, Postal Code, Country"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-stone-300 text-sm focus:outline-2 focus:outline-emerald-900"
                    />
                  </div>
                </div>

                {error && (
                  <p role="alert" className="text-xs font-medium text-red-700">
                    {error}
                  </p>
                )}
              </form>
            </>
          )}
        </div>

        {/* Footer Totals */}
        {!orderConfirmation && entries.length > 0 && (
          <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-stone-600">Subtotal</span>
              <span className="text-lg font-semibold text-zinc-900 tabular-nums">
                {formatNaira(subtotal)}
              </span>
            </div>
            <button
              type="submit"
              form="cart-checkout-form"
              className="w-full py-3 min-h-[44px] text-sm font-semibold text-white bg-emerald-900 hover:bg-emerald-950 rounded-lg transition-colors cursor-pointer"
            >
              Complete Order · {formatNaira(subtotal)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
