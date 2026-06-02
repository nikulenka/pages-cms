'use client';
import { useState } from 'react';
import type { Review } from '@/lib/content';

const STARS = '★★★★★';

const PLACEHOLDERS: Review[] = [
  {
    name: 'Анна и Сергей',
    location: 'Минск',
    text: 'Провели здесь выходные всей семьёй — дети не хотели уезжать. Баня на берегу реки, костёр, тишина. Вернёмся обязательно.',
    rating: 5,
    published: true,
  },
  {
    name: 'Компания «ТехноЛидер»',
    location: 'Минск',
    text: 'Выездной тренинг на природе — лучший выбор. Организация на высшем уровне, хозяева встретили как своих. Рекомендуем всем коллегам.',
    rating: 5,
    published: true,
  },
];

export default function Testimonials({ reviews }: { reviews: Review[] }) {
  const items = reviews.length ? reviews : PLACEHOLDERS;
  const [idx, setIdx] = useState(0);

  return (
    <section className="py-[140px] bg-ivory-alt">
      <div className="max-w-[900px] mx-auto px-5 md:px-20 text-center">
        <p className="eyebrow mb-4">Что говорят гости</p>
        <h2 className="section-h2 mb-4">Отзывы</h2>
        <div className="divider" />

        <div className="mt-12 relative min-h-[180px]">
          {items.map((r, i) => (
            <div
              key={i}
              className={`transition-all duration-400 ${i === idx ? 'block' : 'hidden'}`}
            >
              <p className="font-body font-light text-text-muted text-[10px] tracking-[0.2em] uppercase mb-1">
                {STARS}
              </p>
              <blockquote className="font-heading font-light italic text-[26px] md:text-[32px] leading-[1.4] text-charcoal mb-8">
                «{r.text}»
              </blockquote>
              <p className="font-ui text-[12px] tracking-wider font-semibold">{r.name}</p>
              {r.location && (
                <p className="font-body text-text-muted text-sm mt-1">{r.location}</p>
              )}
            </div>
          ))}
        </div>

        {items.length > 1 && (
          <div className="flex justify-center gap-3 mt-8">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === idx ? 'bg-forest w-6' : 'bg-sand'
                }`}
                aria-label={`Отзыв ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
