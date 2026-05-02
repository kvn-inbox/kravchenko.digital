# kravchenko.digital

Personal bio landing page — [kravchenko.digital](https://kravchenko.digital)

Static one-page site: personal brand hub with links to YouTube, Smart Invest, Patreon, and LinkedIn.

## Stack

- Vanilla HTML / CSS / JS — no build tools
- Caddy in Docker — serves static files + automatic HTTPS via Let's Encrypt
- RU/EN language toggle (localStorage)
- Stats and latest reports from [smart-invest.top](https://smart-invest.top) API
- Latest YouTube videos via RSS

## Project Structure

```
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── favicon.svg
│   ├── photo.jpg        ← add manually (min 400×400px)
│   └── og-image.jpg     ← add manually (1200×630px)
├── Caddyfile
└── docker-compose.yml
```

## Deploy (Hetzner VPS)

```bash
# Clone
git clone https://github.com/kvn-inbox/kravchenko.digital.git
cd kravchenko.digital

# Run
docker compose up -d
```

Caddy handles HTTPS automatically. Make sure DNS A record points to the server IP before starting.

## Update

```bash
git pull
docker compose restart
```
