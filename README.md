# Dang Good Pies

Website for Dang Good Pies, a small cottage food bakery. Built with [Astro](https://astro.build) as
a static site — all editable content lives in plain JSON files in `/data`, so day-to-day changes
(prices, menu items, events, pages) don't require touching component code.

## Project structure

```
data/
  products.json      menu items — the source of truth for the Menu page and Home page "Featured" section
  events.json         markets, pop-ups, pre-order windows — source for the Events page
  pages.json          site pages/nav — controls what shows in the header nav and footer legal links
  site.json           business name, tagline, contact email, etc. used across the site

public/
  images/products/    product photos/placeholders, one file per product

src/
  components/         Header, Footer, ProductCard, CookieNotice — reusable pieces, rendered from data
  layouts/
    BaseLayout.astro  shared HTML shell (head, header, footer, cookie notice) every page uses
  pages/               one file per route (index.astro, about.astro, menu.astro, events.astro, ...)
  styles/global.css    ALL colors, fonts, spacing — one file to restyle the whole site
  config/analytics.ts  GA4 on/off switch + measurement ID (not wired up yet, see below)
```

## Running it locally

```sh
npm install       # first time only
npm run dev       # starts a local server at http://localhost:4321
npm run build     # builds the production site into /dist
npm run preview   # serves the built /dist site locally, to sanity-check before deploying
```

## Everyday edits

### Change a price or description

Open `data/products.json`, find the product by its `name`, edit the `price` or `description`
field, save. That's it — no other file needs to change.

### Add a new menu item

1. Open `data/products.json`.
2. Copy an existing product object (the `{ ... }` block) and paste it as a new entry in the array.
3. Fill in the fields:
   - `id` — a short, unique, lowercase, hyphenated slug, e.g. `"pumpkin-pie"`. This should match
     the image filename you use below.
   - `name` — display name, e.g. `"Pumpkin Pie"`.
   - `category` — groups items on the Menu page, e.g. `"Pie"`, `"Cookies & Bars"`, `"Muffins"`,
     `"Breads"`. Reuse an existing category to group with those items, or type a new one to start
     a new section.
   - `price` — a plain number, e.g. `24.00`.
   - `description` — one or two marketing-style sentences.
   - `image` — path to the product photo, e.g. `"/images/products/pumpkin-pie.svg"` (see below).
   - `available` — `true` or `false`. Set to `false` to keep it listed but show an "unavailable" tag.
   - `featured` — `true` or `false`. `true` shows it in the Home page "Featured" section and adds a
     "Featured" badge on the Menu page.
   - `allergens` — an array of strings, e.g. `["gluten", "dairy", "eggs"]`. Leave as `[]` if none.
4. Save the file. The new item appears on the Menu page (and Home page, if featured) automatically.

### Delete a menu item

Open `data/products.json` and delete that product's whole `{ ... }` block from the array (remember
to remove the trailing comma if it was the last item). Save.

### Add or remove a product photo

- Drop an image into `public/images/products/`, named to match the product's `id`
  (e.g. `pumpkin-pie.jpg`).
- Update the `image` field for that product in `data/products.json` to point at the new filename.
- Every product currently ships with a placeholder SVG graphic (a colored background with the
  product name) so the site looks right before you have real photos. Replacing a photo later is a
  two-step swap: add the real file, then update one line in `products.json` to point to it.

### Add or edit an event

Open `data/events.json` and add/edit/remove an object in the array:

```json
{
  "id": "spring-market",
  "title": "Spring Farmers Market",
  "date": "2027-04-10",
  "location": "Riverside Park, Main St & 3rd Ave",
  "description": "One or two sentences about what to expect."
}
```

Events on the Events page are sorted by date automatically, so order in the file doesn't matter.

### Add a new page

1. Create a new file in `src/pages/`, e.g. `src/pages/faq.astro`. Copy the structure of an
   existing simple page like `src/pages/about.astro` as a starting point (it imports
   `BaseLayout` and wraps content in a `<section class="section">` inside a `<div class="container">`).
2. Add an entry to `data/pages.json` so it shows up in navigation:

```json
{
  "id": "faq",
  "label": "FAQ",
  "path": "/faq",
  "showInNav": true,
  "showInFooter": false,
  "order": 5
}
```

`showInNav` puts it in the header nav; `showInFooter` puts it in the footer links (used for
Privacy Policy / Terms of Service). `order` controls left-to-right / top-to-bottom position.

### Change site-wide text (business name, tagline, contact email)

Edit `data/site.json`. This feeds the header, footer, and Home/About page copy, so one edit updates
it everywhere it's used.

### Restyle the site (colors, fonts, spacing)

Open `src/styles/global.css` and edit the CSS variables at the top of the file (under `:root`):
`--color-accent`, `--font-heading`, `--space-md`, etc. Every page and component pulls from these
same variables, so changing a value there updates the whole site.

## Legal pages and analytics

`data/pages.json` includes Privacy Policy and Terms of Service entries, and both pages
(`src/pages/privacy-policy.astro`, `src/pages/terms-of-service.astro`) are pre-written with
starter/placeholder text. **This is not legal advice** — review both pages yourself, and ideally
with a professional familiar with your state's cottage food regulations, before treating them as
final. Look for the highlighted "notice" boxes on those pages calling out spots to double check
(in particular, the state-specific cottage food disclosure language on the Terms of Service page).

A small cookie/analytics notice banner (`src/components/CookieNotice.astro`) shows on every page
until dismissed. Google Analytics 4 is **not installed**, only wired up so turning it on later is
easy:

1. Open `src/config/analytics.ts`.
2. Set `enabled: true` and fill in `ga4MeasurementId` (looks like `"G-XXXXXXXXXX"`).
3. Add the GA4 script loader in `src/layouts/BaseLayout.astro`, gated behind
   `analytics.enabled` (this part still needs to be added — the config just flips the notice text
   and gives you a single place to store the ID).

The cookie notice and Privacy Policy text automatically change wording once `enabled` is `true`.

## Deploying

This is a static site (`npm run build` outputs plain HTML/CSS/JS to `/dist`), so it can be hosted
on any static host — Netlify, Vercel, GitHub Pages, Cloudflare Pages, etc. Point the host at this
repo, build command `npm run build`, output directory `dist`.
