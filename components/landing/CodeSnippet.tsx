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
      className="shrink-0 text-accent mt-0.5"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function CodeSnippet() {
  const t = useTranslations("codeSnippet");

  return (
    <section className="py-24 px-6 bg-[#0F0F0F]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — pitch */}
          <div>
            <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
              {t("title")}
            </h2>
            <p className="text-secondary text-lg mb-8 leading-relaxed">
              {t("subtitle")}
            </p>
            <ul className="space-y-3">
              {([t("b1"), t("b2"), t("b3")] as string[]).map((bullet, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-secondary">
                  <CheckIcon />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — terminal window */}
          <div className="rounded-xl border border-edge overflow-hidden" style={{ boxShadow: "0 0 40px rgba(255,107,0,0.06)" }}>
            {/* Terminal chrome */}
            <div className="bg-surface-2 px-4 py-3 flex items-center gap-3 border-b border-edge">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <span className="text-xs text-tertiary font-mono">{t("label")}</span>
            </div>

            {/* Code */}
            <div className="bg-[#080808] p-6 font-mono text-sm leading-7 overflow-x-auto">
              <div>
                <span className="text-[#666]">{"<!-- Noteship widget -->"}</span>
              </div>
              <div>
                <span className="text-accent">{"<script"}</span>
              </div>
              <div className="pl-4">
                <span className="text-[#7DD3FC]">src</span>
                <span className="text-[#666]">{"="}</span>
                <span className="text-[#86EFAC]">{'"https://cdn.noteship.app/widget.js"'}</span>
              </div>
              <div className="pl-4">
                <span className="text-[#7DD3FC]">data-project</span>
                <span className="text-[#666]">{"="}</span>
                <span className="text-accent">{'"proj_xK9mNqR4"'}</span>
              </div>
              <div className="pl-4">
                <span className="text-[#7DD3FC]">defer</span>
                <span className="text-accent">{">"}</span>
              </div>
              <div>
                <span className="text-accent">{"</script>"}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
