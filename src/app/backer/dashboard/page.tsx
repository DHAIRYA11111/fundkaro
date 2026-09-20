"use client";

import { mockCampaigns } from "@/data/mock-campaigns";
import { formatINR, getProgressPercentage } from "@/lib/utils";
import { Package, Clock, CheckCircle2, ChevronRight, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function BackerDashboard() {
  // Mocking backed campaigns for the user
  const backedCampaigns = [
    { campaign: mockCampaigns[0], amount: 8000, reward: "Early Bird AI Companion", date: "2026-09-10", status: "active", delivery: "Dec 2026" },
    { campaign: mockCampaigns[2], amount: 15000, reward: "Pro Tier API Access", date: "2026-08-22", status: "funded", delivery: "Jan 2027" }
  ];

  const totalBacked = backedCampaigns.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Your Backed Projects</h1>
          <p className="text-slate-500 mt-1 text-sm sm:text-base">Track and manage the visionary projects you&apos;ve supported.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <div className="lg:col-span-3 space-y-6">
            {/* Project Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {backedCampaigns.map((item, idx) => {
                const progress = getProgressPercentage(item.campaign.raisedAmount, item.campaign.goalAmount);
                return (
                  <div key={idx} className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                    <div className="h-44 relative bg-slate-100">
                      <Image 
                        src={item.campaign.coverImage} 
                        alt={item.campaign.title} 
                        fill
                        unoptimized
                        className="object-cover" 
                      />
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-slate-900 shadow-xs">
                        {item.status === 'active' ? 'Campaign Live' : 'Successfully Funded'}
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-bold text-slate-900 mb-1 line-clamp-1">{item.campaign.title}</h3>
                      <p className="text-sm text-slate-500 mb-4 line-clamp-1">by {item.campaign.creator.name}</p>
                      
                      <div className="bg-slate-50 rounded-lg p-3 mb-4 border border-slate-100 flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Your Pledge</span>
                          <span className="font-bold text-slate-900">{formatINR(item.amount)}</span>
                        </div>
                        <div className="text-sm font-medium text-slate-800 mb-1">{item.reward}</div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Clock className="w-3.5 h-3.5" />
                          Est. Delivery: {item.delivery}
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-xs font-medium mb-1">
                          <span className="text-slate-500">Project Progress</span>
                          <span className="text-slate-900">{progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5">
                          <div className="bg-brand-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                          <Package className="w-3.5 h-3.5" /> 
                          {item.status === 'active' ? 'In Progress' : 'In Production'}
                        </span>
                        <Link href={`/campaigns/${item.campaign.slug}`} className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1">
                          View details <ChevronRight className="w-4 h-4"/>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-200">
                <h3 className="font-bold text-slate-900">Transaction History</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 bg-slate-50 uppercase font-semibold">
                    <tr>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Project</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Receipt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {backedCampaigns.map((item, idx) => (
                      <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap text-slate-600">{new Date(item.date).toLocaleDateString('en-IN')}</td>
                        <td className="px-6 py-4 font-medium text-slate-900">{item.campaign.title}</td>
                        <td className="px-6 py-4 font-medium text-slate-900">{formatINR(item.amount)}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Paid
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-slate-500 hover:text-brand-600 transition-colors">
                            <Download className="w-4 h-4 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4">Your Impact</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Total Amount Backed</p>
                  <p className="text-3xl font-bold text-brand-600">{formatINR(totalBacked)}</p>
                </div>
                
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-sm text-slate-500 mb-1">Projects Supported</p>
                  <p className="text-2xl font-bold text-slate-900">{backedCampaigns.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-brand-50 rounded-2xl p-6 border border-brand-100 text-center">
              <h3 className="font-bold text-brand-800 mb-2">Have an idea?</h3>
              <p className="text-sm text-brand-600 mb-4">Turn your own ideas into reality with ChandaDedo.</p>
              <Link href="/start" className="btn-brand-primary w-full py-2.5 text-sm shadow-sm">
                Start a Project
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
