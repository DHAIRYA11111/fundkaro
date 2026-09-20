"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ChandaDedoLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "icon" | "stacked";
  theme?: "light" | "dark";
  href?: string;
}

export function ChandaDedoIconMark({
  className,
  size = 38,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      style={{ width: size, height: size }}
      className={cn(
        "relative rounded-2xl p-[1.5px] bg-gradient-to-br from-orange-500 via-amber-400 to-rose-600 shadow-lg shadow-orange-500/25 shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1",
        className
      )}
    >
      {/* Inner background with subtle dark mesh */}
      <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-slate-900 via-slate-950 to-neutral-900 flex items-center justify-center relative overflow-hidden">
        {/* Glow orb in corner */}
        <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-orange-400/40 blur-md pointer-events-none" />
        <div className="absolute -bottom-3 -left-3 w-7 h-7 rounded-full bg-amber-400/30 blur-md pointer-events-none" />

        {/* Custom Bespoke ChandaDedo Geometric SVG Glyph */}
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[72%] h-[72%] relative z-10 drop-shadow-[0_2px_8px_rgba(249,115,22,0.5)]"
        >
          <defs>
            <linearGradient id="cd-primary-grad" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FB923C" />
              <stop offset="50%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
            <linearGradient id="cd-accent-grad" x1="16" y1="4" x2="16" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="cd-glow" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Ascending Rupee / Spark Origami Wings */}
          {/* Left Wing - Dynamic stylized C wing */}
          <path
            d="M8 22C6.5 19 6.5 13 11 8.5C14.5 5 20.5 4.5 24 7L20.5 10.5C18.5 9 15 9.5 13 11.5C10.5 14 10.5 18 11.8 20.2L8 22Z"
            fill="url(#cd-primary-grad)"
          />

          {/* Right Ascending Wing - Launch Vector */}
          <path
            d="M24 10C25.5 13 25.5 19 21 23.5C17.5 27 11.5 27.5 8 25L11.5 21.5C13.5 23 17 22.5 19 20.5C21.5 18 21.5 14 20.2 11.8L24 10Z"
            fill="url(#cd-accent-grad)"
          />

          {/* Central Ascending Diamond Spark (Represents the Funding Catalyst) */}
          <path
            d="M16 8L18.2 13.8L24 16L18.2 18.2L16 24L13.8 18.2L8 16L13.8 13.8L16 8Z"
            fill="#FFFFFF"
            className="animate-pulse"
          />

          {/* Core Gold Micro-Spark */}
          <circle cx="16" cy="16" r="2" fill="url(#cd-accent-grad)" />
        </svg>
      </div>
    </div>
  );
}

export default function ChandaDedoLogo({
  className,
  size = "md",
  variant = "full",
  theme = "light",
  href = "/",
}: ChandaDedoLogoProps) {
  const isDark = theme === "dark";

  const sizeConfigs = {
    sm: {
      iconSize: 30,
      textSize: "text-lg",
      badgeSize: "text-[9px]",
      subGap: "gap-1.5",
    },
    md: {
      iconSize: 38,
      textSize: "text-xl",
      badgeSize: "text-[10px]",
      subGap: "gap-2",
    },
    lg: {
      iconSize: 46,
      textSize: "text-2xl",
      badgeSize: "text-[11px]",
      subGap: "gap-2.5",
    },
    xl: {
      iconSize: 56,
      textSize: "text-3xl",
      badgeSize: "text-xs",
      subGap: "gap-3",
    },
  };

  const current = sizeConfigs[size];

  const content = (
    <div
      className={cn(
        "flex items-center group cursor-pointer select-none",
        current.subGap,
        className
      )}
    >
      {/* Bespoke Icon Mark */}
      <ChandaDedoIconMark size={current.iconSize} />

      {/* Typography & Subtitle */}
      {variant !== "icon" && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5 leading-none">
            <span
              className={cn(
                "font-black tracking-tight flex items-baseline font-sans",
                current.textSize,
                isDark ? "text-white" : "text-slate-900"
              )}
            >
              Chanda
              <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-rose-600 bg-clip-text text-transparent font-extrabold ml-[1px]">
                Dedo
              </span>
            </span>

            {/* Micro Sparkle Indicator */}
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-ping ml-0.5" />
          </div>

          {/* Subline Branding */}
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className={cn(
                "font-bold uppercase tracking-[0.22em]",
                current.badgeSize,
                isDark ? "text-slate-400" : "text-slate-500"
              )}
            >
              Venture Crowdfund
            </span>
            <span className="text-[10px] text-orange-500/80 font-mono">🇮🇳</span>
          </div>
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
