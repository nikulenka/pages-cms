'use client';
import { useEffect, useState } from 'react';

const FALLBACK = ['https://picsum.photos/id/1015/1920/1080'];

export default function HeroSlider({
  images,
  eyebrow,
  title,
  subtitle,
}: {
  images?: string[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}) {
  const slides = images?.length ? images : FALLBACK;
  const [cur, setCur] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setCur((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [slides.length]);

  const prev = () => setCur((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCur((c) => (c + 1) % slides.length);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center text-center overflow-hidden">
      {/* Slides */}
      {slides.map((src, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === cur ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          aria-hidden={i !== cur}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/38 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6">
        <p className="font-ui text-[11px] tracking-[0.3em] uppercase text-white/75 mb-6">
          {eyebrow || 'АГРОУСАДЬБА · ВОЛОЖИНСКИЙ РАЙОН'}
        </p>
        <h1
          className="font-heading font-light text-white leading-[1.1] mb-5"
          style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}
        >
          {title || 'ПОМЕСТЬЕ «РУСАКОВО»'}
        </h1>
        <div className="w-14 h-px bg-white/40 mx-auto mb-6" />
        <p className="font-body font-light text-white/82 text-lg leading-relaxed mb-10 whitespace-pre-line">
          {subtitle || 'На берегу реки Ислочь, у Налибокской пущи.\nЧетыре стихии отдыха — вода, воздух, огонь и земля.'}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#kontakty" className="btn btn-primary">ЗАБРОНИРОВАТЬ</a>
          <a href="#domiki"   className="btn btn-ghost">ПОСМОТРЕТЬ ДОМИКИ</a>
        </div>
      </div>

      {/* Prev / Next arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 text-white hover:bg-black/50 transition flex items-center justify-center"
            aria-label="Предыдущее фото"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 text-white hover:bg-black/50 transition flex items-center justify-center"
            aria-label="Следующее фото"
          >
            ›
          </button>
        </>
      )}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCur(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === cur ? 'bg-white w-6' : 'bg-white/40 w-1.5'}`}
              aria-label={`Слайд ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll hint */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-white/45 pointer-events-none">
        <span className="font-ui text-[9px] tracking-[0.2em]">ЛИСТАТЬ</span>
        <div className="w-px h-8 bg-white/30 animate-pulse" />
      </div>
    </section>
  );
}
