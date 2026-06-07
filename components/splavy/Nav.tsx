'use client';
import { useEffect, useState } from 'react';

const LINKS = [
  { href: '#baidarki', label: 'БАЙДАРКИ' },
  { href: '#banya',    label: 'БАНЯ' },
  { href: '#chan',     label: 'ЧАН' },
  { href: '#ceny',     label: 'ЦЕНЫ' },
  { href: '#galereya', label: 'ГАЛЕРЕЯ' },
];

export default function Nav({ phone, cta }: { phone?: string; cta?: string }) {
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-400 ${
        scrolled ? 'bg-charcoal shadow-lg py-3' : 'bg-transparent py-4'
      }`}
    >
      {/* Desktop */}
      <div className="hidden lg:flex max-w-[1400px] mx-auto px-8 items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-3">
          <div className={`rounded-full overflow-hidden transition-all duration-400 ${scrolled ? 'w-10 h-10' : 'w-12 h-12'}`}>
            <img src="/media/Logo.png" alt="Поместье Русаково" className="w-full h-full object-cover" />
          </div>
          <span className="font-heading text-white text-lg font-light leading-none">Поместье&nbsp;«Русаково»</span>
        </a>

        <nav className="flex items-center gap-7">
          {LINKS.map(({ href, label }) => (
            <a key={href} href={href} className={linkCls}>{label}</a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          {phone && (
            <a href={`tel:${phone.replace(/\D/g, '')}`} className="font-ui text-[12px] tracking-wide text-white hover:text-sand transition-colors">
              {phone}
            </a>
          )}
          <a href="#zayavka" className={`btn text-[10px] py-2.5 px-6 ${scrolled ? 'btn-primary' : 'btn-ghost'}`}>
            {cta || 'ЗАБРОНИРОВАТЬ'}
          </a>
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden flex items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2">
          <div className={`rounded-full overflow-hidden transition-all duration-400 ${scrolled ? 'w-9 h-9' : 'w-11 h-11'}`}>
            <img src="/media/Logo.png" alt="Поместье Русаково" className="w-full h-full object-cover" />
          </div>
        </a>
        <div className="flex items-center gap-3">
          {phone && (
            <a href={`tel:${phone.replace(/\D/g, '')}`} className="font-ui text-[11px] text-white" aria-label="Позвонить">
              ☎
            </a>
          )}
          <button className="flex flex-col gap-1.5 p-2" onClick={() => setOpen(!open)} aria-label="Меню">
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-charcoal border-t border-white/10 pb-4">
          {LINKS.map(({ href, label }) => (
            <a key={href} href={href} onClick={() => setOpen(false)}
              className="block px-6 py-4 font-ui text-[11px] tracking-[0.2em] text-white border-b border-white/10 hover:text-sand">
              {label}
            </a>
          ))}
          <div className="px-6 pt-4">
            <a href="#zayavka" onClick={() => setOpen(false)} className="btn btn-primary w-full text-center block text-[10px]">
              {cta || 'ЗАБРОНИРОВАТЬ'}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
