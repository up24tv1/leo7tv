# Leo7TV

Leo7TV is a proof‑of‑concept web application that demonstrates how to build a legal, resilient and modern streaming platform for free‑to‑air television and radio. The design is Africa‑first: the site organizes channels by region, country and language while offering a clean, premium user experience. Only officially licensed or public streams are listed; pirated feeds and scraped IPTV lists are excluded.

This repository contains a full working scaffold for the frontend, a small sample dataset with official streams, a health‑check workflow and guidance for deployment on Vercel. It is intended as a starting point for further development rather than a finished product.

## Architecture (A)

The app is built as a static Next.js application in TypeScript. HLS.js provides reliable playback of HTTP Live Streaming sources and Video.js supplies a polished player shell with caption support. Channel metadata is stored in `src/data/`. A GitHub Action periodically checks stream health and writes a `health.json` file; the frontend reads this file to display quality badges and hide dead streams.

Key components:

* **Data layer:** `src/data/channels.ts` exports an array of channel objects with metadata such as region, country, languages, category, stream URL and health score.
* **Pages:** Next.js pages in `src/pages` render the UI. The home page lists featured channels. Dynamic routes can be added for country pages or channel detail pages.
* **Components:** `src/components` contains `Header` (site header), `ChannelCard` (displays channel information) and `Player` (wraps Video.js and HLS.js).
* **Health checks:** `.github/workflows/health‑check.yml` schedules a job every 12 hours that runs `scripts/health‑check.js`. This script performs HEAD requests to each `streamUrl` and writes `health.json`.
* **Design system:** Tailwind CSS is configured in `tailwind.config.js` with a dark primary palette.

## UI/UX concept (B)

The interface is luxurious yet minimal. It opens with a hero section introducing Leo7TV and emphasising its mission. Featured channels appear in cards with the station logo, language tags and quality badge. Users can browse by region, country or language and search by name or category. Playback opens in a modal player that displays captions when available.

## Folder structure (C)

```
leo7tv/
├── .github/
│   └── workflows/
│       └── health‑check.yml
├── public/
│   └── logo.png
├── scripts/
│   └── health‑check.js
├── src/
│   ├── components/
│   │   ├── ChannelCard.tsx
│   │   ├── Header.tsx
│   │   └── Player.tsx
│   ├── data/
│   │   └── channels.ts
│   ├── pages/
│   │   ├── _app.tsx
│   │   └── index.tsx
│   └── styles/
│       └── globals.css
├── README.md
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## Data schema (D)

Each channel object in `src/data/channels.ts` follows this interface:

```ts
export interface Channel {
  id: string;
  name: string;
  country: string;
  region: string;
  category: string;
  languages: string[];
  type: 'tv' | 'radio';
  officialSite?: string;
  streamUrl: string;
  streamFormat: string;
  captionsAvailable: boolean;
  qualityLabel: string;
  verifiedOfficialSource: boolean;
  healthScore: number;
  checkedAt: string;
  notes?: string;
}
```

## GitHub Action for health checks (E)

The workflow `.github/workflows/health‑check.yml` runs every 12 hours and on demand to validate stream URLs:

```yaml
name: Health Check

on:
  schedule:
    - cron: '0 */12 * * *'
  workflow_dispatch:

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm install node-fetch@3
      - name: Run health check
        run: node scripts/health-check.js
      - name: Commit results
        env:
          GITHUB_TOKEN: "${{ secrets.GITHUB_TOKEN }}"
        run: |
          if [ -f health.json ]; then
            git config user.name 'health-bot'
            git config user.email ''
            git add health.json
            git commit -m 'Update stream health' || echo 'No changes'
            git push || echo 'No push on PRs'
          fi
```

## Vercel deployment (F)

To deploy:

1. Create a Vercel account and import this repository.
2. Choose the Next.js preset; build command `npm run build`; output directory `.next`.
3. No environment variables are needed for the sample.
4. Deploy; subsequent commits deploy automatically.

## Initial app code (G)

See `src/pages/_app.tsx`, `src/pages/index.tsx`, and components for examples of how to render the home page and play streams.
