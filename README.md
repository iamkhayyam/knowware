# Knowware — Systems of Intelligence

Companion website for **Systems of Intelligence** by Khayyam Wakil — the book that asks why every coordination failure of our era (Facebook's contagion experiment, the Uber AV, the 2008 crash, Boeing's MCAS) shares the same architecture, and what the fix looks like.

- **Book repo:** https://github.com/iamkhayyam/systemsofintelligence-book
- **Website:** https://systemsofintelligence.com
- **Contact:** someone@systemsofintelligence.com

> Hardware ↔ Software ↔ Knowware. Three bodies coordinating. Drop any one and intelligence collapses back into mechanism.

## What's in the book (mirrored by this site)

- 9 interview chapters + 1 capstone (ChX — The Grand Coordination)
- 81 synthesized expert voices (9 per chapter, triads: Academic / Practitioner / Visionary)
- Standalone Knowware Manifesto ("Binary is Confinary")
- 3 appendices — Mathematical Foundations, Technical Implementation, Resources

Chapter titles, subs, and voice rosters in [`src/chapters.ts`](src/chapters.ts) mirror the book repo's `chapters/chNN/interviews/` directories. Keep the two in sync when the book edits.

## Run locally

**Prerequisites:** Node.js

```bash
npm install
npm run dev          # dev server via tsx + vite middleware on :3000
```

Production build:

```bash
npm run build        # vite build → dist/
npm start            # node server serving dist under /knowware/
```

## Deploy

Production deploys go through [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
