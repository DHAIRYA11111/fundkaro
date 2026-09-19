import { Campaign } from "@/types";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { cn } from "@/lib/utils";

interface CampaignGridProps {
  campaigns: Campaign[];
  columns?: 2 | 3;
}

export default function CampaignGrid({ campaigns, columns = 3 }: CampaignGridProps) {
  if (!campaigns || campaigns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center border rounded-xl bg-slate-50/50">
        <div className="w-24 h-24 mb-6 text-slate-300">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">No campaigns found</h3>
        <p className="text-slate-500 max-w-md">
          We couldn&apos;t find any campaigns matching your criteria. Try adjusting your filters or check back later for new projects.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-6",
        "grid-cols-1 md:grid-cols-2",
        columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
      )}
    >
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
}
