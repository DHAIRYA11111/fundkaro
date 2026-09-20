import Image from "next/image";
import Link from "next/link";
import { mockCampaigns } from "@/data/mock-campaigns";
import { Quote } from "lucide-react";
import { formatINR } from "@/lib/utils";

export function SuccessStories() {
  const stories = mockCampaigns
    .filter(c => c.status === 'funded' || c.raisedAmount > c.goalAmount)
    .slice(0, 2);

  if (stories.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Success Stories</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto w-full">See what Indian innovators achieved with the power of the community.</p>
        </div>

        <div className="flex overflow-x-auto gap-8 max-w-6xl mx-auto w-full pb-4 snap-x snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {stories.map(campaign => (
            <div key={campaign.id} className="min-w-[90vw] lg:min-w-[45vw] shrink-0 snap-start">
              <Link 
                href={`/campaigns/${campaign.slug}`} 
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group flex flex-col md:flex-row border border-slate-100 h-full"
              >
                <div className="relative h-64 md:h-auto md:w-2/5 overflow-hidden shrink-0">
                  <Image
                    src={campaign.coverImage}
                    alt={campaign.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-bold text-xl">{formatINR(campaign.raisedAmount)}</p>
                    <p className="text-white/80 text-sm font-medium">Successfully Raised</p>
                  </div>
                </div>
                
                <div className="p-8 md:w-3/5 flex flex-col justify-between">
                  <div>
                    <Quote className="text-brand-200 fill-brand-50 mb-4" size={40} />
                    <p className="text-slate-700 font-medium italic text-lg leading-relaxed mb-6 line-clamp-4">
                      &ldquo;Thanks to the amazing backers on ChandaDedo, we brought {campaign.title} to life faster than we ever imagined. The Indian startup ecosystem is incredible.&rdquo;
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-100">
                    <Image
                      src={campaign.creator.avatar}
                      alt={campaign.creator.name}
                      width={48}
                      height={48}
                      unoptimized
                      className="rounded-full border-2 border-slate-100 shrink-0"
                    />
                    <div>
                      <p className="font-bold text-slate-900">{campaign.creator.name}</p>
                      <p className="text-sm text-slate-500">Creator of {campaign.title}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
