const ELEMENTS = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M24 6C24 6 10 18 10 28a14 14 0 0028 0C38 18 24 6 24 6z" />
        <path d="M24 28v8M20 34h8" />
      </svg>
    ),
    title: 'Вода',
    text: 'Река Ислочь, баня-парилка на берегу, сибирский чан на дровах, сплавы на байдарках и рыбалка.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M24 8c0 0-8 6-8 14s8 14 8 14 8-6 8-14S24 8 24 8z" />
        <path d="M12 22h24M18 14l-6 8M30 14l6 8" />
      </svg>
    ),
    title: 'Воздух',
    text: 'Налибокская пуща, эко-тропа, велосипеды и квадроциклы — тишина и чистый воздух.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M24 8c0 8-10 12-10 20a10 10 0 0020 0C34 20 24 16 24 8z" />
        <path d="M24 32v-8" />
      </svg>
    ),
    title: 'Огонь',
    text: 'Камин, костровая чаша, мангал, казан — вечера у живого огня.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M8 36c0 0 4-12 16-12s16 12 16 12" />
        <path d="M24 24V14M18 18l6-4 6 4" />
        <circle cx="24" cy="12" r="3" />
      </svg>
    ),
    title: 'Земля',
    text: 'Своя ферма, домики с характером и историей, настоящая забота вместо «сервиса».',
  },
];

export default function WhyUs() {
  return (
    <section id="about" className="py-[140px] bg-white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-20">
        <div className="text-center mb-16">
          <p className="eyebrow mb-4">Почему гости выбирают нас</p>
          <h2 className="section-h2">Четыре стихии отдыха</h2>
          <div className="divider" />
          <p className="font-body text-text-muted max-w-xl mx-auto leading-relaxed">
            Домики с характером и историей · Живое общение вместо гаджетов · Собственная вселенная приключений
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {ELEMENTS.map(({ icon, title, text }) => (
            <div key={title} className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-ivory mb-6 text-forest group-hover:bg-forest group-hover:text-white transition-all duration-400">
                {icon}
              </div>
              <h3 className="font-heading text-2xl font-light mb-3">{title}</h3>
              <p className="font-body text-text-muted text-[15px] leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
