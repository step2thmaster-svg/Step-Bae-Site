# STEPBAE Dental Laboratory — website

React 19 + Tailwind CSS v4 + Vite.

## Run it
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Structure
- `src/components/` — one component per section (Header, Hero, Features, FeaturedCases, Precision, MeetStep, CallToAction, Footer) plus Logo, Button and inline SVG Icons.
- `src/index.css` — brand tokens (colors, fonts) in the Tailwind `@theme` block.
- `public/images/` — placeholder photos cropped from the design mockup. Swap in full-resolution originals with the same file names. Testing to make sure it pushes. 

Fonts: Cormorant Garamond (headings/logo) and Crimson Pro (body), loaded from Google Fonts in `index.html`.

## Hosting (Vercel)
The site is hosted on Vercel: every push to `main` builds and publishes it.
- Vercel detects Vite on its own: build command `npm run build`, output folder `dist`.
- `api/chat.js` runs on Vercel as `/api/chat`: the Mini Steps' AI answer for typed questions the
  scripted chat can't match (Claude Haiku 5.5). What it knows and the rules it follows are in
  `src/components/chatKnowledge.js`.
- Environment variable (Project Settings → Environment Variables, marked Sensitive): `ANTHROPIC_API_KEY`. Without it
  the chat simply uses its scripted answers.
- Set a monthly spend limit in the Anthropic Console, and a rate-limiting rule for `/api/chat` in Vercel
  (Firewall), so a flood of messages can't run up the bill.
- Locally, `npm run dev` has no `/api/chat`, so the chat shows its scripted answers. To try the AI locally, run
  `vercel dev` with the key in a `.env.local` file (never committed).
