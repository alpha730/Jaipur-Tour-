# Jaipur Cultural Journey

A scroll-driven website for an 8-day, 7-night itinerary through Jaipur and Rajasthan. It opens on Hawa Mahal, and each day begins as a collage of that day's photos that zooms in as you scroll until the main photo fills the screen. The activities appear as postcards, and the page ends with a downloadable, interactive PDF of the full itinerary.

Built with React, Vite, GSAP ScrollTrigger, Lenis and react-three-fiber.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build in dist/
```

## Itinerary PDF

The PDF in `public/` is generated from `src/data/itinerary.js`:

```bash
npm run pdf
```

It uses a local Chrome or Edge install (set `CHROME_PATH` if it's somewhere unusual). The PDF has clickable contents, previous/next day links, Google Maps links for every activity, and bookmarks.

## Editing content

All days, activities, captions, quotes and photo choices live in `src/data/itinerary.js`. After editing, run `npm run pdf` to refresh the PDF.

## Photographs

All photographs are from Wikimedia Commons and are used under their respective licences (CC BY, CC BY-SA, FAL, CC0 or public domain). Author and licence for each image are in `src/data/credits.json` and shown on the site under "Photography credits" and in the PDF. Keep these credits if you reuse the images.
