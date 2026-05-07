import { useTranslations } from "next-intl";

function XIcon() {
  return (
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center mb-4"
      style={{ background: "rgba(239,68,68,0.1)" }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#EF4444"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </div>
  );
}

export function Problem() {
  const t = useTranslations("problem");

  const cards = [
    { title: t("card1Title"), desc: t("card1Desc") },
    { title: t("card2Title"), desc: t("card2Desc") },
    { title: t("card3Title"), desc: t("card3Desc") },
  ];

  return (
    <section className="bg-[#0F0F0F] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-secondary text-lg">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-surface border border-edge rounded-xl p-6 hover:border-[#2a2a2a] transition-colors duration-200"
            >
              <XIcon />
              <h3 className="text-white font-semibold text-base mb-2">
                {card.title}
              </h3>
              <p className="text-secondary text-sm leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
