'use client';
import { useState, useEffect } from 'react';
import type { House } from '@/lib/content';

const DEFAULT_FEATURES = [
  'Камин / печь',
  'Кухня (плита, микроволновка, холодильник, чайник, посуда)',
  'Wi-Fi', 'ТВ и колонки', 'Кондиционер / обогреватель',
  'Мангал и казан', 'Качели',
];

/* ─── Lightbox ─────────────────────────────────────────── */
function Lightbox({ images, start, onClose }: {
  images: string[]; start: number; onClose: () => void;
}) {
  const [idx, setIdx] = useState(start);
  const len = images.length;

  const prev = () => setIdx(i => (i - 1 + len) % len);
  const next = () => setIdx(i => (i + 1) % len);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      onClose();
      if (e.key === 'ArrowLeft')   setIdx(i => (i - 1 + len) % len);
      if (e.key === 'ArrowRight')  setIdx(i => (i + 1) % len);
    };

    // touch swipe
    let sx = 0;
    const onTS = (e: TouchEvent) => { sx = e.touches[0].clientX; };
    const onTE = (e: TouchEvent) => {
      const d = sx - e.changedTouches[0].clientX;
      if (Math.abs(d) > 40) d > 0 ? setIdx(i => (i + 1) % len) : setIdx(i => (i - 1 + len) % len);
    };

    document.addEventListener('keydown',    onKey);
    document.addEventListener('touchstart', onTS, { passive: true });
    document.addEventListener('touchend',   onTE);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown',    onKey);
      document.removeEventListener('touchstart', onTS);
      document.removeEventListener('touchend',   onTE);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [len]);

  return (
    <div
      className="fixed inset-0 bg-black/92 flex items-center justify-center"
      style={{ zIndex: 9999 }}
      onClick={onClose}
    >
      {/* Image */}
      <img
        src={images[idx]}
        alt=""
        className="max-h-[88vh] max-w-[88vw] object-contain select-none"
        style={{ borderRadius: 12, boxShadow: '0 24px 60px rgba(0,0,0,0.6)' }}
        onClick={e => e.stopPropagation()}
        draggable={false}
      />

      {/* Close */}
      <button
        onClick={onClose}
        style={{ position: 'absolute', top: 20, right: 20, zIndex: 10000,
          width: 44, height: 44, borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
          color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center' }}
      >✕</button>

      {/* Prev */}
      {len > 1 && (
        <button
          onClick={e => { e.stopPropagation(); prev(); }}
          style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
            zIndex: 10000, width: 52, height: 52, borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)',
            color: '#fff', fontSize: 26, cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}
        >‹</button>
      )}

      {/* Next */}
      {len > 1 && (
        <button
          onClick={e => { e.stopPropagation(); next(); }}
          style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
            zIndex: 10000, width: 52, height: 52, borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)',
            color: '#fff', fontSize: 26, cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}
        >›</button>
      )}

      {/* Counter + dots */}
      {len > 1 && (
        <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          zIndex: 10000, display: 'flex', gap: 8, alignItems: 'center' }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); setIdx(i); }}
              style={{ height: 6, width: i === idx ? 24 : 6, borderRadius: 3,
                background: i === idx ? '#fff' : 'rgba(255,255,255,0.4)',
                transition: 'all 0.3s', cursor: 'pointer', border: 'none', padding: 0 }}
            />
          ))}
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11,
            fontFamily: 'var(--font-montserrat)', letterSpacing: '0.1em', marginLeft: 8 }}>
            {idx + 1} / {len}
          </span>
        </div>
      )}
    </div>
  );
}

/* ─── Photo Slider ──────────────────────────────────────── */
function PhotoSlider({ images, title }: { images: string[]; title: string }) {
  const [idx, setIdx] = useState(0);
  const [lb,  setLb]  = useState<number | null>(null);
  const len = images.length;

  const prev = () => setIdx(i => (i - 1 + len) % len);
  const next = () => setIdx(i => (i + 1) % len);

  return (
    <>
      <div className="relative rounded-img overflow-hidden aspect-[4/3] group cursor-pointer select-none">
        {images.map((src, i) => (
          <img
            key={i} src={src} alt={`${title} ${i + 1}`} loading="lazy" draggable={false}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setLb(i)}
          />
        ))}

        {/* Zoom hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-black/40 rounded-full w-12 h-12 flex items-center justify-center text-white text-xl">⤢</div>
        </div>

        {len > 1 && <>
          <button onClick={e => { e.stopPropagation(); prev(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center text-white text-xl"
            style={{ background: 'rgba(0,0,0,0.4)' }}>‹</button>
          <button onClick={e => { e.stopPropagation(); next(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center text-white text-xl"
            style={{ background: 'rgba(0,0,0,0.4)' }}>›</button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); setIdx(i); }}
                className="h-1 rounded-full transition-all duration-300"
                style={{ width: i === idx ? 20 : 4, background: i === idx ? '#fff' : 'rgba(255,255,255,0.5)' }} />
            ))}
          </div>
        </>}
      </div>

      {lb !== null && <Lightbox images={images} start={lb} onClose={() => setLb(null)} />}
    </>
  );
}

/* ─── Main ──────────────────────────────────────────────── */
export default function HomeDetails({ houses }: { houses: House[] }) {
  return (
    <section id="domiki" className="bg-white">
      {houses.map((h, i) => {
        const isEven  = i % 2 === 0;
        const images  = h.gallery?.length ? h.gallery : [h.image];
        const features = h.features?.length ? h.features : DEFAULT_FEATURES;

        return (
          <div key={h.title} className={`py-[100px] ${isEven ? 'bg-white' : 'bg-ivory'}`}>
            <div className="max-w-[1200px] mx-auto px-5 md:px-20">
              <div className={`flex flex-col lg:flex-row gap-12 xl:gap-20 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                <div className="lg:w-1/2 w-full">
                  <PhotoSlider images={images} title={h.title} />
                </div>
                <div className="lg:w-1/2">
                  {h.type && <p className="eyebrow mb-4">{h.type}</p>}
                  <h2 className="font-heading font-light text-[38px] leading-[1.15] mb-4">{h.title}</h2>
                  <div className="w-14 h-px bg-sand mb-6" />
                  {h.fullDescription && (
                    <p className="font-body text-text-muted leading-[1.8] mb-8">{h.fullDescription}</p>
                  )}
                  <ul className="space-y-2 mb-8">
                    {features.map(f => (
                      <li key={f} className="flex items-start gap-3 font-body text-[15px] text-text-muted">
                        <span className="text-forest mt-0.5 shrink-0">✓</span>{f}
                      </li>
                    ))}
                  </ul>
                  <div className="grid grid-cols-3 gap-4 border border-ivory-alt rounded-card p-5 mb-8 text-center">
                    {[['Вместимость', h.capacity], ['Заезд', '14:00'], ['Цена от', h.price]].map(([l, v]) => (
                      <div key={l}>
                        <p className="font-ui text-[10px] tracking-wider text-text-muted uppercase mb-1">{l}</p>
                        <p className="font-heading text-xl">{v}</p>
                      </div>
                    ))}
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
