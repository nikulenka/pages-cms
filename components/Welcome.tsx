import type { GeneralSettings } from '@/lib/content';

const PLACEHOLDER = 'https://picsum.photos/id/1039/900/700';

const STATS = [
  { value: '78 км', label: 'от Минска' },
  { value: '~2 га', label: 'территория' },
  { value: '30', label: 'гостей днём' },
  { value: '4 сезона', label: 'круглый год' },
];

export default function Welcome({ s }: { s: GeneralSettings }) {
  const img = s.heroImage || PLACEHOLDER;

  return (
    <section className="py-[140px] bg-white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-20">
        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24 items-center">

          {/* Photo */}
          <div className="lg:w-[45%] w-full shrink-0">
            <div className="rounded-img overflow-hidden aspect-[4/5]">
              <img
                src={img}
                alt="Поместье Русаково"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div className="lg:w-[55%]">
            <p className="eyebrow mb-5">Агроусадьба · Воложинский район · Беларусь</p>

            <h2
              className="font-heading font-light leading-[1.15] text-charcoal mb-6"
              style={{ fontSize: 'clamp(32px, 3.5vw, 48px)' }}
            >
              Добро пожаловать<br />
              <em>в Поместье «Русаково»</em>
            </h2>

            <div className="w-14 h-px bg-sand mb-8" />

            <p className="font-body text-text-muted leading-[1.85] mb-6">
              {s.welcomeText ||
                'Уютная эко-усадьба на берегу реки Ислочь, в самом сердце Налибокской пущи — в 78 км от Минска. Здесь время замедляется: живой огонь камина, баня-парилка у воды, своя ферма с овцами и птицей, закаты над рекой.'}
            </p>
            <p className="font-body text-text-muted leading-[1.85] mb-10">
              Три тёплых домика и настоящая русская баня — для тех, кто хочет настоящего отдыха. Не «сервис», а живое гостеприимство.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
              {STATS.map(({ value, label }) => (
                <div key={label} className="text-center border border-ivory-alt rounded-card py-4 px-2">
                  <p className="font-heading text-[28px] font-light text-forest">{value}</p>
                  <p className="font-ui text-[10px] tracking-[0.15em] uppercase text-text-muted mt-1">{label}</p>
                </div>
              ))}
            </div>

            <a href="#domiki" className="btn btn-primary">НАШИ ДОМИКИ</a>
          </div>
        </div>
      </div>
    </section>
  );
}
