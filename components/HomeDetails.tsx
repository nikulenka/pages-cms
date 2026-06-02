'use client';
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % images.length);
      if (e.key === 'ArrowLeft')  setIdx((i) => (i - 1 + images.length) % images.length);
    };
    document.addEventListener('keydown', fn);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', fn);
      document.body.style.overflow = '';
    };
  }, [images.length, onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Image */}
      <img
        src={images[idx]}
        alt=""
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-img shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 text-white text-xl hover:bg-white/25 transition flex items-center justify-center"
      >
        ✕
      </button>

      {/* Prev / Next */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); setIdx((i) => (i - 1 + images.length) % images.length); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white text-2xl hover:bg-white/25 transition flex items-center justify-center"
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setIdx((i) => (i + 1) % images.length); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white text-2xl hover:bg-white/25 transition flex items-center justify-center"
          >
            ›
          </button>
        </>
      )}

      {/* Counter */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-ui text-[11px] tracking-wider text-white/50">
        {idx + 1} / {images.length}
      </div>
    </div>
  );
}

/* ── Photo slider for one house ── */
function PhotoSlider({ images, title }: { images: string[]; title: string }) {
  const [idx, setIdx] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <div className="relative rounded-img overflow-hidden aspect-[4/3] group cursor-pointer">
        {/* Slides */}
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${title} — фото ${i + 1}`}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setLightbox(i)}
          />
        ))}

        {/* Zoom hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-black/40 rounded-full w-12 h-12 flex items-center justify-center text-white text-xl">⤢</div>
        </div>

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); setIdx((i) => (i - 1 + images.length) % images.length); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/35 text-white hover:bg-black/55 transition flex items-center justify-center text-lg z-10"
            >
              ‹
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setIdx((i) => (i + 1) % images.length); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/35 text-white hover:bg-black/55 transition flex items-center justify-center text-lg z-10"
            >
              ›
            </button>
          </>
        )}

        {/* Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setIdx(i); }}
                className={`h-1 rounded-full transition-all duration-300 ${i === idx ? 'bg-white w-5' : 'bg-white/50 w-1'}`}
              />
            ))}
          </div>
        )}
      </div>

      {lightbox !== null && (
        <Lightbox images={images} start={lightbox} onClose={() => setLightbox(null)} />
      )}
    </>
  );
}

/* ── Main component ── */
export default function HomeDetails({ houses }: { houses: House[] }) {
  return (
    <section id="domiki" className="bg-white">
      {houses.map((h, i) => {
        const isEven = i % 2 === 0;
        const images = h.gallery?.length ? h.gallery : [h.image];
        const features = h.features?.length ? h.features : DEFAULT_FEATURES;

        return (
          <div
            key={h.title}
            className={`py-[100px] ${isEven ? 'bg-white' : 'bg-ivory'}`}
          >
            <div className="max-w-[1200px] mx-auto px-5 md:px-20">
              <div className={`flex flex-col lg:flex-row gap-12 xl:gap-20 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>

                {/* Photo slider */}
                <div className="lg:w-1/2 w-full">
                  <PhotoSlider images={images} title={h.title} />
                </div>

                {/* Content */}
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
                        <span className="text-forest mt-0.5 shrink-0">✓</span>
                        {f}
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
