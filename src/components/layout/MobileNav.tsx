"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, Rocket, Compass, HelpCircle, PlusCircle, LayoutDashboard, UserCheck, LogIn, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Explore Projects", href: "/explore", icon: Compass },
    { name: "How It Works", href: "/how-it-works", icon: HelpCircle },
    { name: "Start a Campaign", href: "/start", icon: PlusCircle },
  ];

  const dashboardLinks = [
    { name: "Creator Dashboard", href: "/creator/dashboard", icon: LayoutDashboard },
    { name: "Backer Dashboard", href: "/backer/dashboard", icon: UserCheck },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-[60]"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <Link href="/" className="flex items-center gap-2.5" onClick={onClose}>
                <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                  <Rocket className="h-4 w-4" />
                </div>
                <span className="font-bold text-lg text-slate-900">ChandaDedo</span>
              </Link>
              <button
                onClick={onClose}
                className="p-2 text-slate-500 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 overflow-y-auto py-4 px-5 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-3">Navigation</span>
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-600 transition-colors"
                      onClick={onClose}
                    >
                      <Icon className="w-5 h-5 text-slate-500" />
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              <div className="flex flex-col gap-1 pt-4 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-3">Portals</span>
                {dashboardLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-600 transition-colors"
                      onClick={onClose}
                    >
                      <Icon className="w-5 h-5 text-slate-500" />
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Auth CTAs */}
            <div className="p-5 border-t border-slate-100 flex flex-col gap-3 bg-slate-50/50">
              <Link
                href="/auth/signin"
                className="w-full py-3 text-center text-slate-700 font-semibold rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-xs flex items-center justify-center gap-2 text-sm"
                onClick={onClose}
              >
                <LogIn className="w-4 h-4 text-slate-500" />
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="btn-brand-primary w-full py-3 text-sm flex items-center justify-center gap-2"
                onClick={onClose}
              >
                <UserPlus className="w-4 h-4" />
                Create Free Account
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

