"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProgressPercentage } from "@/lib/utils";

interface StickyMobileCTAProps {
  title: string;
  raisedAmount: number;
  goalAmount: number;
  slug: string;
}

export default function StickyMobileCTA({ title, raisedAmount, goalAmount, slug }: StickyMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const progress = getProgressPercentage(raisedAmount, goalAmount);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past roughly the hero section (300px)
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 z-40 lg:hidden animate-in slide-in-from-bottom-full duration-300">
      <div className="flex items-center justify-between gap-4 max-w-md mx-auto w-full">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900 truncate mb-1">{title}</p>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-medium text-slate-600">{Math.round(progress)}% funded</span>
          </div>
        </div>
        <Link
          href={`/campaigns/${slug}/pledge`}
          className="btn-brand-primary shrink-0 px-5 py-2.5 text-sm"
        >
          Back Project
        </Link>
      </div>
    </div>
  );
}
