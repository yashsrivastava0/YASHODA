# YASHODA

YASHODA is a modern, full-stack marketplace for fashion, electronics, home decor, and skincare. The current experience uses Next.js App Router, a responsive Tailwind UI, Framer Motion for purposeful interaction, MongoDB for product data, and JWT-based authentication.

## Production readiness

- Next.js image optimization is enabled for the Unsplash assets used by the storefront.
- Product API responses validate limits and return predictable JSON errors.
- MongoDB connections are cached for serverless reuse.
- Login and demo-login routes use the project environment variables rather than hardcoded deployment values.
- The app includes baseline security response headers in `next.config.mjs`.
- The storefront uses responsive layouts, lazy-loaded below-the-fold media, and an abortable product request so navigation does not leave stale requests behind.

## Stack

- Next.js 15 App Router + React 19 + TypeScript
- Tailwind CSS + shadcn/ui + Lucide icons
- Framer Motion for lightweight entrance and hover transitions
- MongoDB Atlas via the official MongoDB driver
- JWT authentication with bcrypt password hashing
- Vercel-compatible standalone output

## Setup

### Requirements

- Node.js 18.18 or newer
- A MongoDB database (MongoDB Atlas works well)

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Create `.env.local` with the following values. Never commit this file or real credentials.

```env
MONGODB_URI=mongodb+srv://...
MONGODB_DB=yashoda
JWT_SECRET=replace-with-a-long-random-secret
API_URL=http://localhost:3000
```

The deployment environment must define the same variables in Vercel project settings. The app can render its demo catalog when the database-backed product request is unavailable, but authentication and live catalog management require a working MongoDB connection.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server on port 3000 |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run the configured lint command |

## Application areas

- `/` — storefront landing page and featured products
- `/categories` — category discovery
- `/categories/[category]` — filtered catalog pages
- `/login` — customer authentication
- `/admin/login` — admin authentication
- `/admin` — protected administration tools
- `/api/products` — MongoDB-backed product listing and creation endpoint
- `/api/auth/login` — password login endpoint

## Deployment checklist

1. Connect the repository to Vercel.
2. Add `MONGODB_URI`, `MONGODB_DB`, and a strong `JWT_SECRET` to Development, Preview, and Production environments.
3. Set `API_URL` to the deployed origin for production if server-side consumers need it.
4. Deploy with the standard Next.js preset; `output: "standalone"` is already configured.
5. Verify the homepage, product listing, login flow, and admin route on the preview deployment.
6. Check Vercel runtime logs if a database request fails; the storefront fallback should keep the public homepage usable while the database is repaired.

## Repository layout

```text
app/          App Router pages and API routes
components/   Storefront and reusable UI components
hooks/        Cart and authentication providers
lib/          MongoDB and authentication utilities
public/       Static assets
scripts/      Optional data maintenance scripts
```

## Security notes

Use unique production secrets, keep MongoDB network access restricted where possible, validate all admin mutations server-side, and do not use the demo credentials from development in production.

## License

Private project. All rights reserved.

<sub>Built for a faster, calmer way to discover everyday essentials.</sub>

