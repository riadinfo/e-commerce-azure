# AZURE User Panel (React)

Modern clothing e-commerce **storefront** for shoppers. Brand: **AZURE**. Signature color: house blue (`#1A4B8C` / `#2E6BDB`).

## Location

`D:\react\e-commerce-cloths-user`

Companion Flutter app (same catalog, same brand): `D:\flutter\e-commerce-cloths-app`

## What this project is

A complete **user-facing** clothing shop in React (Vite). There is no live backend: catalog, cart, wishlist, reviews, promo codes, mock login, and orders run in the browser (`localStorage`). Product photos are loaded from Unsplash.

This is the website equivalent of the Flutter app. Both share the same product IDs, prices, sizes, colors, and promo codes so the experience matches.

## Stack

| Piece | Choice |
| --- | --- |
| UI | React 19 |
| Bundler | Vite 8 |
| Routing | `react-router-dom` |
| Icons | `lucide-react` |
| State | React Context + `useReducer` (`src/context/StoreContext.jsx`) |
| Persistence | `localStorage` keys prefixed with `azure-` |
| Fonts | Cormorant Garamond (display) + Outfit (UI) |

## Run locally

```bash
cd D:\react\e-commerce-cloths-user
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

Production build: `npm run build` then `npm run preview`.

## Main routes

| Path | Screen |
| --- | --- |
| `/` | Home — hero, category looks, bestsellers, newsletter, new in |
| `/shop` | Catalog with filters and sort |
| `/shop?gender=women` / `?gender=men` | Gender filter from the header |
| `/shop?sort=new` | Newest first |
| `/shop?sale=1` | Sale items only |
| `/shop?q=...` | Search |
| `/product/:id` | Product detail, size/color, reviews, related |
| `/cart` | Bag, qty, promo, totals |
| `/checkout` | Address + demo card, places an order |
| `/wishlist` | Saved products |
| `/account` | Mock sign-in / register / sign-out |
| `/orders` | Past demo orders |

## Features

- **Browse** 20 clothing pieces (men, women, unisex): shirts, knits, denim, outerwear, dresses, trousers, tops, active.
- **Filters:** gender, category, max price slider, size, color, minimum rating.
- **Sort:** featured, newest, price low/high, top rated.
- **Product:** image gallery, color swatches, size chips, quantity, add to bag, wishlist heart.
- **Reviews & ratings:** existing reviews plus a form that updates the product average (in this browser session).
- **Cart:** merge same id + size + color, change qty, remove.
- **Promo codes:** `AZURE20` (20% off), `WELCOME10` (10% off).
- **Shipping:** free when remaining merchandise (after discount) is **BDT 2,500+**, otherwise **BDT 80**.
- **Checkout:** demo only — no real payment. Creates an order id like `AZ-……`.
- **Account:** name/email stored locally; not a real auth server.

## Catalog & brand

Source of truth for the website: `src/data/products.js`.

Keep this file in sync with `lib/data/catalog.dart` in the Flutter app when you add or change products.

House palette (also in `src/index.css`):

- Navy `#0A1628`
- Blue `#1A4B8C`
- Azure `#2E6BDB`
- Sky `#E8F0FB`
- Sale `#C2410C`

## Project layout

```
src/
  data/products.js          Catalog, promo codes, hero, helpers
  context/StoreContext.jsx  Cart, wishlist, user, orders, reviews
  components/layout/        Header, Footer, Layout, mobile tab bar
  components/product/       ProductCard, FilterSidebar, RatingStars
  pages/                    Home, Shop, ProductDetail, Cart, Checkout,
                            Wishlist, Account, Orders
  utils/format.js           BDT formatting
  index.css                 Design system and layout
```

## Persistence keys

| Key | Data |
| --- | --- |
| `azure-cart` | Line items |
| `azure-wishlist` | Product ids |
| `azure-user` | `{ name, email }` or null |
| `azure-orders` | Checkout history |
| `azure-promo` | Applied code |

Clear site data in the browser to reset a demo session.

## Design notes

Editorial clothing-house look: large serif headlines, rounded product tiles, hover image swap on cards, sticky translucent header, navy footer. Mobile uses a bottom nav (Home, Shop, Saved, Bag, Account).

## Intentionally not included

- Real payments, inventory, or admin panel
- Shared database between website and Flutter (they do not talk to each other)
- Tax, multiple currencies, or live shipping rates

When you add a backend later, replace `StoreContext` and `products.js` with API calls; keep the page structure.
