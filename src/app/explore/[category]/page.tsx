"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { mockCampaigns, categories } from "@/data/mock-campaigns";
import CampaignGrid from "@/components/campaigns/CampaignGrid";
import { 
  ChevronRight, ArrowLeft, Folder,
  Cpu, Globe, Brain, Leaf, ShoppingBag, 
  UtensilsCrossed, Heart, GraduationCap, Gamepad2, Palette,
  LucideIcon
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Cpu, Globe, Brain, Leaf, ShoppingBag, 
  UtensilsCrossed, Heart, GraduationCap, Gamepad2, Palette
};

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = use(params);
  
  const categoryData = categories.find(c => c.id === categorySlug);
  
  const filteredCampaigns = useMemo(() => {
    return mockCampaigns.filter(c => c.category === categorySlug);
  }, [categorySlug]);

  if (!categoryData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Category Not Found</h1>
        <p className="text-slate-600 mb-8">The category you are looking for doesn&apos;t exist.</p>
        <Link 
          href="/explore"
          className="btn-brand-primary px-6 py-3 text-sm"
        >
          Explore All Projects
        </Link>
      </div>
    );
  }

  const IconComponent = iconMap[categoryData.icon] || Folder;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Category Header */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center text-sm font-medium text-slate-500">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/explore" className="hover:text-white transition-colors">Explore</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-brand-400">{categoryData.label}</span>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
              <IconComponent className="w-8 h-8 text-brand-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {categoryData.label}
            </h1>
          </div>
          
          <p className="text-lg text-slate-300 max-w-2xl mt-4">
            {categoryData.description}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Projects in {categoryData.label}
          </h2>
          <Link 
            href="/explore" 
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Categories
          </Link>
        </div>
        
        <CampaignGrid campaigns={filteredCampaigns} columns={3} />
      </div>
    </div>
  );
}
