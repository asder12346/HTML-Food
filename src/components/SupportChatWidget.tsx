import { useEffect, useRef, useState, type FormEvent } from 'react';
import { CheckCircle2, MessageSquare, Send, X } from 'lucide-react';
import { WHATSAPP_URL, formatNaira } from '../data/catalog';
import type { CartEntry } from './CartDrawer';
import type { ReservationData } from './ReservationSection';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  booking?: ReservationData;
}

interface SupportChatWidgetProps {
  cartEntries: CartEntry[];
  onBookingConfirmed: (reservation: ReservationData) => void;
}

export function SupportChatWidget({
  cartEntries,
  onBookingConfirmed,
}: SupportChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([
    'Book a table for 4',
    'What are your opening hours?',
    'Recommend a soup & staple bundle',
  ]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Welcome to HTML Foods! I can help you reserve a table step by step, recommend Nigerian meals or export bundles, or answer questions about delivery and our Akure kitchen.',
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const buildCartSummary = () => {
    if (cartEntries.length === 0) return 'Cart is currently empty.';
    return cartEntries
      .map(
        ({ item, quantity }) =>
          `${quantity}x ${item.name} (${formatNaira(item.priceNaira * quantity)})`
      )
      .join(', ');
  };

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Skip the synthetic welcome message when sending history so conversation starts cleanly on user turn
      const apiHistory = nextMessages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({ role: m.role, text: m.text }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiHistory,
          cartSummary: buildCartSummary(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Could not reach the HTML Foods assistant.');
      }

      let confirmedBooking: ReservationData | undefined;
      if (data.bookingCompleted && data.bookingDetails) {
        const d = data.bookingDetails;
        confirmedBooking = {
          id: `HF-RES-${Math.floor(1000 + Math.random() * 9000)}`,
          experience: d.experience || 'Main Dining Room',
          date: d.date || new Date().toISOString().split('T')[0],
          time: d.time || '7:00 PM',
          guests: Number(d.guests) || 2,
          name: d.name || 'Guest',
          phone: d.phone || '0906 701 9742',
          email: d.email || '',
          notes: d.notes || 'Booked via HTML Foods Concierge',
        };
        onBookingConfirmed(confirmedBooking);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}`,
          role: 'model',
          text: data.reply,
          booking: confirmedBooking,
        },
      ]);

      if (Array.isArray(data.suggestedPrompts) && data.suggestedPrompts.length > 0) {
        setSuggestedPrompts(data.suggestedPrompts);
      }
    } catch (err) {
      const errorText =
        err instanceof Error
          ? err.message
          : 'Connection issue. Please try again or reach us on WhatsApp at 0906 701 9742.';
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'model',
          text: errorText,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3">
      {/* Chat Panel */}
      {isOpen && (
        <section
          aria-label="HTML Foods Concierge Chat"
          className="w-[calc(100vw-2rem)] sm:w-[380px] h-[480px] max-h-[75vh] rounded-xl border border-stone-300 bg-white shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="px-4 py-3 bg-emerald-950 text-white flex items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-base font-semibold leading-tight">
                HTML Foods Concierge
              </h3>
              <p className="text-[11px] text-emerald-200">
                Multi-step reservations &amp; meal support
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close support chat"
              className="w-8 h-8 inline-flex items-center justify-center rounded-md text-emerald-100 hover:bg-emerald-900 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-emerald-900 text-white'
                      : 'bg-white border border-stone-200 text-zinc-800'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.booking && (
                  <div className="mt-2 w-[88%] rounded-xl border border-emerald-900/30 bg-white p-3 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold text-emerald-900">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Reservation Confirmed · {msg.booking.id}</span>
                    </div>
                    <p className="text-zinc-800">
                      {msg.booking.experience} · {msg.booking.guests} guests
                    </p>
                    <p className="text-stone-600 tabular-nums">
                      {msg.booking.date} at {msg.booking.time}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-xl bg-white border border-stone-200 px-3.5 py-2 text-xs text-stone-500">
                  Typing...
                </div>
              </div>
            )}
          </div>

          {/* Contextual Suggestions */}
          {suggestedPrompts.length > 0 && !isLoading && (
            <div className="px-3 py-2 border-t border-stone-200 bg-white flex flex-wrap gap-1.5">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => void sendMessage(prompt)}
                  className="px-2.5 py-1 text-[11px] font-medium text-emerald-900 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-stone-200 bg-white flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about meals, delivery, or book a table..."
              aria-label="Message HTML Foods Concierge"
              className="flex-1 h-10 px-3 rounded-lg border border-stone-300 text-sm text-zinc-900 focus:outline-2 focus:outline-emerald-900"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="w-10 h-10 inline-flex items-center justify-center rounded-lg bg-emerald-900 text-white hover:bg-emerald-950 disabled:opacity-50 transition-colors cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </section>
      )}

      {/* Compact Floating Action Triggers: WhatsApp + AI Concierge */}
      <div className="flex items-center gap-2.5">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with HTML Foods on WhatsApp about meals"
          title="Chat on WhatsApp about meals"
          className="inline-flex items-center justify-center gap-2 h-11 px-3.5 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-semibold shadow-lg transition-colors whitespace-nowrap shrink-0"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="w-4 h-4 fill-current shrink-0"
          >
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m5.79 14.02c-.24.69-1.42 1.32-1.97 1.4-.52.08-1.18.11-1.9-.12-.44-.14-1.01-.33-1.74-.65-3.07-1.32-5.07-4.42-5.22-4.63-.15-.2-1.25-1.66-1.25-3.17s.79-2.25 1.07-2.55c.28-.31.62-.38.82-.38.21 0 .41.01.59.01.19 0 .44-.07.69.53.26.62.87 2.13.95 2.29.08.15.13.34.03.54-.1.2-.15.33-.31.51-.15.18-.32.4-.46.54-.15.15-.31.32-.13.62.18.31.79 1.31 1.7 2.12 1.17 1.04 2.15 1.37 2.46 1.52.31.15.49.13.67-.08.18-.2.77-.9.97-1.21.21-.3.41-.26.69-.15.28.1 1.8.85 2.11 1 .31.16.51.23.59.36.07.14.07.78-.17 1.47" />
          </svg>
          <span className="hidden sm:inline">WhatsApp Meals</span>
        </a>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="Open HTML Foods Support Assistant"
          className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-lg bg-zinc-900 hover:bg-emerald-900 text-white text-xs font-semibold shadow-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 shrink-0" />
          <span>{isOpen ? 'Close Assistant' : 'Ask Assistant'}</span>
        </button>
      </div>
    </div>
  );
}
