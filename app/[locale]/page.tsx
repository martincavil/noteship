import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/landing/Hero";
import { Problem } from "@/components/landing/Problem";
import { Solution } from "@/components/landing/Solution";
import { CodeSnippet } from "@/components/landing/CodeSnippet";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { EarlyAccess } from "@/components/landing/EarlyAccess";
import { Footer } from "@/components/landing/Footer";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <CodeSnippet />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
        <EarlyAccess />
      </main>
      <Footer />
    </>
  );
}
