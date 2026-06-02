# Поместье «Русаково» — сайт агроусадьбы

Сайт агро эко усадьбы «Поместье Русаково» на берегу реки Ислочь, Воложинский район, Беларусь.

**Живой сайт:** [pages-cms.pages.dev](https://pages-cms.pages.dev)
**Панель управления:** [pages-cms.pages.dev/admin](https://pages-cms.pages.dev/admin)

---

## Стек

| Слой | Технология |
|------|-----------|
| Фреймворк | Next.js 15 (App Router, static export) |
| Стили | Tailwind CSS + CSS-переменные |
| Шрифты | Cormorant Garamond · Inter · Montserrat |
| Хостинг | Cloudflare Pages |
| CMS (основная) | Sveltia CMS → `/admin` |
| CMS (альтернативная) | Pages CMS → `app.pagescms.org` |
| OAuth-прокси | Cloudflare Worker (`workers/cms-oauth.js`) |
| Контент | Markdown + YAML в папке `content/` |

---

## Структура проекта

```
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Шрифты, мета, favicon
│   ├── page.tsx            # Главная страница — сборка всех секций
│   ├── globals.css         # CSS-переменные, утилиты, masonry
│   └── icon.png            # Favicon (логотип)
│
├── components/             # React-компоненты (один файл = одна секция)
│   ├── Header.tsx          # Фиксированная шапка, прозрачная → тёмная
│   ├── HeroSlider.tsx      # Полноэкранный слайдер (auto-play)
│   ├── Welcome.tsx         # Приветствие + 4 бейджа со статистикой
│   ├── WhyUs.tsx           # 4 причины приехать
│   ├── HomeDetails.tsx     # Домики: слайдер фото + лайтбокс + детали
│   ├── Activities.tsx      # Активности: сетка карточек
│   ├── WeddingBlock.tsx    # Свадьбы: полноширинный баннер
│   ├── Gallery.tsx         # Masonry-галерея
│   ├── Testimonials.tsx    # Слайдер отзывов
│   ├── Faq.tsx             # Аккордеон FAQ
│   ├── Prices.tsx          # Таблица цен и условий
│   ├── Contacts.tsx        # Контакты + Яндекс.Карта + форма
│   └── Footer.tsx          # Подвал с навигацией и условиями
│
├── content/                # ВЕСЬ КОНТЕНТ — редактируется через CMS
│   ├── general.yml         # Настройки сайта: hero, контакты, цены
│   ├── faq.yml             # Вопросы и ответы
│   ├── gallery.yml         # Галерея (список фото)
│   ├── houses/             # Домики и баня (по одному .md файлу)
│   │   ├── lesnoj.md
│   │   ├── ozernyj.md
│   │   ├── solnechnyj.md
│   │   └── banya.md
│   ├── activities/         # Активности (по одному .md файлу)
│   └── reviews/            # Отзывы гостей
│
├── lib/
│   └── content.ts          # Функции чтения контента: getHouses(), getActivities() и др.
│
├── public/
│   ├── media/              # Все фотографии сайта
│   │   ├── Logo.png        # Логотип (круглый бейдж)
│   │   ├── hero.png        # Hero-фото
│   │   └── ph-*.jpg        # Placeholder-фото (заменить на реальные)
│   └── admin/              # Sveltia CMS
│       ├── index.html      # Загружает Sveltia CMS из CDN
│       └── config.yml      # Схема коллекций CMS
│
├── workers/
│   ├── cms-oauth.js        # Cloudflare Worker: OAuth-прокси для CMS
│   └── wrangler.toml       # Конфиг деплоя Worker
│
├── docs/
│   └── brandbook-rusakovo 3 — ТЗ.md  # Техническое задание
│
├── .pages.yml              # Конфиг Pages CMS (app.pagescms.org)
├── next.config.mjs         # output: 'export' для Cloudflare Pages
├── tailwind.config.ts      # Цвета дизайн-системы (forest, sand, ivory...)
└── tsconfig.json
```

---

## Редактирование контента

### Через Sveltia CMS (рекомендуется)

1. Открой [pages-cms.pages.dev/admin](https://pages-cms.pages.dev/admin)
2. Нажми **Login with GitHub**
3. Редактируй нужный раздел
4. Нажми **Save** — изменения автоматически коммитятся в GitHub, Cloudflare пересобирает сайт

### Через Pages CMS (альтернатива)

1. Открой [app.pagescms.org](https://app.pagescms.org)
2. Войди через GitHub → выбери репо `nikulenka/pages-cms`

### Вручную (для разработчиков)

Редактируй файлы в папке `content/` напрямую и делай git push.

---

## Как добавить фотографии

1. Открой `/admin` → нужный раздел (Домики, Активности и т.д.)
2. Нажми на поле **Главное фото** или **Галерея домика**
3. Загрузи фото → оно сохранится в `public/media/`
4. Сохрани запись → сайт автоматически обновится

**Текущие placeholder-фото** находятся в `public/media/ph-*.jpg`. Заменяй их реальными фотографиями усадьбы через CMS.

---

## Локальная разработка

```bash
# Установить зависимости
npm install

# Запустить dev-сервер
npm run dev
# → http://localhost:3000

# Собрать статический сайт
npm run build
# → папка out/
```

---

## Деплой

Деплой происходит **автоматически** при каждом пуше в ветку `main`:

```
git push origin main
# → Cloudflare Pages запускает: npm run build
# → Публикует содержимое папки out/
```

Настройки Cloudflare Pages:
- **Build command:** `npm run build`
- **Build output directory:** `out`
- **Branch:** `main`

---

## OAuth Worker (CMS авторизация)

Worker обеспечивает авторизацию через GitHub для Sveltia CMS.

**URL Worker:** `https://cms-auth.yjd4d2s94k.workers.dev`

**Переменные окружения Worker** (в Cloudflare Dashboard → Worker → Settings → Variables):
- `GITHUB_CLIENT_ID` — из GitHub OAuth App
- `GITHUB_CLIENT_SECRET` — из GitHub OAuth App

**Обновление Worker** (из папки `workers/`):
```bash
npx wrangler deploy
```

---

## Дизайн-система

Цвета (CSS-переменные в `globals.css`):

| Переменная | Hex | Назначение |
|-----------|-----|-----------|
| `--clr-forest` | `#2F4F3A` | Основной цвет, кнопки, акценты |
| `--clr-olive` | `#70835A` | Вторичный, hover |
| `--clr-sand` | `#D4B483` | Золото, разделители |
| `--clr-ivory` | `#FAF9F5` | Фон светлых секций |
| `--clr-charcoal` | `#222222` | Тёмный фон, footer |

Шрифты: **Cormorant Garamond** (заголовки) · **Inter** (текст) · **Montserrat** (навигация, кнопки)

---

## Контакты усадьбы

- **Телефон:** +375 (29) 247-74-00
- **Instagram:** [@pomestie_rusakovo](https://instagram.com/pomestie_rusakovo)
- **Адрес:** Минская обл., Воложинский р-н, д. Белокорец, ул. Центральная, 9
