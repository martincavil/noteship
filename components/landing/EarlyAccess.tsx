import { useTranslations } from "next-intl";
import { WaitlistForm } from "@/components/ui/WaitlistForm";

export function EarlyAccess({ spotsLeft }: { spotsLeft: number }) {
  const t = useTranslations("earlyAccess");

  const perks = [
    t("perk1"),
    t("perk2"),
    t("perk3"),
    t("perk4"),
  ];

  return (
    <section id="waitlist" className="py-24 px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <div
          className="rounded-2xl border border-accent/20 p-10 md:p-16"
          style={{
            background: "linear-gradient(135deg, #111111 0%, #1a0d00 100%)",
          }}
        >
          {/* Spots counter */}
          <div className="flex items-center gap-2 mb-8">
            <span
              className="w-2 h-2 rounded-full bg-accent animate-pulse-dot"
              aria-hidden="true"
            />
            <span className="text-accent font-bold text-lg font-mono">
              {t("spots", { spotsLeft })}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
            {t("title")}
          </h2>
          <p className="text-secondary text-lg mb-8 leading-relaxed">
            {t("subtitle")}
          </p>

          {/* Perks */}
          <ul className="space-y-3 mb-10">
            {perks.map((perk, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span
                  className="text-accent mt-0.5 shrink-0 font-bold"
                  aria-hidden="true"
                >
                  ✦
                </span>
                <span className="text-secondary">{perk}</span>
              </li>
            ))}
          </ul>

          {/* Form */}
          <WaitlistForm />

          <p className="mt-3 text-xs text-tertiary">{t("noSpam")}</p>
        </div>
      </div>
    </section>
  );
}
