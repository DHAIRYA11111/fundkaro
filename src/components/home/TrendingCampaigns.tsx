"use client";

import { useState } from "react";
import { trendingCampaigns } from "@/data/mock-campaigns";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/FadeIn";

const TABS = ["All", "Tech", "AI", "Green", "Consumer", "SaaS"];

export function TrendingCampaigns() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredCampaigns = activeTab === "All"
    ? trendingCampaigns
    : trendingCampaigns.filter(c => {
        const tabLower = activeTab.toLowerCase();
        if (tabLower === 'tech') return c.category === 'hardware';
        if (tabLower === 'ai') return c.category === 'ai_ml';
        if (tabLower === 'green') return c.category === 'green_energy';
        if (tabLower === 'consumer') return c.category === 'consumer';
        if (tabLower === 'saas') return c.category === 'saas';
        return true;
      });

  const displayCampaigns = (filteredCampaigns.length > 0 ? filteredCampaigns : trendingCampaigns).slice(0, 6);

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <FadeIn className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col mb-10 gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 flex items-center gap-3">
            Trending Now <Flame className="text-brand-500 fill-brand-500" size={28} />
          </h2>
          
          <div className="flex flex-wrap gap-2">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-5 py-2 rounded-full font-medium transition-colors text-sm",
                  activeTab === tab
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCampaigns.map((campaign, index) => (
            <FadeIn key={campaign.id} delay={index * 0.1} className="h-full">
              <CampaignCard campaign={campaign} />
            </FadeIn>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
