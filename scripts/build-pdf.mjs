// Builds public/Jaipur-Cultural-Journey-Itinerary.pdf from the itinerary data.
// Run with `npm run pdf`. Uses the local Chrome; override with CHROME_PATH.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'
import puppeteer from 'puppeteer-core'
import { days, trip } from '../src/data/itinerary.js'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const credits = JSON.parse(readFileSync(path.join(root, 'src/data/credits.json'), 'utf8'))
const out = path.join(root, 'public', trip.pdf)
const img = (key) => pathToFileURL(path.join(root, 'public/photos', `${key}.jpg`)).href

// Google Maps search for each activity's location, keyed by its photo.
const places = {
  'd1-checkin': 'Heritage hotels, Jaipur',
  'd1-dinner': 'Rajasthani restaurant, Jaipur',
  'd2-tiedye': 'Bandhani tie and dye workshop, Jaipur',
  'd2-sanganer': 'Sanganer block printing, Jaipur',
  'd2-bazaar': 'Johari Bazaar, Jaipur',
  'd3-bagru': 'Bagru, Rajasthan',
  'd3-gota': 'Gota patti work, Jaipur',
  'd3-anokhi': 'Anokhi Museum of Hand Printing, Amer',
  'd4-pottery': 'Blue pottery workshop, Jaipur',
  'd4-quilt': 'Jaipuri razai quilt, Jaipur',
  'd4-textiles': 'Bapu Bazaar, Jaipur',
  'd5-weavers': "Weavers' Service Centre, Jaipur",
  'd5-amer': 'Amer Fort, Jaipur',
  'd5-dinner': 'Jaipur',
  'd6-jantar': 'Jantar Mantar, Jaipur',
  'd6-abhaneri': 'Chand Baori, Abhaneri',
  'd6-wildlife': 'Jhalana Leopard Reserve, Jaipur',
  'd7-pushkar': 'Brahma Temple, Pushkar',
  'd7-market': 'Pushkar Bazaar, Pushkar',
  'd7-kundan': 'Kundan jewellery, Johari Bazaar, Jaipur',
  'd8-bhangarh': 'Bhangarh Fort, Rajasthan',
  'd8-rugs': 'Jaipur Rugs, Jaipur',
  'd8-airport': 'Jaipur International Airport',
}
const maps = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const cover = `
<section class="page cover" id="cover">
  <img class="bleed" src="${img('gate-1')}" alt="">
  <div class="cover-shade"></div>
  <div class="cover-copy">
    <p class="dev">पधारो म्हारे देस</p>
    <p class="eyebrow">Padharo Mhare Des · Welcome to Rajasthan</p>
    <h1>Jaipur</h1>
    <p class="cover-sub">${esc(trip.subtitle)}</p>
    <p class="eyebrow">${esc(trip.duration)} · Base: ${esc(trip.base)}</p>
  </div>
  <p class="cover-note">Hawa Mahal, Jaipur</p>
</section>`

const contents = `
<section class="page paper contents" id="contents">
  <p class="eyebrow rose">The journey</p>
  <h2>Contents</h2>
  <p class="intro">${esc(trip.overview)}</p>
  <ol class="toc">
    ${days
      .map(
        (d) => `<li><a href="#day-${d.n}">
      <span class="toc-n">${String(d.n).padStart(2, '0')}</span>
      <span class="toc-t"><b>${esc(d.title)}</b><i>${esc(d.place)}</i></span>
      <span class="toc-go">Day ${d.n} →</span>
    </a></li>`
      )
      .join('')}
    <li><a href="#farewell"><span class="toc-n">—</span><span class="toc-t"><b>Khamma Ghani</b><i>Farewell &amp; photography credits</i></span><span class="toc-go">→</span></a></li>
  </ol>
  <p class="hint">Tip: every title in this document is a link. Tap a day to jump to it, and tap “Open in Maps” on any activity for directions.</p>
</section>`

const dayPage = (d, i) => `
<section class="page paper day" id="day-${d.n}">
  <div class="day-hero">
    <img src="${img(d.hero.photo)}" alt="">
    <div class="day-hero-shade"></div>
    <div class="day-hero-copy">
      <p class="eyebrow"><span class="dev" style="color:${d.ac}">${d.hindi}</span> &nbsp;·&nbsp; Day ${d.n} of 8</p>
      <h2>${esc(d.title)}</h2>
      <p class="place" style="color:${d.ac}">${esc(d.place)}</p>
    </div>
    <p class="photo-note">${esc(d.hero.caption)}</p>
  </div>
  <p class="tagline">${esc(d.tagline)}</p>
  <div class="acts">
    ${d.activities
      .map(
        (a) => `<article class="act">
      <img src="${img(a.photo)}" alt="${esc(a.caption)}">
      <div>
        <p class="when"><b>${esc(a.period)}</b> ${esc(a.time)}</p>
        <h3>${esc(a.title)}</h3>
        <p class="desc">${esc(a.desc)}</p>
        ${a.options ? `<p class="opts">${a.options.map(esc).join(' · ')}</p>` : ''}
        <p class="links"><span class="tag">${esc(a.tag)}</span><a href="${maps(places[a.photo] || d.place)}">Open in Maps ↗</a></p>
      </div>
    </article>`
      )
      .join('')}
  </div>
  <footer class="day-foot">
    ${d.overnight ? `<span>☾ Overnight: ${esc(d.overnight)}</span>` : '<span>Departure day</span>'}
    <nav>
      ${i > 0 ? `<a href="#day-${d.n - 1}">← Day ${d.n - 1}</a>` : ''}
      <a href="#contents">Contents</a>
      ${i < days.length - 1 ? `<a href="#day-${d.n + 1}">Day ${d.n + 1} →</a>` : '<a href="#farewell">Farewell →</a>'}
    </nav>
  </footer>
</section>`

const creditRows = []
for (const d of days) {
  creditRows.push([`Day ${d.n} gate`, d.gate.photo], [`Day ${d.n}`, d.hero.photo])
  d.activities.forEach((a) => creditRows.push([`Day ${d.n} · ${a.tag}`, a.photo]))
}
creditRows.unshift(['Cover', 'gate-1'])
creditRows.push(['Farewell', 'finale'])
const seen = new Set()

const farewell = `
<section class="page paper farewell" id="farewell">
  <p class="dev big">खम्मा घणी</p>
  <h2>Khamma Ghani</h2>
  <p class="intro">${esc(trip.conclusion)}</p>
  <div class="quotes">
    ${trip.quotes
      .map(
        (q) => `<figure>${q.original ? `<p class="dev">${q.original}</p>` : ''}<blockquote>“${esc(q.text)}”</blockquote><figcaption>${esc(q.source)}</figcaption></figure>`
      )
      .join('')}
  </div>
  <p class="back"><a href="#contents">↑ Back to contents</a></p>
</section>
<section class="page paper credits">
  <h2 class="small">Photography credits</h2>
  <p class="intro">All photographs are from Wikimedia Commons, used under the licences shown. Each title links to its source.</p>
  <ul>
    ${creditRows
      .filter(([, k]) => credits[k] && !seen.has(k) && seen.add(k))
      .map(([label, k]) => {
        const c = credits[k]
        return `<li><b>${esc(label)}</b> <a href="${esc(c.source)}">${esc(c.title)}</a> · ${esc(c.artist || 'Unknown author')} · ${c.licenseUrl ? `<a href="${esc(c.licenseUrl)}">${esc(c.license)}</a>` : esc(c.license)}</li>`
      })
      .join('')}
  </ul>
</section>`

const css = `
@page { size: A4; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; }
body { font-family: 'Outfit', sans-serif; font-weight: 300; color: #241a12; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
a { color: inherit; }
h1, h2, h3, p, figure, blockquote { margin: 0; }
.dev { font-family: 'Tiro Devanagari Hindi', serif; }
.eyebrow { font-size: 8.5pt; letter-spacing: .28em; text-transform: uppercase; }
.rose { color: #b4566a; }
.page { position: relative; width: 210mm; height: 297mm; overflow: hidden; page-break-after: always; }
.paper { background: #f3ebdc; padding: 18mm 18mm 16mm; }
.bleed { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }

.cover { color: #fff8ee; }
.cover-shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(14,9,6,.7), rgba(14,9,6,.1) 45%, rgba(14,9,6,.75)); }
.cover-copy { position: absolute; left: 0; right: 0; top: 30mm; text-align: center; }
.cover-copy .dev { font-size: 16pt; color: #f6cfae; }
.cover h1 { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: 92pt; line-height: .9; margin: 8mm 0 4mm; }
.cover-sub { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 18pt; margin-bottom: 6mm; }
.cover-note { position: absolute; right: 14mm; bottom: 10mm; font-family: 'Caveat', cursive; font-size: 15pt; }

h2 { font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 40pt; line-height: 1; margin: 2mm 0 6mm; }
h2.small { font-size: 26pt; }
.intro { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 14pt; line-height: 1.45; color: #4a3b2d; }
.toc { list-style: none; padding: 0; margin: 10mm 0 0; }
.toc a { display: grid; grid-template-columns: 16mm 1fr auto; align-items: center; padding: 4.2mm 0; border-top: .3mm solid rgba(60,40,20,.2); text-decoration: none; }
.toc-n { font-family: 'Cormorant Garamond', serif; font-size: 22pt; color: #b4566a; }
.toc-t b { display: block; font-family: 'Cormorant Garamond', serif; font-weight: 600; font-size: 15pt; }
.toc-t i { font-style: normal; font-size: 9pt; color: #5b4a3a; }
.toc-go { font-size: 8.5pt; letter-spacing: .14em; text-transform: uppercase; color: #b4566a; }
.hint { position: absolute; left: 18mm; right: 18mm; bottom: 14mm; font-size: 8.5pt; color: #5b4a3a; }

.day { padding: 0; }
.day-hero { position: relative; height: 98mm; color: #fff8ee; }
.day-hero img { width: 100%; height: 100%; object-fit: cover; }
.day-hero-shade { position: absolute; inset: 0; background: linear-gradient(0deg, rgba(12,8,5,.85), rgba(12,8,5,.05) 70%); }
.day-hero-copy { position: absolute; left: 16mm; right: 16mm; bottom: 9mm; }
.day-hero h2 { font-size: 30pt; margin: 3mm 0 2mm; color: #fff8ee; }
.place { font-size: 8.5pt; letter-spacing: .22em; text-transform: uppercase; }
.photo-note { position: absolute; right: 12mm; top: 8mm; font-family: 'Caveat', cursive; font-size: 13pt; }
.tagline { margin: 6mm 16mm 2mm; font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 13pt; color: #4a3b2d; }
.acts { margin: 0 16mm; }
.act { display: grid; grid-template-columns: 46mm 1fr; gap: 6mm; padding: 4.5mm 0; border-bottom: .3mm solid rgba(60,40,20,.18); }
.act img { width: 46mm; height: 34mm; object-fit: cover; }
.when { font-size: 8.5pt; color: #5b4a3a; }
.when b { font-family: 'Cormorant Garamond', serif; font-weight: 600; font-size: 12pt; color: #241a12; margin-right: 2mm; }
.act h3 { font-family: 'Cormorant Garamond', serif; font-weight: 600; font-size: 14pt; line-height: 1.1; margin: 1mm 0 1.5mm; }
.desc { font-size: 8.8pt; line-height: 1.5; color: #4a3b2d; }
.opts { margin-top: 1.5mm; font-size: 8.3pt; color: #241a12; font-weight: 400; }
.links { margin-top: 2mm; display: flex; gap: 5mm; align-items: center; font-size: 7.6pt; letter-spacing: .14em; text-transform: uppercase; }
.tag { color: #b4566a; font-weight: 500; }
.links a { color: #241a12; font-weight: 500; text-decoration: none; border-bottom: .3mm solid #c9a24a; }
.day-foot { position: absolute; left: 16mm; right: 16mm; bottom: 9mm; display: flex; justify-content: space-between; gap: 6mm; font-size: 8.5pt; color: #5b4a3a; }
.day-foot nav { display: flex; gap: 5mm; flex: none; }
.day-foot nav a { text-decoration: none; font-weight: 500; color: #b4566a; }

.farewell { text-align: center; padding-top: 26mm; }
.farewell .big { font-size: 18pt; color: #b4566a; }
.farewell h2 { font-size: 52pt; }
.farewell .intro { max-width: 140mm; margin: 0 auto; }
.quotes { margin-top: 16mm; display: grid; gap: 12mm; }
.quotes .dev { color: #b4566a; font-size: 12pt; margin-bottom: 2mm; }
.quotes blockquote { font-family: 'Cormorant Garamond', serif; font-size: 18pt; line-height: 1.25; max-width: 150mm; margin: 0 auto; }
.quotes figcaption { margin-top: 3mm; font-size: 7.6pt; letter-spacing: .24em; text-transform: uppercase; color: #5b4a3a; }
.back { position: absolute; left: 0; right: 0; bottom: 16mm; font-size: 9pt; }
.back a { color: #b4566a; text-decoration: none; font-weight: 500; }
.credits ul { list-style: none; padding: 0; margin: 6mm 0 0; columns: 2; column-gap: 8mm; font-size: 7pt; line-height: 1.4; color: #4a3b2d; }
.credits li { break-inside: avoid; margin-bottom: 2.2mm; }
.credits li b { display: block; color: #241a12; font-weight: 500; }
.credits a { text-decoration: none; color: #8a3a4c; }
`

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(trip.title)} · Itinerary</title>
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Outfit:wght@300;400;500&family=Tiro+Devanagari+Hindi&display=swap" rel="stylesheet">
<style>${css}</style></head><body>${cover}${contents}${days.map(dayPage).join('')}${farewell}</body></html>`

const chrome =
  process.env.CHROME_PATH ||
  ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome'].find(existsSync)

const tmp = path.join(root, 'scripts', '.itinerary.html')
writeFileSync(tmp, html)
const browser = await puppeteer.launch({ executablePath: chrome })
const page = await browser.newPage()
await page.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle0', timeout: 120000 })
await page.evaluate(() => document.fonts.ready)
await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true, outline: true, tagged: true })
await browser.close()
console.log('wrote', path.relative(root, out))
