import type { GeneralSettings } from '@/lib/content';

const PLACEHOLDER_BG = 'https://picsum.photos/id/1015/1920/1080'; // TODO: заменить на heroImage из CMS

export default function Hero({ s }: { s: GeneralSettings }) {
  const bg = s.heroImage || PLACEHOLDER_BG;

  return (
    <section
      className="relative h-screen min-h-[600px] flex items-center justify-center text-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative z-10 max-w-3xl px-6">
        <p className="eyebrow text-white/80 mb-6 tracking-[0.3em]">
          {s.heroEyebrow || 'АГРОУСАДЬБА · ВОЛОЖИНСКИЙ РАЙОН'}
        </p>

        <h1 className="font-heading font-light text-white leading-[1.1] mb-6"
          style={{ fontSize: 'clamp(42px, 6vw, 72px)' }}>
          {s.heroTitle || 'ПОМЕСТЬЕ «РУСАКОВО»'}
        </h1>

        <div className="divider bg-sand/60 mx-auto" />

        <p className="font-body font-light text-white/85 text-lg leading-relaxed mt-6 mb-10 whitespace-pre-line">
          {s.heroSubtitle || 'На берегу реки Ислочь, у Налибокской пущи.\nЧетыре стихии отдыха — вода, воздух, огонь и земля.'}
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#kontakty" className="btn btn-primary">ЗАБРОНИРОВАТЬ</a>
          <a href="#domiki"   className="btn btn-ghost">ПОСМОТРЕТЬ ДОМИКИ</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="font-ui text-[10px] tracking-[0.2em]">ЛИСТАТЬ</span>
        <div className="w-px h-10 bg-white/30 animate-pulse" />
      </div>
    </section>
  );
}
