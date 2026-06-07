'use client';
import { useState } from 'react';

const OPTIONS = ['Сплав на байдарках', 'Баня-парилка', 'Сибирский чан', 'Питание'];

export default function BookingForm() {
  const [form, setForm] = useState({ name: '', phone: '', date: '', guests: '', message: '' });
  const [picked, setPicked] = useState<string[]>(['Сплав на байдарках']);
  const [sent, setSent] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const toggle = (o: string) =>
    setPicked((p) => (p.includes(o) ? p.filter((x) => x !== o) : [...p, o]));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    // TODO: подключить отправку заявки (Telegram-бот / e-mail / CRM)
  };

  const inputCls =
    'w-full bg-white/10 border border-white/20 rounded-btn px-4 py-3 font-body text-white placeholder:text-white/40 focus:outline-none focus:border-sand transition-colors';

  if (sent) {
    return (
      <div className="h-full flex items-center justify-center text-center min-h-[320px]">
        <div>
          <div className="w-16 h-16 rounded-full bg-forest/40 flex items-center justify-center mx-auto mb-6 text-2xl text-white">✓</div>
          <h3 className="font-heading text-2xl font-light mb-3 text-white">Заявка отправлена</h3>
          <p className="font-body text-white/60">Перезвоним в течение 3 часов и подберём время сплава.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input required placeholder="Ваше имя" className={inputCls} value={form.name} onChange={set('name')} />
        <input required type="tel" placeholder="Телефон" className={inputCls} value={form.phone} onChange={set('phone')} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <input type="date" placeholder="Дата" className={inputCls} value={form.date} onChange={set('date')} />
        <input type="number" min={1} placeholder="Сколько человек" className={inputCls} value={form.guests} onChange={set('guests')} />
      </div>

      <div>
        <p className="font-ui text-[10px] tracking-[0.2em] uppercase text-sand/70 mb-2">Что интересует</p>
        <div className="flex flex-wrap gap-2">
          {OPTIONS.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => toggle(o)}
              className={`font-ui text-[11px] tracking-wide px-4 py-2 rounded-btn border transition-colors ${
                picked.includes(o)
                  ? 'bg-forest border-forest text-white'
                  : 'bg-transparent border-white/25 text-white/70 hover:border-sand'
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      <textarea rows={3} placeholder="Пожелания, размер компании, удобное время…" className={inputCls} value={form.message} onChange={set('message')} />

      <button type="submit" className="btn btn-primary w-full py-4 text-center">ОТПРАВИТЬ ЗАЯВКУ</button>
      <p className="font-body text-white/30 text-[13px] text-center">Перезвоним в течение 3 часов</p>
    </form>
  );
}
