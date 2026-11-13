interface FooterProps {
  onOpenLegal: (key: string) => void;
}

export function Footer({ onOpenLegal }: FooterProps) {
  const quickLinks = [
    { label: 'Home', href: '#top' },
    { label: 'Menu', href: '#menu' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Contact', href: '#reserve' },
  ];

  const legalLinks = [
    'Shipping Policy',
    'Terms of Service',
    'Refund Policy',
    'Privacy Policy',
  ];

  return (
    <footer className="bg-zinc-950 text-stone-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-zinc-800">
          {/* Brand Summary */}
          <div className="lg:col-span-5 space-y-3">
            <a
              href="#top"
              className="font-display text-2xl font-semibold text-white tracking-tight inline-block"
            >
              HTML Foods
            </a>
            <p className="text-sm text-stone-400 leading-relaxed max-w-md">
              Premium Nigerian foodstuffs exported worldwide. From dried fish to palm oil and
              spices, we deliver authentic flavors to your doorstep anywhere in the world.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-stone-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              {legalLinks.map((policy) => (
                <li key={policy}>
                  <button
                    type="button"
                    onClick={() => onOpenLegal(policy)}
                    className="text-left text-stone-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {policy}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <a
                  href="tel:09067019742"
                  className="hover:text-white transition-colors tabular-nums"
                >
                  0906 701 9742
                </a>
              </li>
              <li>
                <a
                  href="mailto:htmlfoods@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  htmlfoods@gmail.com
                </a>
              </li>
              <li className="leading-relaxed">
                Fonts Hall Complex, Opposite Agape Ministries, Akure-Ilesha Road, Akure, Ondo
                State
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 HTML Foods. All rights reserved.</p>
          <p>Made with ❤️ for food lovers</p>
        </div>
      </div>
    </footer>
  );
}
