import { Shield, ArrowRight, Lock, AlertTriangle, FileText } from "lucide-react";

export default function TrustAndSafetyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white pt-32 pb-20 text-center px-4">
        <div className="max-w-3xl mx-auto w-full flex flex-col items-center">
          <div className="w-20 h-20 bg-brand-500/20 rounded-full flex items-center justify-center mb-6">
            <Shield className="w-10 h-10 text-brand-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Trust & Safety</h1>
          <p className="text-xl text-slate-300">
            Your security is our priority. We&apos;ve built industry-leading protections to ensure a safe environment for both creators and backers.
          </p>
        </div>
      </section>

      {/* Escrow Protection */}
      <section className="py-20 px-4 max-w-5xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Escrow Protection</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto w-full">
            Funds are held in an RBI-compliant escrow account managed by a SEBI-registered trustee. Creators don&apos;t get the money until they hit their goal.
          </p>
        </div>

        {/* Visual Diagram */}
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-slate-200 font-semibold text-slate-800 text-center w-full md:w-auto">
              Backer Pledges
            </div>
            <ArrowRight className="text-brand-500 hidden md:block" />
            <div className="text-brand-500 md:hidden">↓</div>
            
            <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-slate-200 font-semibold text-slate-800 text-center w-full md:w-auto">
              Payment Gateway
            </div>
            <ArrowRight className="text-brand-500 hidden md:block" />
            <div className="text-brand-500 md:hidden">↓</div>
            
            <div className="bg-brand-100 border-2 border-brand-500 px-6 py-4 rounded-xl shadow-sm font-bold text-brand-700 text-center w-full md:w-auto relative">
              <Lock className="w-4 h-4 absolute top-2 right-2 text-brand-500" />
              Escrow Account
            </div>
            
            <div className="flex flex-col gap-4 w-full md:w-auto mt-4 md:mt-0">
              <div className="flex items-center gap-2">
                <ArrowRight className="text-green-500 hidden md:block" />
                <div className="bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded-lg text-sm font-medium w-full text-center">
                  Success: Funds to Creator
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="text-slate-500 hidden md:block" />
                <div className="bg-slate-100 text-slate-600 border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium w-full text-center">
                  Fail: Refunded to Backer
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Verification */}
      <section className="bg-slate-50 py-20 px-4">
        <div className="max-w-5xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Creator Verification Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 font-bold">1</div>
              <h3 className="font-bold text-slate-900 mb-2">Identity (KYC)</h3>
              <p className="text-sm text-slate-600">Strict PAN and Aadhaar verification for individuals and entities via eKYC.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 font-bold">2</div>
              <h3 className="font-bold text-slate-900 mb-2">Bank Verification</h3>
              <p className="text-sm text-slate-600">Penny drop verification to ensure the bank account name matches the verified identity.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 font-bold">3</div>
              <h3 className="font-bold text-slate-900 mb-2">Business Check</h3>
              <p className="text-sm text-slate-600">Verification of GST details and optional DPIIT recognition for startups.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 font-bold">4</div>
              <h3 className="font-bold text-slate-900 mb-2">Manual Review</h3>
              <p className="text-sm text-slate-600">Our trust & safety team reviews every campaign before it goes live on the platform.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Backer Protection & Reporting */}
      <section className="py-20 px-4 max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-12">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-brand-600" />
            <h2 className="text-2xl font-bold text-slate-900">Backer Protection</h2>
          </div>
          <div className="space-y-6 text-slate-600">
            <div>
              <h3 className="font-bold text-slate-900 mb-2">All-or-Nothing Guarantee</h3>
              <p>For All-or-Nothing campaigns, your pledge is only collected if the project reaches its funding goal by the deadline. If it falls short, you are automatically fully refunded.</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Dispute Resolution</h3>
              <p>If a creator fails to deliver rewards after a successful campaign, our team steps in to mediate and help resolve the situation, demanding regular updates.</p>
            </div>
          </div>
        </div>

        <div className="bg-brand-50 border border-brand-100 p-8 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-8 h-8 text-brand-600" />
            <h2 className="text-2xl font-bold text-slate-900">Report Suspicious Activity</h2>
          </div>
          <p className="text-slate-600 mb-6">
            If you notice a campaign that violates our terms, infringes on IP, or looks suspicious, let us know immediately. Our team investigates every report.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
              <FileText className="w-5 h-5 text-slate-500" />
              Email: trust@chandadedo.in
            </div>
          </div>
          <button className="bg-white border-2 border-brand-600 text-brand-600 font-bold py-3 px-6 rounded-lg hover:bg-brand-50 transition-colors w-full">
            Submit a Report
          </button>
        </div>
      </section>
    </main>
  );
}
