import type { GeneralSettings } from '@/lib/content';

export default function Prices({ s }: { s: GeneralSettings }) {
  const rows = [
    { label: 'Проживание',      value: s.pricePerNight  || '150 руб. / чел. / ночь' },
    { label: 'Новый год',       value: s.priceNewYear   || '300 руб. / чел.' },
    { label: 'Баня и чан',      value: s.priceBanya     || '150 руб. / 4 часа' },
    { label: 'Заезд / выезд',   value: `${s.checkIn || '14:00'} / ${s.checkOut || '12:00'}` },
    { label: 'Предоплата',      value: s.prepayment     || '50%' },
    { label: 'Отмена брони',    value: s.cancellation   || '100% возврат за 2 недели' },
  ];

  return (
    <section className="py-[100px] bg-ivory">
      <div className="max-w-[900px] mx-auto px-5 md:px-20">
        <div className="text-center mb-12">
          <p className="eyebrow mb-4">Прозрачно и честно</p>
          <h2 className="section-h2">Цены и условия</h2>
          <div className="divider" />
        </div>

        <div className="bg-white rounded-card shadow-[0_4px_20px_rgba(0,0,0,0.06)] overflow-hidden">
          {rows.map(({ label, value }, i) => (
            <div
              key={label}
              className={`flex justify-between items-center px-8 py-5 gap-4 ${
                i !== rows.length - 1 ? 'border-b border-ivory-alt' : ''
              }`}
            >
              <span className="font-ui text-[11px] tracking-[0.15em] uppercase text-text-muted">{label}</span>
              <span className="font-heading text-xl text-charcoal text-right">{value}</span>
            </div>
          ))}
        </div>

        <p className="text-center font-body text-text-muted text-sm mt-6 leading-relaxed">
          В стоимость входит: проживание + парковка (10 мест, видеонаблюдение).<br />
          Договор оформляется при заселении.
        </p>
      </div>
    </section>
  );
}
