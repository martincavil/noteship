import { setRequestLocale } from "next-intl/server";
import { createClient } from "@supabase/supabase-js";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/landing/Hero";
import { StatsBar } from "@/components/landing/StatsBar";
import { Problem } from "@/components/landing/Problem";
import { Solution } from "@/components/landing/Solution";
import { CodeSnippet } from "@/components/landing/CodeSnippet";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FounderStory } from "@/components/landing/FounderStory";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { EarlyAccess } from "@/components/landing/EarlyAccess";
import { Footer } from "@/components/landing/Footer";

export const revalidate = 60;

const TOTAL_SPOTS = 10;

async function getWaitlistCount(): Promise<number> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return 0;
  try {
    const supabase = createClient(url, key);
    const { count } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });
    return count ?? 0;
  } catch {
    return 0;
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const taken = await getWaitlistCount();
  const spotsLeft = Math.max(0, TOTAL_SPOTS - taken);

  return (
    <>
      <Nav />
      <main>
        <Hero spotsLeft={spotsLeft} />
        <StatsBar />
        <Problem />
        <Solution />
        <CodeSnippet />
        <HowItWorks />
        <FounderStory />
        <Pricing />
        <FAQ />
        <EarlyAccess spotsLeft={spotsLeft} />
      </main>
      <Footer />
    </>
  );
}
