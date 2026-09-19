import { format } from "date-fns";
import { Lock } from "lucide-react";
import { CampaignUpdate } from "@/types";

interface UpdateTimelineProps {
  updates: CampaignUpdate[];
}

export default function UpdateTimeline({ updates }: UpdateTimelineProps) {
  if (!updates || updates.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
        <h3 className="text-lg font-medium text-slate-900 mb-2">No updates yet</h3>
        <p className="text-slate-500">The creator hasn&apos;t posted any updates for this campaign.</p>
      </div>
    );
  }

  // Sort updates newest first
  const sortedUpdates = [...updates].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="relative border-l-2 border-slate-200 ml-4 pl-8 space-y-12 py-4">
      {sortedUpdates.map((update) => (
        <div key={update.id} className="relative">
          {/* Timeline Dot */}
          <div className="absolute -left-[41px] top-1 w-5 h-5 bg-white border-4 border-brand-500 rounded-full" />
          
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <time className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {format(new Date(update.publishedAt), "MMMM d, yyyy")}
              </time>
              {update.isBackerOnly && (
                <span className="flex items-center gap-1.5 text-xs font-semibold bg-amber-100 text-amber-800 px-2 py-1 rounded">
                  <Lock className="w-3 h-3" />
                  Backer Only
                </span>
              )}
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-3">{update.title}</h3>
            
            <div className="prose prose-slate max-w-none text-slate-600">
              {update.isBackerOnly ? (
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-center space-y-2">
                  <Lock className="w-8 h-8 text-slate-500 mx-auto w-full" />
                  <p className="font-medium text-slate-700">This update is for backers only.</p>
                  <p className="text-sm">Pledge to this campaign to read this and other exclusive updates.</p>
                </div>
              ) : (
                <p className="whitespace-pre-wrap">{update.content}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
