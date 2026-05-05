"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (next: "en" | "fr") => {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      className="flex items-center gap-1 text-sm font-medium"
      aria-label="Language switcher"
    >
      <button
        onClick={() => switchLocale("en")}
        disabled={isPending}
        className={`px-1 py-0.5 rounded transition-colors duration-150 ${
          locale === "en"
            ? "text-white"
            : "text-tertiary hover:text-white"
        }`}
        aria-current={locale === "en" ? "true" : undefined}
      >
        EN
      </button>
      <span className="text-tertiary select-none">/</span>
      <button
        onClick={() => switchLocale("fr")}
        disabled={isPending}
        className={`px-1 py-0.5 rounded transition-colors duration-150 ${
          locale === "fr"
            ? "text-white"
            : "text-tertiary hover:text-white"
        }`}
        aria-current={locale === "fr" ? "true" : undefined}
      >
        FR
      </button>
    </div>
  );
}
