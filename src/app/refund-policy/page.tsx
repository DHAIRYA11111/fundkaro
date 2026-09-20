import { RefreshCcw, CreditCard, Clock, HelpCircle } from "lucide-react";

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-3xl mx-auto w-full">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto w-full mb-6">
            <RefreshCcw className="w-8 h-8 text-brand-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Refund Policy</h1>
          <p className="text-lg text-slate-600">Clear, simple, and transparent rules regarding your pledges.</p>
        </div>

        <div className="space-y-12">
          {/* Policy Types */}
          <section className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">How Refunds Work</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-brand-500 rounded-full"></span>
                  All-or-Nothing Campaigns
                </h3>
                <p className="text-slate-600">
                  If the campaign goal is not met by the deadline, <strong>100% of your pledge is automatically refunded</strong>. We do not charge any fees on failed campaigns. The refund process starts the day after the campaign ends.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Flexible Campaigns
                </h3>
                <p className="text-slate-600">
                  Flexible campaigns keep all funds raised regardless of the goal. Because these funds are disbursed to the creator, <strong>refunds are entirely at the creator&apos;s discretion</strong>. If you require a refund for a flexible campaign, you must contact the creator directly.
                </p>
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Clock className="text-brand-600" />
              Refund Timeline
            </h2>
            <div className="relative border-l-2 border-brand-200 ml-3 pl-8 py-2 space-y-8">
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-5 h-5 bg-brand-500 rounded-full border-4 border-white"></div>
                <h4 className="font-bold text-slate-900">Campaign Ends</h4>
                <p className="text-sm text-slate-600 mt-1">The All-or-Nothing campaign fails to meet its funding goal.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-5 h-5 bg-brand-300 rounded-full border-4 border-white"></div>
                <h4 className="font-bold text-slate-900">Processing (Day 1-2)</h4>
                <p className="text-sm text-slate-600 mt-1">ChandaDedo instructs the escrow trustee to reverse all transactions.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-5 h-5 bg-brand-300 rounded-full border-4 border-white"></div>
                <h4 className="font-bold text-slate-900">Refund Initiated (Day 2-3)</h4>
                <p className="text-sm text-slate-600 mt-1">The payment gateway processes the refund back to your original payment method.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-5 h-5 bg-green-500 rounded-full border-4 border-white"></div>
                <h4 className="font-bold text-slate-900">Funds Available (Day 5-7)</h4>
                <p className="text-sm text-slate-600 mt-1">The money reflects in your bank account, card, or wallet.</p>
              </div>
            </div>
          </section>

          {/* Payment Methods */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <CreditCard className="text-brand-600" />
              Payment Method Specifics
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="border border-slate-200 p-5 rounded-xl">
                <h4 className="font-bold text-slate-900 mb-2">UPI</h4>
                <p className="text-sm text-slate-600">Usually fastest. Refunds reflect within 3-5 business days.</p>
              </div>
              <div className="border border-slate-200 p-5 rounded-xl">
                <h4 className="font-bold text-slate-900 mb-2">Credit/Debit Cards</h4>
                <p className="text-sm text-slate-600">Takes 5-7 business days depending on your bank&apos;s processing time.</p>
              </div>
              <div className="border border-slate-200 p-5 rounded-xl">
                <h4 className="font-bold text-slate-900 mb-2">Net Banking</h4>
                <p className="text-sm text-slate-600">Takes 5-7 business days to appear in your account statement.</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-brand-50 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <HelpCircle className="text-brand-600" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-slate-900">Can I cancel my pledge while the campaign is live?</h4>
                <p className="text-slate-600 mt-1 text-sm">Yes, you can cancel your pledge at any time before the campaign ends, unless it is within the last 24 hours of a successfully funded campaign.</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">The creator hasn&apos;t delivered my reward. Can I get a refund?</h4>
                <p className="text-slate-600 mt-1 text-sm">Once a campaign is successfully funded, the funds belong to the creator. Refunds for undelivered rewards must be requested directly from the creator. ChandaDedo cannot guarantee fulfillment or force a refund post-disbursement.</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">What if my original payment method is closed?</h4>
                <p className="text-slate-600 mt-1 text-sm">If your bank account or card is closed, the refund will fail. Our team will contact you to arrange an alternative method (like NEFT) to transfer your funds.</p>
              </div>
            </div>
          </section>

          <p className="text-center text-slate-500 mt-12">
            Still have questions? Contact our support team at <a href="mailto:support@chandadedo.in" className="text-brand-600 font-medium hover:underline">support@chandadedo.in</a>
          </p>
        </div>
      </div>
    </main>
  );
}
