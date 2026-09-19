import Image from "next/image";
import Link from "next/link";
import { Campaign } from "@/types";
import { formatINR, getProgressPercentage, getCategoryLabel, getTimeRemaining, cn } from "@/lib/utils";
import { MapPin, Sparkles } from "lucide-react";

interface CampaignCardProps {
  campaign: Campaign;
  className?: string;
}

export function CampaignCard({ campaign, className }: CampaignCardProps) {
  const progress = getProgressPercentage(campaign.raisedAmount, campaign.goalAmount);
  const { days: daysLeft, isExpired } = getTimeRemaining(campaign.endsAt);
  
  return (
    <Link 
      href={`/campaigns/${campaign.slug}`}
      className={cn(
        "group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-brand-300 shadow-xs hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300 hover:-translate-y-1.5 h-full",
        className
      )}
    >
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        <Image
          src={campaign.coverImage}
          alt={campaign.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
        
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
          <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-800 text-[11px] font-bold uppercase tracking-wider shadow-xs border border-white/50 whitespace-nowrap">
            {getCategoryLabel(campaign.category)}
          </span>
          
          {campaign.isStaffPick && (
            <span className="px-2.5 py-1 rounded-full bg-brand-600/95 backdrop-blur-md text-white text-[11px] font-bold shadow-sm flex items-center gap-1">
              <Sparkles size={12} className="fill-white" />
              Staff Pick
            </span>
          )}
        </div>
        
        {campaign.dpiitRecognized && (
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold tracking-wider border border-white/20">
            DPIIT RECOGNIZED
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        {/* Creator Info */}
        <div className="flex items-center gap-2 mb-3">
          <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 border border-slate-200">
            <Image 
              src={campaign.creator.avatar}
              alt={campaign.creator.name}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          <span className="text-xs font-semibold text-slate-700 truncate min-w-0">{campaign.creator.name}</span>
          <span className="text-slate-500 text-xs shrink-0">•</span>
          <span className="text-xs text-slate-500 flex items-center gap-1 truncate min-w-0">
            <MapPin size={11} className="text-slate-500 shrink-0" /> {campaign.location}
          </span>
        </div>
        
        <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2 leading-snug group-hover:text-brand-600 transition-colors">
          {campaign.title}
        </h3>
        
        <p className="text-slate-500 text-sm line-clamp-2 mb-6 leading-relaxed flex-grow">
          {campaign.shortPitch}
        </p>
        
        {/* Progress Bar & Stats */}
        <div className="mt-auto space-y-3 pt-3 border-t border-slate-100">
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-1000 ease-out",
                progress >= 100 
                  ? "bg-gradient-to-r from-green-500 to-emerald-500" 
                  : "bg-gradient-to-r from-brand-500 to-amber-500"
              )}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          
          <div className="flex justify-between items-end">
            <div>
              <p className="font-extrabold text-base text-slate-900 leading-none mb-1">
                {formatINR(campaign.raisedAmount)}
              </p>
              <p className="text-xs text-slate-500 font-medium">
                pledged of {formatINR(campaign.goalAmount)}
              </p>
            </div>
            
            <div className="text-right">
              <p className={cn(
                "font-extrabold text-base leading-none mb-1",
                progress >= 100 ? "text-green-600" : "text-slate-900"
              )}>
                {progress}%
              </p>
              <p className="text-xs text-slate-500 font-medium">
                {isExpired ? "Ended" : `${daysLeft} days left`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

