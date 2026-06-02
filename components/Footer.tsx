import type { GeneralSettings } from '@/lib/content';

const NAV = [
  { href: '#domiki',     label: 'Размещение' },
  { href: '#aktivnosti', label: 'Активности' },
  { href: '#banya',      label: 'Баня' },
  { href: '#svadba',     label: 'Свадьбы' },
  { href: '#galereya',   label: 'Галерея' },
  { href: '#kontakty',   label: 'Контакты' },
];

export default function Footer({ s }: { s: GeneralSettings }) {
  return (
    <footer className="bg-charcoal text-white border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-5 md:px-20 py-16">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <img src="/media/Logo.png" alt="Поместье Русаково" className="h-16 w-auto mb-3" />
            <p className="font-body text-white/50 text-sm leading-relaxed">
              {s.slogan || 'Отдых в гармонии с природой'}
            </p>
            <p className="font-body text-white/30 text-xs mt-2">Агроусадьба · Воложинский район · Беларусь</p>
          </div>

          {/* Nav */}
          <div>
            <p className="font-ui text-[10px] tracking-[0.2em] uppercase text-sand/60 mb-4">Навигация</p>
            <ul className="space-y-2">
              {NAV.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="font-body text-white/60 text-sm hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Conditions */}
          <div>
            <p className="font-ui text-[10px] tracking-[0.2em] uppercase text-sand/60 mb-4">Условия</p>
            <ul className="space-y-2 font-body text-white/60 text-sm">
              <li>Заезд: {s.checkIn || '14:00'} · Выезд: {s.checkOut || '12:00'}</li>
              <li>Предоплата: {s.prepayment || '50%'}</li>
              <li>Отмена: {s.cancellation || '100% за 2 недели'}</li>
              {s.phone1 && (
                <li className="pt-2">
                  <a href={`tel:${s.phone1.replace(/\D/g,'')}`} className="text-white hover:text-sand transition-colors">
                    {s.phone1}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-white/30 text-xs font-body">
          <p>© 2026 Поместье «Русаково». Русак Д. Л.</p>
          <p>д. Белокорец, Воложинский р-н, Минская обл.</p>
        </div>
      </div>
    </footer>
  );
}
