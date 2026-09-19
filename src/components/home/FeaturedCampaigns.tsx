import { Sparkles } from "lucide-react";
import { featuredCampaigns } from "@/data/mock-campaigns";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";

export function FeaturedCampaigns() {
  if (!featuredCampaigns || featuredCampaigns.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <FadeIn className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 flex items-center gap-3">
              Staff Picks <Sparkles className="text-brand-500" size={28} />
            </h2>
            <p className="text-slate-600 text-lg">Hand-picked innovations we absolutely love.</p>
          </div>
          <Link href="/explore?filter=staff-picks" className="text-brand-600 font-semibold hover:text-brand-700 flex items-center gap-1 group">
            View all picks <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCampaigns.slice(0, 3).map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
