import type { House } from '@/lib/content';

export default function Accommodations({ houses }: { houses: House[] }) {
  return (
    <section id="domiki" className="py-[140px] bg-ivory-alt">
      <div className="max-w-[1400px] mx-auto px-5 md:px-20">
        <div className="text-center mb-16">
          <p className="eyebrow mb-4">Где остановиться</p>
          <h2 className="section-h2">Размещение</h2>
          <div className="divider" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {houses.map((h) => (
            <article
              key={h.title}
              className="bg-white rounded-card overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-400 group"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={h.image}
                  alt={h.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-7">
                {h.type && (
                  <span className="eyebrow text-[11px] mb-2 inline-block">{h.type}</span>
                )}
                <h3 className="font-heading text-[26px] font-light mb-3">{h.title}</h3>
                <p className="font-body text-text-muted text-[15px] leading-relaxed mb-6">
                  {h.description}
                </p>

                <div className="flex justify-between items-center text-sm border-t border-ivory-alt pt-4">
                  <div>
                    <span className="font-ui text-[10px] tracking-wider text-text-muted uppercase block mb-1">Вместимость</span>
                    <span className="font-ui text-[13px] font-medium">{h.capacity}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-ui text-[10px] tracking-wider text-text-muted uppercase block mb-1">Цена</span>
                    <span className="font-ui text-[13px] font-semibold text-forest">{h.price}</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <a href={`#house-${h.title.toLowerCase().replace(/\s+/g,'-')}`} className="btn btn-secondary flex-1 text-center text-[10px] py-3">
                    Подробнее
                  </a>
                  <a href="#kontakty" className="btn btn-primary flex-1 text-center text-[10px] py-3">
                    Забронировать
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
