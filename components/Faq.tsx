'use client';
import { useState } from 'react';
import type { FaqItem } from '@/lib/content';

export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-[140px] bg-white">
      <div className="max-w-[800px] mx-auto px-5 md:px-20">
        <div className="text-center mb-16">
          <p className="eyebrow mb-4">Всё что важно знать</p>
          <h2 className="section-h2">Частые вопросы</h2>
          <div className="divider" />
        </div>

        <div className="space-y-1">
          {items.map((item, i) => (
            <div key={i} className="border-b border-ivory-alt">
              <button
                className="w-full flex justify-between items-center py-5 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-ui text-[13px] tracking-[0.05em] font-medium">
                  {item.question}
                </span>
                <span
                  className={`shrink-0 w-6 h-6 rounded-full border border-forest text-forest flex items-center justify-center text-sm transition-transform duration-300 ${
                    open === i ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              {open === i && (
                <p className="pb-5 font-body text-text-muted text-[15px] leading-relaxed pr-10">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
