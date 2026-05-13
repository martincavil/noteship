# Noteship

> A changelog tool for indie makers. Public page, in-app widget, automatic email notifications — live in 5 minutes.

**Status:** waitlist phase · 10 founding spots · $3.99/month at launch

Live at [noteship.app](https://noteship.app)

---

## What this is

Noteship is a SaaS landing page + waitlist, currently in pre-launch. When a user submits their email:

1. It's stored in Supabase
2. They get a confirmation email via Resend
3. The founding spots counter updates in real time (ISR, 60s)

The product itself (changelog dashboard, widget, email system) is not built yet — this repo is the marketing site.

---

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| i18n | next-intl v4 — English (default) + French (`/fr`) |
| Database | Supabase (PostgreSQL) |
| Email | Resend |
| Deployment | Vercel |

---

## Getting started

### Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project (free tier is fine)
- A [Resend](https://resend.com) account (free tier is fine)

### 1. Clone and install

```bash
git clone https://github.com/martincavil/noteship
cd noteship
npm install
```

### 2. Create the waitlist table in Supabase

Go to your Supabase project → **SQL Editor** and run:

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

### 3. Add environment variables

Create a `.env.local` file at the root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
RESEND_API_KEY=re_...
```

Find these in:
- **Supabase** → Project Settings → API
- **Resend** → API Keys

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for English, [http://localhost:3000/fr](http://localhost:3000/fr) for French.

---

## Deploying to Vercel

1. Push the repo to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add the three env vars in **Project Settings → Environment Variables**
4. Deploy

```bash
npm run build  # always verify locally first
```

---

## Project structure

```
noteship/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx        # HTML shell, fonts, i18n provider
│   │   └── page.tsx          # Landing page (ISR, revalidates every 60s)
│   ├── api/waitlist/
│   │   └── route.ts          # POST /api/waitlist — saves email, sends confirmation
│   ├── globals.css           # Tailwind v4 config + design tokens
│   └── layout.tsx            # Root passthrough layout
├── components/
│   ├── Nav.tsx
│   ├── landing/              # One component per page section
│   │   ├── Hero.tsx
│   │   ├── BrowserMockup.tsx # Interactive changelog demo (client component)
│   │   ├── StatsBar.tsx
│   │   ├── Problem.tsx
│   │   ├── Solution.tsx
│   │   ├── CodeSnippet.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── FounderStory.tsx
│   │   ├── Pricing.tsx       # Monthly/yearly toggle
│   │   ├── FAQ.tsx
│   │   ├── EarlyAccess.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── WaitlistForm.tsx  # Email form with validation + error states
│       ├── LanguageSwitcher.tsx
│       ├── Badge.tsx
│       └── FeatureCard.tsx
├── messages/
│   ├── en.json               # All English strings
│   └── fr.json               # All French strings
├── lib/
│   ├── supabase.ts           # createSupabaseClient() — call each time, no singleton
│   └── resend.ts             # createResendClient()
├── i18n/
│   ├── routing.ts
│   ├── request.ts
│   └── navigation.ts
├── proxy.ts                  # next-intl locale routing (Next.js 16: proxy.ts, not middleware.ts)
└── next.config.ts
```

---

## Editing copy

All text is in `messages/en.json` and `messages/fr.json`. No code changes needed to update headlines, CTAs, or section content — edit the JSON and redeploy.

Variables use ICU syntax: `"urgency": "✦ {spotsLeft} of 10 spots left"` where `spotsLeft` is passed at render time.

---

## Waitlist API

**`POST /api/waitlist`**

```json
{ "email": "user@example.com", "locale": "en" }
```

| Status | Meaning |
|---|---|
| `200 { success: true, position: N }` | Registered |
| `200 { message: "already_registered" }` | Already on the list |
| `422` | Invalid email |
| `500` | Supabase error |

The confirmation email is sent from `onboarding@resend.dev` (Resend sandbox). Once `noteship.app` is verified in Resend, update the `from` field in `app/api/waitlist/route.ts`.

---

## Key things to know

- **Next.js 16**: middleware file is `proxy.ts`, not `middleware.ts`. Route handlers use native `Request`/`Response`, not `NextRequest`/`NextResponse`.
- **Tailwind v4**: no `tailwind.config.ts`. All tokens and animations live in `app/globals.css`.
- **Supabase**: RLS is enabled. The `allow_public_insert` policy is required — without it, form submissions silently fail.
- **Founding spots**: the counter reads the live Supabase count on each page render (ISR, 60s cache). Falls back to 0 if env vars are missing.
