import { useTranslations } from "next-intl";

export function FAQ() {
  const t = useTranslations("faq");

  const items = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
    { q: t("q5"), a: t("a5") },
  ];

  return (
    <section className="py-8 md:py-24 px-6 bg-[#0F0F0F]">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-12">
          {t("title")}
        </h2>

        <div className="divide-y divide-edge">
          {items.map((item, i) => (
            <details key={i} className="group py-5 cursor-pointer">
              <summary className="flex items-center justify-between gap-4 list-none [&::-webkit-details-marker]:hidden text-white font-medium text-sm hover:text-accent transition-colors duration-150">
                <span>{item.q}</span>
                <svg
                  className="shrink-0 text-tertiary transition-transform duration-200 group-open:rotate-180"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <p className="mt-3 text-secondary leading-relaxed text-sm">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
