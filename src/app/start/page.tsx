"use client";

import { useState } from "react";
import { categories } from "@/data/mock-campaigns";
import { Check, ChevronRight, ArrowLeft, UploadCloud, Plus, GripVertical, Trash2, Clock, Info, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

const INDIAN_STATES = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu & Kashmir', 'Ladakh'];

export default function StartCampaignPage() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [createdCampaign, setCreatedCampaign] = useState<{ slug: string; title: string } | null>(null);

  const [formData, setFormData] = useState({
    title: "", pitch: "", category: "", city: "", state: "", duration: "30",
    goal: "", fundingModel: "flexible",
    videoUrl: "", story: "",
    pan: "", accountNo: "", ifsc: "", dpiit: "",
    termsAgreed: false, accuracyConfirmed: false
  });

  const [rewards, setRewards] = useState([
    { id: 1, title: "", amount: "", description: "", delivery: "", limit: "", items: "" }
  ]);

  const updateForm = (key: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        title: formData.title || "My New Innovation Campaign",
        tagline: formData.pitch || "An innovative homegrown Indian startup project.",
        description: formData.story?.slice(0, 180) || formData.pitch || "Innovative project.",
        story: formData.story || formData.pitch || "Full story coming soon.",
        category: formData.category || "hardware",
        stage: "prototype",
        fundingModel: formData.fundingModel || "flexible",
        goalAmount: parseFloat(formData.goal) || 500000,
        coverImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
        location: `${formData.city || "Bengaluru"}, ${formData.state || "Karnataka"}`,
        durationDays: parseInt(formData.duration) || 30,
        dpiitRecognized: !!formData.dpiit,
        dpiitNumber: formData.dpiit || undefined,
        tags: [formData.category || "startup", "innovation", "india"],
        rewards: rewards
          .filter((r) => r.title && r.amount)
          .map((r) => ({
            title: r.title,
            description: r.description || "Reward tier",
            pledgeAmount: parseFloat(r.amount) || 999,
            estimatedDelivery: r.delivery || "3 months",
            totalQuantity: r.limit ? parseInt(r.limit) : null,
            itemsIncluded: r.items ? r.items.split(",").map((s) => s.trim()) : [],
          })),
      };

      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to publish campaign");
      }

      setCreatedCampaign({
        slug: data.campaign.slug,
        title: data.campaign.title,
      });
      setIsSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || "An unexpected error occurred during submission");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    "Basics", "Funding", "Story", "Rewards", "Verification", "Review"
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 py-20 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-slate-100">
          <div className="mx-auto w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <Check className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Campaign Published! 🚀</h2>
          <p className="text-slate-600 mb-2 text-sm">
            <strong className="text-slate-900">{createdCampaign?.title}</strong> is now live on the ChandaDedo platform.
          </p>
          <p className="text-slate-500 mb-8 text-xs">Your campaign is indexed and ready to accept pledges via RBI-compliant escrow.</p>
          
          <div className="space-y-3">
            {createdCampaign?.slug && (
              <Link 
                href={`/campaigns/${createdCampaign.slug}`} 
                className="btn-brand-primary w-full py-3 text-sm shadow-md shadow-brand-500/25"
              >
                View Live Campaign Page
              </Link>
            )}
            <Link 
              href="/creator/dashboard" 
              className="btn-brand-secondary w-full py-3 text-sm"
            >
              Go to Creator Studio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        
        {/* Modern Stepper */}
        <div className="mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 -z-0" />
            <div 
              className="absolute top-1/2 left-0 h-1 bg-brand-600 -translate-y-1/2 -z-0 transition-all duration-300"
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            />
            {steps.map((label, idx) => {
              const isCompleted = idx + 1 < step;
              const isCurrent = idx + 1 === step;
              return (
                <div key={label} className="flex flex-col items-center relative z-10">
                  <button
                    type="button"
                    onClick={() => idx + 1 < step && setStep(idx + 1)}
                    disabled={idx + 1 > step}
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isCompleted
                        ? "bg-brand-600 text-white shadow-xs cursor-pointer hover:bg-brand-700"
                        : isCurrent
                        ? "bg-white text-brand-600 border-2 border-brand-600 ring-4 ring-brand-100 font-extrabold shadow-sm"
                        : "bg-white text-slate-500 border border-slate-200"
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
                  </button>
                  <span className={`text-[11px] font-semibold mt-2 hidden sm:block ${
                    isCurrent ? "text-brand-600 font-bold" : isCompleted ? "text-slate-800" : "text-slate-500"
                  }`}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8">
            
            {/* Step 1: Basics */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">Start with the basics</h2>
                  <p className="text-slate-500">Make it easy for people to understand your project.</p>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Campaign Title</label>
                    <input type="text" className="input-modern" 
                      placeholder="e.g. Smart Wallet: The wallet that tracks itself"
                      value={formData.title} onChange={e => updateForm('title', e.target.value)} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">One-line Pitch</label>
                    <textarea className="input-modern resize-none" rows={2}
                      placeholder="A short description of what you are making..." maxLength={150}
                      value={formData.pitch} onChange={e => updateForm('pitch', e.target.value)} />
                    <p className="text-right text-xs text-slate-500 mt-1">{formData.pitch.length}/150</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Category</label>
                    <select className="input-modern cursor-pointer"
                      value={formData.category} onChange={e => updateForm('category', e.target.value)}>
                      <option value="">Select a category</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">City</label>
                      <input type="text" className="input-modern" placeholder="e.g. Bengaluru"
                        value={formData.city} onChange={e => updateForm('city', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">State</label>
                      <select className="input-modern cursor-pointer"
                        value={formData.state} onChange={e => updateForm('state', e.target.value)}>
                        <option value="">Select state</option>
                        {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Campaign Duration</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {["15", "30", "45", "60"].map(days => (
                        <label key={days} className={`border rounded-xl p-3.5 text-center cursor-pointer transition-all ${formData.duration === days ? 'border-brand-500 bg-brand-50 text-brand-700 ring-2 ring-brand-500/20 shadow-xs' : 'border-slate-200 hover:border-brand-200 text-slate-700'}`}>
                          <input type="radio" className="sr-only" checked={formData.duration === days} onChange={() => updateForm('duration', days)} />
                          <span className="block text-xl font-extrabold">{days}</span>
                          <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">Days</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Funding */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">Set your funding goal</h2>
                  <p className="text-slate-500">How much do you need to make this project a reality?</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Goal Amount</label>
                    <div className="relative rounded-xl">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-slate-500 font-bold text-lg">₹</span>
                      </div>
                      <input type="number" className="input-modern pl-9 font-bold text-lg" 
                        placeholder="100000" min="10000"
                        value={formData.goal} onChange={e => updateForm('goal', e.target.value)} />
                    </div>
                    <p className="mt-1.5 text-xs text-slate-500">Minimum goal of ₹10,000 required for escrow clearance.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2.5">Funding Model</label>
                    <div className="space-y-3">
                      <label className={`block border p-4 rounded-xl cursor-pointer transition-all ${formData.fundingModel === 'flexible' ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-500/20' : 'border-slate-200 hover:border-brand-200'}`}>
                        <div className="flex items-start">
                          <input type="radio" className="mt-1 text-brand-600 focus:ring-brand-500" checked={formData.fundingModel === 'flexible'} onChange={() => updateForm('fundingModel', 'flexible')} />
                          <div className="ml-3">
                            <span className="block text-sm font-bold text-slate-900">Flexible Funding</span>
                            <span className="block text-xs sm:text-sm text-slate-500 mt-0.5">Keep what you raise, even if you don&apos;t meet your full goal. Best for projects that can be completed with partial funding.</span>
                          </div>
                        </div>
                      </label>
                      <label className={`block border p-4 rounded-xl cursor-pointer transition-all ${formData.fundingModel === 'all_or_nothing' ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-500/20' : 'border-slate-200 hover:border-brand-200'}`}>
                        <div className="flex items-start">
                          <input type="radio" className="mt-1 text-brand-600 focus:ring-brand-500" checked={formData.fundingModel === 'all_or_nothing'} onChange={() => updateForm('fundingModel', 'all_or_nothing')} />
                          <div className="ml-3">
                            <span className="block text-sm font-bold text-slate-900">All-or-Nothing</span>
                            <span className="block text-xs sm:text-sm text-slate-500 mt-0.5">You only receive funds if you reach your exact goal. Backers aren&apos;t charged if the goal isn&apos;t met.</span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {formData.goal && (
                    <div className="bg-brand-50/70 p-4 rounded-xl border border-brand-200/70 flex items-start gap-3">
                      <Info className="w-5 h-5 text-brand-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-brand-900">Estimated Payout Calculator</p>
                        <p className="text-xs sm:text-sm text-brand-800/80 mt-0.5">
                          If you raise ₹{parseInt(formData.goal).toLocaleString('en-IN')}, you will receive approximately <strong className="text-brand-950 font-bold">₹{(parseInt(formData.goal) * 0.92).toLocaleString('en-IN')}</strong> after platform fees (5%) and payment gateway fees (3%).
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Story */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">Tell your story</h2>
                  <p className="text-slate-500">Add images, video, and details about your project.</p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Cover Image</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-2xl p-10 text-center hover:bg-slate-50 hover:border-brand-400 transition-all cursor-pointer group">
                      <UploadCloud className="mx-auto h-12 w-12 text-slate-500 group-hover:text-brand-600 transition-colors" />
                      <div className="mt-4 flex text-sm text-slate-600 justify-center">
                        <span className="font-semibold text-brand-600 hover:text-brand-500">
                          Upload a file
                        </span>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-slate-500 mt-1.5">PNG, JPG, WebP up to 10MB. 16:9 ratio recommended.</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Campaign Video URL (Optional)</label>
                    <input type="url" className="input-modern" 
                      placeholder="YouTube or Vimeo URL (e.g. https://youtube.com/watch?v=...)"
                      value={formData.videoUrl} onChange={e => updateForm('videoUrl', e.target.value)} />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Campaign Story</label>
                    <textarea className="input-modern min-h-[260px] font-normal" 
                      placeholder="Share the full story of your project, technical specs, timeline, team background, and vision..."
                      value={formData.story} onChange={e => updateForm('story', e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Rewards */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">Add rewards</h2>
                    <p className="text-slate-500">Offer unique incentives to your backers.</p>
                  </div>
                  <button type="button" className="btn-brand-secondary text-xs px-4 py-2 text-brand-600 border-brand-200 hover:bg-brand-50"
                    onClick={() => setRewards([...rewards, { id: Date.now(), title: "", amount: "", description: "", delivery: "", limit: "", items: "" }])}>
                    <Plus className="w-4 h-4" /> Add Tier
                  </button>
                </div>

                <div className="space-y-6">
                  {rewards.map((reward, index) => (
                    <div key={reward.id} className="border border-slate-200/90 rounded-2xl p-6 bg-slate-50/70 relative">
                      <div className="absolute top-5 left-3 cursor-move text-slate-500">
                        <GripVertical className="w-5 h-5" />
                      </div>
                      <div className="pl-6">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-bold text-slate-900">Reward Tier {index + 1}</h4>
                          {rewards.length > 1 && (
                            <button type="button" onClick={() => setRewards(rewards.filter(r => r.id !== reward.id))} className="text-slate-500 hover:text-red-500 p-1 rounded-lg hover:bg-red-50 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Title</label>
                            <input type="text" className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all" placeholder="e.g. Early Bird Special" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Pledge Amount (₹)</label>
                            <input type="number" className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all font-semibold" placeholder="5000" />
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                          <textarea className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all resize-none" rows={2} placeholder="What do backers get in this tier?" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Est. Delivery</label>
                            <input type="month" className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Quantity Limit (Optional)</label>
                            <input type="number" className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all" placeholder="Unlimited" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Items Included</label>
                            <input type="text" className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all" placeholder="Device, T-shirt, VIP Access" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Verification */}
            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">Identity & Bank Details</h2>
                  <p className="text-slate-500">Required for escrow compliance and receiving funds.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">PAN Number (Permanent Account Number)</label>
                    <input type="text" className="input-modern uppercase tracking-wider font-mono font-semibold" 
                      placeholder="ABCDE1234F" maxLength={10}
                      value={formData.pan} onChange={e => updateForm('pan', e.target.value.toUpperCase())} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Bank Account Number</label>
                      <input type="text" className="input-modern font-mono" 
                        placeholder="9876543210123"
                        value={formData.accountNo} onChange={e => updateForm('accountNo', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">IFSC Code</label>
                      <input type="text" className="input-modern uppercase tracking-wider font-mono" 
                        placeholder="HDFC0001234" maxLength={11}
                        value={formData.ifsc} onChange={e => updateForm('ifsc', e.target.value.toUpperCase())} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      DPIIT Recognition Number <span className="text-slate-500 font-normal">(Optional)</span>
                    </label>
                    <input type="text" className="input-modern uppercase font-mono" 
                      placeholder="DIPP12345"
                      value={formData.dpiit} onChange={e => updateForm('dpiit', e.target.value.toUpperCase())} />
                    <p className="mt-1.5 text-xs text-slate-500">DPIIT recognized startups receive an official verification badge on their campaign card.</p>
                  </div>

                  <div className="pt-4 space-y-3">
                    <label className="flex items-start cursor-pointer">
                      <div className="flex items-center h-5">
                        <input type="checkbox" className="h-4 w-4 text-brand-600 border-slate-300 rounded focus:ring-brand-500"
                          checked={formData.termsAgreed} onChange={e => updateForm('termsAgreed', e.target.checked)} />
                      </div>
                      <div className="ml-3 text-sm">
                        <span className="text-slate-700">I agree to the <Link href="/terms" className="text-brand-600 font-semibold hover:underline">Creator Terms of Service</Link> and understand the platform fee structure.</span>
                      </div>
                    </label>
                    <label className="flex items-start cursor-pointer">
                      <div className="flex items-center h-5">
                        <input type="checkbox" className="h-4 w-4 text-brand-600 border-slate-300 rounded focus:ring-brand-500"
                          checked={formData.accuracyConfirmed} onChange={e => updateForm('accuracyConfirmed', e.target.checked)} />
                      </div>
                      <div className="ml-3 text-sm">
                        <span className="text-slate-700">I confirm all information provided is accurate and true under Indian legal regulations.</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Review */}
            {step === 6 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">Review & Submit</h2>
                  <p className="text-slate-500">Check everything before submitting your campaign for approval.</p>
                </div>

                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-bold text-slate-900 text-base">1. Campaign Basics</h3>
                      <button type="button" onClick={() => setStep(1)} className="text-sm text-brand-600 font-semibold hover:underline">Edit</button>
                    </div>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm bg-white p-4 rounded-xl border border-slate-100">
                      <div>
                        <dt className="text-slate-500 text-xs font-medium">Title</dt>
                        <dd className="font-semibold text-slate-900">{formData.title || "Not provided"}</dd>
                      </div>
                      <div>
                        <dt className="text-slate-500 text-xs font-medium">Category</dt>
                        <dd className="font-semibold text-slate-900">{formData.category || "Not selected"}</dd>
                      </div>
                      <div>
                        <dt className="text-slate-500 text-xs font-medium">Location</dt>
                        <dd className="font-semibold text-slate-900">{formData.city || "City"}, {formData.state || "State"}</dd>
                      </div>
                      <div>
                        <dt className="text-slate-500 text-xs font-medium">Duration</dt>
                        <dd className="font-semibold text-slate-900">{formData.duration} days</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="border-t border-slate-200/80 pt-5">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-bold text-slate-900 text-base">2. Funding Goal</h3>
                      <button type="button" onClick={() => setStep(2)} className="text-sm text-brand-600 font-semibold hover:underline">Edit</button>
                    </div>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm bg-white p-4 rounded-xl border border-slate-100">
                      <div>
                        <dt className="text-slate-500 text-xs font-medium">Target Amount</dt>
                        <dd className="font-bold text-brand-600 text-base">₹{formData.goal ? parseInt(formData.goal).toLocaleString('en-IN') : "0"}</dd>
                      </div>
                      <div>
                        <dt className="text-slate-500 text-xs font-medium">Funding Model</dt>
                        <dd className="font-semibold text-slate-900 capitalize">{formData.fundingModel === 'flexible' ? "Flexible Funding" : "All-or-Nothing"}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="border-t border-slate-200/80 pt-5">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-bold text-slate-900 text-base">3. Verification Details</h3>
                      <button type="button" onClick={() => setStep(5)} className="text-sm text-brand-600 font-semibold hover:underline">Edit</button>
                    </div>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm bg-white p-4 rounded-xl border border-slate-100">
                      <div>
                        <dt className="text-slate-500 text-xs font-medium">PAN Verified</dt>
                        <dd className="font-mono font-semibold text-slate-900">{formData.pan || "Pending"}</dd>
                      </div>
                      <div>
                        <dt className="text-slate-500 text-xs font-medium">DPIIT Status</dt>
                        <dd className="font-semibold text-slate-900">{formData.dpiit ? `Registered (${formData.dpiit})` : "Standard Startup"}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                {submitError && (
                  <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2.5">
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
                    <span>{submitError}</span>
                  </div>
                )}
              </div>
            )}

          </div>
          
          {/* Footer Navigation */}
          <div className="px-8 py-5 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
            {step > 1 ? (
              <button 
                type="button" 
                onClick={handleBack} 
                className="btn-brand-secondary text-sm px-5 py-2.5"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : <div />}
            
            {step < 6 ? (
              <button 
                type="button" 
                onClick={handleNext} 
                className="btn-brand-primary text-sm px-6 py-2.5 shadow-sm"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                type="button" 
                onClick={handleSubmit} 
                disabled={!formData.termsAgreed || !formData.accuracyConfirmed || isSubmitting} 
                className="btn-brand-primary text-base px-8 py-3.5 shadow-lg shadow-brand-500/25 disabled:opacity-50 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Publishing Campaign...</span>
                  </>
                ) : (
                  <>
                    <span>Submit & Publish Campaign</span>
                    <Check className="w-5 h-5" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
