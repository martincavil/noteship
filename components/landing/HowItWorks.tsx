import { useTranslations } from "next-intl";

export function HowItWorks() {
  const t = useTranslations("howItWorks");

  const steps = [
    {
      number: t("step1Number"),
      title: t("step1Title"),
      duration: t("step1Duration"),
      desc: t("step1Desc"),
    },
    {
      number: t("step2Number"),
      title: t("step2Title"),
      duration: t("step2Duration"),
      desc: t("step2Desc"),
    },
    {
      number: t("step3Number"),
      title: t("step3Title"),
      duration: t("step3Duration"),
      desc: t("step3Desc"),
    },
  ];

  return (
    <section id="how-it-works" className="bg-[#0F0F0F] py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white tracking-tight">
            {t("title")}
          </h2>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div
            className="absolute left-8 top-12 bottom-12 w-px bg-gradient-to-b from-edge via-edge to-transparent hidden md:block"
            aria-hidden="true"
          />

          <div className="space-y-10">
            {steps.map((step, i) => (
              <div key={i} className="relative flex gap-8 md:gap-10">
                {/* Step number */}
                <div className="shrink-0 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl border border-edge bg-surface flex items-center justify-center relative z-10">
                    <span className="text-xl font-bold text-accent font-mono">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-3 pb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white font-semibold text-xl">
                      {step.title}
                    </h3>
                    <span className="text-xs text-accent border border-accent/30 bg-accent/5 px-2.5 py-0.5 rounded-full font-medium">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-secondary leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
