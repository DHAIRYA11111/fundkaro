"use client";

import { motion } from "framer-motion";
import { Search, CreditCard, Gift } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    title: "Discover",
    description: "Browse innovative Indian startups across categories.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: CreditCard,
    title: "Back",
    description: "Pledge via UPI, Card, or Netbanking. Funds held in secure escrow.",
    color: "bg-brand-100 text-brand-600",
  },
  {
    icon: Gift,
    title: "Get Rewards",
    description: "Receive exclusive products, early access, and founder perks.",
    color: "bg-green-100 text-green-600",
  }
];

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto w-full mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-3">
            Simple & Transparent
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            How FundKaro Works
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            Empowering passionate founders and innovative backers across India in three seamless steps.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto w-full">
          {/* Connector Line on Desktop */}
          <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-slate-200 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 relative z-10">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50/70 border border-slate-100 hover:bg-slate-50 hover:shadow-sm transition-all"
                >
                  {/* Icon with anchored badge */}
                  <div className="relative mb-5">
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-md ${step.color} bg-white ring-4 ring-white`}>
                      <Icon size={32} strokeWidth={2} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center shadow-md text-xs ring-2 ring-white">
                      {index + 1}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed max-w-xs">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

