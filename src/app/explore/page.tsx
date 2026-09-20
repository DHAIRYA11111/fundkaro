"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { mockCampaigns, categories } from "@/data/mock-campaigns";
import CampaignGrid from "@/components/campaigns/CampaignGrid";
import { cn } from "@/lib/utils";
import { CampaignCategory } from "@/types";
import { ChevronDown, Filter, Search, X, Sparkles } from "lucide-react";

type SortOption = "trending" | "newest" | "most_funded" | "ending_soon";

function ExploreContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = (searchParams.get("category") as CampaignCategory) || "all";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<CampaignCategory | "all">(initialCategory);
  const [sortBy, setSortBy] = useState<SortOption>("trending");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [dbCampaigns, setDbCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    if (sortBy) params.set("sort", sortBy);

    setLoading(true);
    fetch(`/api/campaigns?${params.toString()}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.campaigns && data.campaigns.length > 0) {
          const mapped = data.campaigns.map((c: any) => ({
            id: c.id,
            slug: c.slug,
            title: c.title,
            shortPitch: c.tagline || c.description,
            category: c.category,
            stage: c.stage,
            fundingModel: c.fundingModel,
            goalAmount: c.goalAmount,
            raisedAmount: c.raisedAmount,
            backersCount: c.backerCount || 0,
            daysLeft: Math.max(0, Math.ceil((new Date(c.endsAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24))),
            coverImage: c.coverImage,
            location: c.location,
            dpiitRecognized: c.dpiitRecognized,
            isStaffPick: c.isStaffPick,
            creator: {
              name: c.creator?.name || "Founder",
              avatar: c.creator?.avatar || "https://api.dicebear.com/7.x/initials/svg?seed=Founder",
              isKycVerified: c.creator?.isKycVerified ?? true,
            },
          }));
          setDbCampaigns(mapped);
        } else {
          setDbCampaigns([]);
        }
      })
      .catch(() => setDbCampaigns([]))
      .finally(() => setLoading(false));
  }, [searchQuery, selectedCategory, sortBy]);

  const filteredCampaigns = useMemo(() => {
    let result = mockCampaigns;

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(c => 
        c.title.toLowerCase().includes(q) ||
        c.shortPitch.toLowerCase().includes(q) ||
        c.creator.name.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter(c => c.category === selectedCategory);
    }
    
    // Sort logic
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime();
        case "most_funded":
          return b.raisedAmount - a.raisedAmount;
        case "ending_soon":
          return new Date(a.endsAt).getTime() - new Date(b.endsAt).getTime();
        case "trending":
        default:
          return b.backersCount - a.backersCount;
      }
    });
    
    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  const displayCampaigns = useMemo(() => {
    if (dbCampaigns.length > 0) {
      if (searchQuery.trim()) return dbCampaigns;
      const seen = new Set(dbCampaigns.map((c) => c.slug));
      const remainingMock = filteredCampaigns.filter((m) => !seen.has(m.slug));
      return [...dbCampaigns, ...remainingMock];
    }
    return filteredCampaigns;
  }, [dbCampaigns, filteredCampaigns, searchQuery]);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "trending", label: "Most Popular / Trending" },
    { value: "newest", label: "Recently Launched" },
    { value: "most_funded", label: "Highest Funded" },
    { value: "ending_soon", label: "Ending Soonest" },
  ];

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("trending");
    router.replace("/explore");
  };

  return (
    <div className="container max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      
      {/* Title & Search Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto w-full">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Discover Innovation
        </span>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Explore Indian Projects
        </h1>
        
        <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-xl mx-auto w-full">
          Discover vetted startups and directly fund game-changing ideas from Indian founders.
        </p>

        {/* Live Search Bar */}
        <div className="relative max-w-xl mx-auto w-full">
          <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by startup name, idea, or city (e.g. Solar, AI, Bengaluru)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 rounded-full border border-slate-200 bg-white text-slate-900 placeholder-slate-400 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10 transition-all text-sm sm:text-base"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filters and Sort Row */}
      <div className="flex flex-col gap-6 mb-10">
        {/* Category Pills */}
        <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            <button
              onClick={() => setSelectedCategory("all")}
              className={cn(
                "px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shadow-2xs",
                selectedCategory === "all"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100/90 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
              )}
            >
              All Projects ({mockCampaigns.length})
            </button>
            {categories.map((cat) => {
              const count = mockCampaigns.filter(c => c.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as CampaignCategory)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shadow-2xs flex items-center gap-1.5",
                    selectedCategory === cat.id
                      ? "bg-brand-600 text-white shadow-xs"
                      : "bg-slate-100/90 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                  )}
                >
                  <span>{cat.label}</span>
                  <span className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-full",
                    selectedCategory === cat.id ? "bg-brand-700/60 text-white" : "bg-slate-200 text-slate-600"
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sort & Results Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
          <div className="text-slate-600 text-sm font-medium">
            Showing <span className="font-bold text-slate-900">{displayCampaigns.length}</span> {displayCampaigns.length === 1 ? "project" : "projects"}
            {(selectedCategory !== "all" || searchQuery) && (
              <button 
                onClick={resetFilters}
                className="ml-3 text-brand-600 hover:text-brand-700 font-semibold underline text-xs"
              >
                Clear filters
              </button>
            )}
          </div>
          
          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-full text-slate-700 hover:bg-slate-50 transition-colors bg-white font-medium text-xs sm:text-sm w-full sm:w-auto justify-between sm:justify-start shadow-2xs"
            >
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span>Sort: {sortOptions.find(o => o.value === sortBy)?.label}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 ml-1" />
            </button>
            
            {isSortOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-60 bg-white border border-slate-200 rounded-2xl shadow-xl z-20 py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-4 py-2.5 text-xs sm:text-sm transition-colors",
                        sortBy === option.value
                          ? "bg-brand-50 text-brand-600 font-bold"
                          : "text-slate-700 hover:bg-slate-50"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Campaign Grid */}
      {displayCampaigns.length > 0 ? (
        <CampaignGrid campaigns={displayCampaigns as any} columns={3} />
      ) : (
        <div className="text-center py-16 px-4 bg-slate-50 rounded-3xl border border-slate-200/80 max-w-lg mx-auto w-full">
          <Search className="w-12 h-12 text-slate-300 mx-auto w-full mb-4" />
          <h3 className="text-lg font-bold text-slate-900 mb-1">No matching projects found</h3>
          <p className="text-slate-500 text-sm mb-6">
            Try adjusting your search terms or selecting a different category.
          </p>
          <button
            onClick={resetFilters}
            className="btn-brand-secondary text-sm px-5 py-2.5"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<div className="py-20 text-center text-slate-500">Loading projects...</div>}>
        <ExploreContent />
      </Suspense>
    </div>
  );
}

