export default function Activities() {
  const activities = [
    { title: "Русская баня", desc: "С купелью и зоной отдыха", icon: "🪵" },
    { title: "Прогулки по лесу", desc: "Сбор грибов и ягод", icon: "🌲" },
    { title: "Рыбалка", desc: "На пруду рядом с усадьбой", icon: "🎣" },
    { title: "Велосипеды и катамараны", desc: "Активный отдых на природе", icon: "🚲" },
    { title: "Мастер-классы", desc: "Кулинария, травы, рукоделие", icon: "🍲" },
    { title: "Вечера у костра", desc: "Гитара, чай и звёздное небо", icon: "🔥" },
  ];

  return (
    <section id="aktivnosti" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center text-[#2A6B3E] mb-16">Как провести время</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {activities.map((item, i) => (
            <div key={i} className="bg-[#FAF6F0] p-10 rounded-3xl hover:scale-105 transition">
              <div className="text-6xl mb-6">{item.icon}</div>
              <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
              <p className="text-[#3C2F2F]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
