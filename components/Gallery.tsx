import type { GalleryImage } from '@/lib/content';

export default function Gallery({ images }: { images: GalleryImage[] }) {
  if (!images.length) return null;

  return (
    <section id="galereya" className="py-[140px] bg-ivory-alt">
      <div className="max-w-[1400px] mx-auto px-5 md:px-20">
        <div className="text-center mb-16">
          <p className="eyebrow mb-4">Атмосфера усадьбы</p>
          <h2 className="section-h2">Моменты гостей</h2>
          <div className="divider" />
        </div>

        <div className="masonry">
          {images.map((img, i) => (
            <div key={i} className="masonry-item">
              <img
                src={img.src}
                alt={img.alt || 'Поместье Русаково'}
                loading="lazy"
                className="w-full rounded-gallery hover:scale-[1.04] transition-transform duration-400"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
