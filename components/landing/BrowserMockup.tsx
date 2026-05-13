"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Filter = "all" | "features" | "fixes";

interface Entry {
  tag: string;
  version: string;
  date: string;
  title: string;
  desc: string;
  category: "feature" | "fix";
}

export function BrowserMockup() {
  const t = useTranslations("hero");
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const entries: Entry[] = [
    {
      tag: t("mockupEntry1Tag"),
      version: t("mockupEntry1Version"),
      date: t("mockupEntry1Date"),
      title: t("mockupEntry1Title"),
      desc: t("mockupEntry1Desc"),
      category: "feature",
    },
    {
      tag: t("mockupFix1Tag"),
      version: t("mockupFix1Version"),
      date: t("mockupFix1Date"),
      title: t("mockupFix1Title"),
      desc: t("mockupFix1Desc"),
      category: "fix",
    },
    {
      tag: t("mockupEntry2Tag"),
      version: t("mockupEntry2Version"),
      date: t("mockupEntry2Date"),
      title: t("mockupEntry2Title"),
      desc: t("mockupEntry2Desc"),
      category: "feature",
    },
    {
      tag: t("mockupFix2Tag"),
      version: t("mockupFix2Version"),
      date: t("mockupFix2Date"),
      title: t("mockupFix2Title"),
      desc: t("mockupFix2Desc"),
      category: "fix",
    },
    {
      tag: t("mockupEntry3Tag"),
      version: t("mockupEntry3Version"),
      date: t("mockupEntry3Date"),
      title: t("mockupEntry3Title"),
      desc: t("mockupEntry3Desc"),
      category: "feature",
    },
    {
      tag: t("mockupFix3Tag"),
      version: t("mockupFix3Version"),
      date: t("mockupFix3Date"),
      title: t("mockupFix3Title"),
      desc: t("mockupFix3Desc"),
      category: "fix",
    },
  ];

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: t("filterAll") },
    { id: "features", label: t("filterFeatures") },
    { id: "fixes", label: t("filterFixes") },
  ];

  const visible = (
    activeFilter === "all"
      ? entries
      : entries.filter((e) =>
          activeFilter === "features"
            ? e.category === "feature"
            : e.category === "fix"
        )
  ).slice(0, 3);

  return (
    <div
      className="w-full rounded-xl border border-edge overflow-hidden"
      style={{ boxShadow: "0 0 80px rgba(255,107,0,0.08)" }}
    >
      {/* Browser chrome */}
      <div className="bg-surface-2 px-4 py-3 flex items-center gap-3 border-b border-edge">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 bg-background rounded-md px-3 py-1 text-xs text-tertiary text-center font-mono truncate">
          {t("mockupUrl")}
        </div>
      </div>

      {/* Content */}
      <div className="bg-background px-6 py-5">
        {/* Filter bar */}
        <div className="flex items-center gap-2 mb-5">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`text-xs px-3 py-1 rounded-full font-medium cursor-pointer transition-colors duration-150 ${
                activeFilter === f.id
                  ? "bg-accent text-black"
                  : "bg-surface border border-edge text-secondary hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Entries — key forces re-mount on filter change, triggering stagger */}
        <div key={activeFilter} className="space-y-5">
          {visible.map((entry, i) => (
            <div
              key={entry.title}
              className="animate-fade-up border-l-2 pl-4 pb-1"
              style={{
                borderColor:
                  entry.category === "fix" ? "#3a3a3a" : "var(--accent)",
                animationDelay: `${i * 55}ms`,
                animationFillMode: "both",
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    entry.category === "fix"
                      ? "bg-[#1a1010] text-[#e07070] border border-[#3d2020]"
                      : "bg-accent/10 text-accent"
                  }`}
                >
                  {entry.tag}
                </span>
                <span className="text-xs text-tertiary font-mono">
                  {entry.version} · {entry.date}
                </span>
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">
                {entry.title}
              </h3>
              <p className="text-secondary text-xs leading-relaxed line-clamp-2">
                {entry.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
