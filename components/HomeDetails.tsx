'use client';
import { useState, useEffect, useCallback } from 'react';
import type { House } from '@/lib/content';

const DEFAULT_FEATURES = [
  'Камин / печь',
  'Кухня (плита, микроволновка, холодильник, чайник, посуда)',
  'Wi-Fi',
  'ТВ и колонки',
  'Кондиционер / обогреватель',
  'Мангал и казан',
  'Качели',
];

/* ── Lightbox ── */
function Lightbox({
  images,
  start,
  onClose,
}: {
  images: string[];
  start: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(start);

  const goPrev = useCallback(() => setIdx((i) => (i - 1 + images.length) % images.length), [images.length]);
  const goNext = useCallback(() => setIdx((i) => (i + 1) % images.length), [images.length]);

  /* Keyboard + swipe */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      onClose();
      if (e.key === 'ArrowRight')  goNext();
      if (e.key === 'ArrowLeft')   goPrev();
    };

    let startX = 0;
    const onTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const onTouchEnd   = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev();
    };

    document.addEventListener('keydown',     onKey);
    document.addEventListener('touchstart',  onTouchStart, { passive: true });
    document.addEventListener('touchend',    onTouchEnd);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown',    onKey);
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchend',   onTouchEnd);
      document.body.style.overflow = '';
    };
  }, [onClose, goNext, goPrev]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center"
      onClick={onClose}
    >
      <img
        src={images[idx]}
        alt=""
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-img shadow-2xl select-none"
        onClick={(e) => e.stopPropagation()}
        draggable={false}
      />

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 text-white text-lg hover:bg-white/25 transition flex items-center justify-center z-10"
      >
        ✕
      </button>

      {/* Prev / Next */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 text-white text-2xl hover:bg-white/30 transition flex items-center justify-center z-10"
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 text-white text-2xl hover:bg-white/30 transition flex items-center justify-center z-10"
          >
            ›
          </button>
        </>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setIdx(i); }}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? 'bg-white w-6' : 'bg-white/40 w-1.5'}`}
            />
          ))}
        </div>
      )}

      {/* Counter */}
      <div className="absolute bottom-6 right-6 font-ui text-[11px] tracking-wider text-white/40 z-10">
        {idx + 1} / {images.length}
      </div>
    </div>
  );
}

/* ── Photo slider ── */
function PhotoSlider({ images, title }: { images: string[]; title: string }) {
  const [idx, setIdx]     = useState(0);
  const [lb, setLb]       = useState<number | null>(null);

  const goPrev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setIdx((i) => (i + 1) % images.length);

  /* Touch swipe on the card slider */
  useEffect(() => {
    let startX = 0;
    const el = document.getElementById(`slider-${title}`);
    if (!el) return;
    const onStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const onEnd   = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) diff > 0 ? goNext() : goPrev();
    };
    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchend',   onEnd);
    return () => {
      el.removeEventListener('touchstart', onStart);
      el.removeEventListener('touchend',   onEnd);
    };
  });

  return (
    <>
      <div id={`slider-${title}`} className="relative rounded-img overflow-hidden aspect-[4/3] group cursor-pointer select-none">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${title} — фото ${i + 1}`}
            loading="lazy"
            draggable={false}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setLb(i)}
          />
        ))}

        {/* Zoom icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-black/40 rounded-full w-12 h-12 flex items-center justify-center text-white text-xl">⤢</div>
        </div>

        {images.length > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/35 text-white hover:bg-black/55 transition flex items-center justify-center text-xl z-10">
              ‹
            </button>
            <button onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/35 text-white hover:bg-black/55 transition flex items-center justify-center text-xl z-10">
              ›
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setIdx(i); }}
                  className={`h-1 rounded-full transition-all duration-300 ${i === idx ? 'bg-white w-5' : 'bg-white/50 w-1'}`} />
              ))}
            </div>
          </>
        )}
      </div>

      {lb !== null && (
        <Lightbox images={images} start={lb} onClose={() => setLb(null)} />
      )}
    </>
  );
}

/* ── Main ── */
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
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-3 font-body text-[15px] text-text-muted">
                        <span className="text-forest mt-0.5 shrink-0">✓</span>{f}
                      </li>
                    ))}
                  </ul>

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
