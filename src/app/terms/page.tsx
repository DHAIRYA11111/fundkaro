export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Terms of Service</h1>
          <p className="text-slate-500">Last Updated: September 19, 2026</p>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Table of Contents sidebar */}
          <div className="md:w-1/4 shrink-0">
            <div className="sticky top-24 bg-slate-50 p-6 rounded-xl border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4">Contents</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li><a href="#acceptance" className="hover:text-brand-600">1. Acceptance of Terms</a></li>
                <li><a href="#definitions" className="hover:text-brand-600">2. Definitions</a></li>
                <li><a href="#accounts" className="hover:text-brand-600">3. Account Registration</a></li>
                <li><a href="#creators" className="hover:text-brand-600">4. Creator Obligations</a></li>
                <li><a href="#backers" className="hover:text-brand-600">5. Backer Obligations</a></li>
                <li><a href="#funding" className="hover:text-brand-600">6. Funding Models</a></li>
                <li><a href="#fees" className="hover:text-brand-600">7. Fees & Payments</a></li>
                <li><a href="#escrow" className="hover:text-brand-600">8. Escrow & Protection</a></li>
                <li><a href="#ip" className="hover:text-brand-600">9. Intellectual Property</a></li>
                <li><a href="#prohibited" className="hover:text-brand-600">10. Prohibited Content</a></li>
                <li><a href="#disputes" className="hover:text-brand-600">11. Dispute Resolution</a></li>
                <li><a href="#liability" className="hover:text-brand-600">12. Limitation of Liability</a></li>
                <li><a href="#governing" className="hover:text-brand-600">13. Governing Law</a></li>
                <li><a href="#contact" className="hover:text-brand-600">14. Contact Information</a></li>
              </ul>
            </div>
          </div>

          {/* Content */}
          <div className="md:w-3/4 prose prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-brand-600">
            <section id="acceptance" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p>Welcome to FundKaro. By accessing or using our platform, website, and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
            </section>

            <section id="definitions" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">2. Definitions</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Platform:</strong> The FundKaro website and associated services.</li>
                <li><strong>Creator:</strong> A user who creates a campaign to raise funds.</li>
                <li><strong>Backer:</strong> A user who pledges money to a campaign.</li>
                <li><strong>Campaign:</strong> A fundraising project created on the Platform.</li>
                <li><strong>Pledge:</strong> The amount of money a Backer commits to a Campaign.</li>
                <li><strong>Reward:</strong> Items, services, or experiences offered by Creators to Backers in exchange for Pledges.</li>
              </ul>
            </section>

            <section id="accounts" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">3. Account Registration</h2>
              <p>You must be at least 18 years old to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. FundKaro reserves the right to suspend or terminate accounts that provide false information or violate these terms.</p>
            </section>

            <section id="creators" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">4. Creator Obligations</h2>
              <p>When you create a Campaign, you are inviting Backers to form a contract with you. You are solely responsible for fulfilling the promises made in your Campaign, including delivering Rewards on time. You must accurately represent your project, comply with all applicable laws, and provide regular updates to Backers.</p>
            </section>

            <section id="backers" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">5. Backer Obligations</h2>
              <p>When you back a Campaign, you understand that you are not buying a product in a traditional store, but supporting a project to come to life. There are risks involved, and Creators may face delays or challenges. Pledges are generally non-refundable once the campaign ends successfully.</p>
            </section>

            <section id="funding" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">6. Funding Models</h2>
              <p>FundKaro offers two funding models:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>All-or-Nothing:</strong> The Creator only receives funds if the Campaign meets or exceeds its funding goal by the deadline. Otherwise, Backers are fully refunded.</li>
                <li><strong>Flexible:</strong> The Creator receives all funds raised, regardless of whether the goal is met, and is expected to fulfill Rewards to the best of their ability with the available funds.</li>
              </ul>
            </section>

            <section id="fees" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">7. Fees & Payments</h2>
              <p>Creating an account is free. If a Campaign is successful, FundKaro charges a platform fee (typically 5%) plus payment processing fees. These fees are deducted from the total funds raised before they are transferred to the Creator. Backers are not charged any additional fees by FundKaro beyond their pledged amount.</p>
            </section>

            <section id="escrow" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">8. Escrow & Fund Protection</h2>
              <p>For All-or-Nothing campaigns, collected funds are held securely in an RBI-compliant escrow account until the Campaign concludes. If successful, funds are disbursed to the Creator. If unsuccessful, they are returned to Backers.</p>
            </section>

            <section id="ip" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">9. Intellectual Property</h2>
              <p>Creators retain ownership of their content. By submitting content to FundKaro, Creators grant us a worldwide, non-exclusive, royalty-free license to use, display, and distribute the content for the purpose of operating and promoting the Platform.</p>
            </section>

            <section id="prohibited" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">10. Prohibited Content</h2>
              <p>Campaigns cannot raise funds for illegal activities, weapons, regulated substances, hate speech, or equity/financial returns. We reserve the right to remove any Campaign that violates our guidelines or policies.</p>
            </section>

            <section id="disputes" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">11. Dispute Resolution</h2>
              <p>FundKaro is not a party to the contract between Creators and Backers. We may try to mediate disputes, but we have no obligation to do so. Legal disputes must be resolved directly between the Creator and the Backer.</p>
            </section>

            <section id="liability" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">12. Limitation of Liability</h2>
              <p>FundKaro provides the platform &quot;as is&quot;. We do not guarantee that Campaigns will be successful or that Creators will deliver Rewards. We are not liable for any damages arising from your use of the Platform.</p>
            </section>

            <section id="governing" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">13. Governing Law</h2>
              <p>These Terms are governed by the laws of India. Any disputes arising out of or related to these Terms shall be subject to the exclusive jurisdiction of the courts located in New Delhi, India.</p>
            </section>

            <section id="contact" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">14. Contact Information</h2>
              <p>If you have any questions about these Terms, please contact us at legal@fundkaro.in.</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
