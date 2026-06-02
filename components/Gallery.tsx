export default function Gallery() {
  const photos = [
    "https://picsum.photos/id/1015/600/400",
    "https://picsum.photos/id/133/600/400",
    "https://picsum.photos/id/201/600/400",
    "https://picsum.photos/id/316/600/400",
    "https://picsum.photos/id/1016/600/400",
    "https://picsum.photos/id/870/600/400",
  ];

  return (
    <section id="galereya" className="py-24 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center text-[#2A6B3E] mb-16">Галерея</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((src, i) => (
            <div key={i} className="aspect-video rounded-2xl overflow-hidden">
              <img src={src} alt="" className="w-full h-full object-cover hover:scale-110 transition" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
