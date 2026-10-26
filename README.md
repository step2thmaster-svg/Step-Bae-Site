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
