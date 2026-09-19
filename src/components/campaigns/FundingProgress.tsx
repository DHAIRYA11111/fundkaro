"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn, formatINR, getProgressPercentage } from "@/lib/utils";

interface FundingProgressProps {
  raisedAmount: number;
  goalAmount: number;
}

export default function FundingProgress({ raisedAmount, goalAmount }: FundingProgressProps) {
  const [displayedAmount, setDisplayedAmount] = useState(0);
  const rawProgress = (raisedAmount / goalAmount) * 100;
  const progressPercentage = getProgressPercentage(raisedAmount, goalAmount);
  const isOverfunded = rawProgress > 100;

  useEffect(() => {
    // Simple count up animation
    const duration = 1500; // 1.5 seconds
    const steps = 60;
    const stepTime = duration / steps;
    const stepAmount = raisedAmount / steps;
    
    let currentAmount = 0;
    const timer = setInterval(() => {
      currentAmount += stepAmount;
      if (currentAmount >= raisedAmount) {
        setDisplayedAmount(raisedAmount);
        clearInterval(timer);
      } else {
        setDisplayedAmount(currentAmount);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [raisedAmount]);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
          {formatINR(Math.round(displayedAmount))}
        </h2>
        <p className="text-slate-600 mt-1">
          pledged of <span className="font-medium text-slate-800">{formatINR(goalAmount)}</span> goal
        </p>
      </div>

      <div className="relative pt-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-brand-600">
            {Math.round(rawProgress)}%
          </span>
          {isOverfunded && (
            <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full animate-pulse">
              Stretch Goal Unlocked
            </span>
          )}
        </div>
        <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-slate-100">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={cn(
              "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full bg-gradient-to-r from-brand-400 to-brand-600",
              isOverfunded && "ring-2 ring-green-400 ring-offset-1 ring-offset-slate-50"
            )}
          />
        </div>
      </div>
    </div>
  );
}
