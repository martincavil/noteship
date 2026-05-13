import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/landing/Footer";

export const metadata = {
  title: "Changelog — Noteship",
  description: "Follow Noteship as we build. Every update, every release.",
};

const entries = [
  {
    date: "May 13, 2026",
    tag: "Launch",
    tagColor: "accent",
    version: "v0.1.0",
    title: "Initial Setup — Resend, Supabase & Landing Page",
    body: [
      {
        icon: "✦",
        title: "Email with Resend",
        desc: "All transactional emails route through Resend — waitlist confirmations, welcome messages, and future changelog notifications. Delivered reliably, with clean templates.",
      },
      {
        icon: "✦",
        title: "Database with Supabase",
        desc: "Postgres with row-level security from day one. Waitlist entries, user data, and project settings all live in Supabase. Auto-scaling, real-time ready.",
      },
      {
        icon: "✦",
        title: "Landing page is live",
        desc: "The public face of Noteship is up at noteship.app — hero, pricing, FAQ, founder story, and an early-access waitlist. Built with Next.js and deployed on Vercel.",
      },
    ],
    note: "This is the foundation everything else ships on top of.",
  },
];

function TagBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-accent/40 text-accent rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase">
      <span
        className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"
        aria-hidden="true"
      />
      {label}
    </span>
  );
}

export default async function ChangelogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="mb-16">
            <p className="text-[11px] text-tertiary tracking-widest uppercase font-medium mb-4">
              noteship.app / changelog
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">
              Changelog
            </h1>
            <p className="text-secondary text-base leading-relaxed mb-8">
              Every update, every release. Follow Noteship as we build in public.
            </p>

            {/* Subscribe */}
            <div className="flex gap-2 max-w-sm">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-surface border border-edge rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-tertiary focus:outline-none focus:border-accent/50 transition-colors"
              />
              <button className="bg-accent hover:bg-accent-light text-black font-semibold px-4 py-2.5 rounded-lg text-sm transition-colors duration-150 whitespace-nowrap">
                Subscribe →
              </button>
            </div>
            <p className="text-tertiary text-xs mt-2">
              Get notified by email when a new update ships.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-edge mb-12" />

          {/* Entries */}
          <div className="space-y-16">
            {entries.map((entry, i) => (
              <article key={i} className="relative">
                {/* Date */}
                <p className="text-xs text-tertiary font-mono tracking-wider uppercase mb-4">
                  {entry.date}
                </p>

                {/* Meta row */}
                <div className="flex items-center gap-3 mb-4">
                  <TagBadge label={entry.tag} />
                  <span className="text-xs text-tertiary font-mono border border-edge rounded px-2 py-0.5">
                    {entry.version}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-white tracking-tight mb-6">
                  {entry.title}
                </h2>

                {/* Body */}
                <div className="space-y-5">
                  {entry.body.map((item, j) => (
                    <div key={j} className="flex gap-4">
                      <span
                        className="text-accent mt-0.5 flex-shrink-0 text-sm"
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>
                      <div>
                        <p className="text-white font-semibold text-sm mb-1">
                          {item.title}
                        </p>
                        <p className="text-secondary text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Note */}
                {entry.note && (
                  <div className="mt-8 border-l-2 border-accent/30 pl-4">
                    <p className="text-tertiary text-sm italic">{entry.note}</p>
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 pt-12 border-t border-edge text-center">
            <p className="text-tertiary text-sm mb-1">This is Noteship — your changelog, beautifully told.</p>
            <a
              href="/#waitlist"
              className="text-accent hover:text-accent-light text-sm font-medium transition-colors duration-150"
            >
              Get your changelog page →
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
