import { useTranslations } from "next-intl";

const AVATARS: Record<string, { bg: string; fg: string }> = {
  TW: { bg: "#2D1B69", fg: "#A78BFA" },
  SK: { bg: "#1B3A2D", fg: "#6EE7B7" },
  AM: { bg: "#3A1B1B", fg: "#FCA5A5" },
  LD: { bg: "#1B2D3A", fg: "#7DD3FC" },
  MC: { bg: "#3A2D1B", fg: "#FCD34D" },
  JP: { bg: "#2A2A2A", fg: "#D4D4D4" },
};

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function QuoteIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="text-accent opacity-60"
    >
      <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.365zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.817-.56-.124-1.074-.13-1.54-.022-.16-.94.09-1.95.75-3.022.66-1.066 1.515-1.867 2.56-2.403L18.498 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1-.345 2.04-.217 3.1.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.365z" />
    </svg>
  );
}

function Card({
  name,
  handle,
  role,
  text,
}: {
  name: string;
  handle: string;
  role: string;
  text: string;
}) {
  const key = initials(name);
  const style = AVATARS[key] ?? { bg: "#1A1A1A", fg: "#888" };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-edge bg-surface p-5">
      <QuoteIcon />
      <p className="text-sm text-secondary leading-relaxed flex-1">{text}</p>
      <div className="flex items-center gap-3 pt-1 border-t border-edge">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
          style={{ background: style.bg, color: style.fg }}
        >
          {key}
        </div>
        <div className="min-w-0">
          <p className="text-white text-sm font-medium truncate">{name}</p>
          <p className="text-tertiary text-xs truncate">
            {handle} · {role}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const t = useTranslations("testimonials");

  const cards = [
    { name: t("t1Name"), handle: t("t1Handle"), role: t("t1Role"), text: t("t1Text") },
    { name: t("t2Name"), handle: t("t2Handle"), role: t("t2Role"), text: t("t2Text") },
    { name: t("t3Name"), handle: t("t3Handle"), role: t("t3Role"), text: t("t3Text") },
    { name: t("t4Name"), handle: t("t4Handle"), role: t("t4Role"), text: t("t4Text") },
    { name: t("t5Name"), handle: t("t5Handle"), role: t("t5Role"), text: t("t5Text") },
    { name: t("t6Name"), handle: t("t6Handle"), role: t("t6Role"), text: t("t6Text") },
  ];

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
            {t("title")}
          </h2>
          <p className="text-secondary text-sm max-w-xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <Card key={i} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
