import Image from "next/image";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./ui/LanguageSwitcher";

export function Nav() {
  const t = useTranslations("nav");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-edge bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 flex items-center justify-between h-16 relative">
        <div className="flex items-center gap-2.5 select-none">
          <Image
            src="/noteship-logo.svg"
            alt="Noteship"
            width={30}
            height={28}
            unoptimized
          />
          <span className="hidden md:flex text-white font-bold text-xl tracking-tight">
            {t("brand")}
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
          <a
            href="#features"
            className="text-sm text-secondary hover:text-white transition-colors duration-150"
          >
            {t("features")}
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-secondary hover:text-white transition-colors duration-150"
          >
            {t("howItWorks")}
          </a>
          <a
            href="#pricing"
            className="text-sm text-secondary hover:text-white transition-colors duration-150"
          >
            {t("pricing")}
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <a
            href="#waitlist"
            className="bg-accent hover:bg-accent-light text-black font-semibold px-5 py-2 rounded-lg text-sm transition-colors duration-150"
          >
            {t("joinWaitlist")}
          </a>
        </div>
      </div>
    </header>
  );
}
