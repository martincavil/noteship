# Logstory — Your product updates, beautifully told.

The simplest changelog tool for indie makers. Beautiful public page, embeddable widget, automatic email notifications.

## Tech Stack

- **Next.js 15** (App Router, TypeScript strict)
- **Tailwind CSS v4** (design tokens via `@theme inline`)
- **next-intl** (i18n: English default, French at `/fr`)
- **Supabase** (waitlist email storage)
- **Resend** (transactional email confirmations)
- **Stripe** (ready for checkout, not yet wired)
- **Vercel Analytics**

## Setup

### 1. Clone and install

```bash
git clone <repo>
cd logstory
npm install
```

### 2. Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

```bash
cp .env.local.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `RESEND_API_KEY` | Resend API key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |

### 3. Supabase table

Run this SQL in your Supabase project's SQL editor:

```sql
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  locale TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/en`.
French version is at [http://localhost:3000/fr](http://localhost:3000/fr).

## Deploy to Vercel

1. Push to GitHub
2. Import the repo in [vercel.com/new](https://vercel.com/new)
3. Add all environment variables from `.env.local`
4. Deploy — Vercel auto-detects Next.js from `vercel.json`

## Project structure

```
app/
  [locale]/
    layout.tsx      ← locale layout (html, body, NextIntlClientProvider)
    page.tsx        ← landing page
  api/
    waitlist/
      route.ts      ← POST /api/waitlist
  globals.css       ← design tokens + animations
  layout.tsx        ← minimal root layout
components/
  landing/
    Hero.tsx
    Problem.tsx
    Solution.tsx
    HowItWorks.tsx
    EarlyAccess.tsx
    Pricing.tsx
    Footer.tsx
  ui/
    WaitlistForm.tsx
    Badge.tsx
    FeatureCard.tsx
    LanguageSwitcher.tsx
  Nav.tsx
i18n/
  routing.ts        ← supported locales
  request.ts        ← next-intl server config
  navigation.ts     ← typed Link/useRouter/usePathname
messages/
  en.json           ← English copy
  fr.json           ← French copy
middleware.ts        ← next-intl routing middleware
```
