'use client';
import { useState } from 'react';
import type { GeneralSettings } from '@/lib/content';

export default function Contacts({ s }: { s: GeneralSettings }) {
  const [form, setForm] = useState({ name: '', phone: '', dateIn: '', dateOut: '', guests: '', message: '' });
  const [sent, setSent] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    // TODO: подключить реальную отправку (Telegram-бот / e-mail / CRM)
  };

  const inputCls = 'w-full bg-white/10 border border-white/20 rounded-btn px-4 py-3 font-body text-white placeholder:text-white/40 focus:outline-none focus:border-sand transition-colors';

  return (
    <section id="kontakty" className="py-[140px] bg-charcoal text-white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-20">
        <div className="text-center mb-16">
          <p className="eyebrow text-sand/80 mb-4">Мы ответим в течение 3 часов</p>
          <h2 className="font-heading font-light text-[42px] leading-[1.15] text-white">Забронировать пребывание</h2>
          <div className="w-14 h-px bg-sand/60 mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24">
          {/* Contacts info */}
          <div>
            <h3 className="font-heading text-[28px] font-light mb-8">
              {s.siteTitle || 'Поместье «Русаково»'}
            </h3>

            <div className="space-y-6 font-body text-white/70">
              {s.phone1 && (
                <div>
                  <p className="font-ui text-[10px] tracking-[0.2em] uppercase text-sand/70 mb-1">Телефон</p>
                  <a href={`tel:${s.phone1.replace(/\D/g,'')}`} className="text-white hover:text-sand transition-colors text-lg">{s.phone1}</a>
                  {s.phone2 && <><br /><a href={`tel:${s.phone2.replace(/\D/g,'')}`} className="text-white/70 hover:text-sand transition-colors">{s.phone2}</a></>}
                </div>
              )}
              {s.address && (
                <div>
                  <p className="font-ui text-[10px] tracking-[0.2em] uppercase text-sand/70 mb-1">Адрес</p>
                  <p className="text-white/80 leading-relaxed">{s.address}</p>
                  {s.distanceMinsk && <p className="text-white/50 text-sm mt-1">{s.distanceMinsk} · {s.distanceVolozhyn}</p>}
                </div>
              )}
              {s.instagram && (
                <div>
                  <p className="font-ui text-[10px] tracking-[0.2em] uppercase text-sand/70 mb-1">Instagram</p>
                  <a
                    href={`https://instagram.com/${s.instagram.replace('@','')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-sand transition-colors"
                  >
                    {s.instagram}
                  </a>
                </div>
              )}
            </div>

            {/* Map placeholder */}
            <div className="mt-10 rounded-img overflow-hidden bg-white/5 h-52 flex items-center justify-center">
              {/* TODO: добавить Яндекс.Карты iframe */}
              <p className="font-ui text-[11px] tracking-wider text-white/30 uppercase">Карта — д. Белокорец</p>
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div className="h-full flex items-center justify-center text-center">
                <div>
                  <div className="w-16 h-16 rounded-full bg-forest/30 flex items-center justify-center mx-auto mb-6 text-2xl">✓</div>
                  <h3 className="font-heading text-2xl font-light mb-3">Заявка отправлена!</h3>
                  <p className="font-body text-white/60">Мы свяжемся с вами в течение 3 часов.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input required placeholder="Ваше имя" className={inputCls} value={form.name} onChange={set('name')} />
                  <input required type="tel" placeholder="Телефон" className={inputCls} value={form.phone} onChange={set('phone')} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="date" placeholder="Дата заезда" className={inputCls} value={form.dateIn} onChange={set('dateIn')} />
                  <input type="date" placeholder="Дата выезда" className={inputCls} value={form.dateOut} onChange={set('dateOut')} />
                </div>
                <input type="number" placeholder="Количество гостей" className={inputCls} value={form.guests} onChange={set('guests')} />
                <textarea
                  rows={4}
                  placeholder="Пожелания и вопросы..."
                  className={inputCls}
                  value={form.message}
                  onChange={set('message')}
                />
                <button type="submit" className="btn btn-primary w-full py-4 text-center">
                  ОТПРАВИТЬ ЗАЯВКУ
                </button>
                <p className="font-body text-white/30 text-[13px] text-center">
                  Отвечаем в течение 3 часов · Предоплата 50%
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
