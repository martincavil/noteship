"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const FLIP_INTERVAL = 7000;
const INITIAL_DELAY_BASE = 1800;
const STAGGER = 650;

const AVATAR_STYLES: Record<string, { bg: string; fg: string }> = {
  IU: { bg: "#2D1B69", fg: "#A78BFA" },
  PF: { bg: "#1B3A2D", fg: "#6EE7B7" },
  JP: { bg: "#3A1B1B", fg: "#FCA5A5" },
  JT: { bg: "#1B2D3A", fg: "#7DD3FC" },
  RP: { bg: "#3A2D1B", fg: "#FCD34D" },
  LF: { bg: "#2A2A2A", fg: "#D4D4D4" },
  BB: { bg: "#1a0d00", fg: "#FF9A3C" },
  PA: { bg: "#0d1a00", fg: "#86EFAC" },
  HH: { bg: "#1a001a", fg: "#E879F9" },
  FF: { bg: "#001a1a", fg: "#67E8F9" },
  OR: { bg: "#1a1a00", fg: "#FDE047" },
  FL: { bg: "#0d0d1a", fg: "#93C5FD" },
  UI: { bg: "#2D1B69", fg: "#A78BFA" },
  PF2: { bg: "#1B3A2D", fg: "#6EE7B7" },
  JM: { bg: "#3A1B1B", fg: "#FCA5A5" },
  ST: { bg: "#1B2D3A", fg: "#7DD3FC" },
  AA: { bg: "#3A2D1B", fg: "#FCD34D" },
  DF: { bg: "#1a0d00", fg: "#FF9A3C" },
  FA: { bg: "#1a001a", fg: "#E879F9" },
  PI: { bg: "#001a1a", fg: "#67E8F9" },
  HC: { bg: "#1a1a00", fg: "#FDE047" },
  FF2: { bg: "#0d0d1a", fg: "#93C5FD" },
  LA: { bg: "#1B3A2D", fg: "#6EE7B7" },
  DF2: { bg: "#1a0d00", fg: "#FF9A3C" },
};

function getAvatarStyle(name: string) {
  const key = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return {
    key,
    style: AVATAR_STYLES[key] ?? { bg: "#1A1A1A", fg: "#888" },
  };
}

function QuoteIcon({ color = "rgba(255,107,0,0.5)" }: { color?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.365zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.817-.56-.124-1.074-.13-1.54-.022-.16-.94.09-1.95.75-3.022.66-1.066 1.515-1.867 2.56-2.403L18.498 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1-.345 2.04-.217 3.1.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.365z" />
    </svg>
  );
}

interface CardData {
  name: string;
  handle: string;
  role: string;
  text: string;
}

function CardFace({
  data,
  variant,
}: {
  data: CardData;
  variant: "front" | "back";
}) {
  const { key, style } = getAvatarStyle(data.name);
  const isBack = variant === "back";

  return (
    <div
      className="flex flex-col gap-3 p-5 rounded-xl h-full"
      style={{
        border: isBack ? "1px solid rgba(255,107,0,0.25)" : "1px solid #222",
        background: isBack
          ? "linear-gradient(135deg, #130800 0%, #111111 100%)"
          : "#111111",
      }}
    >
      <QuoteIcon color={isBack ? "rgba(255,107,0,0.7)" : "rgba(255,107,0,0.4)"} />
      <p className="text-sm leading-relaxed flex-1" style={{ color: isBack ? "#bbb" : "#A0A0A0" }}>
        {data.text}
      </p>
      <div
        className="flex items-center gap-3 pt-3"
        style={{ borderTop: "1px solid #1E1E1E" }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold"
          style={{ background: style.bg, color: style.fg }}
        >
          {key}
        </div>
        <div className="min-w-0">
          <p className="text-white text-sm font-medium truncate">{data.name}</p>
          <p className="text-xs truncate" style={{ color: "#555" }}>
            {data.handle} · {data.role}
          </p>
        </div>
        {isBack && (
          <div className="ml-auto shrink-0">
            <span className="text-[9px] font-medium tracking-wider uppercase" style={{ color: "rgba(255,107,0,0.5)" }}>
              ↻ flip
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function FlipCard({
  front,
  back,
  index,
}: {
  front: CardData;
  back: CardData;
  index: number;
}) {
  const [flipped, setFlipped] = useState(false);
  const hoveredRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const delay = INITIAL_DELAY_BASE + index * STAGGER;

    const timeout = setTimeout(() => {
      setFlipped(true);
      intervalRef.current = setInterval(() => {
        if (!hoveredRef.current) {
          setFlipped((f) => !f);
        }
      }, FLIP_INTERVAL);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [index]);

  return (
    <div
      style={{ perspective: "1200px" }}
      className="cursor-pointer"
      onMouseEnter={() => { hoveredRef.current = true; }}
      onMouseLeave={() => { hoveredRef.current = false; }}
      onClick={() => setFlipped((f) => !f)}
    >
      {/* Flip wrapper */}
      <div
        style={{
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
          transition: "transform 0.72s cubic-bezier(0.4, 0.2, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          position: "relative",
          willChange: "transform",
        }}
      >
        {/* Front */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <CardFace data={front} variant="front" />
        </div>

        {/* Back — absolute, overlays front */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            position: "absolute",
            inset: 0,
          }}
        >
          <CardFace data={back} variant="back" />
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const t = useTranslations("testimonials");

  const fronts: CardData[] = [
    { name: t("t1Name"), handle: t("t1Handle"), role: t("t1Role"), text: t("t1Text") },
    { name: t("t2Name"), handle: t("t2Handle"), role: t("t2Role"), text: t("t2Text") },
    { name: t("t3Name"), handle: t("t3Handle"), role: t("t3Role"), text: t("t3Text") },
    { name: t("t4Name"), handle: t("t4Handle"), role: t("t4Role"), text: t("t4Text") },
    { name: t("t5Name"), handle: t("t5Handle"), role: t("t5Role"), text: t("t5Text") },
    { name: t("t6Name"), handle: t("t6Handle"), role: t("t6Role"), text: t("t6Text") },
  ];

  const backs: CardData[] = [
    { name: t("b1Name"), handle: t("b1Handle"), role: t("b1Role"), text: t("b1Text") },
    { name: t("b2Name"), handle: t("b2Handle"), role: t("b2Role"), text: t("b2Text") },
    { name: t("b3Name"), handle: t("b3Handle"), role: t("b3Role"), text: t("b3Text") },
    { name: t("b4Name"), handle: t("b4Handle"), role: t("b4Role"), text: t("b4Text") },
    { name: t("b5Name"), handle: t("b5Handle"), role: t("b5Role"), text: t("b5Text") },
    { name: t("b6Name"), handle: t("b6Handle"), role: t("b6Role"), text: t("b6Text") },
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
          {fronts.map((front, i) => (
            <FlipCard key={i} front={front} back={backs[i]} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
