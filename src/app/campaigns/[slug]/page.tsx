import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Users, ShieldCheck, MapPin, Play, Building2, CheckCircle2, ArrowRight } from "lucide-react";
import { mockCampaigns, mockComments } from "@/data/mock-campaigns";
import FundingProgress from "@/components/campaigns/FundingProgress";
import CountdownTimer from "@/components/campaigns/CountdownTimer";
import ShareButtons from "@/components/campaigns/ShareButtons";
import StickyMobileCTA from "@/components/campaigns/StickyMobileCTA";
import CampaignTabs from "@/components/campaigns/CampaignTabs";
import { cn, getCategoryLabel } from "@/lib/utils";
import { PageTransition } from "@/components/PageTransition";

export default async function CampaignPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const campaign = mockCampaigns.find((c) => c.slug === slug);

  if (!campaign) {
    notFound();
  }

  // A very simple tab implementation for server components utilizing URL hash
  // In a real app we might use parallel routes or client side state for tabs,
  // but since we need a main Server Component, we'll render all sections and use CSS/JS to toggle or just scroll
  // Actually, instructions say: "Use client-side tab state management." 
  // But this file is a Server Component. We can create a Client Component wrapper for the Left Column tabs, 
  // or render them all and use a client component for navigation. Let's make a generic wrapper or just build a client component for the tabs.
  // Given instructions, I'll build a quick inline Client Component for the tabs, or better, since it's Next.js app router, I can't put "use client" on the whole page if it's supposed to be server component.
  // Wait, I can make a nested Client Component for the tabs content, passing the data as props.
  return (
    <PageTransition>
    <main className="min-h-screen bg-slate-50 pb-20 lg:pb-0">
      {/* Hero Section */}
      <section className="w-full bg-slate-900 text-white relative">
        <div className="max-w-[1400px] mx-auto w-full aspect-video md:aspect-[21/9] lg:aspect-[3/1] relative overflow-hidden bg-black flex items-center justify-center group cursor-pointer">
          <Image
            src={campaign.coverImage}
            alt={campaign.title}
            fill
            className="object-cover opacity-60 group-hover:opacity-50 transition-opacity duration-300"
            priority
          />
          {campaign.videoUrl && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-600/90 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-2" />
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
        
        {/* Left Column */}
        <div className="w-full lg:w-2/3 space-y-8">
          
          {/* Header Info */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-sm font-medium">
                {getCategoryLabel(campaign.category)}
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-500 text-sm">
                <MapPin className="w-4 h-4" />
                {campaign.location}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              {campaign.title}
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-6">
              {campaign.shortPitch}
            </p>

            {/* Creator Card */}
            <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl">
              <Image
                src={campaign.creator.avatar}
                alt={campaign.creator.name}
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">Created by</span>
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg text-slate-900">{campaign.creator.name}</h3>
                  {campaign.creator.isKycVerified && (
                    <span className="flex items-center text-blue-600" title="KYC Verified">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                  )}
                </div>
                {campaign.dpiitRecognized && (
                  <div className="flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded mt-1 w-fit border border-amber-200">
                    <Building2 className="w-3 h-3" />
                    DPIIT Recognized Startup
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Client-side Tabs Wrapper */}
          <CampaignTabs 
            campaign={campaign} 
            comments={mockComments} 
          />
        </div>

        {/* Right Column - Funding Sidebar */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-24 space-y-6">
            
            <div className="bg-white p-6 border border-slate-200 rounded-2xl shadow-sm space-y-6">
              <FundingProgress 
                raisedAmount={campaign.raisedAmount} 
                goalAmount={campaign.goalAmount} 
              />
              
              <div className="flex items-center gap-4 text-slate-700">
                <div className="bg-brand-50 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-brand-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">{campaign.backersCount}</div>
                  <div className="text-sm font-medium">backers</div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <CountdownTimer endsAt={campaign.endsAt} />
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className={cn(
                  "px-3 py-1 text-xs font-bold rounded uppercase tracking-wider",
                  campaign.fundingModel === "all_or_nothing" 
                    ? "bg-amber-100 text-amber-800" 
                    : "bg-green-100 text-green-800"
                )}>
                  {campaign.fundingModel === "all_or_nothing" ? "All or Nothing" : "Flexible"}
                </span>
                <span className="px-3 py-1 text-xs font-bold rounded uppercase tracking-wider bg-slate-100 text-slate-700">
                  {campaign.projectStage.replace("_", " ")}
                </span>
              </div>

              <div className="pt-2 space-y-3">
                <Link
                  href={`/campaigns/${campaign.slug}/pledge`}
                  className="btn-brand-primary w-full py-4 text-base"
                >
                  <span>Back This Project</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href={`/campaigns/${campaign.slug}/pledge?noReward=true`}
                  className="btn-brand-secondary w-full py-3 text-xs sm:text-sm text-slate-600 hover:text-slate-900"
                >
                  Pledge Without Reward
                </Link>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-center">
                <ShareButtons title={campaign.title} />
              </div>
            </div>

            {/* Trust Card */}
            {campaign.fundingModel === "all_or_nothing" && (
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">All-or-Nothing Guarantee</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    This project will only be funded if it reaches its goal by the deadline. Your pledge is kept in secure escrow and you will not be charged if the project fails to reach its goal.
                  </p>
                </div>
              </div>
            )}
            
          </div>
        </div>

      </div>

      <StickyMobileCTA 
        title={campaign.title}
        raisedAmount={campaign.raisedAmount}
        goalAmount={campaign.goalAmount}
        slug={campaign.slug}
      />
    </main>
    </PageTransition>
  );
}
