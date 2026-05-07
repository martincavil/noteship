@AGENTS.md

# Noteship — Agent Instructions

## What this project is

Noteship is a SaaS changelog tool for indie makers. Currently in waitlist phase (10 founding spots). The site is a bilingual (EN/FR) landing page with a working waitlist backed by Supabase and Resend.

---

## Critical Next.js 16 gotchas

This is **Next.js 16**, not 15. Several APIs changed. Before writing code, read the relevant guide in `node_modules/next/dist/docs/`.

| Breaking change | Correct |
|---|---|
| `middleware.ts` | `proxy.ts` — Next.js 16 renamed the file |
| `NextRequest` in route handlers | Use native `Request` |
| `NextResponse.json()` in route handlers | Use `Response.json()` |
| `next/server` imports in route handlers | Avoid — use Web APIs directly |

Route handler signature:
```ts
export async function POST(request: Request): Promise<Response> { ... }
```

---

## Tailwind CSS v4

**No `tailwind.config.ts`.** Configuration lives in `app/globals.css` only.

```css
@import "tailwindcss";

@theme inline {
  --color-background: var(--background);
  /* ... */
}
```

Design tokens are CSS variables in `:root`, exposed as Tailwind classes via `@theme inline`:

| CSS variable | Tailwind class |
|---|---|
| `--background: #0A0A0A` | `bg-background`, `text-background` |
| `--surface: #111111` | `bg-surface` |
| `--surface-2: #1A1A1A` | `bg-surface-2` |
| `--edge: #222222` | `border-edge` |
| `--accent: #FF6B00` | `bg-accent`, `text-accent`, `border-accent` |
| `--accent-light: #FF8533` | `bg-accent-light` |
| `--secondary: #A0A0A0` | `text-secondary` |
| `--tertiary: #555555` | `text-tertiary` |

Custom animations are defined in `@layer utilities` in `globals.css` — do not add a `tailwind.config.ts`.

---

## i18n (next-intl v4)

- Default locale: `en` (served at `/`)
- French at `/fr`
- All strings in `messages/en.json` and `messages/fr.json`
- Variables use ICU syntax: `"Hello {name}"` → `t("key", { name: "World" })`
- `app/layout.tsx` is a passthrough shell — locale layout is `app/[locale]/layout.tsx`
- `proxy.ts` (not `middleware.ts`) handles locale routing

---

## App layout architecture

```
app/
  layout.tsx          ← shell only, no html/body
  [locale]/
    layout.tsx        ← html, body, fonts, NextIntlClientProvider
    page.tsx          ← all landing sections, async server component (ISR revalidate=60)
  api/
    waitlist/
      route.ts        ← POST handler, Zod validation, Supabase insert, Resend email
```

---

## Data layer

### lib/supabase.ts
Factory function — call `createSupabaseClient()` each time, don't import a singleton.

### lib/resend.ts
Same pattern — `createResendClient()`.

### Supabase table
```sql
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  locale TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```
RLS is enabled. Required policy for public inserts:
```sql
CREATE POLICY "allow_public_insert" ON waitlist FOR INSERT WITH CHECK (true);
```

### Email
Currently sent from `onboarding@resend.dev` (Resend sandbox). When `noteship.app` domain is verified in Resend, change the `from` field in `app/api/waitlist/route.ts`.

---

## Founding spots countdown

`app/[locale]/page.tsx` fetches the waitlist count from Supabase at render time (ISR, 60s revalidation) and passes `spotsLeft = Math.max(0, 10 - count)` as a prop to `<Hero>` and `<EarlyAccess>`. The i18n strings use `{spotsLeft}` interpolation.

---

## Component conventions

- Server components by default — only add `"use client"` when strictly necessary (state, effects, browser APIs)
- `components/landing/` — page sections
- `components/ui/` — reusable UI primitives
- Landing sections that need client state: `Testimonials` (flip animation), `Pricing` (toggle)
- No barrel files — import directly from file path

---

## Commands

```bash
npm run dev      # local dev server
npm run build    # production build (must pass before committing)
npm run lint     # ESLint
```

Always run `npm run build` before considering a task done. TypeScript errors fail the build.
