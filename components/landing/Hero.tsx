import { useTranslations } from "next-intl";
function BrowserMockup({
  t,
}: {
  t: ReturnType<typeof useTranslations<"hero">>;
}) {
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
          <button className="text-xs px-3 py-1 rounded-full bg-accent text-black font-medium cursor-pointer">
            All
          </button>
          <button className="text-xs px-3 py-1 rounded-full bg-surface border border-edge text-secondary hover:text-white transition-colors cursor-pointer">
            Features
          </button>
          <button className="text-xs px-3 py-1 rounded-full bg-surface border border-edge text-secondary hover:text-white transition-colors cursor-pointer">
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

export function Hero({ spotsLeft }: { spotsLeft: number }) {
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

      {/* ── Decorative shape system ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      >
        {/* Dot grid texture */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,107,0,0.18) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 35%, black 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 35%, black 30%, transparent 80%)",
          }}
        />

        {/* Outer rotating arc ring */}
        <svg
          className="absolute animate-arc-pulse hidden md:block"
          style={{
            left: "50%",
            top: "32%",
            transform: "translate(-50%, -50%)",
            width: 920,
            height: 920,
          }}
          viewBox="0 0 920 920"
          fill="none"
        >
          <defs>
            <linearGradient id="heroArcOuter" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF6B00" stopOpacity="0" />
              <stop offset="35%" stopColor="#FF6B00" stopOpacity="1" />
              <stop offset="65%" stopColor="#FF9A3C" stopOpacity="1" />
              <stop offset="100%" stopColor="#FF9A3C" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle
            cx="460"
            cy="460"
            r="420"
            stroke="url(#heroArcOuter)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="660 1980"
            strokeDashoffset="-300"
          />
        </svg>

        {/* Inner arc — bottom half only */}
        <svg
          className="absolute hidden md:block"
          style={{
            left: "50%",
            top: "32%",
            transform: "translate(-50%, -50%)",
            width: 640,
            height: 640,
            opacity: 0.18,
          }}
          viewBox="0 0 640 640"
          fill="none"
        >
          <defs>
            <linearGradient id="heroArcInner" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FF6B00" stopOpacity="0" />
              <stop offset="50%" stopColor="#FF9A3C" stopOpacity="1" />
              <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle
            cx="320"
            cy="320"
            r="300"
            stroke="url(#heroArcInner)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="480 1405"
            strokeDashoffset="-562"
          />
        </svg>

        {/* ── Corner brackets ── */}
        {/* Top-left */}
        <div
          className="absolute hidden md:block"
          style={{ top: "17%", left: "calc(50% - 400px)" }}
        >
          <div className="relative w-8 h-8">
            <div
              className="absolute top-0 left-0 w-8 h-px"
              style={{
                background: "linear-gradient(to right, #FF6B00, transparent)",
              }}
            />
            <div
              className="absolute top-0 left-0 h-8 w-px"
              style={{
                background: "linear-gradient(to bottom, #FF6B00, transparent)",
              }}
            />
          </div>
        </div>
        {/* Top-right */}
        <div
          className="absolute hidden md:block"
          style={{ top: "17%", right: "calc(50% - 400px)" }}
        >
          <div className="relative w-8 h-8">
            <div
              className="absolute top-0 right-0 w-8 h-px"
              style={{
                background: "linear-gradient(to left, #FF6B00, transparent)",
              }}
            />
            <div
              className="absolute top-0 right-0 h-8 w-px"
              style={{
                background: "linear-gradient(to bottom, #FF6B00, transparent)",
              }}
            />
          </div>
        </div>
        {/* Bottom-left */}
        <div
          className="absolute hidden md:block"
          style={{ top: "calc(17% + 360px)", left: "calc(50% - 400px)" }}
        >
          <div className="relative w-8 h-8">
            <div
              className="absolute bottom-0 left-0 w-8 h-px"
              style={{
                background: "linear-gradient(to right, #FF6B00, transparent)",
              }}
            />
            <div
              className="absolute bottom-0 left-0 h-8 w-px"
              style={{
                background: "linear-gradient(to top, #FF6B00, transparent)",
              }}
            />
          </div>
        </div>
        {/* Bottom-right */}
        <div
          className="absolute hidden md:block"
          style={{ top: "calc(17% + 360px)", right: "calc(50% - 400px)" }}
        >
          <div className="relative w-8 h-8">
            <div
              className="absolute bottom-0 right-0 w-8 h-px"
              style={{
                background: "linear-gradient(to left, #FF6B00, transparent)",
              }}
            />
            <div
              className="absolute bottom-0 right-0 h-8 w-px"
              style={{
                background: "linear-gradient(to top, #FF6B00, transparent)",
              }}
            />
          </div>
        </div>

        {/* ── Lateral accent lines ── */}
        <div
          className="absolute hidden lg:block"
          style={{
            top: "36%",
            left: "calc(50% - 520px)",
            width: 90,
            height: 1,
            background:
              "linear-gradient(to right, transparent, rgba(255,107,0,0.45))",
          }}
        />
        <div
          className="absolute hidden lg:block"
          style={{
            top: "36%",
            right: "calc(50% - 520px)",
            width: 90,
            height: 1,
            background:
              "linear-gradient(to left, transparent, rgba(255,107,0,0.45))",
          }}
        />
        <div
          className="absolute hidden lg:block"
          style={{
            top: "17%",
            left: "calc(50% - 480px)",
            width: 1,
            height: 200,
            background:
              "linear-gradient(to bottom, transparent, rgba(255,107,0,0.12), transparent)",
          }}
        />
        <div
          className="absolute hidden lg:block"
          style={{
            top: "17%",
            right: "calc(50% - 480px)",
            width: 1,
            height: 200,
            background:
              "linear-gradient(to bottom, transparent, rgba(255,107,0,0.12), transparent)",
          }}
        />

        {/* ── Floating particles ── */}
        <div
          className="absolute animate-float-a hidden sm:block"
          style={{ top: "22%", left: "calc(50% - 310px)" }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: "#FF6B00",
              boxShadow: "0 0 10px rgba(255,107,0,0.6)",
            }}
          />
        </div>
        <div
          className="absolute animate-float-b hidden sm:block"
          style={{ top: "26%", right: "calc(50% - 280px)" }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: "#FF9A3C",
              boxShadow: "0 0 8px rgba(255,154,60,0.5)",
            }}
          />
        </div>
        <div
          className="absolute animate-float-c hidden md:block"
          style={{ top: "44%", left: "calc(50% - 360px)" }}
        >
          <div
            className="w-2 h-2"
            style={{
              background: "#FF6B00",
              transform: "rotate(45deg)",
              boxShadow: "0 0 8px rgba(255,107,0,0.4)",
            }}
          />
        </div>
        <div
          className="absolute animate-float-a hidden md:block"
          style={{ top: "50%", right: "calc(50% - 340px)" }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: "#FF8533",
              boxShadow: "0 0 6px rgba(255,133,51,0.5)",
            }}
          />
        </div>
        <div
          className="absolute animate-float-b hidden lg:block"
          style={{ top: "30%", left: "calc(50% - 430px)" }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{
              background: "rgba(255,107,0,0.55)",
              boxShadow: "0 0 16px rgba(255,107,0,0.35)",
            }}
          />
        </div>
        <div
          className="absolute animate-float-c hidden lg:block"
          style={{ top: "40%", right: "calc(50% - 420px)" }}
        >
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{
              background: "rgba(255,154,60,0.45)",
              boxShadow: "0 0 12px rgba(255,154,60,0.3)",
            }}
          />
        </div>
        <div
          className="absolute animate-float-a hidden lg:block"
          style={{ top: "20%", left: "calc(50% - 200px)" }}
        >
          <div
            className="w-1 h-1 rounded-full"
            style={{ background: "rgba(255,107,0,0.6)" }}
          />
        </div>
        <div
          className="absolute animate-float-c hidden lg:block"
          style={{ top: "56%", right: "calc(50% - 190px)" }}
        >
          <div
            className="w-1 h-1 rounded-full"
            style={{ background: "rgba(255,154,60,0.5)" }}
          />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Badge */}
        <div className="animate-fade-up">
          <span className="inline-flex items-center border border-accent text-accent rounded-full px-3 py-1 text-xs font-medium mb-8 tracking-wide">
            {t("badge")}
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up delay-100 text-[clamp(48px,8vw,90px)] font-extrabold leading-[0.90] tracking-[-0.04em] text-white mt-6 mb-6">
          {t("headline1")}
          <br />
          <span className="text-gradient-orange">{t("headline2")}</span>
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-up delay-200 text-lg text-secondary max-w-xl mx-auto mb-5 leading-relaxed">
          {t("subheadline")}
        </p>

        {/* For who chips */}
        <div className="animate-fade-up delay-200 flex flex-wrap items-center justify-center gap-2 mb-8">
          {[t("forWho1"), t("forWho2"), t("forWho3")].map((label) => (
            <span
              key={label}
              className="text-xs text-tertiary border border-edge rounded-full px-3 py-1"
            >
              {label}
            </span>
          ))}
        </div>

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
        <p className="animate-fade-up delay-300 text-xs text-tertiary mb-8">
          {t("urgency", { spotsLeft })}
        </p>

        {/* Social proof */}
        {/* <div className="animate-fade-up delay-300 flex items-center justify-center gap-3 mb-16">
          <div className="flex -space-x-2">
            {[
              { k: "TW", bg: "#2D1B69", fg: "#A78BFA" },
              { k: "SK", bg: "#1B3A2D", fg: "#6EE7B7" },
              { k: "AM", bg: "#3A1B1B", fg: "#FCA5A5" },
              { k: "LD", bg: "#1B2D3A", fg: "#7DD3FC" },
              { k: "MC", bg: "#3A2D1B", fg: "#FCD34D" },
            ].map((a) => (
              <div
                key={a.k}
                className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[9px] font-bold"
                style={{ background: a.bg, color: a.fg, borderColor: "#0A0A0A" }}
              >
                {a.k}
              </div>
            ))}
          </div>
          <p className="text-xs text-secondary">
            <span className="text-white font-semibold">{t("socialProofCount")}</span>{" "}
            {t("socialProofLabel")}
          </p>
        </div> */}

        {/* Browser mockup */}
        <div className="animate-fade-up delay-400 relative max-w-3xl mx-auto">
          <BrowserMockup t={t} />
        </div>
      </div>
    </section>
  );
}
