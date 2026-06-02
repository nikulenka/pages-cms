import type { House } from '@/lib/content';

const DEFAULT_FEATURES = [
  'Камин / печь', 'Кухня (плита, микроволновка, холодильник, чайник, посуда)',
  'Wi-Fi', 'ТВ и колонки', 'Кондиционер / обогреватель',
  'Мангал и казан', 'Качели',
];

export default function HomeDetails({ houses }: { houses: House[] }) {
  return (
    <section className="bg-white">
      {houses.map((h, i) => {
        const isEven = i % 2 === 0;
        const features = h.features?.length ? h.features : DEFAULT_FEATURES;
        const slug = h.title.toLowerCase().replace(/\s+/g, '-');

        return (
          <div
            key={h.title}
            id={`house-${slug}`}
            className={`py-[100px] ${isEven ? 'bg-white' : 'bg-ivory'}`}
          >
            <div className="max-w-[1200px] mx-auto px-5 md:px-20">
              <div className={`flex flex-col lg:flex-row gap-12 xl:gap-20 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                {/* Photo */}
                <div className="lg:w-1/2 w-full">
                  <div className="rounded-img overflow-hidden aspect-[4/3]">
                    <img
                      src={h.image}
                      alt={h.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="lg:w-1/2">
                  {h.type && <p className="eyebrow mb-4">{h.type}</p>}
                  <h2 className="font-heading font-light text-[38px] leading-[1.15] mb-4">{h.title}</h2>
                  <div className="w-14 h-px bg-sand mb-6" />

                  {h.fullDescription && (
                    <p className="font-body text-text-muted leading-[1.75] mb-8">{h.fullDescription}</p>
                  )}

                  {/* Features */}
                  <ul className="space-y-2 mb-8">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-3 font-body text-[15px] text-text-muted">
                        <span className="text-forest mt-0.5">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 border border-ivory-alt rounded-card p-5 mb-8 text-center">
                    <div>
                      <p className="font-ui text-[10px] tracking-wider text-text-muted uppercase mb-1">Вместимость</p>
                      <p className="font-heading text-xl">{h.capacity}</p>
                    </div>
                    <div>
                      <p className="font-ui text-[10px] tracking-wider text-text-muted uppercase mb-1">Заезд</p>
                      <p className="font-heading text-xl">14:00</p>
                    </div>
                    <div>
                      <p className="font-ui text-[10px] tracking-wider text-text-muted uppercase mb-1">Цена от</p>
                      <p className="font-heading text-xl text-forest">{h.price}</p>
                    </div>
                  </div>

                  <a href="#kontakty" className="btn btn-primary">ЗАБРОНИРОВАТЬ</a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
