export default function Footer() {
  return (
    <footer className="bg-[#3C2F2F] text-white py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="text-3xl font-bold mb-4">Поместье Русаково</div>
        <p className="mb-8">Эко-усадьба • Отдых на природе • Войводина</p>

        <div className="flex justify-center gap-8 text-sm">
          <p>📍 Войводина, Сербия</p>
          <p>📞 +381 XX XXX XXX</p>
          <p>✉️ info@rusakovo.rs</p>
        </div>

        <p className="mt-12 text-sm opacity-60">© 2026 Поместье Русаково. Все права защищены.</p>
      </div>
    </footer>
  );
}
