# Ramazan Turganbayev — Portfolio

A premium, single-page portfolio for Ramazan Turganbayev (Informatics Teacher · Web Developer ·
AI Enthusiast), built with plain HTML, CSS and JavaScript — no frameworks, no build step.

## Structure

```
Portfolio/
├── index.html          Main document — every section lives here
├── style.css            Design system + all styling/animation
├── script.js             All interactivity (vanilla JS, no dependencies)
├── favicon.ico
├── manifest.json
├── robots.txt
├── sitemap.xml
├── README.md
└── assets/
    ├── profile/          Portrait + about photos
    ├── projects/          Project thumbnails
    ├── certificates/      Certificate scans/photos
    ├── gallery/           Masonry gallery photos
    ├── icons/             PWA icons
    ├── cv/                CV PDF for download
    └── videos/            Reserved for future video content
```

## Running locally

No build tools required. Either:

1. Open `index.html` directly in a browser, **or**
2. Serve the folder locally for full compatibility (recommended, since some
   browsers restrict `fetch`/relative asset loading over `file://`):

   ```bash
   npx serve .
   # or
   python3 -m http.server 8080
   ```

Then visit `http://localhost:8080`.

## Adding your real content

The site ships with real, non-lorem-ipsum copy already written from the brief, but every image
reference points at a file inside `assets/` that doesn't exist yet — those slots gracefully fall
back to a branded placeholder (dark gradient + "RT" mark) via `onerror` handlers, so the site never
shows a broken image icon. To finish it:

1. **Profile photos** — drop images at `assets/profile/portrait.jpg` and `assets/profile/about.jpg`.
2. **CV** — add your PDF at `assets/cv/Ramazan_Turganbayev_CV.pdf` (the Download CV buttons already
   point here).
3. **Projects** — edit the `PROJECTS` array at the top of `script.js`. Each project is one object;
   add the matching image to `assets/projects/`.
4. **Certificates** — edit the `CERTIFICATES` array in `script.js` and add scans to `assets/certificates/`.
5. **Gallery** — edit the `GALLERY` array in `script.js` and add photos to `assets/gallery/`.
6. **Favicon / PWA icons** — replace `favicon.ico` and add `assets/icons/icon-192.png` +
   `assets/icons/icon-512.png` (referenced by `manifest.json`).

## What's fully built vs. stubbed

Fully built: hero (aurora background, canvas particles, mouse spotlight, typing effect, magnetic
buttons), custom cursor, scroll-reveal system, animated skill bars, animated counters, timeline
sections, sports section, project grid with search + category filtering + detail modal, certificate
grid with fullscreen lightbox, masonry gallery with filtering + keyboard-navigable lightbox +
download, testimonial slider, blog teaser cards, contact section with copy-to-clipboard, scroll
progress bar, back-to-top, responsive nav, accessibility (focus states, reduced-motion support,
semantic landmarks).

Intentionally lighter stubs (documented so nothing is silently missing):

- **Language switcher** — functional and swaps nav/hero copy between EN/RU/KK via the `I18N` object
  in `script.js`, but does not yet translate every section; extend the dictionary and add matching
  `data-i18n` attributes to translate more.
- **Sound toggle** — UI control is wired up (`aria-pressed` state) but no audio file is bundled;
  add a track and a couple of lines of `<audio>` control code to activate it.
- **Weather widget / visitor counter / GitHub-style contribution calendar** — mentioned in the brief
  as "UI" extras; omitted here since they need a live API or backend to show real data rather than
  invented numbers. Happy to wire these up against a real weather API or analytics/GitHub API if
  wanted.

## Colours & type (reference)

| Token | Value |
|---|---|
| Background | `#080808` |
| Surface | `#111111` |
| Accent (gold) | `#D4AF37` |
| Card | `rgba(255,255,255,.05)` |
| Border | `rgba(255,255,255,.08)` |
| Display / accent font | Poppins, Space Grotesk |
| Body font | Inter |

---
© 2026 Ramazan Turganbayev.
