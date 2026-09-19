import { ShieldCheck, CheckCircle2, RefreshCw } from "lucide-react";

export function TrustBanner() {
  return (
    <section className="bg-slate-900 py-16 md:py-24 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Money is Protected</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto w-full">We prioritize backer safety with industry-leading trust & safety measures.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 max-w-5xl mx-auto w-full">
          <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
            <div className="p-4 rounded-full bg-brand-500/20 text-brand-400">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold">Escrow Protected</h3>
            <p className="text-slate-500 leading-relaxed">Funds held in RBI-compliant escrow until campaign goal is met.</p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
            <div className="p-4 rounded-full bg-green-500/20 text-green-400">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-bold">KYC Verified Creators</h3>
            <p className="text-slate-500 leading-relaxed">Every creator undergoes rigorous PAN & bank verification.</p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
            <div className="p-4 rounded-full bg-blue-500/20 text-blue-400">
              <RefreshCw size={32} />
            </div>
            <h3 className="text-xl font-bold">100% Refund Guarantee</h3>
            <p className="text-slate-500 leading-relaxed">If the goal isn&apos;t met, you get every single rupee back.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
