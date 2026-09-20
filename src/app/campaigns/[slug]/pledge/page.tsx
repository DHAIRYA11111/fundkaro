"use client";

import { useState, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Script from "next/script";
import { mockCampaigns } from "@/data/mock-campaigns";
import { formatINR } from "@/lib/utils";
import { ChevronRight, ArrowLeft, Plus, CreditCard, Smartphone, CheckCircle, Share2, Landmark, ShieldCheck, QrCode, Lock, Check, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const INDIAN_STATES = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu & Kashmir', 'Ladakh'];

function PledgeContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const campaign = mockCampaigns.find((c) => c.slug === slug);

  const initialRewardId = searchParams.get("rewardId") || (searchParams.get("noReward") === "true" ? "none" : null);

  const [step, setStep] = useState(1);
  const [selectedRewardId, setSelectedRewardId] = useState<string | null>(initialRewardId);
  const [customPledge, setCustomPledge] = useState<string>("");
  const [extraSupport, setExtraSupport] = useState<string>("");
  
  // Shipping form state
  const [shipping, setShipping] = useState({
    fullName: "", phone: "", address1: "", address2: "", city: "", state: "", pincode: ""
  });
  
  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [upiId, setUpiId] = useState("");
  const [upiTab, setUpiTab] = useState<"id" | "qr">("id");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [selectedBank, setSelectedBank] = useState("HDFC");

  // Real backend checkout state
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [confirmedReceipt, setConfirmedReceipt] = useState<{
    transactionId: string;
    orderId: string;
    amount: number;
    paymentMethod: string;
  } | null>(null);

  if (!campaign) {
    return <div className="text-center py-20 text-slate-600">Campaign not found</div>;
  }

  const selectedReward = campaign.rewards.find(r => r.id === selectedRewardId);
  const requiresShipping = selectedReward && selectedReward.itemsIncluded.length > 0; // simplistic check

  const baseAmount = selectedReward ? selectedReward.pledgeAmount : (parseInt(customPledge) || 0);
  const totalAmount = baseAmount + (parseInt(extraSupport) || 0);

  const processPledgePayment = async () => {
    try {
      setIsProcessing(true);
      setPaymentError(null);

      // Step 1: Create Order via Backend API
      const orderRes = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignId: campaign.id || campaign.slug,
          rewardTierId: selectedRewardId === "none" ? undefined : selectedRewardId,
          amount: baseAmount,
          tipAmount: parseInt(extraSupport) || 0,
          isAnonymous: false,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderData.error || "Failed to initialize payment");
      }

      // Step 2: Handle Razorpay modal or sandbox completion
      if (
        typeof window !== "undefined" &&
        (window as any).Razorpay &&
        orderData.keyId &&
        !orderData.orderId.startsWith("order_sandbox_")
      ) {
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency || "INR",
          name: "FundKaro",
          description: `Pledge for ${campaign.title}`,
          order_id: orderData.orderId,
          prefill: {
            name: shipping.fullName || orderData.userName || "Backer",
            email: orderData.userEmail || "backer@fundkaro.in",
            contact: shipping.phone || "9876543210",
          },
          theme: { color: "#ea580c" },
          handler: async function (response: any) {
            await verifyAndConfirmPayment({
              razorpayOrderId: response.razorpay_order_id || orderData.orderId,
              razorpayPaymentId: response.razorpay_payment_id || `pay_${Date.now()}`,
              razorpaySignature: response.razorpay_signature || "sig_valid",
            });
          },
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
            },
          },
        };
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        // Test / Sandbox direct confirmation
        await verifyAndConfirmPayment({
          razorpayOrderId: orderData.orderId,
          razorpayPaymentId: `pay_sandbox_${Date.now().toString(36)}`,
          razorpaySignature: "sandbox_valid_sig",
        });
      }
    } catch (err: any) {
      console.error("Payment initiation failed:", err);
      setPaymentError(err.message || "Payment could not be processed. Please try again.");
      setIsProcessing(false);
    }
  };

  const verifyAndConfirmPayment = async (details: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }) => {
    try {
      const verifyRes = await fetch("/api/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...details,
          paymentMethod,
        }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) {
        throw new Error(verifyData.error || "Payment verification failed");
      }

      setConfirmedReceipt({
        transactionId: details.razorpayPaymentId,
        orderId: details.razorpayOrderId,
        amount: totalAmount,
        paymentMethod,
      });

      setIsProcessing(false);
      setStep(4);
    } catch (err: any) {
      console.error("Verification failed:", err);
      setPaymentError(err.message || "Payment verification failed");
      setIsProcessing(false);
    }
  };

  const handleNext = () => {
    if (step === 1 && requiresShipping) {
      setStep(2);
    } else if (step === 1) {
      setStep(3); // Skip shipping
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      processPledgePayment();
    }
  };

  const handleBack = () => {
    if (step === 3 && !requiresShipping) setStep(1);
    else if (step > 1) setStep(step - 1);
  };

  const totalSteps = requiresShipping ? 4 : 3;
  const currentDisplayStep = step > totalSteps ? totalSteps : step;

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        
        {/* Header & Progress */}
        {step < 4 && (
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Backing {campaign.title}</h1>
            <div className="flex items-center text-sm font-medium text-slate-500 mb-4">
              Step {currentDisplayStep} of {totalSteps - 1}
            </div>
            <div className="flex gap-2">
              {[...Array(totalSteps - 1)].map((_, i) => (
                <div key={i} className={`h-2 flex-1 rounded-full ${i < step ? 'bg-brand-500' : 'bg-slate-200'}`} />
              ))}
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
        {/* Step 1: Select Reward */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">Select your reward</h2>
            
            {/* No Reward Option */}
            <label className={`block p-6 rounded-xl border-2 cursor-pointer transition-all ${selectedRewardId === 'none' ? 'border-brand-500 bg-brand-50' : 'border-slate-200 bg-white hover:border-brand-200'}`}>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input type="radio" name="reward" className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300" 
                    checked={selectedRewardId === 'none'}
                    onChange={() => setSelectedRewardId('none')} />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium text-slate-900">Pledge without a reward</h3>
                  <p className="mt-1 text-sm text-slate-500">I just want to support the project.</p>
                  
                  {selectedRewardId === 'none' && (
                    <div className="mt-4 flex items-center">
                      <span className="text-slate-500 mr-2 font-bold text-lg">₹</span>
                      <input 
                        type="number" 
                        min="10"
                        placeholder="Amount (min ₹10)" 
                        className="block w-48 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-bold focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"
                        value={customPledge}
                        onChange={(e) => setCustomPledge(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </label>

            {/* Reward Tiers */}
            {campaign.rewards.map(reward => (
              <label key={reward.id} className={`block p-6 rounded-2xl border-2 cursor-pointer transition-all ${selectedRewardId === reward.id ? 'border-brand-500 bg-brand-50/70 ring-2 ring-brand-500/20' : 'border-slate-200 bg-white hover:border-brand-200'}`}>
                <div className="flex items-start">
                  <div className="flex items-center h-5 mt-1">
                    <input type="radio" name="reward" className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300" 
                      checked={selectedRewardId === reward.id}
                      onChange={() => setSelectedRewardId(reward.id)} />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{reward.title}</h3>
                        <p className="mt-1 font-extrabold text-brand-600 text-lg">Pledge {formatINR(reward.pledgeAmount)} or more</p>
                      </div>
                      {reward.totalQuantity && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                          {reward.totalQuantity - reward.claimedQuantity} left
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{reward.description}</p>
                    
                    <div className="mt-4 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                      ESTIMATED DELIVERY: {new Date(reward.estimatedDelivery).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                    </div>

                    {reward.itemsIncluded.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {reward.itemsIncluded.map((item, idx) => (
                          <span key={idx} className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-white border border-slate-200 text-slate-700 shadow-2xs">
                            ✓ {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </label>
            ))}

            {/* Extra Support */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-brand-500" />
                Add Extra Support (Optional)
              </h3>
              <p className="mt-1 text-sm text-slate-500">Backers often add a little extra to accelerate the founder&apos;s journey.</p>
              <div className="mt-4 flex items-center">
                <span className="text-slate-500 mr-2 font-bold text-lg">₹</span>
                <input 
                  type="number" 
                  min="0"
                  placeholder="Bonus amount" 
                  className="block w-48 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-bold focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"
                  value={extraSupport}
                  onChange={(e) => setExtraSupport(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <button 
                type="button"
                onClick={handleNext}
                disabled={!selectedRewardId || (selectedRewardId === 'none' && !customPledge)}
                className="btn-brand-primary py-3.5 px-8 text-sm shadow-md shadow-brand-500/20"
              >
                <span>Continue to Next Step</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Shipping */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Shipping Details</h2>
              <p className="text-slate-500 text-sm">Where should the creator deliver your physical reward?</p>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                  <input type="text" className="input-modern" placeholder="Aarav Sharma"
                    value={shipping.fullName} onChange={e => setShipping({...shipping, fullName: e.target.value})} required/>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
                  <input type="tel" className="input-modern" placeholder="9876543210"
                    value={shipping.phone} onChange={e => setShipping({...shipping, phone: e.target.value})} required/>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Address Line 1</label>
                <input type="text" placeholder="Flat / House No., Building Name, Street" className="input-modern" 
                  value={shipping.address1} onChange={e => setShipping({...shipping, address1: e.target.value})} required/>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Address Line 2 (Optional)</label>
                <input type="text" placeholder="Apartment, Landmark, Area" className="input-modern" 
                  value={shipping.address2} onChange={e => setShipping({...shipping, address2: e.target.value})}/>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">City</label>
                  <input type="text" className="input-modern" placeholder="Bengaluru"
                    value={shipping.city} onChange={e => setShipping({...shipping, city: e.target.value})} required/>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">State</label>
                  <select className="input-modern cursor-pointer"
                    value={shipping.state} onChange={e => setShipping({...shipping, state: e.target.value})} required>
                    <option value="">Select state...</option>
                    {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">PIN Code</label>
                  <input type="text" className="input-modern font-mono" placeholder="560001" maxLength={6}
                    value={shipping.pincode} onChange={e => setShipping({...shipping, pincode: e.target.value})} required/>
                </div>
              </div>
            </div>

            <div className="pt-6 flex justify-between items-center">
              <button 
                type="button" 
                onClick={handleBack} 
                className="btn-brand-secondary text-sm px-6 py-2.5"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button 
                type="button" 
                onClick={handleNext} 
                className="btn-brand-primary text-sm px-8 py-3 shadow-sm"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Review & Pay */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">Review & Payment</h2>
            
            {/* Summary */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex justify-between items-start pb-4 border-b border-slate-100">
                <div>
                  <p className="font-medium text-slate-900">{selectedRewardId === 'none' ? 'Pledge without a reward' : selectedReward?.title}</p>
                  <p className="text-sm text-slate-500 mt-1 max-w-md line-clamp-2">{selectedReward?.description}</p>
                </div>
                <div className="font-medium text-slate-900">{formatINR(baseAmount)}</div>
              </div>
              
              {parseInt(extraSupport) > 0 && (
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-600">Extra Support</span>
                  <span className="font-medium text-slate-900">{formatINR(parseInt(extraSupport))}</span>
                </div>
              )}
              
              <div className="border-t border-slate-200 pt-4 mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-slate-900">Total</span>
                <span className="text-2xl font-bold text-brand-600">{formatINR(totalAmount)}</span>
              </div>
              <p className="text-xs text-slate-500 mt-2 text-right">Includes applicable platform fees & taxes.</p>
            </div>

            {/* Payment Method */}
            <div className="pt-2 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Select Payment Method</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all text-center ${paymentMethod === 'upi' ? 'border-brand-500 bg-brand-50/70 ring-2 ring-brand-500/20 text-brand-950 font-bold' : 'border-slate-200 bg-white text-slate-700 hover:border-brand-200'}`}
                >
                  <Smartphone className={`w-7 h-7 ${paymentMethod === 'upi' ? 'text-brand-600' : 'text-slate-500'}`} />
                  <span className="font-bold text-sm">UPI Instant</span>
                  <span className="text-[11px] text-slate-500 font-medium">GPay, PhonePe, Paytm</span>
                </button>
                
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all text-center ${paymentMethod === 'card' ? 'border-brand-500 bg-brand-50/70 ring-2 ring-brand-500/20 text-brand-950 font-bold' : 'border-slate-200 bg-white text-slate-700 hover:border-brand-200'}`}
                >
                  <CreditCard className={`w-7 h-7 ${paymentMethod === 'card' ? 'text-brand-600' : 'text-slate-500'}`} />
                  <span className="font-bold text-sm">Cards</span>
                  <span className="text-[11px] text-slate-500 font-medium">Visa, Mastercard, RuPay</span>
                </button>
                
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all text-center ${paymentMethod === 'netbanking' ? 'border-brand-500 bg-brand-50/70 ring-2 ring-brand-500/20 text-brand-950 font-bold' : 'border-slate-200 bg-white text-slate-700 hover:border-brand-200'}`}
                >
                  <Landmark className={`w-7 h-7 ${paymentMethod === 'netbanking' ? 'text-brand-600' : 'text-slate-500'}`} />
                  <span className="font-bold text-sm">Netbanking</span>
                  <span className="text-[11px] text-slate-500 font-medium">50+ Indian Banks</span>
                </button>
              </div>

              {/* Dynamic Payment Method Sub-Forms */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 mt-4">
                {paymentMethod === 'upi' && (
                  <div className="space-y-4">
                    <div className="flex gap-3 border-b border-slate-100 pb-3">
                      <button
                        type="button"
                        onClick={() => setUpiTab("id")}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${upiTab === "id" ? "bg-brand-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                      >
                        Enter UPI VPA / ID
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpiTab("qr")}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${upiTab === "qr" ? "bg-brand-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        Scan QR Code
                      </button>
                    </div>

                    {upiTab === "id" ? (
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Virtual Payment Address (VPA)</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="e.g. yourname@okhdfcbank"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="input-modern"
                          />
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className="text-xs text-slate-500 self-center">Popular:</span>
                          {["@okhdfcbank", "@okaxis", "@paytm", "@ybl"].map(suffix => (
                            <button
                              key={suffix}
                              type="button"
                              onClick={() => setUpiId(prev => (prev.split('@')[0] || "user") + suffix)}
                              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-md transition-colors"
                            >
                              {suffix}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4 flex flex-col items-center">
                        <div className="w-40 h-40 bg-slate-50 border-2 border-slate-200 rounded-2xl flex items-center justify-center p-3 shadow-inner">
                          <QrCode className="w-32 h-32 text-slate-800" />
                        </div>
                        <p className="text-xs font-semibold text-slate-600 mt-3">Scan with Google Pay, PhonePe, Paytm, or BHIM</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Amount auto-filled: {formatINR(totalAmount)}</p>
                      </div>
                    )}
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Card Number</label>
                      <input
                        type="text"
                        placeholder="4532 •••• •••• 8921"
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="input-modern font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="input-modern font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">CVV</label>
                        <input
                          type="password"
                          placeholder="•••"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="input-modern font-mono"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                      <Lock className="w-3.5 h-3.5 text-green-600" />
                      <span>Secured with 256-bit bank-grade encryption & RBI mandate</span>
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="space-y-4">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Select Bank</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {["HDFC", "ICICI", "SBI", "Axis", "Kotak", "Punjab National"].map(bank => (
                        <button
                          key={bank}
                          type="button"
                          onClick={() => setSelectedBank(bank)}
                          className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${selectedBank === bank ? "border-brand-500 bg-brand-50 text-brand-800 ring-2 ring-brand-500/20 shadow-xs" : "border-slate-200 text-slate-700 hover:bg-slate-50"}`}
                        >
                          {bank} Bank
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Escrow Guarantee Pill */}
            <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
              <p className="text-xs text-emerald-900 leading-relaxed">
                <strong className="font-semibold">RBI-Compliant Escrow Protection:</strong> Your pledge is held safely in escrow. If the project does not reach 100% of its goal by the deadline, your funds are automatically refunded 100% with no deductions.
              </p>
            </div>

            {paymentError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
                <span>{paymentError}</span>
              </div>
            )}

            <div className="text-xs text-slate-500 pt-1">
              By confirming, you agree to FundKaro&apos;s <Link href="/terms" className="text-brand-600 font-semibold hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-brand-600 font-semibold hover:underline">Privacy Policy</Link>.
            </div>

            <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <button 
                type="button" 
                onClick={handleBack} 
                disabled={isProcessing}
                className="btn-brand-secondary text-sm px-6 py-2.5 w-full sm:w-auto disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button 
                type="button" 
                onClick={handleNext} 
                disabled={isProcessing || totalAmount <= 0}
                className="btn-brand-primary text-base py-3.5 px-8 shadow-lg shadow-brand-500/25 w-full sm:w-auto disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing Escrow Pledge...</span>
                  </>
                ) : (
                  <>
                    <span>Authorize Pledge — {formatINR(totalAmount)}</span>
                    <Check className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="text-center py-8">
            <div className="mx-auto w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-5 shadow-inner">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">You&apos;re Officially a Backer! 🎉</h1>
            <p className="text-base text-slate-600 mb-8 max-w-lg mx-auto w-full">
              Thank you for fueling innovation. Your pledge for <strong className="text-slate-900 font-bold">{campaign.title}</strong> has been secured in escrow.
            </p>
            
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden text-left max-w-md mx-auto w-full mb-10">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">Pledge Receipt</h3>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">CONFIRMED</span>
              </div>
              <div className="p-6 space-y-3.5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Transaction ID</span>
                  <span className="font-mono font-semibold text-slate-900 truncate max-w-[200px]">{confirmedReceipt?.transactionId || "FK-" + Math.random().toString(36).substring(2, 9).toUpperCase()}</span>
                </div>
                {confirmedReceipt?.orderId && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Order ID</span>
                    <span className="font-mono text-xs text-slate-700 truncate max-w-[200px]">{confirmedReceipt.orderId}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Amount Pledged</span>
                  <span className="font-extrabold text-slate-900 text-base">{formatINR(confirmedReceipt?.amount || totalAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Payment Channel</span>
                  <span className="font-semibold text-slate-900 uppercase">{confirmedReceipt?.paymentMethod || paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-slate-100">
                  <span className="text-slate-500">Reward Tier</span>
                  <span className="font-semibold text-slate-900 text-right max-w-[200px] truncate">{selectedRewardId === 'none' ? 'No Reward (Donation)' : selectedReward?.title}</span>
                </div>
              </div>
            </div>

            <div className="mb-10 max-w-md mx-auto w-full">
              <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4 text-brand-600" /> Share this project with your network
              </h3>
              <div className="flex justify-center gap-3">
                <a 
                  href={`https://wa.me/?text=${encodeURIComponent(`I just backed ${campaign.title} on FundKaro! Check it out: ${typeof window !== 'undefined' ? window.location.origin : ''}/campaigns/${campaign.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Smartphone className="w-3.5 h-3.5" /> WhatsApp
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Proud to support ${campaign.title} on FundKaro! Back Indian startups:`)}&url=${encodeURIComponent(`${typeof window !== 'undefined' ? window.location.origin : ''}/campaigns/${campaign.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  𝕏 Post
                </a>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${typeof window !== 'undefined' ? window.location.origin : ''}/campaigns/${campaign.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto w-full">
              <Link href="/backer/dashboard" className="btn-brand-primary py-3 px-6 text-sm flex-1">
                View My Backed Projects
              </Link>
              <Link href="/explore" className="btn-brand-secondary py-3 px-6 text-sm flex-1">
                Explore More Projects
              </Link>
            </div>
          </motion.div>
        )}
        </AnimatePresence>

      </div>
    </div>
  );
}

export default function PledgePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 text-slate-500">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium">Loading checkout...</p>
        </div>
      </div>
    }>
      <PledgeContent />
    </Suspense>
  );
}
