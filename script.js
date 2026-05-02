/* ─── Language Toggle ─── */
const LANG_KEY = 'kd_lang';

function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-ru]').forEach(el => {
    el.textContent = lang === 'en' ? el.dataset.en : el.dataset.ru;
  });
  document.querySelectorAll('[data-ru-html]').forEach(el => {
    el.innerHTML = lang === 'en' ? el.dataset.enHtml : el.dataset.ruHtml;
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

function initLang() {
  const saved = localStorage.getItem(LANG_KEY) || 'ru';
  setLang(saved);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
}

/* ─── Stats API + Latest (Smart Invest) ─── */
const STATS_URL = 'https://smart-invest.top/api/v1/stats';
const FALLBACK = { companies: 110, reports: 219 };

async function loadStats() {
  try {
    const res = await fetch(STATS_URL);
    if (!res.ok) throw new Error('stats api error');
    const data = await res.json();

    const companiesEl = document.getElementById('stat-companies');
    const reportsEl = document.getElementById('stat-reports');
    if (companiesEl) companiesEl.textContent = data.companies_count ?? FALLBACK.companies;
    if (reportsEl) reportsEl.textContent = data.reports_count ?? FALLBACK.reports;

    if (Array.isArray(data.latest_reports) && data.latest_reports.length) {
      renderSmartInvestCards(data.latest_reports.slice(0, 2));
    }
  } catch {
    const companiesEl = document.getElementById('stat-companies');
    const reportsEl = document.getElementById('stat-reports');
    if (companiesEl) companiesEl.textContent = FALLBACK.companies;
    if (reportsEl) reportsEl.textContent = FALLBACK.reports;
  }
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

function renderSmartInvestCards(reports) {
  const container = document.getElementById('latest-si');
  if (!container) return;
  container.innerHTML = reports.map(r => `
    <div class="latest-card fade-up">
      <div class="latest-thumb latest-thumb-ticker">
        <span class="ticker-text">${r.ticker}</span>
      </div>
      <div class="latest-info">
        <div class="latest-meta">${r.ticker} · ${r.company_name}</div>
        <div class="latest-title">Разбор отчёта</div>
        <div class="latest-date">${formatDate(r.report_date)}</div>
        <a href="${r.company_url}" target="_blank" rel="noopener" class="latest-link">Читать отчёт →</a>
      </div>
    </div>
  `).join('');
  observeFadeUps(container);
}

/* ─── Latest: YouTube RSS ─── */
const YT_CHANNEL = 'UCSFX-Et9bJWWpSV-qvCHSCg';
const YT_RSS = `https://www.youtube.com/feeds/videos.xml?channel_id=${YT_CHANNEL}`;
const YT_CHANNEL_URL = 'https://youtube.com/@kravchenko_invest';
const CORS_PROXIES = [
  url => `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
  url => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  url => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
];

async function fetchViaProxy(url) {
  for (const makeProxy of CORS_PROXIES) {
    try {
      const res = await fetch(makeProxy(url), { signal: AbortSignal.timeout(5000) });
      if (!res.ok) continue;
      const text = await res.text();
      // allorigins wraps in JSON, others return raw XML
      try {
        const json = JSON.parse(text);
        return json.contents || json;
      } catch {
        return text;
      }
    } catch { /* try next proxy */ }
  }
  throw new Error('all proxies failed');
}

async function loadYouTube() {
  const container = document.getElementById('latest-yt');
  if (!container) return;
  try {
    const raw = await fetchViaProxy(YT_RSS);
    const parser = new DOMParser();
    const xml = parser.parseFromString(raw, 'text/xml');
    const entries = Array.from(xml.querySelectorAll('entry')).slice(0, 2);
    if (!entries.length) throw new Error('no entries');

    container.innerHTML = entries.map(entry => {
      const id = entry.querySelector('videoId')?.textContent || '';
      const title = entry.querySelector('title')?.textContent || '';
      const published = entry.querySelector('published')?.textContent || '';
      const videoUrl = `https://youtube.com/watch?v=${id}`;
      const thumb = id ? `https://i.ytimg.com/vi/${id}/mqdefault.jpg` : '';
      const date = published ? new Date(published).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
      return `
        <div class="latest-card fade-up">
          <div class="latest-thumb">
            ${thumb ? `<img src="${thumb}" alt="${title}" loading="lazy">` : '<div class="latest-thumb-icon"><svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" fill="currentColor"/></svg></div>'}
          </div>
          <div class="latest-info">
            <div class="latest-meta">YouTube</div>
            <div class="latest-title">${title}</div>
            <div class="latest-date">${date}</div>
            <a href="${videoUrl}" target="_blank" rel="noopener" class="latest-link">Смотреть →</a>
          </div>
        </div>
      `;
    }).join('');
    observeFadeUps(container);
  } catch {
    renderYtFallback(container);
  }
}

function renderYtFallback(container) {
  container.innerHTML = `
    <div class="latest-card fade-up">
      <div class="latest-thumb">
        <div class="latest-thumb-icon">
          <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" fill="currentColor"/></svg>
        </div>
      </div>
      <div class="latest-info">
        <div class="latest-meta">YouTube</div>
        <div class="latest-title">Разборы акций, дивиденды, макроэкономика</div>
        <a href="${YT_CHANNEL_URL}" target="_blank" rel="noopener" class="latest-link">Смотреть все →</a>
      </div>
    </div>
  `;
  observeFadeUps(container);
}

/* ─── Scroll Animations ─── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

function observeFadeUps(root = document) {
  root.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

/* ─── Init ─── */
document.addEventListener('DOMContentLoaded', () => {
  initLang();
  loadStats();
  loadYouTube();
  observeFadeUps();
});
