import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCampaigns } from "@/components/home/FeaturedCampaigns";
import { TrendingCampaigns } from "@/components/home/TrendingCampaigns";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TrustBanner } from "@/components/home/TrustBanner";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { SuccessStories } from "@/components/home/SuccessStories";
import { PageTransition } from "@/components/PageTransition";

export default function HomePage() {
  // Force fast refresh: 1
  return (
    <PageTransition>
      <main className="min-h-screen">
        <HeroSection />
        <FeaturedCampaigns />
        <TrendingCampaigns />
        <HowItWorks />
        <TrustBanner />
        <CategoryGrid />
        <SuccessStories />
      </main>
    </PageTransition>
  );
}
