import { useTranslations } from "next-intl";

function TwitterIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function FounderStory() {
  const t = useTranslations("founderStory");

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Eyebrow */}
        <p className="text-accent text-xs font-medium tracking-widest uppercase mb-6">
          ✦ {t("eyebrow")}
        </p>

        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.05] mb-12 max-w-2xl">
          {t("title")}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Quote block — 3 cols */}
          <div className="lg:col-span-3">
            <div className="relative pl-6 border-l-2 border-accent">
              <p className="text-secondary text-lg leading-relaxed mb-6">
                {t("body")}
              </p>
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ background: "#2D1B08", color: "#FF9A3C" }}
                >
                  MC
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">
                    {t.rich("signed", {
                      link: (chunks) => (
                        <a
                          href="https://martincavil.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent transition-colors duration-150"
                        >
                          {chunks}
                        </a>
                      ),
                    })}
                  </p>
                  <a
                    href={`https://x.com/martincvl0`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-tertiary text-xs hover:text-accent transition-colors duration-150 flex items-center gap-1 mt-0.5"
                  >
                    <TwitterIcon />
                    {t("twitterHandle")}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy card — 2 cols */}
          <div className="lg:col-span-2">
            <div
              className="rounded-2xl border border-accent/20 p-7 h-full flex flex-col justify-center"
              style={{
                background: "linear-gradient(135deg, #111111 0%, #1a0d00 100%)",
              }}
            >
              <div
                className="text-4xl font-black mb-4 leading-none"
                style={{
                  background:
                    "linear-gradient(135deg, #FF6B00 0%, #FF9A3C 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                &ldquo;
              </div>
              <p className="text-white font-semibold text-lg leading-snug">
                {t("philosophy")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
