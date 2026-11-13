import { useEffect, useState, type FormEvent } from 'react';
import { Calendar, CheckCircle2, Clock, Users } from 'lucide-react';

export interface ReservationData {
  id: string;
  experience: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

interface ReservationSectionProps {
  preferredExperience: string;
}

export function ReservationSection({ preferredExperience }: ReservationSectionProps) {
  const today = new Date().toISOString().split('T')[0];

  const [experience, setExperience] = useState(preferredExperience || 'Main Dining Room');
  const [date, setDate] = useState(today);
  const [time, setTime] = useState('7:00 PM');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [confirmed, setConfirmed] = useState<ReservationData | null>(null);

  useEffect(() => {
    if (preferredExperience) {
      setExperience(preferredExperience);
      setConfirmed(null);
    }
  }, [preferredExperience]);

  const timeSlots = ['12:30 PM', '2:00 PM', '5:30 PM', '7:00 PM', '8:30 PM'];
  const experiences = ['Main Dining Room', "Chef's Tasting Counter", 'Private Family Table'];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your full name for the reservation.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 7) {
      setError('Please enter a valid phone number so our host can confirm.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address for your booking confirmation.');
      return;
    }

    const code = `HF-RES-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmed({
      id: code,
      experience,
      date,
      time,
      guests,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      notes: notes.trim(),
    });
  };

  return (
    <section id="reserve" className="py-16 lg:py-20 border-b border-stone-200 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Editorial Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs font-semibold tracking-wider uppercase text-emerald-900 mb-2">
                Online Table Reservations
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 text-balance mb-3">
                Reserve Your Table in Seconds
              </h2>
              <p className="text-base text-stone-600 leading-relaxed">
                Dine with us at our Akure flagship restaurant. Instant confirmation with zero booking fees — choose your seating area, time slot, and party size.
              </p>
            </div>

            <div className="border-t border-stone-200 pt-5 space-y-3 text-sm text-stone-600">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-emerald-900 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-zinc-900 block">Opening Hours</span>
                  <span>Tuesday – Sunday · 11:30 AM – 10:30 PM</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-4 h-4 text-emerald-900 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-zinc-900 block">Location</span>
                  <span>
                    Fonts Hall Complex, Opposite Agape Ministries, Akure-Ilesha Road, Akure, Ondo State
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-emerald-900 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-zinc-900 block">Direct Host Desk</span>
                  <span className="tabular-nums">0906 701 9742 · htmlfoods@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Interactive Booking Form / Confirmation Card */}
          <div className="lg:col-span-7">
            {confirmed ? (
              <div className="rounded-xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-800 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-900">
                      Reservation Confirmed
                    </p>
                    <h3 className="font-display text-2xl font-semibold text-zinc-900 tabular-nums">
                      Booking {confirmed.id}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-stone-600 mb-6">
                  Thank you, <span className="font-semibold text-zinc-900">{confirmed.name}</span>. Your table is reserved and a confirmation summary has been prepared for{' '}
                  <span className="font-medium text-zinc-900">{confirmed.email}</span>.
                </p>

                <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-stone-200 text-sm mb-6">
                  <div>
                    <dt className="text-xs text-stone-500">Seating</dt>
                    <dd className="font-medium text-zinc-900 mt-0.5">{confirmed.experience}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-stone-500">Date</dt>
                    <dd className="font-medium text-zinc-900 tabular-nums mt-0.5">{confirmed.date}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-stone-500">Time</dt>
                    <dd className="font-medium text-zinc-900 tabular-nums mt-0.5">{confirmed.time}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-stone-500">Party Size</dt>
                    <dd className="font-medium text-zinc-900 tabular-nums mt-0.5">
                      {confirmed.guests} {confirmed.guests === 1 ? 'Guest' : 'Guests'}
                    </dd>
                  </div>
                </dl>

                {confirmed.notes && (
                  <p className="text-xs text-stone-600 mb-6">
                    <span className="font-semibold text-zinc-900">Special Notes: </span>
                    {confirmed.notes}
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => setConfirmed(null)}
                  className="px-5 py-2.5 min-h-[44px] text-sm font-semibold text-zinc-900 border border-stone-300 hover:border-zinc-900 rounded-lg transition-colors cursor-pointer"
                >
                  Modify or Book Another Table
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs space-y-5"
              >
                {/* Seating Experience Tabs */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                    Dining Experience
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {experiences.map((exp) => {
                      const active = experience === exp;
                      return (
                        <button
                          key={exp}
                          type="button"
                          onClick={() => setExperience(exp)}
                          className={`px-3 py-2.5 min-h-[42px] text-xs font-semibold rounded-lg border text-center transition-colors cursor-pointer ${
                            active
                              ? 'border-emerald-900 bg-emerald-900 text-white'
                              : 'border-stone-200 bg-stone-50 text-zinc-800 hover:border-stone-400'
                          }`}
                        >
                          {exp}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Date, Guests, Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="res-date"
                      className="block text-xs font-semibold text-zinc-800 mb-1.5"
                    >
                      Date
                    </label>
                    <input
                      id="res-date"
                      type="date"
                      min={today}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full h-11 px-3 rounded-lg border border-stone-300 bg-white text-sm text-zinc-900 tabular-nums focus:outline-2 focus:outline-emerald-900"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="res-guests"
                      className="block text-xs font-semibold text-zinc-800 mb-1.5"
                    >
                      Party Size
                    </label>
                    <select
                      id="res-guests"
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full h-11 px-3 rounded-lg border border-stone-300 bg-white text-sm text-zinc-900 tabular-nums focus:outline-2 focus:outline-emerald-900"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-semibold text-zinc-800 mb-2">
                    Preferred Seating Time
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {timeSlots.map((slot) => {
                      const active = time === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTime(slot)}
                          className={`px-3.5 py-2 min-h-[40px] text-xs font-semibold rounded-lg border tabular-nums transition-colors cursor-pointer ${
                            active
                              ? 'border-zinc-900 bg-zinc-900 text-white'
                              : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-400'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Guest Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="res-name"
                      className="block text-xs font-semibold text-zinc-800 mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      id="res-name"
                      type="text"
                      placeholder="Adaeze Okafor"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-11 px-3 rounded-lg border border-stone-300 bg-white text-sm text-zinc-900 focus:outline-2 focus:outline-emerald-900"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="res-phone"
                      className="block text-xs font-semibold text-zinc-800 mb-1.5"
                    >
                      Phone Number
                    </label>
                    <input
                      id="res-phone"
                      type="tel"
                      placeholder="0906 701 9742"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-11 px-3 rounded-lg border border-stone-300 bg-white text-sm text-zinc-900 tabular-nums focus:outline-2 focus:outline-emerald-900"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="res-email"
                      className="block text-xs font-semibold text-zinc-800 mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="res-email"
                      type="email"
                      placeholder="guest@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 px-3 rounded-lg border border-stone-300 bg-white text-sm text-zinc-900 focus:outline-2 focus:outline-emerald-900"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="res-notes"
                    className="block text-xs font-semibold text-zinc-800 mb-1.5"
                  >
                    Dietary Notes or Occasion (Optional)
                  </label>
                  <input
                    id="res-notes"
                    type="text"
                    placeholder="Birthday table, extra spicy pepper soup, allergy notes..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full h-11 px-3 rounded-lg border border-stone-300 bg-white text-sm text-zinc-900 focus:outline-2 focus:outline-emerald-900"
                  />
                </div>

                {error && (
                  <p role="alert" className="text-xs font-medium text-red-700">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 min-h-[44px] text-sm font-semibold text-white bg-emerald-900 hover:bg-emerald-950 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
                >
                  Confirm Table Reservation
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
