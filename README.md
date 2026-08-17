# Gubat Banwa — Compendium & Character Builder

A fan-made web app for **Gubat Banwa**, the Filipino martial-arts TTRPG of the
Sword Isles. Browse the game's disciplines, techniques, cultures, folk, and
background tables — then build and store **Kadungganan** characters. Everything
you create is saved in your browser's **localStorage**; there is no backend and
no account.

## Tech stack

- **Next.js** (App Router) + **React** + **TypeScript**
- **Tailwind CSS** — themed after the printed Kadungganan Sheet (deep maroon,
  gold, parchment)
- Static-friendly: all game data is local JSON under [`data/`](data/), imported
  directly at build time. Character data lives only in the browser.

## Features

- **Compendium**: 25 Disciplines (traits, Inflict Violences, techniques), 150
  Techniques (search + filter + Enlightenment toggle), 5 Cultures (with
  subculture / lineage / social standing), 5 Folk, and the four Background
  tables (Convictions, Conjunctures, Complications, Debts) with dice-rolls.
- **Advancement** reference: the Legend Arcs (Earth / Lightning / Heaven),
  per-Legend gains, Anting-Anting slots, equipped-technique limits, and Style
  matchups.
- **Character Builder**: an 8-step wizard following official Kadungganan
  Creation — Identity, Folk, Culture, Background, Discipline, Techniques,
  Alignments & Martial Abilities (with Sword/Crown/Mask), Warband & Gear.
- **Character sheet**: a two-page layout mirroring the official Kadungganan
  Sheet, with a print button.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build (also verifies types)
npm start       # serve the production build
```

## Deploy to Vercel (via GitHub)

1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and **Import** the repo.
3. Vercel auto-detects **Next.js** — no configuration needed. Click **Deploy**.
4. Every push to your default branch redeploys automatically; pull requests get
   preview deployments.

No environment variables or database are required — the app is fully static plus
client-side localStorage.

## Data & attribution

Game data in [`data/`](data/) is transcribed from the Gubat Banwa rulebook.
**Gubat Banwa** is © makapatag / Swordsfall. This is an unofficial fan tool;
character data never leaves your browser.
