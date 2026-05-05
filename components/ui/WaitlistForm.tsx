"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

type Status = "idle" | "loading" | "success" | "error";

export function WaitlistForm() {
  const t = useTranslations("waitlistForm");
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setStatus("error");
      setErrorMsg(t("errorInvalid"));
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });

      const data = (await res.json()) as { error?: string };

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        if (res.status === 409) {
          setErrorMsg(t("errorDuplicate"));
        } else {
          setErrorMsg(data.error ?? t("errorGeneric"));
        }
      }
    } catch {
      setStatus("error");
      setErrorMsg(t("errorGeneric"));
    }
  };

  if (status === "success") {
    return (
      <div className="animate-scale-in flex flex-col items-center gap-3 py-4">
        <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FF6B00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="text-white font-semibold text-base text-center">
          {t("success")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder={t("placeholder")}
          autoComplete="email"
          className="flex-1 bg-background border border-[#333] focus:border-accent text-white rounded-lg px-4 py-3 text-sm outline-none transition-colors duration-150 placeholder:text-tertiary"
          disabled={status === "loading"}
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-accent hover:bg-accent-light disabled:opacity-60 text-black font-semibold px-6 py-3 rounded-lg text-sm transition-colors duration-150 whitespace-nowrap cursor-pointer disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <span className="flex items-center gap-2">
              <span
                className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"
                aria-hidden="true"
              />
              <span>Loading…</span>
            </span>
          ) : (
            t("submit")
          )}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-xs text-red-400" role="alert">
          {errorMsg}
        </p>
      )}
    </form>
  );
}
