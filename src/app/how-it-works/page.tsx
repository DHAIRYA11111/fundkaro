"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Search, Gift, CreditCard, Package, RefreshCw, 
  FileText, Shield, CheckCircle, Megaphone, Banknote, Truck,
  ChevronDown, ArrowRight, ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "What is FundKaro?",
    a: "FundKaro is India's premier crowdfunding platform designed to help startups, creators, and innovators raise capital directly from the community."
  },
  {
    q: "How do I back a project?",
    a: "Simply browse our active campaigns, choose a reward tier you like, and complete the payment using UPI, Credit/Debit card, or Net Banking. Your funds are held securely in escrow until the campaign reaches its goal."
  },
  {
    q: "What happens if a campaign doesn't reach its goal?",
    a: "FundKaro uses an 'all-or-nothing' model for most campaigns. If the funding goal isn't met by the deadline, all backers receive a 100% automatic refund within 5-7 business days."
  },
  {
    q: "How do refunds work?",
    a: "Refunds are processed automatically back to your original payment method. There are zero fees for refunds on failed campaigns."
  },
  {
    q: "What if a creator doesn't deliver?",
    a: "While FundKaro requires KYC and verifies creators, backing a project is not a guaranteed purchase. It's an investment in an idea. We hold creators accountable through milestones, but there is always a risk the project may fail to deliver."
  },
  {
    q: "Can I back campaigns from outside India?",
    a: "Currently, FundKaro only accepts payments in INR from Indian bank accounts and cards. We plan to support international payments soon."
  },
  {
    q: "What fees does FundKaro charge?",
    a: "For creators, we charge a 5% platform fee + 2% payment gateway fee (+ GST) only on successfully funded campaigns. Backers pay no extra fees."
  },
  {
    q: "How long do campaigns run?",
    a: "Campaigns typically run for 30 to 60 days, giving creators enough time to build momentum and reach their funding goals."
  },
  {
    q: "What is escrow protection?",
    a: "Funds pledged by backers are not given immediately to creators. They are held in an RBI-compliant escrow account. Funds are only released to creators if the funding goal is met."
  },
  {
    q: "How do I start a campaign?",
    a: "Click 'Start a Campaign', create your project page with a compelling video and story, set up reward tiers, and submit it for our team's review."
  },
  {
    q: "What verification do creators need?",
    a: "Creators must pass KYC verification, which includes PAN card, Aadhar card, and bank account verification to ensure authenticity and prevent fraud."
  },
  {
    q: "When do creators receive funds?",
    a: "Once a campaign succeeds, funds are transferred from escrow to the creator's verified bank account within 7-10 business days."
  },
  {
    q: "Can I cancel my pledge?",
    a: "Yes, you can cancel or change your pledge at any time before the campaign ends."
  },
  {
    q: "Is FundKaro regulated?",
    a: "Yes, FundKaro complies with all relevant RBI guidelines regarding payment aggregation and escrow mechanisms for crowdfunding."
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept UPI (GPay, PhonePe, Paytm, etc.), all major Indian Credit & Debit Cards, and Net Banking."
  }
];

export default function HowItWorksPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 lg:py-28 text-center px-4">
        <div className="container mx-auto w-full max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            How FundKaro Works
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto w-full"
          >
            Democratizing startup funding in India. We connect visionary creators with passionate backers to bring innovative ideas to life.
          </motion.p>
        </div>
      </section>

      {/* For Backers Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto w-full max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">For Backers</h2>
            <p className="text-lg text-slate-600">Support ideas you believe in and get exclusive rewards.</p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {[
              { icon: Search, title: "Discover", desc: "Browse & discover innovative campaigns" },
              { icon: Gift, title: "Choose", desc: "Select a reward tier that excites you" },
              { icon: CreditCard, title: "Pledge", desc: "Pay securely. Funds held in escrow" },
              { icon: Package, title: "Success", desc: "Creator builds & delivers rewards" },
              { icon: RefreshCw, title: "Fail? Refunded", desc: "100% automatic refund if goal not met" }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mb-4 z-10 shadow-sm border border-brand-200">
                  <step.icon className="w-8 h-8" />
                </div>
                {i < 4 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-[2px] bg-slate-200 -z-0" />
                )}
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{i + 1}. {step.title}</h3>
                <p className="text-sm text-slate-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Money Flow / Escrow Section */}
      <section className="py-16 bg-white border-y border-slate-200 px-4">
        <div className="container mx-auto w-full max-w-5xl">
          <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200 flex flex-col items-center">
            <ShieldCheck className="w-12 h-12 text-emerald-500 mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">RBI-Compliant Escrow Protection</h2>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 w-full">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm font-medium text-slate-800 w-40 text-center">
                Backer
              </div>
              <ArrowRight className="w-6 h-6 text-slate-500 rotate-90 md:rotate-0" />
              <div className="bg-slate-900 text-white p-4 rounded-xl shadow-md font-medium w-48 text-center border-2 border-slate-900">
                Escrow Account
              </div>
              <ArrowRight className="w-6 h-6 text-slate-500 rotate-90 md:rotate-0" />
              <div className="flex flex-col gap-4">
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-sm font-medium text-emerald-700 w-48 text-center">
                  Success → Creator
                </div>
                <div className="bg-brand-50 p-4 rounded-xl border border-brand-200 shadow-sm font-medium text-brand-700 w-48 text-center">
                  Fail → Backer
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Creators Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto w-full max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">For Creators</h2>
            <p className="text-lg text-slate-600">Turn your vision into reality with community funding.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: FileText, title: "1. Submit Campaign", desc: "Draft your pitch, rewards, and funding goal." },
              { icon: Shield, title: "2. KYC Verification", desc: "Complete mandatory identity and business verification." },
              { icon: CheckCircle, title: "3. Platform Review", desc: "Our team reviews and approves your campaign." },
              { icon: Megaphone, title: "4. Go Live & Share", desc: "Launch your campaign and promote it to your audience." },
              { icon: Banknote, title: "5. Goal Met", desc: "Receive funds minus platform fees." },
              { icon: Truck, title: "6. Deliver", desc: "Build your product and fulfill backer rewards." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <step.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-slate-600">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Fee Structure */}
          <div className="max-w-3xl mx-auto w-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="bg-slate-900 px-6 py-4">
              <h3 className="text-xl font-bold text-white">Transparent Fee Structure</h3>
            </div>
            <div className="p-0">
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-slate-100">
                    <th className="py-4 px-6 font-medium text-slate-700">Platform Fee</th>
                    <td className="py-4 px-6 font-bold text-slate-900">5% of funds raised</td>
                  </tr>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="py-4 px-6 font-medium text-slate-700">Payment Processing</th>
                    <td className="py-4 px-6 font-bold text-slate-900">2% + GST</td>
                  </tr>
                  <tr>
                    <th className="py-4 px-6 font-medium text-slate-700">Refund Fee (Failed Campaigns)</th>
                    <td className="py-4 px-6 font-bold text-emerald-600">FREE (0%)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-brand-50 px-6 py-4 border-t border-brand-100">
              <p className="text-brand-800 text-sm font-medium">
                Example: If you raise ₹10,00,000, you receive approximately ₹9,27,000.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white px-4 border-t border-slate-200">
        <div className="container mx-auto w-full max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600">Everything you need to know about FundKaro.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={cn(
                    "w-5 h-5 text-slate-500 transition-transform duration-200",
                    openFaqIndex === i ? "rotate-180" : ""
                  )} />
                </button>
                <AnimatePresence>
                  {openFaqIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-4 pt-0 text-slate-600 border-t border-slate-100 mt-2 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-brand-500 text-white text-center px-4">
        <div className="container mx-auto w-full max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Ready to fund innovation?</h2>
          <p className="text-xl text-brand-100 mb-10">
            Join thousands of backers and creators making a difference.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/explore" 
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Explore Projects
            </Link>
            <Link 
              href="/start" 
              className="w-full sm:w-auto px-8 py-4 bg-white text-brand-600 rounded-full font-bold hover:bg-brand-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Start a Campaign
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
