"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import RewardCard from "@/components/campaigns/RewardCard";
import UpdateTimeline from "@/components/campaigns/UpdateTimeline";
import CommentSection from "@/components/campaigns/CommentSection";
import type { Campaign, Comment } from "@/types";

interface CampaignTabsProps {
  campaign: Campaign;
  comments: Comment[];
}

export default function CampaignTabs({ campaign, comments }: CampaignTabsProps) {
  const [activeTab, setActiveTab] = useState("story");
  const tabs = [
    { id: "story", label: "Story" },
    { id: "rewards", label: `Rewards (${campaign.rewards.length})` },
    { id: "updates", label: `Updates (${campaign.updates.length})` },
    { id: "comments", label: `Comments (${comments.length})` },
  ];

  return (
    <div className="mt-8">
      <div className="border-b border-slate-200 sticky top-[60px] md:top-[68px] bg-slate-50/95 backdrop-blur-md z-20">
        <nav className="-mb-px flex gap-6 overflow-x-auto hide-scrollbar" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                activeTab === tab.id
                  ? "border-brand-500 text-brand-600"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="py-8">
        {activeTab === "story" && (
          <div 
            className="prose-campaign overflow-hidden"
            dangerouslySetInnerHTML={{ __html: campaign.storyHtml }} 
          />
        )}

        {activeTab === "rewards" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campaign.rewards.map((reward) => (
              <RewardCard 
                key={reward.id} 
                reward={reward} 
                campaignSlug={campaign.slug} 
              />
            ))}
          </div>
        )}

        {activeTab === "updates" && (
          <UpdateTimeline updates={campaign.updates} />
        )}

        {activeTab === "comments" && (
          <CommentSection 
            comments={comments} 
            campaignCreatorId={campaign.creatorId} 
          />
        )}
      </div>
    </div>
  );
}
