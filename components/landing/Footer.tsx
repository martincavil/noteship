import Image from "next/image";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-edge bg-background py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <Image
                src="/noteship-logo.png"
                alt="Noteship"
                width={24}
                height={24}
                className="rounded-md"
              />
              <p className="text-white font-bold text-xl tracking-tight">
                Noteship
              </p>
            </div>
            <p className="text-tertiary text-sm">{t("tagline")}</p>
          </div>

          {/* Links */}
          <nav
            className="flex items-center gap-6"
            aria-label="Footer navigation"
          >
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#444] hover:text-white text-sm transition-colors duration-150"
            >
              {t("twitter")}
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#444] hover:text-white text-sm transition-colors duration-150"
            >
              {t("github")}
            </a>
            <a
              href={`mailto:${t("email")}`}
              className="text-[#444] hover:text-white text-sm transition-colors duration-150"
            >
              {t("email")}
            </a>
          </nav>
        </div>

        <div className="border-t border-edge pt-8">
          <p className="text-tertiary text-xs">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
