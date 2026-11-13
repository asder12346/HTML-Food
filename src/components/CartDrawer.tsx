import { useState, type FormEvent } from 'react';
import { Building2, CheckCircle2, CreditCard, Minus, Plus, Trash2, Truck, X } from 'lucide-react';
import { formatNaira, type ProductItem } from '../data/catalog';
import { ResilientImage } from './ResilientImage';

export interface CartEntry {
  item: ProductItem;
  quantity: number;
}

type FulfillmentType = 'akure' | 'nigeria' | 'export';
type PaymentMethod = 'card' | 'transfer' | 'cod';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  entries: CartEntry[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

const DELIVERY_FEES: Record<FulfillmentType, { label: string; fee: number; eta: string }> = {
  akure: { label: 'Akure Delivery', fee: 1500, eta: '35 – 45 minutes' },
  nigeria: { label: 'Nationwide (Nigeria)', fee: 3500, eta: '24 – 48 hours' },
  export: { label: 'Worldwide Export', fee: 12000, eta: '4 – 7 business days' },
};

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  card: 'Card Payment (Visa / Mastercard / Verve)',
  transfer: 'Instant Bank Transfer',
  cod: 'Pay on Delivery (Akure Only)',
};

export function CartDrawer({
  isOpen,
  onClose,
  entries,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [fulfillment, setFulfillment] = useState<FulfillmentType>('akure');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [cardLastFour, setCardLastFour] = useState('4242');
  const [cardExpiry, setCardExpiry] = useState('09/28');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [destination, setDestination] = useState('');
  const [error, setError] = useState('');
  const [orderConfirmation, setOrderConfirmation] = useState<{
    orderNumber: string;
    customerName: string;
    items: CartEntry[];
    subtotal: number;
    deliveryFee: number;
    total: number;
    destination: string;
    fulfillment: FulfillmentType;
    paymentMethod: PaymentMethod;
  } | null>(null);

  if (!isOpen) return null;

  const subtotal = entries.reduce(
    (sum, entry) => sum + entry.item.priceNaira * entry.quantity,
    0
  );
  const deliveryFee = entries.length > 0 ? DELIVERY_FEES[fulfillment].fee : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleSelectFulfillment = (next: FulfillmentType) => {
    setFulfillment(next);
    if (next !== 'akure' && paymentMethod === 'cod') {
      setPaymentMethod('card');
    }
  };

  const handleCheckout = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (entries.length === 0) {
      setError('Your cart is empty. Add a meal or foodstuff bundle first.');
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
      setError('Please enter a valid email address for your receipt.');
      return;
    }
    if (!destination.trim()) {
      setError('Please enter your delivery street address and city/state.');
      return;
    }
    if (paymentMethod === 'card' && (cardLastFour.trim().length < 4 || !cardExpiry.trim())) {
      setError('Please verify your card digits and expiry date.');
      return;
    }

    const orderNumber = `HF-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderConfirmation({
      orderNumber,
      customerName: customerName.trim(),
      items: [...entries],
      subtotal,
      deliveryFee,
      total: grandTotal,
      destination: destination.trim(),
      fulfillment,
      paymentMethod,
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
              Secure checkout · Meals &amp; Nigerian foodstuffs
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
            <div className="py-4 space-y-5">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-7 h-7 text-emerald-800 shrink-0" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-900">
                    Order Confirmed
                  </p>
                  <h3 className="font-display text-2xl font-semibold text-zinc-900 tabular-nums">
                    #{orderConfirmation.orderNumber}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-stone-600 leading-relaxed">
                Thank you,{' '}
                <span className="font-semibold text-zinc-900">
                  {orderConfirmation.customerName}
                </span>
                . Your order is confirmed and being prepared at our Akure kitchen &amp; dispatch hub.
              </p>

              {/* Itemized Receipt */}
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-3 text-sm">
                <div className="space-y-1.5 border-b border-stone-200 pb-3">
                  {orderConfirmation.items.map(({ item, quantity }) => (
                    <div key={item.id} className="flex justify-between gap-2 text-xs">
                      <span className="text-zinc-800">
                        {quantity}× {item.name}
                      </span>
                      <span className="font-medium text-zinc-900 tabular-nums shrink-0">
                        {formatNaira(item.priceNaira * quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-stone-500">Payment Method</span>
                  <span className="font-medium text-zinc-900 text-right">
                    {PAYMENT_LABELS[orderConfirmation.paymentMethod]}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-500">Estimated Delivery</span>
                  <span className="font-medium text-emerald-900">
                    {DELIVERY_FEES[orderConfirmation.fulfillment].eta}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-500">Destination</span>
                  <span className="font-medium text-zinc-900 text-right max-w-[200px]">
                    {orderConfirmation.destination}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200">
                  <span className="font-semibold text-zinc-900">Total Amount</span>
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
                Add any Nigerian foodstuff bundle or restaurant dish to begin checkout.
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

              {/* Delivery Zone, Payment Method & Customer Form */}
              <form
                id="cart-checkout-form"
                onSubmit={handleCheckout}
                noValidate
                className="space-y-5 pt-4 border-t border-stone-200"
              >
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                    1. Delivery Area
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['akure', 'nigeria', 'export'] as FulfillmentType[]).map((zone) => (
                      <button
                        key={zone}
                        type="button"
                        onClick={() => handleSelectFulfillment(zone)}
                        className={`py-2 px-2 min-h-[40px] text-[11px] font-semibold rounded-lg border text-center transition-colors cursor-pointer ${
                          fulfillment === zone
                            ? 'border-emerald-900 bg-emerald-900 text-white'
                            : 'border-stone-200 bg-stone-50 text-zinc-800 hover:border-stone-400'
                        }`}
                      >
                        {DELIVERY_FEES[zone].label}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-stone-500 mt-1.5">
                    Estimated delivery: {DELIVERY_FEES[fulfillment].eta}
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-stone-500">
                    2. Recipient Details
                  </span>
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
                      Delivery Address
                    </label>
                    <input
                      id="checkout-address"
                      type="text"
                      placeholder="Street, Area, City / State"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-stone-300 text-sm focus:outline-2 focus:outline-emerald-900"
                    />
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="space-y-2.5">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-stone-500">
                    3. Payment Method
                  </span>

                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-emerald-900 bg-stone-50 text-zinc-900'
                          : 'border-stone-200 text-stone-700 hover:border-stone-400'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-emerald-900 shrink-0" />
                      <span className="font-semibold">Card Payment (Visa / Mastercard / Verve)</span>
                    </button>

                    {paymentMethod === 'card' && (
                      <div className="grid grid-cols-2 gap-2.5 pl-2 pt-1">
                        <div>
                          <label htmlFor="card-digits" className="block text-[11px] text-stone-500 mb-1">
                            Card Last 4 Digits
                          </label>
                          <input
                            id="card-digits"
                            type="text"
                            maxLength={4}
                            value={cardLastFour}
                            onChange={(e) => setCardLastFour(e.target.value.replace(/\D/g, ''))}
                            className="w-full h-9 px-2.5 rounded-md border border-stone-300 text-xs tabular-nums focus:outline-2 focus:outline-emerald-900"
                          />
                        </div>
                        <div>
                          <label htmlFor="card-exp" className="block text-[11px] text-stone-500 mb-1">
                            Expiry (MM/YY)
                          </label>
                          <input
                            id="card-exp"
                            type="text"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full h-9 px-2.5 rounded-md border border-stone-300 text-xs tabular-nums focus:outline-2 focus:outline-emerald-900"
                          />
                        </div>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('transfer')}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                        paymentMethod === 'transfer'
                          ? 'border-emerald-900 bg-stone-50 text-zinc-900'
                          : 'border-stone-200 text-stone-700 hover:border-stone-400'
                      }`}
                    >
                      <Building2 className="w-4 h-4 text-emerald-900 shrink-0" />
                      <span className="font-semibold">Instant Bank Transfer</span>
                    </button>

                    {paymentMethod === 'transfer' && (
                      <div className="rounded-lg border border-stone-200 bg-stone-50 p-3 text-xs text-stone-700 space-y-1">
                        <p className="font-semibold text-zinc-900">HTML Foods Dispatch Account</p>
                        <p className="tabular-nums">Moniepoint MFB · 8090 670 197 · HTML Foods Ltd</p>
                        <p className="text-[11px] text-stone-500">
                          Click Complete Order below after initiating your transfer for instant verification.
                        </p>
                      </div>
                    )}

                    {fulfillment === 'akure' && (
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                          paymentMethod === 'cod'
                            ? 'border-emerald-900 bg-stone-50 text-zinc-900'
                            : 'border-stone-200 text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        <Truck className="w-4 h-4 text-emerald-900 shrink-0" />
                        <span className="font-semibold">Pay on Delivery (Akure Orders)</span>
                      </button>
                    )}
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
          <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-stone-600">
              <span>Subtotal</span>
              <span className="tabular-nums font-medium text-zinc-900">
                {formatNaira(subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-stone-600">
              <span>Delivery ({DELIVERY_FEES[fulfillment].label})</span>
              <span className="tabular-nums font-medium text-zinc-900">
                {formatNaira(deliveryFee)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm pt-1.5 border-t border-stone-200">
              <span className="font-semibold text-zinc-900">Total</span>
              <span className="text-lg font-semibold text-zinc-900 tabular-nums">
                {formatNaira(grandTotal)}
              </span>
            </div>
            <button
              type="submit"
              form="cart-checkout-form"
              className="w-full py-3 min-h-[44px] text-sm font-semibold text-white bg-emerald-900 hover:bg-emerald-950 rounded-lg transition-colors cursor-pointer"
            >
              Complete Order · {formatNaira(grandTotal)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
