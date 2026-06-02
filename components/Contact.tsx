'use client';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', phone: '', date: '', guests: '', message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
  };

  return (
    <section id="kontakty" className="py-24 bg-[#2A6B3E] text-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-16">Забронировать пребывание</h2>

        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl">
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Ваше имя"
              className="bg-white/20 border border-white/30 p-4 rounded-2xl placeholder:text-white/70"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <input
              type="tel"
              placeholder="Телефон"
              className="bg-white/20 border border-white/30 p-4 rounded-2xl placeholder:text-white/70"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <input
              type="date"
              className="bg-white/20 border border-white/30 p-4 rounded-2xl"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
            <input
              type="number"
              placeholder="Количество гостей"
              className="bg-white/20 border border-white/30 p-4 rounded-2xl placeholder:text-white/70"
              value={formData.guests}
              onChange={(e) => setFormData({...formData, guests: e.target.value})}
            />
          </div>

          <textarea
            placeholder="Дополнительные пожелания..."
            rows={5}
            className="mt-6 w-full bg-white/20 border border-white/30 p-4 rounded-2xl placeholder:text-white/70"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          />

          <button
            type="submit"
            className="mt-8 w-full bg-white text-[#2A6B3E] py-5 rounded-2xl font-semibold text-lg hover:bg-[#F8F4ED]"
          >
            Отправить заявку
          </button>
        </form>
      </div>
    </section>
  );
}
