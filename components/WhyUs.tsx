const REASONS = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-9 h-9">
        <path d="M24 6L6 24h6v18h12V30h8v12h12V24h6L24 6z" />
      </svg>
    ),
    label: '78 км от Минска',
    title: 'Рядом с городом',
    text: 'Всего 1,5 часа езды — и вы на берегу реки Ислочь, у границы Налибокской пущи. Асфальт до самой деревни.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-9 h-9">
        <path d="M24 8c0 8-10 12-10 20a10 10 0 0020 0C34 20 24 16 24 8z" />
        <path d="M16 34c0 4 3.6 6 8 6s8-2 8-6" />
      </svg>
    ),
    label: 'Баня на берегу реки',
    title: 'Настоящий пар',
    text: 'Мобильная парилка прямо у воды + сибирский чан на дровах на 8 человек. 150 руб. / 4 часа.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-9 h-9">
        <ellipse cx="24" cy="34" rx="14" ry="6" />
        <path d="M16 34c0-6 4-14 8-20 4 6 8 14 8 20" />
        <path d="M20 20c-4-2-6-6-4-10M28 20c4-2 6-6 4-10" />
      </svg>
    ),
    label: 'Своя ферма',
    title: 'Живая природа',
    text: 'Овцы, птица, огород — дети знакомятся с животными, взрослые замедляются. Настоящая деревенская атмосфера.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-9 h-9">
        <path d="M8 40V20l16-12 16 12v20H8z" />
        <path d="M18 40V28h12v12" />
        <path d="M20 22h8" />
      </svg>
    ),
    label: 'До 30 гостей',
    title: 'Любой формат',
    text: 'Три домика и баня — для романтики вдвоём, семьи с детьми, дружеской компании или корпоратива.',
  },
];

export default function WhyUs() {
  return (
    <section id="about" className="py-[140px] bg-ivory-alt">
      <div className="max-w-[1200px] mx-auto px-5 md:px-20">
        <div className="text-center mb-16">
          <p className="eyebrow mb-4">Почему выбирают нас</p>
          <h2 className="section-h2">Четыре причины приехать</h2>
          <div className="divider" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {REASONS.map(({ icon, label, title, text }) => (
            <div
              key={title}
              className="bg-white rounded-card p-8 text-center hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-400"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ivory mb-5 text-forest">
                {icon}
              </div>
              <p className="eyebrow text-[10px] mb-2">{label}</p>
              <h3 className="font-heading text-[22px] font-light mb-3">{title}</h3>
              <p className="font-body text-text-muted text-[14px] leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
