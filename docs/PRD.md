# ТЗ: Bio Landing Page — kravchenko.digital

**Домен:** https://kravchenko.digital  
**Статус:** ✅ Approved — готово к реализации  
**Реализация:** VS Code (статичный HTML/CSS/JS)

---

## 1. Цель и аудитория

**Цель страницы:** Комбинированная — личный бренд + единый хаб всех платформ + мягкая конверсия.

**Целевая аудитория:**
- Русскоязычные и англоязычные инвесторы-любители (US рынок)
- Профессиональные контакты (IT, e-commerce, retail)
- Потенциальные подписчики YouTube / Patreon / smart-invest.top

**Языки:** RU + EN — переключатель в шапке страницы (по умолчанию RU).

---

## 2. Дизайн-система

### Цвета

| Токен | Hex | Применение |
|---|---|---|
| `--bg-primary` | `#FFFFFF` | Основной фон |
| `--bg-secondary` | `#F5F5F7` | Фон чередующихся секций |
| `--bg-footer` | `#1D1D1F` | Footer |
| `--text-primary` | `#1D1D1F` | Основной текст |
| `--text-secondary` | `#6E6E73` | Подписи, мета-текст |
| `--accent` | `#E30613` | CTA, акценты, hover, декоративные линии |
| `--white` | `#FFFFFF` | Текст на тёмном фоне |

> Стиль: Apple (светлый, воздушный) + BMW M (красный акцент)

### Типографика

| Элемент | Размер | Стиль |
|---|---|---|
| Hero name | 64–80px | Uppercase, Bold |
| H2 (секции) | 40–48px | Uppercase, Semibold |
| Stats цифры | 60–72px | Bold, `--accent` |
| Body | 18–20px | Regular |
| Подписи / мета | 14px | Regular, `--text-secondary` |

**Шрифт:** Inter (Google Fonts) — основной. SF Pro Display как fallback для macOS.

### Прочее

- **Border radius карточек:** 12–16px
- **Тени:** `box-shadow: 0 2px 16px rgba(0,0,0,0.06)`
- **Анимации:** `fade-in + translateY(20px)` при скролле (Intersection Observer)
- **Декор:** Красная горизонтальная линия `2px #E30613` в Hero и CTA

---

## 3. Структура (One-page scroll)

```
01 HERO
02 ABOUT
03 WHAT I DO
04 STATS
05 LATEST
06 CTA
07 FOOTER
```

---

## 4. Блоки

### 01 HERO

**Фон:** `#FFFFFF`  
**Макет:** 2 колонки — текст слева, фото справа (мобайл: фото сверху)

```
Vitaliy Kravchenko
CPMO · Investor · Analyst
────────────────────────── ← красная линия 2px
Инвестирую в US рынок.
Делаю аналитику понятной.

[Подписаться в Telegram]   [Smart Invest →]
```

**CTA:**
- Первичная: `Smart Invest →` — красный фон, белый текст → smart-invest.top
- Вторичная: `Подписаться в Telegram` — обводка красная → t.me/kravchenko_invest

**Фото:** YouTube-аватар или LinkedIn. Квадрат/портрет, мин. 400×400px, без рамок.

**Sticky header:**
```
KRAVCHENKO | Smart Invest     [RU | EN]     [YouTube] [Telegram] [Patreon]
```

---

### 02 ABOUT

**Фон:** `#F5F5F7` | **Ширина текста:** max 720px

**RU:**
> Инвестирую в американский рынок. Веду публичный портфель, разбираю отчётности компаний, активно использую AI — и делюсь тем, что реально работает. Без воды и без обещаний иксов.
>
> Днём — Chief PMO: управляю командой PM, BA и Tech Support.  
> Вечером — инвестор, аналитик и AI early adopter.

**EN:**
> I invest in the US stock market. I run a public portfolio, analyze company earnings reports using AI, and share what actually works — no fluff, no promises of 10x.
>
> By day — Chief PMO managing teams of PMs, BAs, and Tech Support.  
> By night — investor, analyst, and AI early adopter.

**Опциональная red-quote:** *"Без воды и без обещаний иксов"*

---

### 03 WHAT I DO

**Фон:** `#FFFFFF` | **Макет:** 2×2 сетка (мобайл: 1 колонка)

| Карточка | Иконка | Описание | Бейдж | CTA | Ссылка |
|---|---|---|---|---|---|
| YouTube | YT logo | Обзоры акций, дивиденды, макроэкономика | — | Смотреть → | youtube.com/@kravchenko_invest |
| Smart Invest | ◎ | AI-аналитика earnings calls для 110+ компаний | `$10.99/мес` | Попробовать → | smart-invest.top |
| Patreon | Patreon logo | Личный инвест-блог: сделки, идеи, макро-взгляд | `от $5.99/мес` | Подписаться → | patreon.com/c/kravchenko_invest |
| LinkedIn | LI logo | CPMO · Omnicore — international software product company for fashion retail | — | Профиль → | linkedin.com/in/kvnprofile/ |

**Hover:** `border-top: 3px solid #E30613` + `translateY(-4px)`

---

### 04 STATS

**Фон:** `#F5F5F7` | **Макет:** 4 в ряд (мобайл: 2×2)

| id | Цифра | Подпись |
|---|---|---|
| `stat-companies` | API → фаллбек `110` | компаний отслеживаю |
| `stat-reports` | API → фаллбек `219` | отчётов написано |
| — | `243` | подписчика в Telegram |
| — | `$10.99` | / мес · Smart Invest |

**Цифры:** 60–72px Bold `#E30613` | **Подписи:** 14px `#6E6E73`

#### API

```
GET https://smart-invest.top/api/v1/stats
```

```json
{
  "companies_count": 110,
  "reports_count": 219,
  "latest_reports": [
    {
      "ticker": "XOM",
      "company_name": "Exxon Mobil",
      "company_url": "https://smart-invest.top/companies/xom-exxon-mobil",
      "report_date": "2026-05-01"
    }
  ]
}
```

```js
async function loadStats() {
  try {
    const res = await fetch('https://smart-invest.top/api/v1/stats');
    const data = await res.json();
    document.getElementById('stat-companies').textContent = data.companies_count;
    document.getElementById('stat-reports').textContent = data.reports_count;
  } catch (e) {
    document.getElementById('stat-companies').textContent = '110';
    document.getElementById('stat-reports').textContent = '219';
  }
}
```

> 💡 `latest_reports` из этого же запроса используется в блоке 05 LATEST.

---

### 05 LATEST

**Фон:** `#FFFFFF` | **Макет:** 2 колонки (YouTube слева, Smart Invest справа), max 2 карточки каждая

**Структура карточки:**
```
[превью 16:9 или логотип]
Название / Ticker · Компания
Дата
[Смотреть → / Читать отчёт →]
```

| Колонка | Источник | Заметка |
|---|---|---|
| Smart Invest | `latest_reports[0..1]` из API `/stats` | Готово, доп. запрос не нужен |
| YouTube | YouTube RSS или статика | RSS: `youtube.com/feeds/videos.xml?channel_id=...` через CORS-прокси |

**Рекомендация:** Smart Invest — API сразу. YouTube — статика на старте, RSS после запуска.

---

### 06 CTA

**Фон:** `#FFFFFF` | **Ширина:** max 640px, центр

**RU:**
```
Хочешь инвестировать осознанно?
────────────────────────────────

Получай AI-аналитику 110+ компаний каждую неделю.
Первый отчёт — бесплатно.

[Попробовать Smart Invest →]

или подпишись на Telegram — @kravchenko_invest
```

**EN:**
```
Want to invest with clarity?
────────────────────────────

Get AI-powered earnings analysis for 110+ companies every week.
First report — free.

[Try Smart Invest →]

or join Telegram — @kravchenko_invest
```

**Кнопка:** `#E30613` фон, белый текст, 18px, `padding: 16px 32px`, `border-radius: 8px`

---

### 07 FOOTER

**Фон:** `#1D1D1F` | **Текст:** `#FFFFFF` / `#6E6E73`

```
KRAVCHENKO | Smart Invest      [YT] [TG] [Patreon] [LinkedIn]

kravchenko.digital             © 2026 · Vitaliy Kravchenko
```

**Иконки:** SVG 20px, `#6E6E73` → hover `#FFFFFF`

---

## 5. Технические требования

| Параметр | Значение |
|---|---|
| **Тип** | Статичный HTML/CSS/JS (`index.html` + `style.css` + `script.js`) |
| **Хостинг** | Netlify / Vercel / GitHub Pages |
| **Домен** | kravchenko.digital |
| **Адаптивность** | Mobile-first. Breakpoints: 375 / 768 / 1280px |
| **Lighthouse** | ≥ 90 (Performance + Accessibility) |
| **Шрифты** | Google Fonts: Inter 400 / 600 / 700 |
| **Иконки** | SVG inline или [Simple Icons](https://simpleicons.org/) |
| **Аналитика** | GA4 или Plausible |
| **OG-теги** | og:title, og:description, og:image |

### Языковое переключение

```html
<span data-ru="Инвестирую" data-en="I invest">Инвестирую</span>
```

JS toggle без перезагрузки, состояние в `localStorage`.

---

## 6. Контент-чеклист

- [ ] Фото (мин. 400×400px) — YouTube или LinkedIn
- [ ] OG-изображение (1200×630px)
- [ ] Favicon / логотип (инициалы VK + красный акцент)
- [ ] 2 последних видео YouTube для блока Latest (статика на старте)
- [ ] Проверить актуальность цифр (Telegram подписчики, цена Patreon)

---

## 7. Ссылки

| Ресурс | URL |
|---|---|
| Сайт | https://kravchenko.digital |
| YouTube | https://youtube.com/@kravchenko_invest |
| Telegram | https://t.me/kravchenko_invest |
| Smart Invest | https://smart-invest.top |
| Stats API | https://smart-invest.top/api/v1/stats |
| Patreon | https://patreon.com/c/kravchenko_invest |
| LinkedIn | https://linkedin.com/in/kvnprofile/ |
