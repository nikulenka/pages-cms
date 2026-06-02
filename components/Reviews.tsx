export default function Reviews() {
  const reviews = [
    {
      text: "Самое душевное место, в котором мы были! Домики очень уютные, баня — просто сказка.",
      name: "Анна и Сергей",
      location: "Москва"
    },
    {
      text: "Отличное место для перезагрузки. Тишина, природа, вкусная еда. Уже планируем вернуться.",
      name: "Елена К.",
      location: "Санкт-Петербург"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center text-[#2A6B3E] mb-16">Отзывы гостей</h2>

        <div className="grid md:grid-cols-2 gap-10">
          {reviews.map((review, i) => (
            <div key={i} className="bg-[#FAF6F0] p-10 rounded-3xl">
              <p className="text-lg italic mb-8">«{review.text}»</p>
              <div>
                <p className="font-semibold">{review.name}</p>
                <p className="text-sm text-gray-500">{review.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
