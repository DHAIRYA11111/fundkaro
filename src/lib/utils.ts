import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CampaignCategory } from "@/types";

/** Merge Tailwind CSS classes with conflict resolution */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as Indian Rupees: ₹18,45,000 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format a compact number: 1.2K, 3.4L, 1.2Cr */
export function formatCompact(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)}Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return `₹${amount}`;
}

/** Calculate time remaining from now until endDate */
export function getTimeRemaining(endDate: string) {
  const total = new Date(endDate).getTime() - Date.now();
  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }
  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
    isExpired: false,
  };
}

/** Calculate funding progress percentage */
export function getProgressPercentage(raised: number, goal: number): number {
  if (goal <= 0) return 0;
  return Math.min(Math.round((raised / goal) * 100), 100);
}

/** Get actual percentage (can exceed 100% for stretch goals) */
export function getActualPercentage(raised: number, goal: number): number {
  if (goal <= 0) return 0;
  return Math.round((raised / goal) * 100);
}

/** Category labels */
const categoryLabels: Record<CampaignCategory, string> = {
  hardware: "Hardware & IoT",
  saas: "SaaS & Apps",
  ai_ml: "AI & Machine Learning",
  green_energy: "Green Energy",
  consumer: "Consumer Products",
  food_beverage: "Food & Beverage",
  health: "Health & Wellness",
  education: "Education",
  gaming: "Gaming",
  art_design: "Art & Design",
};

export function getCategoryLabel(category: CampaignCategory): string {
  return categoryLabels[category] || category;
}

/** Category icon names (Lucide icon names) */
const categoryIcons: Record<CampaignCategory, string> = {
  hardware: "Cpu",
  saas: "Globe",
  ai_ml: "Brain",
  green_energy: "Leaf",
  consumer: "ShoppingBag",
  food_beverage: "UtensilsCrossed",
  health: "Heart",
  education: "GraduationCap",
  gaming: "Gamepad2",
  art_design: "Palette",
};

export function getCategoryIcon(category: CampaignCategory): string {
  return categoryIcons[category] || "Folder";
}

/** Category colors for badges */
const categoryColors: Record<CampaignCategory, string> = {
  hardware: "bg-blue-100 text-blue-700",
  saas: "bg-purple-100 text-purple-700",
  ai_ml: "bg-indigo-100 text-indigo-700",
  green_energy: "bg-green-100 text-green-700",
  consumer: "bg-brand-100 text-brand-700",
  food_beverage: "bg-red-100 text-red-700",
  health: "bg-pink-100 text-pink-700",
  education: "bg-yellow-100 text-yellow-700",
  gaming: "bg-cyan-100 text-cyan-700",
  art_design: "bg-rose-100 text-rose-700",
};

export function getCategoryColor(category: CampaignCategory): string {
  return categoryColors[category] || "bg-gray-100 text-gray-700";
}

/** Slugify a string */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
