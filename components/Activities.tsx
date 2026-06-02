import type { Activity } from '@/lib/content';

export default function Activities({ activities }: { activities: Activity[] }) {
  return (
    <section id="aktivnosti" className="py-[140px] bg-ivory">
      <div className="max-w-[1400px] mx-auto px-5 md:px-20">
        <div className="text-center mb-16">
          <p className="eyebrow mb-4">Развлечения и отдых</p>
          <h2 className="section-h2">Как провести время</h2>
          <div className="divider" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {activities.map((a) => (
            <article
              key={a.title}
              className="bg-white rounded-card overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)] transition-all duration-400 group"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={a.image}
                  alt={a.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-light mb-2">{a.title}</h3>
                <p className="font-body text-text-muted text-[14px] leading-relaxed">{a.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
