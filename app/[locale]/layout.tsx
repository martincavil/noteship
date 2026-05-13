import type { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Geist } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { routing } from "@/i18n/routing";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://noteship.app"),
  title: "Noteship — Your product updates, beautifully told.",
  description:
    "The simplest changelog tool for indie makers. Public changelog page, embeddable widget, automatic email notifications. Live in 5 minutes.",
  openGraph: {
    title: "Noteship — Your product updates, beautifully told.",
    description:
      "The simplest changelog tool for indie makers. Public changelog page, embeddable widget, automatic email notifications. Live in 5 minutes.",
    url: "https://noteship.app",
    siteName: "Noteship",
    type: "website",
    images: [
      {
        url: "/cover.png",
        width: 1200,
        height: 630,
        alt: "Noteship — Your product updates, beautifully told.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noteship — Your product updates, beautifully told.",
    description:
      "The simplest changelog tool for indie makers. Public changelog page, embeddable widget, automatic email notifications. Live in 5 minutes.",
    images: ["/cover.png"],
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${geistSans.variable} antialiased`} data-scroll-behavior="smooth">
      <body className="min-h-screen bg-background text-white" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
