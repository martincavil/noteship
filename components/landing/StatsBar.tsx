import { useTranslations } from "next-intl";

export function StatsBar() {
  const t = useTranslations("stats");

  const stats = [
    { value: t("s1Value"), label: t("s1Label") },
    { value: t("s2Value"), label: t("s2Label") },
    { value: t("s3Value"), label: t("s3Label") },
    { value: t("s4Value"), label: t("s4Label") },
  ];

  return (
    <div className="border-y border-edge bg-surface">
      <div className="max-w-5xl mx-auto px-6 py-5">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center py-2 md:py-0 gap-0.5 relative"
            >
              {i > 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-8 bg-edge" />
              )}
              <span className="text-2xl font-extrabold text-white font-mono tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs text-tertiary">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
