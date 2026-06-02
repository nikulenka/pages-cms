'use client';
import { useEffect, useState } from 'react';

const NAV = [
  { href: '#about',     label: 'О ПОМЕСТЬЕ' },
  { href: '#domiki',    label: 'РАЗМЕЩЕНИЕ' },
  { href: '#aktivnosti',label: 'АКТИВНОСТИ' },
  { href: '#banya',     label: 'БАНЯ' },
  { href: '#svadba',    label: 'СВАДЬБЫ' },
  { href: '#galereya',  label: 'ГАЛЕРЕЯ' },
  { href: '#kontakty',  label: 'КОНТАКТЫ' },
];

export default function Header({ phone }: { phone?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header
      id="top"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-400 ${
        scrolled ? 'bg-charcoal shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 flex items-center justify-between gap-6">
        {/* Logo */}
        <a href="#top" className="shrink-0 font-heading text-white text-xl tracking-widest">
          {/* TODO: замени на <img> когда добавишь /images/logo.png */}
          РУСАКОВО
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="font-ui text-[10px] tracking-[0.2em] text-white/80 hover:text-sand transition-colors duration-400"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-5">
          {phone && (
            <a
              href={`tel:${phone.replace(/\D/g, '')}`}
              className="font-ui text-[11px] tracking-wider text-white/70 hover:text-white transition-colors"
            >
              {phone}
            </a>
          )}
          <a
            href="#kontakty"
            className={`btn text-[10px] py-3 px-7 ${
              scrolled ? 'btn-primary' : 'btn-ghost'
            }`}
          >
            ЗАБРОНИРОВАТЬ
          </a>
        </div>

        {/* Burger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
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
          {NAV.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block px-6 py-4 font-ui text-[11px] tracking-[0.2em] text-white border-b border-white/10 hover:text-sand"
            >
              {label}
            </a>
          ))}
          <div className="px-6 pt-4">
            <a href="#kontakty" onClick={() => setOpen(false)} className="btn btn-primary w-full text-center block">
              ЗАБРОНИРОВАТЬ
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
