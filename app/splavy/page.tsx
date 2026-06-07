import type { Metadata } from 'next';
import { getSplavySettings } from '@/lib/content';
import Nav from '@/components/splavy/Nav';
import BookingForm from '@/components/splavy/BookingForm';

export function generateMetadata(): Metadata {
  const s = getSplavySettings();
  return {
    title: s.metaTitle || 'Сплавы на байдарках, баня и банный чан | Поместье «Русаково»',
    description: s.metaDescription,
    openGraph: {
      title: s.metaTitle,
      description: s.metaDescription,
      images: s.heroImage ? [{ url: s.heroImage }] : undefined,
      type: 'website',
    },
  };
}

export default function SplavyLanding() {
  const s = getSplavySettings();
  const offers = s.offers ?? [];

  return (
    <main id="top">
      <Nav phone={s.phone1} cta={s.heroButton} />

      {/* ───── HERO ───── */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center text-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: `url(${s.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-black/45 pointer-events-none" />
        <div className="relative z-10 max-w-3xl px-6">
          <p className="font-ui text-[11px] tracking-[0.3em] uppercase text-white/75 mb-6">{s.heroEyebrow}</p>
          <h1 className="font-heading font-light text-white leading-[1.12] mb-5" style={{ fontSize: 'clamp(36px, 6vw, 68px)' }}>
            {s.heroTitle}
          </h1>
          <div className="w-14 h-px bg-white/40 mx-auto mb-6" />
          <p className="font-body font-light text-white/85 text-lg leading-relaxed mb-10 whitespace-pre-line">
            {s.heroSubtitle}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#zayavka" className="btn btn-primary">{s.heroButton || 'ЗАБРОНИРОВАТЬ'}</a>
            <a href="#baidarki" className="btn btn-ghost">УЗНАТЬ ПОДРОБНЕЕ</a>
          </div>
        </div>
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-white/45 pointer-events-none">
          <span className="font-ui text-[9px] tracking-[0.2em]">ЛИСТАТЬ</span>
          <div className="w-px h-8 bg-white/30 animate-pulse" />
        </div>
      </section>

      {/* ───── INTRO + FACTS ───── */}
      <section className="py-[100px] md:py-[140px] bg-ivory">
        <div className="max-w-[900px] mx-auto px-5 md:px-8 text-center">
          <p className="eyebrow mb-4">{s.introEyebrow}</p>
          <h2 className="section-h2">{s.introTitle}</h2>
          <div className="divider" />
          <p className="font-body text-text-muted text-lg leading-[1.8] mt-6">{s.introText}</p>
        </div>

        {s.facts && s.facts.length > 0 && (
          <div className="max-w-[1100px] mx-auto px-5 md:px-8 mt-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {s.facts.map((f, i) => (
                <div key={i} className="text-center">
                  <p className="font-heading text-forest text-[40px] leading-none font-light">{f.value}</p>
                  <p className="font-ui text-[11px] tracking-[0.15em] uppercase text-text-muted mt-3">{f.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ───── OFFERS (байдарки / баня / чан / питание) ───── */}
      <section className="bg-white">
        {offers.map((o, i) => {
          const id = ['baidarki', 'banya', 'chan', 'pitanie'][i] ?? `offer-${i}`;
          const flip = i % 2 === 1;
          return (
            <div key={i} id={id} className={`${i % 2 === 1 ? 'bg-ivory-alt' : 'bg-white'}`}>
              <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-[80px] md:py-[110px]">
                <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                  {/* Image */}
                  <div className="rounded-img overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
                    <img
                      src={o.image}
                      alt={o.title}
                      loading="lazy"
                      className="w-full h-full object-cover aspect-[4/3]"
                    />
                  </div>
                  {/* Text */}
                  <div>
                    {o.eyebrow && <p className="eyebrow mb-3">{o.eyebrow}</p>}
                    <h3 className="font-heading font-light text-[32px] md:text-[40px] leading-[1.15] text-charcoal mb-5">{o.title}</h3>
                    <p className="font-body text-text-muted text-lg leading-[1.8] mb-7">{o.text}</p>
                    {o.features && o.features.length > 0 && (
                      <ul className="space-y-3 mb-8">
                        {o.features.map((ft, fi) => (
                          <li key={fi} className="flex items-start gap-3 font-body text-text">
                            <span className="text-sand mt-1 flex-shrink-0">✦</span>
                            <span>{ft}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="flex flex-wrap items-center gap-4">
                      <a href="#zayavka" className="btn btn-primary">ЗАБРОНИРОВАТЬ</a>
                      {o.priceNote && (
                        <span className="font-ui text-[12px] tracking-wide text-forest border border-sand/60 rounded-btn px-4 py-2">
                          {o.priceNote}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ───── PRICES ───── */}
      <section id="ceny" className="py-[100px] md:py-[140px] bg-ivory">
        <div className="max-w-[800px] mx-auto px-5 md:px-8">
          <div className="text-center mb-12">
            <p className="eyebrow mb-4">Прозрачно и честно</p>
            <h2 className="section-h2">{s.pricesTitle || 'Цены'}</h2>
            <div className="divider" />
          </div>
          <div className="bg-white rounded-card shadow-[0_4px_20px_rgba(0,0,0,0.06)] divide-y divide-black/5">
            {(s.prices ?? []).map((p, i) => (
              <div key={i} className="flex items-center justify-between gap-4 px-7 py-5">
                <div>
                  <p className="font-heading text-xl font-light text-charcoal">{p.name}</p>
                  {p.note && <p className="font-body text-text-muted text-sm mt-0.5">{p.note}</p>}
                </div>
                <p className="font-ui text-forest text-[15px] tracking-wide whitespace-nowrap">{p.price}</p>
              </div>
            ))}
          </div>
          {s.pricesNote && (
            <p className="font-body text-text-muted text-sm text-center leading-relaxed mt-6">{s.pricesNote}</p>
          )}
        </div>
      </section>

      {/* ───── GALLERY ───── */}
      {s.gallery && s.gallery.length > 0 && (
        <section id="galereya" className="py-[100px] md:py-[140px] bg-white">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8">
            <div className="text-center mb-14">
              <p className="eyebrow mb-4">Атмосфера</p>
              <h2 className="section-h2">{s.galleryTitle || 'Как это выглядит'}</h2>
              <div className="divider" />
            </div>
            <div className="masonry">
              {s.gallery.map((g, i) => (
                <div key={i} className="masonry-item">
                  <img
                    src={g.src}
                    alt={g.alt || ''}
                    loading="lazy"
                    className="w-full rounded-gallery hover:scale-[1.03] transition-transform duration-400"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───── CTA + FORM ───── */}
      <section id="zayavka" className="py-[100px] md:py-[140px] bg-charcoal text-white">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <div className="text-center mb-16">
            <p className="eyebrow text-sand/80 mb-4">{s.ctaEyebrow}</p>
            <h2 className="font-heading font-light text-[42px] leading-[1.15] text-white">{s.ctaTitle || 'Забронировать сплав'}</h2>
            <div className="w-14 h-px bg-sand/60 mx-auto mt-6" />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24">
            <div>
              {s.ctaText && <p className="font-body text-white/70 text-lg leading-relaxed mb-10">{s.ctaText}</p>}
              <div className="space-y-6">
                {s.phone1 && (
                  <div>
                    <p className="font-ui text-[10px] tracking-[0.2em] uppercase text-sand/70 mb-1">Телефон</p>
                    <a href={`tel:${s.phone1.replace(/\D/g, '')}`} className="text-white hover:text-sand transition-colors text-lg">{s.phone1}</a>
                    {s.phone2 && (
                      <>
                        <br />
                        <a href={`tel:${s.phone2.replace(/\D/g, '')}`} className="text-white/70 hover:text-sand transition-colors">{s.phone2}</a>
                      </>
                    )}
                  </div>
                )}
                {s.instagram && (
                  <div>
                    <p className="font-ui text-[10px] tracking-[0.2em] uppercase text-sand/70 mb-1">Instagram</p>
                    <a href={`https://instagram.com/${s.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-white hover:text-sand transition-colors">
                      {s.instagram}
                    </a>
                  </div>
                )}
                {s.address && (
                  <div>
                    <p className="font-ui text-[10px] tracking-[0.2em] uppercase text-sand/70 mb-1">Где мы</p>
                    <p className="text-white/80 leading-relaxed">{s.address}</p>
                  </div>
                )}
              </div>
            </div>

            <BookingForm />
          </div>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="bg-charcoal text-white border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src="/media/Logo.png" alt="Поместье Русаково" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-heading text-lg font-light">Поместье «Русаково»</p>
              <p className="font-body text-white/40 text-xs">Налибокская пуща · река Ислочь</p>
            </div>
          </div>
          <div className="text-center sm:text-right font-body text-white/40 text-xs">
            <p><a href="/" className="hover:text-sand transition-colors">← На главную усадьбы</a></p>
            <p className="mt-1">© 2026 Поместье «Русаково». Русак Д. Л.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
