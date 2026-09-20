"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

const Counter = ({ end, suffix = "", duration = 2 }: { end: number, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [end, duration, isInView]);

  // Handle formatting based on if it's a decimal (like 12.3) or integer (like 847)
  const displayCount = count % 1 !== 0 
    ? count.toFixed(1) 
    : Math.floor(count).toLocaleString('en-IN');

  return (
    <span ref={ref} className="font-bold text-3xl md:text-4xl text-slate-900 tabular-nums">
      {displayCount}{suffix}
    </span>
  );
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-white pt-32 pb-12 md:pt-40 md:pb-20">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[15%] -left-[10%] w-[55%] h-[55%] rounded-full bg-brand-200/30 blur-3xl" />
        <div className="absolute top-[10%] -right-[15%] w-[45%] h-[45%] rounded-full bg-amber-200/20 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center space-y-8">
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100/80 border border-brand-200/70 text-brand-800 font-semibold text-xs md:text-sm mb-6 shadow-xs">
              <Rocket size={15} className="text-brand-600" />
              <span>ChandaDedo — India&apos;s Startup Crowdfunding Platform</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
              Fund the Next Big <br className="hidden md:block" />
              <span className="text-brand-600">Indian Innovation</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto w-full leading-relaxed"
          >
            Join visionary backers supporting homegrown technology, AI, hardware, and consumer startups with RBI-compliant escrow security.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Link
              href="/explore"
              className="btn-brand-primary w-full sm:w-auto px-6 py-3.5 text-base"
            >
              <span>Explore Projects</span>
              <ArrowRight size={18} />
            </Link>
            
            <Link
              href="/start"
              className="btn-brand-secondary w-full sm:w-auto px-6 py-3.5 text-base"
            >
              Start Your Campaign
            </Link>
          </motion.div>

          {/* Quick Trust Pillars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-500 font-medium pt-2"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              100% Escrow Protected
            </span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-500 inline-block" />
              Instant UPI Pledging
            </span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
              DPIIT Startup Verification
            </span>
          </motion.div>

          {/* Metric Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pt-10 mt-6 w-full"
          >
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center w-full">
              <div className="flex items-center justify-center mb-2">
                <span className="font-bold text-3xl md:text-4xl text-slate-900">₹</span>
                <Counter end={12.3} suffix="Cr+" />
              </div>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider text-center">Total Raised</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center w-full">
              <div className="flex items-center justify-center mb-2">
                <Counter end={847} suffix="+" />
              </div>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider text-center">Campaigns Funded</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center w-full">
              <div className="flex items-center justify-center mb-2">
                <Counter end={52300} suffix="+" />
              </div>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider text-center">Active Backers</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
