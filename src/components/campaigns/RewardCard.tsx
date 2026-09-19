import Link from "next/link";
import { Check } from "lucide-react";
import { cn, formatINR } from "@/lib/utils";
import { RewardTier } from "@/types";
import { format } from "date-fns";

interface RewardCardProps {
  reward: RewardTier;
  campaignSlug: string;
}

export default function RewardCard({ reward, campaignSlug }: RewardCardProps) {
  const available = reward.totalQuantity ? reward.totalQuantity - reward.claimedQuantity : null;
  const isSoldOut = reward.isLimited && available === 0;

  return (
    <div className={cn(
      "border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all duration-200 hover:shadow-md flex flex-col h-full",
      "border-l-4 border-l-brand-500",
      isSoldOut && "opacity-60 grayscale filter pointer-events-none border-l-slate-400"
    )}>
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-slate-900 mb-1">
            Pledge {formatINR(reward.pledgeAmount)}
          </h3>
          <h4 className="text-lg font-semibold text-slate-800">{reward.title}</h4>
        </div>

        <p className="text-slate-600 mb-6 flex-grow whitespace-pre-wrap">
          {reward.description}
        </p>

        <div className="bg-slate-50 p-4 rounded-lg mb-6">
          <p className="text-sm font-medium text-slate-900 mb-2">INCLUDES:</p>
          <ul className="space-y-2">
            {reward.itemsIncluded.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                <Check className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto space-y-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-slate-500 font-medium">ESTIMATED DELIVERY</span>
            <span className="text-slate-900">{format(new Date(reward.estimatedDelivery), "MMM yyyy")}</span>
          </div>

          {reward.isLimited && reward.totalQuantity && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className={cn(
                  "font-medium",
                  available && available < 10 ? "text-red-600" : "text-slate-600"
                )}>
                  {available === 0 ? "Sold Out" : `Limited: ${available} left`}
                </span>
                <span className="text-slate-500">
                  {reward.claimedQuantity} of {reward.totalQuantity} claimed
                </span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    available && available < 10 ? "bg-red-500" : "bg-brand-400"
                  )}
                  style={{ width: `${(reward.claimedQuantity / reward.totalQuantity) * 100}%` }}
                />
              </div>
            </div>
          )}

          <Link 
            href={`/campaigns/${campaignSlug}/pledge?rewardId=${reward.id}`}
            className={cn(
              "w-full py-3 px-5 rounded-xl text-center font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2",
              isSoldOut 
                ? "bg-slate-100 text-slate-500 border border-slate-200 cursor-not-allowed" 
                : "bg-brand-50 hover:bg-brand-600 text-brand-600 hover:text-white border border-brand-200 hover:border-transparent shadow-xs hover:shadow-md hover:shadow-brand-500/20 active:scale-[0.98]"
            )}
          >
            {isSoldOut ? "Sold Out" : "Select This Reward →"}
          </Link>
        </div>
      </div>
    </div>
  );
}
