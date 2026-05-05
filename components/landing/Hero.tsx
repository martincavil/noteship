import { useTranslations } from "next-intl";

function BrowserMockup({ t }: { t: ReturnType<typeof useTranslations<"hero">> }) {
  return (
    <div
      className="w-full rounded-xl border border-edge overflow-hidden"
      style={{ boxShadow: "0 0 80px rgba(255,107,0,0.08)" }}
    >
      {/* Browser chrome */}
      <div className="bg-surface-2 px-4 py-3 flex items-center gap-3 border-b border-edge">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 bg-background rounded-md px-3 py-1 text-xs text-tertiary text-center font-mono truncate">
          {t("mockupUrl")}
        </div>
      </div>

      {/* Fake changelog page */}
      <div className="bg-background px-6 py-5 space-y-5">
        {/* Filter bar */}
        <div className="flex items-center gap-2">
          <button className="text-xs px-3 py-1 rounded-full bg-accent text-black font-medium">
            All
          </button>
          <button className="text-xs px-3 py-1 rounded-full bg-surface border border-edge text-secondary hover:text-white transition-colors">
            Features
          </button>
          <button className="text-xs px-3 py-1 rounded-full bg-surface border border-edge text-secondary hover:text-white transition-colors">
            Fixes
          </button>
        </div>

        {/* Entry 1 */}
        <div className="border-l-2 border-accent pl-4 pb-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">
              {t("mockupEntry1Tag")}
            </span>
            <span className="text-xs text-tertiary font-mono">
              {t("mockupEntry1Version")} · {t("mockupEntry1Date")}
            </span>
          </div>
          <h3 className="text-white font-semibold text-sm mb-1">
            {t("mockupEntry1Title")}
          </h3>
          <p className="text-secondary text-xs leading-relaxed line-clamp-2">
            {t("mockupEntry1Desc")}
          </p>
        </div>

        {/* Entry 2 */}
        <div className="border-l-2 border-[#333] pl-4 pb-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs bg-surface border border-edge text-secondary px-2 py-0.5 rounded-full font-medium">
              {t("mockupEntry2Tag")}
            </span>
            <span className="text-xs text-tertiary font-mono">
              {t("mockupEntry2Version")} · {t("mockupEntry2Date")}
            </span>
          </div>
          <h3 className="text-white font-semibold text-sm mb-1">
            {t("mockupEntry2Title")}
          </h3>
          <p className="text-secondary text-xs leading-relaxed line-clamp-2">
            {t("mockupEntry2Desc")}
          </p>
        </div>

        {/* Entry 3 */}
        <div className="border-l-2 border-[#333] pl-4 pb-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs bg-surface border border-edge text-secondary px-2 py-0.5 rounded-full font-medium">
              {t("mockupEntry3Tag")}
            </span>
            <span className="text-xs text-tertiary font-mono">
              {t("mockupEntry3Version")} · {t("mockupEntry3Date")}
            </span>
          </div>
          <h3 className="text-white font-semibold text-sm mb-1">
            {t("mockupEntry3Title")}
          </h3>
          <p className="text-secondary text-xs leading-relaxed line-clamp-2">
            {t("mockupEntry3Desc")}
          </p>
        </div>

        {/* Fade-out gradient at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen pt-28 pb-24 px-6 text-center overflow-hidden">
      {/* Subtle radial background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,107,0,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Badge */}
        <div className="animate-fade-up">
          <span className="inline-flex items-center border border-accent text-accent rounded-full px-3 py-1 text-xs font-medium mb-8 tracking-wide">
            {t("badge")}
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up delay-100 text-[clamp(48px,8vw,96px)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white mt-6 mb-6">
          {t("headline1")}
          <br />
          <span className="text-gradient-orange">{t("headline2")}</span>
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-up delay-200 text-lg text-secondary max-w-xl mx-auto mb-8 leading-relaxed">
          {t("subheadline")}
        </p>

        {/* CTAs */}
        <div className="animate-fade-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
          <a
            href="#waitlist"
            className="bg-accent hover:bg-accent-light text-black font-semibold px-6 py-3 rounded-lg text-sm transition-colors duration-150 w-full sm:w-auto text-center"
          >
            {t("ctaPrimary")}
          </a>
          <a
            href="#how-it-works"
            className="text-secondary hover:text-white underline underline-offset-4 decoration-[#333] hover:decoration-secondary transition-colors duration-150 text-sm"
          >
            {t("ctaSecondary")}
          </a>
        </div>

        {/* Urgency */}
        <p className="animate-fade-up delay-300 text-xs text-tertiary mb-16">
          {t("urgency")}
        </p>

        {/* Browser mockup */}
        <div className="animate-fade-up delay-400 relative max-w-3xl mx-auto">
          <BrowserMockup t={t} />
        </div>
      </div>
    </section>
  );
}
