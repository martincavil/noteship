# Noteship

> The changelog tool for indie makers. Beautiful public page, in-app widget, automatic email notifications.

Currently in **waitlist phase** — 10 founding spots at $6.99/month.

Live at [noteship.app](https://noteship.app)

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| i18n | next-intl v4 (EN + FR) |
| Database | Supabase (PostgreSQL) |
| Email | Resend |
| Validation | Zod |
| Analytics | Vercel Analytics |
| Deployment | Vercel |

---

## Getting started

### Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project
- A [Resend](https://resend.com) account

### 1. Clone and install

```bash
git clone https://github.com/martincavil/noteship
cd noteship
npm install
```

### 2. Create the Supabase table

In your Supabase project → **SQL Editor**, run:

```sql
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  locale TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_public_insert"
  ON waitlist FOR INSERT
  WITH CHECK (true);
```

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in the three required values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
RESEND_API_KEY=re_...
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon public key |
| `RESEND_API_KEY` | Yes | Resend API key |
| `STRIPE_SECRET_KEY` | No | Stripe secret key (not wired up yet) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | No | Stripe publishable key (not wired up yet) |

---

## Project structure

```
noteship/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx        # HTML shell, fonts, i18n provider
│   │   └── page.tsx          # Landing page (ISR, revalidate 60s)
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts      # POST /api/waitlist
│   ├── globals.css           # Tailwind v4 config + design tokens
│   ├── icon.png              # Favicon (Next.js App Router convention)
│   └── layout.tsx            # Root layout (passthrough)
├── components/
│   ├── Nav.tsx
│   ├── landing/              # One file per landing section
│   │   ├── Hero.tsx
│   │   ├── StatsBar.tsx
│   │   ├── Problem.tsx
│   │   ├── Solution.tsx
│   │   ├── CodeSnippet.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Testimonials.tsx  # "use client" — 3D flip animation
│   │   ├── FounderStory.tsx
│   │   ├── Pricing.tsx       # "use client" — monthly/yearly toggle
│   │   ├── FAQ.tsx
│   │   ├── EarlyAccess.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── WaitlistForm.tsx  # "use client" — form with validation
│       ├── Badge.tsx
│       ├── FeatureCard.tsx
│       └── LanguageSwitcher.tsx
├── i18n/
│   ├── routing.ts            # Locales: en (default), fr
│   ├── request.ts
│   └── navigation.ts
├── lib/
│   ├── supabase.ts           # createSupabaseClient() factory
│   └── resend.ts             # createResendClient() factory
├── messages/
│   ├── en.json               # All EN strings
│   └── fr.json               # All FR strings
├── public/
│   └── noteship-logo.png
├── proxy.ts                  # next-intl middleware (Next.js 16: proxy.ts, not middleware.ts)
└── next.config.ts
```

---

## Architecture notes

### Next.js 16 specifics

- Middleware file is `proxy.ts`, not `middleware.ts` (renamed in Next.js 16)
- Route handlers use native `Request`/`Response`, not `NextRequest`/`NextResponse`

### Tailwind CSS v4

No `tailwind.config.ts`. All configuration (design tokens, custom animations, theme) lives in `app/globals.css` using `@import "tailwindcss"` and `@theme inline`.

Design tokens are CSS variables in `:root` exposed as Tailwind utility classes:

| Token | Value | Class |
|---|---|---|
| `--background` | `#0A0A0A` | `bg-background` |
| `--surface` | `#111111` | `bg-surface` |
| `--edge` | `#222222` | `border-edge` |
| `--accent` | `#FF6B00` | `bg-accent`, `text-accent` |
| `--secondary` | `#A0A0A0` | `text-secondary` |
| `--tertiary` | `#555555` | `text-tertiary` |

### i18n

All user-facing text lives in `messages/en.json` and `messages/fr.json`. Variables use ICU syntax (`{spotsLeft}`). The page renders in English by default; `/fr` serves French.

### Founding spots counter

`page.tsx` fetches the waitlist count from Supabase on each render (ISR, 60s revalidation). `spotsLeft = Math.max(0, 10 - count)` is passed as a prop to `Hero` and `EarlyAccess`. Gracefully falls back to 0 if env vars are missing.

---

## API

### `POST /api/waitlist`

Registers an email on the waitlist, inserts into Supabase, and sends a confirmation email via Resend.

**Request body**
```json
{ "email": "user@example.com", "locale": "en" }
```

**Responses**

| Status | Body | Meaning |
|---|---|---|
| 200 | `{ "success": true, "position": 3 }` | Registered successfully |
| 200 | `{ "message": "already_registered" }` | Email already on the list |
| 422 | `{ "error": "Validation failed", "issues": [...] }` | Invalid input |
| 500 | `{ "error": "Could not save your email" }` | Supabase error |

---

## Deployment

Configured for Vercel. Add the three required environment variables in your project settings, then push to `main`.

```bash
npm run build   # verify locally before pushing
git push origin main
```
