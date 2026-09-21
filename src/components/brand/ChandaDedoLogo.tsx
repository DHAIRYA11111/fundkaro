"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ChandaDedoLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "icon";
  theme?: "light" | "dark";
  href?: string;
}

/**
 * World-class bespoke icon mark for ChandaDedo.
 * Clean, iconic, modern geometric silhouette:
 * An interlocking ascending community loop & launch spark in crisp white
 * against a radiant saffron squircle. Scalable from 16px to 512px.
 */
export function ChandaDedoIconMark({
  className,
  size = 36,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      style={{ width: size, height: size }}
      className={cn(
        "relative rounded-xl overflow-hidden shadow-sm shrink-0 transition-all duration-200 group-hover:scale-105 group-hover:shadow-md group-hover:shadow-orange-500/20",
        className
      )}
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Vibrant, warm Indian saffron gradient */}
          <linearGradient id="cd-bg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF5500" />
            <stop offset="100%" stopColor="#FF7A00" />
          </linearGradient>

          {/* Subtle inner highlight */}
          <linearGradient id="cd-highlight" x1="0" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Base Squircle */}
        <rect width="40" height="40" rx="11" fill="url(#cd-bg)" />
        <rect width="40" height="40" rx="11" fill="url(#cd-highlight)" />

        {/* Clean, iconic white vector mark:
            - Left sweeping curve (The "C" of Chanda / Giving hand)
            - Right ascending wing (The "D" of Dedo / Growth rocket)
            - Central 4-point catalyst spark
        */}
        <g transform="translate(1, 1)">
          {/* Left arc (C-curve) */}
          <path
            d="M10 20C10 14.477 14.477 10 20 10C22.4 10 24.58 10.85 26.28 12.27L23.4 15.15C22.45 14.43 21.28 14 20 14C16.686 14 14 16.686 14 20C14 23.314 16.686 26 20 26C21.28 26 22.45 25.57 23.4 24.85L26.28 27.73C24.58 29.15 22.4 30 20 30C14.477 30 10 25.523 10 20Z"
            fill="#FFFFFF"
            fillOpacity="0.95"
          />

          {/* Ascending Catalyst Spark (Upper Right - Represents funding & growth) */}
          <path
            d="M26.5 7L28 11.5L32.5 13L28 14.5L26.5 19L25 14.5L20.5 13L25 11.5L26.5 7Z"
            fill="#FFFFFF"
          />

          {/* Center core seed / spark */}
          <circle cx="20" cy="20" r="2.5" fill="#FFFFFF" fillOpacity="0.9" />
        </g>
      </svg>
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
      iconSize: 28,
      textSize: "text-lg",
      gap: "gap-2",
    },
    md: {
      iconSize: 34,
      textSize: "text-xl",
      gap: "gap-2.5",
    },
    lg: {
      iconSize: 42,
      textSize: "text-2xl",
      gap: "gap-3",
    },
    xl: {
      iconSize: 52,
      textSize: "text-3xl",
      gap: "gap-3.5",
    },
  };

  const current = sizeConfigs[size];

  const content = (
    <div
      className={cn(
        "inline-flex items-center group select-none tracking-tight",
        current.gap,
        className
      )}
    >
      {/* Crisp Icon Mark */}
      <ChandaDedoIconMark size={current.iconSize} />

      {/* Typography: Clean, confident, zero gimmicks or green dots */}
      {variant !== "icon" && (
        <div className="flex items-baseline font-sans font-extrabold leading-none">
          <span
            className={cn(
              "tracking-tight",
              current.textSize,
              isDark ? "text-white" : "text-slate-900"
            )}
          >
            Chanda
          </span>
          <span
            className={cn(
              "font-black ml-0.5 tracking-tight",
              current.textSize,
              "text-orange-600"
            )}
          >
            Dedo
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center">
        {content}
      </Link>
    );
  }

  return content;
}
