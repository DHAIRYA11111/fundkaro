"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Rocket, Search, Menu, LayoutDashboard, UserCheck, ChevronDown, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import MobileNav from "./MobileNav";
import ChandaDedoLogo from "@/components/brand/ChandaDedoLogo";

interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string | null;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState<SessionUser | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch session on load and route changes
  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) setCurrentUser(data.user);
        else setCurrentUser(null);
      })
      .catch(() => setCurrentUser(null));
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/session", { method: "DELETE" });
      setCurrentUser(null);
      setIsUserMenuOpen(false);
      router.push("/");
      router.refresh();
    } catch (e) {
      console.error("Sign out error:", e);
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
          
          {/* ChandaDedo Bespoke Brand Logo */}
          <ChandaDedoLogo size="md" />

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

          {/* Action CTAs / Live User Menu */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-slate-100 border border-slate-200/80 transition-all"
                >
                  <img
                    src={currentUser.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentUser.name)}`}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full bg-brand-100 object-cover border border-brand-200"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[100px]">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] text-brand-600 font-semibold uppercase">
                      {currentUser.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/creator/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-600 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-slate-400" />
                        Creator Studio
                      </Link>
                      <Link
                        href="/backer/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-600 transition-colors"
                      >
                        <UserCheck className="w-4 h-4 text-slate-400" />
                        Backer Dashboard
                      </Link>
                      <Link
                        href="/start"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-600 transition-colors"
                      >
                        <Rocket className="w-4 h-4 text-slate-400" />
                        Start a Campaign
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 pt-1 mt-1">
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex items-center gap-2.5 w-full px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link 
                  href="/auth/signin" 
                  className="text-sm font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-full hover:bg-slate-100 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/start"
                  className="btn-brand-primary text-sm px-5 py-2.5 shadow-sm"
                >
                  <Rocket className="w-4 h-4" />
                  <span>Start a Campaign</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            onClick={() => setIsMobileNavOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  );
}
