# ZAD Shop — Online Bookstore Build Guide

A complete, step-by-step guide to rebuild **zadshop.360helm.com** as a
WooCommerce bookstore on your existing self-hosted WordPress + Elementor setup.

- **Current state:** WordPress (self-hosted, Jetpack-connected), theme
  `hello-elementor`, 1 page, 0 plugins, empty.
- **Target:** A working e-commerce bookstore that sells books online (cart,
  checkout, payments).
- **Stack we'll use:** WordPress + Elementor + **WooCommerce** (free) +
  Elementor's WooCommerce widgets.

Work top to bottom. Each phase ends in a checkpoint you can verify before
moving on.

---

## Phase 0 — Decisions to lock in first

Answer these before building; they change setup choices later.

1. **What format are you selling?**
   - **Physical books** → you need shipping + inventory/stock.
   - **E-books / PDFs** → "Downloadable + Virtual" products, no shipping.
   - **Both** → set per-product (the guide covers both).
2. **Currency** (e.g. USD, EGP, EUR). WooCommerce sets one store currency.
3. **Payment methods** — which do you want at launch?
   - Stripe (cards), PayPal, Cash on Delivery (good for local/MENA markets),
     bank transfer.
4. **Language / direction** — "ZAD" suggests you may want **Arabic (RTL)**.
   Site language is currently English. If you want Arabic or bilingual, note
   it now (see Phase 8 → Localization).

> Tip: You can launch with **Cash on Delivery + bank transfer** in minutes and
> add Stripe/PayPal later once accounts are verified.

---

## Phase 1 — Install the core plugins

In **WP Admin → Plugins → Add New**, install + activate:

| Plugin | Why |
|---|---|
| **WooCommerce** | The store engine (products, cart, checkout, payments). |
| **Elementor** | Page builder (you already use hello-elementor). |
| **Elementor + WooCommerce widgets** | Comes with Elementor; gives product grids, Add-to-Cart, etc. (Pro adds more, not required.) |
| **WooCommerce Stripe Gateway** *(optional)* | Card payments via Stripe. |
| **WooCommerce PayPal Payments** *(optional)* | PayPal checkout. |

Recommended supporting plugins:
- **Rank Math** or **Yoast SEO** — SEO for product/category pages.
- **WP Super Cache** / **LiteSpeed Cache** — performance.
- **Wordfence** — security (also may explain the earlier 403 on bots).

**Checkpoint:** WooCommerce setup wizard appears. Run it: set store address,
currency, and the product type (physical/digital/both).

---

## Phase 2 — Store configuration (WooCommerce → Settings)

1. **General:** store address, selling/shipping locations, currency + currency
   position/decimals.
2. **Products → General:** measurement units; enable reviews (ratings help book
   sales).
3. **Products → Inventory:** enable **Stock management** if selling physical
   books (track quantity, low-stock alerts).
4. **Shipping** *(physical only):* create a Shipping Zone (e.g. "Domestic",
   "International") → add a Flat rate and/or Free shipping over a threshold.
5. **Payments:** enable your chosen gateways. Start with **Cash on Delivery**
   and **Direct bank transfer** for an instant launch; connect Stripe/PayPal
   when ready.
6. **Accounts & Privacy:** allow guest checkout (reduces friction) + optional
   account creation.
7. **Emails:** set the "from" name to **ZAD Shop** and brand the email header
   color.

**Checkpoint:** A test product can be added to cart and reach the checkout page
with at least one payment method shown.

---

## Phase 3 — Catalog structure (the heart of a bookstore)

A good bookstore is **organized by how people browse**: genre, author, format.

### 3a. Product Categories = Genres
Create under **Products → Categories**. Starter set (edit to your niche):

- Fiction
  - Literary Fiction
  - Mystery & Thriller
  - Science Fiction & Fantasy
  - Romance
- Non-Fiction
  - Biography & Memoir
  - Business & Money
  - Self-Help & Personal Development
  - History
- Children & Young Adult
- Religion & Spirituality
- Academic & Textbooks
- Arabic Books *(if applicable)*

Give each a short description + image (used on category pages, good for SEO).

### 3b. Product Attributes (for filtering)
Create under **Products → Attributes**:

- **Author** (terms = author names)
- **Format** (Hardcover, Paperback, E-book/PDF, Audiobook)
- **Language** (English, Arabic, …)
- **Publisher**

Attributes power layered filters ("show me Paperback Mystery in Arabic").

### 3c. Tags (optional)
Cross-cutting themes: *Bestseller, New Arrival, Award Winner, Signed Copy,
Staff Pick*. Use sparingly.

**Checkpoint:** Category tree + attributes exist. You can assign them when
creating a product.

---

## Phase 4 — Add products (books)

For each book (**Products → Add New**):

| Field | What to put |
|---|---|
| **Title** | Book title |
| **Description** | Synopsis / blurb (long, good for SEO) |
| **Short description** | 1–2 line hook shown near the Add-to-Cart button |
| **Product image** | Front cover (use consistent ~1000×1500px portrait) |
| **Gallery** | Back cover, spine, sample pages |
| **Regular / Sale price** | Price (+ optional discount) |
| **Categories** | Genre(s) from Phase 3a |
| **Attributes** | Author, Format, Language, Publisher |
| **Inventory** | SKU (use ISBN!), stock qty (physical) |
| **Product type** | Physical: *Simple*. E-book: tick **Virtual + Downloadable**, upload the file |
| **Shipping** | Weight + dimensions (physical only) |

**Selling the same title in multiple formats?** Use a **Variable product** with
a "Format" attribute (Paperback / Hardcover / E-book), each variation its own
price + stock. This is the cleanest way to do "paperback vs ebook."

> Pro move: put the **ISBN in the SKU field** so inventory, search, and any
> future import/export line up with standard book data.

**Checkpoint:** 5–10 real books live, each with cover, price, genre, author.

---

## Phase 5 — Pages & navigation

WooCommerce auto-creates **Shop, Cart, Checkout, My Account**. Add these:

| Page | Purpose |
|---|---|
| **Home** | Brand + featured books + categories (Phase 6) |
| **Shop** | Auto by WooCommerce — all books, filterable |
| **About** | Your story / mission (copy below) |
| **Contact** | Form + email + address/map |
| **FAQ** | Shipping times, returns, formats |
| **Shipping & Returns** | Policy (builds trust) |
| **Privacy Policy** & **Terms** | Required for payments/legal |

**Primary menu** (Appearance → Menus, or Elementor header):
`Home · Shop · Genres (dropdown) · About · Contact · 🛒 Cart`

Set the **Home** page as the static front page in **Settings → Reading**.

---

## Phase 6 — Design the Home page in Elementor

Edit Home with Elementor. Build these sections top to bottom:

1. **Header / Hero**
   - Logo "ZAD Shop", nav, cart icon.
   - Hero banner: headline + subtext + "Shop Now" button + a strong book image.
   - Suggested copy:
     > **Headline:** *Find your next great read.*
     > **Sub:** *Curated books across every genre — delivered to your door.*
2. **Featured / Bestsellers** — Elementor **Products** widget → source = Featured
   or Best Selling, 4 columns. Mark books "Featured" in their product data.
3. **Shop by Genre** — image cards linking to each category (Phase 3a).
4. **New Arrivals** — Products widget sorted by "Latest".
5. **Value props row** — 3 icons: *Fast shipping · Secure checkout · Easy
   returns*.
6. **Newsletter / promo** — email signup (Jetpack or Mailchimp) + optional
   discount.
7. **Footer** — quick links, contact, social, payment icons, copyright.

> Use Elementor's **WooCommerce widgets** (Products, Product Categories,
> Add to Cart, Cart, Checkout) so the store is native, not screenshots.

**Checkpoint:** Home shows live featured books and clickable genre cards.

---

## Phase 7 — Shop, category, and product page polish

- **Shop page:** set products-per-page and default sort (e.g. Popularity) in
  **Customizer → WooCommerce → Product Catalog**.
- **Add filters:** a widget like *WooCommerce Product Filter* or Elementor Pro's
  filter for genre/author/format/price.
- **Single product page:** confirm it shows cover gallery, price, Add to Cart,
  short description, and the **Additional Information** tab (your attributes =
  Author/Format/Language/Publisher). Enable **reviews**.
- **Related products / Up-sells:** set "Customers also bought" to boost basket
  size.

---

## Phase 8 — Trust, SEO, localization, launch

**Trust & conversion**
- SSL padlock present (it is — custom domain on Jetpack).
- Show payment-method icons + a returns guarantee near checkout.
- Add real contact info and a business address.

**SEO (Rank Math/Yoast)**
- Unique title + meta description per book and per genre page.
- Submit an XML sitemap to Google Search Console.
- Use descriptive image alt text (book title + author).

**Localization (if Arabic / RTL)**
- **Settings → General → Site Language:** add Arabic, or use a multilingual
  plugin (**TranslatePress** / **Polylang**) for bilingual EN/AR.
- hello-elementor + WooCommerce support RTL automatically when language is RTL.
- Set currency to your market (e.g. **EGP**) and enable **Cash on Delivery** —
  important for MENA buyers.

**Performance & security**
- Enable caching plugin; compress cover images (Smush/ShortPixel).
- Wordfence/Jetpack security on. (Also: the earlier **403** I hit was likely a
  host/security block on bots — verify the homepage loads in a normal browser.)

---

## Launch checklist ✅

- [ ] WooCommerce + Elementor active, setup wizard complete
- [ ] Currency, shipping zones, and ≥1 payment method working
- [ ] Genre categories + Author/Format/Language attributes created
- [ ] At least 10 books live with covers, prices, stock/ISBN
- [ ] Home, Shop, About, Contact, FAQ, Shipping/Returns, Privacy, Terms pages
- [ ] Primary menu + footer with cart icon
- [ ] Test order placed end-to-end (add to cart → checkout → order email)
- [ ] SEO titles + sitemap submitted
- [ ] Mobile view checked (Elementor responsive mode)

---

## Ready-to-paste copy

**About ZAD Shop (draft):**
> ZAD Shop is an online bookstore built for readers who never run out of "just
> one more chapter." We curate titles across every genre — from timeless
> literary fiction to the latest non-fiction, children's favorites, and
> academic essentials — and deliver them straight to your door. Whether you're
> hunting for a gift, building a library, or chasing your next obsession, ZAD
> Shop helps you find the right book at the right price.

**Hero:** *Find your next great read.* / *Curated books across every genre,
delivered to your door.* / Button: **Shop Now**

**Value props:** 🚚 Fast, tracked shipping · 🔒 Secure checkout · ↩️ Easy
30-day returns

---

## If you later enable direct access

I can build much of this **for you** (create categories, products, pages, menus)
if you:
1. Enable the content abilities at **https://wordpress.com/me/mcp**
   (pages, posts, media, taxonomies), **and**
2. Upgrade the self-hosted site to **Jetpack AI / Jetpack Complete**
   (required for site-scoped tools on Jetpack sites — https://jetpack.com/pricing/).

Then say the word and I'll start creating the genre taxonomy and product
scaffolding directly.
