import type { GeneralSettings } from '@/lib/content';

const PLACEHOLDER = 'https://picsum.photos/id/1039/1920/800'; // TODO: заменить на weddingImage из CMS

export default function WeddingBlock({ s }: { s: GeneralSettings }) {
  const bg = s.weddingImage || PLACEHOLDER;

  return (
    <section
      id="svadba"
      className="relative py-32 flex items-center justify-center text-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative z-10 max-w-2xl px-6">
        <p className="eyebrow text-sand/80 mb-6">Торжества и праздники</p>
        <h2
          className="font-heading font-light text-white leading-[1.15] mb-6"
          style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
        >
          {s.weddingTitle || 'Свадьба и праздник вашей мечты на природе'}
        </h2>
        <div className="w-14 h-px bg-sand/60 mx-auto mb-6" />
        <p className="font-body font-light text-white/80 text-lg leading-relaxed mb-10">
          {s.weddingText ||
            'До 30 гостей, аренда домика под застолье, партнёры — кейтеринг и фотографы. Банкетный зал — скоро открытие.'}
        </p>
        <a href="#kontakty" className="btn btn-ghost">УЗНАТЬ ПОДРОБНЕЕ</a>
      </div>
    </section>
  );
}
