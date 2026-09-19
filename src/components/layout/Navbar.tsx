"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Rocket, Search, Menu, LayoutDashboard, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import MobileNav from "./MobileNav";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { name: "Explore", href: "/explore" },
    { name: "How It Works", href: "/how-it-works" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5"
            : "bg-white/80 backdrop-blur-sm border-b border-slate-100 py-3.5"
        )}
      >
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Rocket className="h-5 w-5 fill-white/20" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl text-slate-900 tracking-tight leading-none">
                Fund<span className="text-brand-600">Karo</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-500 tracking-widest uppercase mt-0.5">
                India Innovates
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form 
            onSubmit={handleSearchSubmit}
            className="hidden lg:flex items-center relative flex-1 max-w-sm mx-4"
          >
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-0 bottom-0 my-auto pointer-events-none" />
            <input
              type="text"
              placeholder="Search projects, founders, and categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-slate-100 hover:bg-slate-200/70 focus:bg-white text-slate-800 placeholder-slate-400 border border-transparent focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all"
            />
          </form>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-semibold transition-colors hover:text-brand-600",
                  pathname === link.href ? "text-brand-600 font-bold" : "text-slate-600"
                )}
              >
                {link.name}
              </Link>
            ))}

            {/* Dashboards shortcut */}
            <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/60 text-xs">
              <Link
                href="/creator/dashboard"
                className={cn(
                  "px-3 py-1 rounded-full font-medium transition-all flex items-center gap-1",
                  pathname.includes("/creator")
                    ? "bg-white text-brand-600 shadow-xs font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Creator
              </Link>
              <Link
                href="/backer/dashboard"
                className={cn(
                  "px-3 py-1 rounded-full font-medium transition-all flex items-center gap-1",
                  pathname.includes("/backer")
                    ? "bg-white text-brand-600 shadow-xs font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                <UserCheck className="w-3.5 h-3.5" />
                Backer
              </Link>
            </div>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link 
              href="/auth/signin" 
              className="text-sm font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/start"
              className="btn-brand-primary text-sm px-5 py-2.5"
            >
              <Rocket className="w-4 h-4" />
              <span>Start a Campaign</span>
            </Link>
          </div>

          {/* Mobile Search & Menu Toggle */}
          <div className="flex items-center gap-1 md:hidden">
            <Link
              href="/explore"
              className="p-2 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Link>
            <button
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </>
  );
}

