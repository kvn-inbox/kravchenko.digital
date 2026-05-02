# Design Spec: kravchenko.digital — Bio Landing Page

**Date:** 2026-05-02  
**Status:** Approved  
**PRD:** [docs/PRD.md](../../PRD.md) — primary reference for content, colors, typography, section copy

---

## What We're Building

Static one-page bio landing site at `kravchenko.digital`. Personal brand hub combining personal branding, platform aggregation, and soft conversion to Smart Invest and Telegram.

---

## Technical Decisions

### Stack
- **Files:** `index.html` + `style.css` + `script.js` — no build tools, no frameworks
- **Fonts:** Inter via Google Fonts (400 / 600 / 700)
- **Icons:** SVG inline from Simple Icons for social platforms

### Deployment
- **Docker:** Single Caddy container serving static files from `/srv`
- **Config:** `Caddyfile` + `docker-compose.yml` included in repo
- **Caddy handles:** HTTPS via Let's Encrypt automatically, gzip, HTTP→HTTPS redirect
- **VPS:** Hetzner, domain `kravchenko.digital` pointed to server IP

### Repository
- **URL:** `github.com/kvn-inbox/kravchenko.digital`
- **Status:** New repo, to be initialized

---

## Page Structure

7 sections, one-page scroll. See PRD §3 for section order.

### 01 Hero
- 2-column layout: text left, photo right (mobile: photo top)
- Photo: `assets/photo.jpg` (placeholder until file added, min 400×400px)
- Sticky header: logo + lang toggle (RU/EN) + icon links (YouTube, Telegram, Patreon)
- CTA buttons: primary "Smart Invest →" (red fill) + secondary "Telegram" (red outline)

### 02 About
- Background `#F5F5F7`, max-width 720px text
- Red blockquote: *"Без воды и без обещаний иксов"*
- Bilingual content via `data-ru` / `data-en` attributes

### 03 What I Do
- 2×2 card grid (mobile: 1 column)
- Cards: YouTube, Smart Invest ($10.99/мес badge), Patreon ($5.99/мес badge), LinkedIn
- Hover: `border-top: 3px solid #E30613` + `translateY(-4px)`

### 04 Stats
- Background `#F5F5F7`, 4-column row (mobile: 2×2)
- `stat-companies` and `stat-reports` loaded from API, fallback to `110` / `219`
- Static: 243 Telegram subscribers, $10.99/мес Smart Invest

### 05 Latest
- 2 columns: YouTube (left) + Smart Invest reports (right), max 2 cards each
- Smart Invest: `latest_reports[0..1]` from same `/api/v1/stats` call (no extra request)
- YouTube: RSS feed `youtube.com/feeds/videos.xml?channel_id=UCSFX-Et9bJWWpSV-qvCHSCg` fetched via `https://api.allorigins.win/get?url=` CORS proxy. On error: show static placeholder cards with link to channel.

### 06 CTA
- Max 640px centered, red decorative line
- Primary button: "Попробовать Smart Invest →" → smart-invest.top
- Secondary: Telegram link text

### 07 Footer
- Background `#1D1D1F`, SVG icons 20px `#6E6E73` → hover `#FFFFFF`

---

## Language Switching

- Default: RU
- Toggle: `data-ru="..."` / `data-en="..."` attributes on all text nodes
- State persisted in `localStorage('lang')`
- No page reload

---

## Animations

- `fade-in` + `translateY(20px)` on scroll via Intersection Observer
- Applied to: section headings, cards, stat numbers, latest cards

---

## API Integration

```
GET https://smart-invest.top/api/v1/stats
```

Response fields used:
- `companies_count` → `#stat-companies`
- `reports_count` → `#stat-reports`
- `latest_reports[0..1]` → Latest section, Smart Invest column

Fallback on error: hardcoded values from PRD.

---

## SEO / Meta

- `og:title`, `og:description`, `og:image` (1200×630px OG image, placeholder)
- `favicon`: initials VK with red accent (SVG)
- GA4 snippet placeholder in `<head>`

---

## File Structure

```
kravchenko.digital/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── photo.jpg          ← добавить вручную
│   ├── og-image.jpg       ← добавить вручную (1200×630)
│   └── favicon.svg        ← генерируем
├── Caddyfile
├── docker-compose.yml
├── .gitignore
└── docs/
    └── PRD.md
```

---

## Out of Scope

- CMS or admin panel
- Analytics dashboard
- Comments or forms
- Server-side rendering
