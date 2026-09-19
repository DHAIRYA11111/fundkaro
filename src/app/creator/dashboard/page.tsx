"use client";

import { mockUsers, mockCampaigns } from "@/data/mock-campaigns";
import { formatINR, getProgressPercentage } from "@/lib/utils";
import { Edit, Eye, TrendingUp, Users, DollarSign, Activity, FileText, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CreatorDashboard() {
  const user = mockUsers[0]; // Arjun (Creator)
  const myCampaigns = mockCampaigns.filter(c => c.creatorId === user.id);
  
  const totalRaised = myCampaigns.reduce((sum, c) => sum + c.raisedAmount, 0);
  const totalBackers = myCampaigns.reduce((sum, c) => sum + c.backersCount, 0);
  const activeCampaigns = myCampaigns.filter(c => c.status === 'active').length;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
            <p className="text-slate-500 mt-1 text-sm sm:text-base">Here&apos;s an overview of your active campaigns and performance.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/start" className="btn-brand-primary text-sm px-5 py-2.5 shadow-sm">
              Create New Project
            </Link>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 text-slate-500 mb-2">
              <div className="p-2 rounded-lg bg-green-50 text-green-600">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-slate-600">Total Raised</h3>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{formatINR(totalRaised)}</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 text-slate-500 mb-2">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-slate-600">Total Backers</h3>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{totalBackers.toLocaleString('en-IN')}</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 text-slate-500 mb-2">
              <div className="p-2 rounded-lg bg-brand-50 text-brand-600">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-slate-600">Active Campaigns</h3>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{activeCampaigns}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 text-slate-500 mb-2">
              <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-slate-600">Avg. Conversion</h3>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">4.2%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content: Campaigns */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Your Campaigns</h2>
            
            {myCampaigns.map(campaign => {
              const progress = getProgressPercentage(campaign.raisedAmount, campaign.goalAmount);
              const statusColor = campaign.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700';

              return (
                <div key={campaign.id} className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden flex flex-col sm:flex-row hover:shadow-md transition-shadow">
                  <div className="relative w-full sm:w-52 h-48 sm:min-h-[220px] shrink-0 bg-slate-100">
                    <Image 
                      src={campaign.coverImage} 
                      alt={campaign.title} 
                      fill
                      unoptimized
                      className="object-cover" 
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${statusColor}`}>
                          {campaign.status}
                        </span>
                        <div className="flex gap-2">
                          <Link href={`/campaigns/${campaign.slug}`} className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 leading-snug mb-1">{campaign.title}</h3>
                      <p className="text-sm text-slate-500 line-clamp-1">{campaign.shortPitch}</p>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-sm font-medium mb-1.5">
                        <span className="font-bold text-slate-900">{formatINR(campaign.raisedAmount)} raised</span>
                        <span className="text-slate-500 font-semibold">{progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-brand-500 to-amber-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-slate-100 flex gap-4 text-sm font-semibold">
                      <button className="text-slate-600 hover:text-brand-600 flex items-center gap-1.5 transition-colors">
                        <FileText className="w-4 h-4"/> Post Update
                      </button>
                      <button className="text-slate-600 hover:text-brand-600 flex items-center gap-1.5 transition-colors">
                        <Users className="w-4 h-4"/> View Backers
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Payout Status */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-medium text-slate-300 mb-1">Next Payout</h3>
              <p className="text-2xl font-bold mb-4">{formatINR(1250000)}</p>
              <div className="flex justify-between text-sm mb-4">
                <span className="text-slate-500">Scheduled for</span>
                <span className="font-semibold text-emerald-400">Nov 15, 2026</span>
              </div>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-full text-xs font-semibold tracking-wide transition-colors">
                View Payout History
              </button>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-900">Recent Pledges</h3>
                <button className="text-slate-500 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50 transition-colors" title="Download report"><Download className="w-4 h-4"/></button>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: "Rohan M.", initials: "RM", reward: "Super Early Bird Special", amount: "₹4,999" },
                  { name: "Priya Sundaram", initials: "PS", reward: "Hardware Developer Kit", amount: "₹12,499" },
                  { name: "Vikram Patel", initials: "VP", reward: "Early Adopter Tier", amount: "₹3,499" },
                  { name: "Ananya K.", initials: "AK", reward: "Founder Circle Perk", amount: "₹24,999" },
                  { name: "Devansh Roy", initials: "DR", reward: "Pledge without reward", amount: "₹1,000" },
                ].map((backer, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center shrink-0 text-xs">
                      {backer.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{backer.name}</p>
                      <p className="text-xs text-slate-500 truncate">{backer.reward}</p>
                    </div>
                    <div className="text-sm font-bold text-emerald-600 shrink-0">
                      +{backer.amount}
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-6 text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors text-center block">
                View All Backers & Transactions →
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
