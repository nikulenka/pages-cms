'use client';
import { useEffect, useState } from 'react';

const NAV_LEFT  = [
  { href: '#about',      label: 'О ПОМЕСТЬЕ' },
  { href: '#domiki',     label: 'РАЗМЕЩЕНИЕ' },
  { href: '#aktivnosti', label: 'АКТИВНОСТИ' },
  { href: '#banya',      label: 'БАНЯ' },
];
const NAV_RIGHT = [
  { href: '#svadba',    label: 'СВАДЬБЫ' },
  { href: '#galereya',  label: 'ГАЛЕРЕЯ' },
  { href: '#kontakty',  label: 'КОНТАКТЫ' },
];
const NAV_ALL = [...NAV_LEFT, ...NAV_RIGHT];

export default function Header({ phone }: { phone?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const linkCls = 'font-ui text-[10px] tracking-[0.2em] text-white/80 hover:text-sand transition-colors duration-400';

  return (
    <header
      id="top"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-400 ${
        scrolled ? 'bg-charcoal shadow-lg py-3' : 'bg-transparent py-4'
      }`}
    >
      {/* ── Desktop: 3-column grid with logo in centre ── */}
      <div className="hidden lg:grid max-w-[1400px] mx-auto px-8"
        style={{ gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '24px' }}>

        {/* Left nav */}
        <nav className="flex items-center gap-6">
          {NAV_LEFT.map(({ href, label }) => (
            <a key={href} href={href} className={linkCls}>{label}</a>
          ))}
        </nav>

        {/* Logo — center */}
        <a href="#top">
          <div className={`rounded-full overflow-hidden transition-all duration-400 ${scrolled ? 'w-10 h-10' : 'w-14 h-14'}`}>
            <img src="/media/Logo.png" alt="Поместье Русаково" className="w-full h-full object-cover" />
          </div>
        </a>

        {/* Right nav + CTA */}
        <nav className="flex items-center justify-end gap-6">
          {NAV_RIGHT.map(({ href, label }) => (
            <a key={href} href={href} className={linkCls}>{label}</a>
          ))}
          <a
            href="#kontakty"
            className={`btn text-[10px] py-2.5 px-6 ml-2 ${scrolled ? 'btn-primary' : 'btn-ghost'}`}
          >
            ЗАБРОНИРОВАТЬ
          </a>
        </nav>
      </div>

      {/* ── Mobile: logo left, burger right ── */}
      <div className="lg:hidden flex items-center justify-between px-5">
        <a href="#top">
          <div className={`rounded-full overflow-hidden transition-all duration-400 ${scrolled ? 'w-9 h-9' : 'w-12 h-12'}`}>
            <img src="/media/Logo.png" alt="Поместье Русаково" className="w-full h-full object-cover" />
          </div>
        </a>
        <button
          className="flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-charcoal border-t border-white/10 pb-4">
          {NAV_ALL.map(({ href, label }) => (
            <a key={href} href={href} onClick={() => setOpen(false)}
              className="block px-6 py-4 font-ui text-[11px] tracking-[0.2em] text-white border-b border-white/10 hover:text-sand">
              {label}
            </a>
          ))}
          <div className="px-6 pt-4">
            <a href="#kontakty" onClick={() => setOpen(false)} className="btn btn-primary w-full text-center block text-[10px]">
              ЗАБРОНИРОВАТЬ
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
