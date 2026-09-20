"use client";

import Link from "next/link";
import { Rocket, Globe, Camera, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white">
                <Rocket className="h-5 w-5" />
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight">ChandaDedo</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              India&apos;s dedicated rewards-based startup crowdfunding platform. Backing the founders shaping tomorrow.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors flex items-center justify-center text-xs font-bold" aria-label="X Twitter">
                𝕏
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors flex items-center justify-center" aria-label="LinkedIn">
                <Globe className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors flex items-center justify-center" aria-label="Instagram">
                <Camera className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors flex items-center justify-center" aria-label="YouTube">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Platform</h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><Link href="/explore" className="hover:text-white transition-colors">Explore Projects</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/trust-and-safety" className="hover:text-white transition-colors">Trust & Safety</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">For Creators</h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><Link href="/start" className="hover:text-white transition-colors">Start a Campaign</Link></li>
              <li><Link href="/creator/dashboard" className="hover:text-white transition-colors">Creator Dashboard</Link></li>
              <li><Link href="/how-it-works#fees" className="hover:text-white transition-colors">Pricing & Fees</Link></li>
              <li><Link href="/how-it-works#faqs" className="hover:text-white transition-colors">Creator FAQ</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">For Backers</h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><Link href="/backer/dashboard" className="hover:text-white transition-colors">Backer Dashboard</Link></li>
              <li><Link href="/refund-policy" className="hover:text-white transition-colors">Refund Guarantee</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Row */}
        <div className="border-t border-slate-800 py-8 mb-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-white font-bold mb-1">Subscribe to ChandaDedo Weekly</h4>
            <p className="text-xs text-slate-400">Curated breakthrough startups delivered to your inbox every Thursday.</p>
          </div>
          <form className="flex w-full md:w-auto max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="email" 
                placeholder="founder@startup.in" 
                className="w-full bg-slate-800/90 text-white placeholder-slate-500 rounded-full py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-brand-500 focus:bg-slate-800 transition-all border border-slate-700"
                required
              />
            </div>
            <button type="submit" className="btn-brand-primary text-xs px-5 py-2.5 whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 ChandaDedo Technologies Pvt. Ltd. Proudly built for India 🇮🇳</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <Link href="/refund-policy" className="hover:text-slate-300 transition-colors">Refunds</Link>
            <Link href="/trust-and-safety" className="hover:text-slate-300 transition-colors">Escrow Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

