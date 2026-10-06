# YASHODA

> A considered marketplace for objects with character.

YASHODA is a fast, full-stack storefront for discovering fashion, electronics, home decor, and skincare. The experience is designed to feel more like a calm editorial than a noisy catalog: clear product discovery, responsive layouts, useful details, and a checkout journey that stays out of the way.

**Project origin:** 2024–2025

**Current platform:** Next.js 16 · React 19 · TypeScript · MongoDB · Vercel

## What is included

- Editorial storefront homepage with curated categories, trending products, promotions, and responsive motion.
- Product detail pages with resilient API loading and a demo catalog fallback for public browsing.
- Category routes for fashion, electronics, home decor, and skincare.
- Persistent client cart with quantity controls and a focused cart experience.
- Customer and admin login flows backed by JWT sessions and bcrypt password hashing.
- MongoDB product APIs with input validation, safe limits, connection reuse, and predictable JSON errors.
- Optimized image delivery through `next/image`, AVIF/WebP output, responsive breakpoints, and lazy loading below the fold.
- Deployment-safe security headers and standalone output for Vercel.

## Technology

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 App Router |
| UI | React 19, Tailwind CSS, shadcn/ui, Lucide |
| Motion | Framer Motion, used selectively for entrance and hover states |
| Data | MongoDB Atlas with the official MongoDB driver |
| Authentication | JWT sessions with bcrypt password hashing |
| Deployment | Vercel with standalone output |

## Run locally

### Requirements

- Node.js 18.18 or newer
- npm 9+ or an equivalent compatible package manager
- A MongoDB database; MongoDB Atlas is recommended

### Install and start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Create `.env.local` locally. Never commit this file or real credentials.

```env
MONGODB_URI=mongodb+srv://...
MONGODB_DB=yashoda
JWT_SECRET=replace-with-a-long-random-secret
API_URL=http://localhost:3000
```

Set the same variables in Vercel for Development, Preview, and Production. The public storefront can use its demo catalog when MongoDB is unavailable, but authentication and live catalog management require a working database and production secrets.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server on port 3000 |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run TypeScript validation (`tsc --noEmit`) |

## Routes

- `/` — editorial storefront landing page
- `/categories` — category discovery
- `/categories/[category]` — filtered catalog pages
- `/product/[id]` — product detail page
- `/cart` — cart and order summary
- `/login` — customer authentication
- `/admin/login` — admin authentication
- `/admin` — protected administration tools
- `/api/products` — product listing and creation endpoint
- `/api/products/[id]` — single-product endpoint
- `/api/products/demo` — public demo catalog fallback
- `/api/auth/login` — password login endpoint

## Performance notes

The storefront keeps the first render lightweight and avoids blocking the hero on catalog data. Trending products reuse an in-memory request cache during a browser session, abort stale requests during navigation, and fall back to the demo endpoint only when the database route is unavailable. Images are served through Next.js optimization, below-the-fold content is lazy-loaded, and Vercel response compression is enabled.

For production monitoring, check Vercel function logs and Core Web Vitals after deployment. Keep product image URLs optimized and avoid adding large client-only libraries to the initial route.

## Deployment checklist

1. Import the repository into Vercel using the standard Next.js preset.
2. Add `MONGODB_URI`, `MONGODB_DB`, `JWT_SECRET`, and `API_URL` to all required Vercel environments.
3. Confirm the deployment uses Node.js 18.18 or newer.
4. Run a preview smoke test for `/`, `/categories`, `/product/[id]`, `/cart`, and `/login`.
5. Verify that product pages work with both MongoDB data and the demo fallback.
6. Review Vercel runtime logs if a database request fails; the storefront should remain browsable while the database is repaired.

## Repository layout

```text
app/          App Router pages and API routes
components/   Storefront and reusable UI components
hooks/        Cart, auth, and client interaction providers
lib/          MongoDB and authentication utilities
public/       Static assets and favicon
scripts/      Optional data maintenance scripts
types/        Shared TypeScript models
```

## Security

Use unique production secrets, restrict MongoDB network access where possible, validate every admin mutation server-side, and never use demo credentials in production. Security response headers are configured in `next.config.mjs`.

## License

Private project. All rights reserved.

---

*Created in 2024–2025 and continuously refined for a faster, calmer way to discover everyday essentials.*
