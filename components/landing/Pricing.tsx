import { useTranslations } from "next-intl";

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-accent"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function Pricing() {
  const t = useTranslations("pricing");

  const freeFeatures = [
    t("freeF1"),
    t("freeF2"),
    t("freeF3"),
    t("freeF4"),
  ];

  const proFeatures = [
    t("proF1"),
    t("proF2"),
    t("proF3"),
    t("proF4"),
    t("proF5"),
    t("proF6"),
    t("proF7"),
    t("proF8"),
    t("proF9"),
  ];

  return (
    <section className="bg-[#0F0F0F] py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-white tracking-tight">
            {t("title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free */}
          <div className="bg-surface border border-edge rounded-2xl p-8 flex flex-col">
            <div className="mb-6">
              <p className="text-secondary text-sm font-medium uppercase tracking-widest mb-3">
                {t("freeName")}
              </p>
              <div className="flex items-end gap-1">
                <span className="text-5xl font-extrabold text-white">
                  {t("freePrice")}
                </span>
                <span className="text-secondary mb-2">{t("freePeriod")}</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {freeFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-secondary">
                  <CheckIcon />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="#waitlist"
              className="block text-center border border-edge text-white hover:border-[#444] hover:bg-surface-2 font-semibold px-6 py-3 rounded-lg text-sm transition-colors duration-150"
            >
              {t("freeCta")}
            </a>
          </div>

          {/* Pro */}
          <div
            className="relative rounded-2xl border border-accent/40 p-8 flex flex-col"
            style={{
              background: "linear-gradient(160deg, #1a0d00 0%, #111111 100%)",
              boxShadow: "0 0 40px rgba(255,107,0,0.08)",
            }}
          >
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <p className="text-secondary text-sm font-medium uppercase tracking-widest">
                  {t("proName")}
                </p>
                <span className="text-xs text-accent border border-accent/30 bg-accent/5 px-2 py-0.5 rounded-full">
                  {t("proAnnual")}
                  <span className="text-tertiary ml-1">({t("proSave")})</span>
                </span>
              </div>
              <div className="flex items-end gap-1">
                <span className="text-5xl font-extrabold text-white">
                  {t("proPrice")}
                </span>
                <span className="text-secondary mb-2">{t("proPeriod")}</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {proFeatures.map((f, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-2.5 text-sm ${
                    i === 0 ? "text-white font-medium" : "text-secondary"
                  }`}
                >
                  <CheckIcon />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="#waitlist"
              className="block text-center bg-accent hover:bg-accent-light text-black font-semibold px-6 py-3 rounded-lg text-sm transition-colors duration-150"
            >
              {t("proCta")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
