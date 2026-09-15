# Karma Foods — Interactive Brand Site

A single-page, interactive Three.js site for Karma Foods and its five citrus
export brands: **Karma Agro, Ricchi, Citra Fiesta, Cleo, Mello**. Static site,
no build step, no framework — plain HTML/CSS/JS.

## What it does

- A full-screen Three.js scene (floating low-poly citrus + leaves + drifting
  particles) sits behind the page as a fixed background.
- **Scroll** drives the camera on a slow orbit through the grove and blends
  the scene's colors, fog and lighting to match whichever brand section is
  in view (each brand's palette is sampled from its real carton artwork).
- **Mouse movement** adds a subtle parallax offset to the camera.
- Content panels use a frosted-glass treatment so text stays readable over
  the moving 3D scene at any scroll position.
- Fully responsive: side dot-navigation on desktop, a slide-out menu on
  mobile; reduced-motion is respected for users who request it.

## Structure

```
index.html
assets/
  css/style.css        # design tokens, layout, per-brand theme tints
  js/scene.js           # the Three.js scene + scroll/mouse interaction
  js/main.js             # nav, active-section highlighting, reveal-on-scroll
  vendor/three.min.js    # Three.js r128, vendored locally (no CDN dependency)
  img/brands/*.jpg        # the five carton renders used in each section
  img/favicon.svg
```

## Running locally

No build step — just serve the folder statically, e.g.:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploying

This is plain static HTML/CSS/JS, so it can be:
- Hosted as-is on GitHub Pages, Netlify, Vercel, etc., or
- Dropped into a WordPress page via a **Custom HTML** block / Elementor
  HTML widget (keep the `assets/` folder alongside it, or upload it to the
  Media Library and adjust the asset paths in `index.html`).

## Content to review before launch

The brand copy (product lines, positioning, certifications) is written as
reasonable marketing copy based on the carton artwork only — no specific
certifications, export markets or capacities are claimed. Replace
`export@karmafoods.com` with the real export sales contact, and review each
brand's bullet points against the actual product specs before publishing.
