export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-slate-500">Last Updated: September 19, 2026</p>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Table of Contents */}
          <div className="md:w-1/4 shrink-0">
            <div className="sticky top-24 bg-slate-50 p-6 rounded-xl border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4">Contents</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li><a href="#collect" className="hover:text-brand-600">1. Information We Collect</a></li>
                <li><a href="#use" className="hover:text-brand-600">2. How We Use Information</a></li>
                <li><a href="#share" className="hover:text-brand-600">3. Information Sharing</a></li>
                <li><a href="#security" className="hover:text-brand-600">4. Data Security</a></li>
                <li><a href="#rights" className="hover:text-brand-600">5. Your Rights</a></li>
                <li><a href="#cookies" className="hover:text-brand-600">6. Cookies & Tracking</a></li>
                <li><a href="#thirdparty" className="hover:text-brand-600">7. Third-Party Services</a></li>
                <li><a href="#children" className="hover:text-brand-600">8. Children&apos;s Privacy</a></li>
                <li><a href="#changes" className="hover:text-brand-600">9. Changes to Policy</a></li>
                <li><a href="#contact" className="hover:text-brand-600">10. Contact Us</a></li>
              </ul>
            </div>
          </div>

          {/* Content */}
          <div className="md:w-3/4 prose prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-brand-600">
            <p className="lead text-lg text-slate-600 mb-8">
              At FundKaro, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our platform.
            </p>

            <section id="collect" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
              <p>We collect information that identifies, relates to, or could reasonably be linked to you. This includes:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Personal Information:</strong> Name, email address, phone number, physical address (for reward shipping).</li>
                <li><strong>Verification Data (KYC):</strong> For creators, we collect PAN, Aadhaar (masked), and bank account details for verification and payout purposes.</li>
                <li><strong>Payment Data:</strong> Payment details are processed securely by our payment partners. We only store transaction IDs and basic receipt information, not your full credit card or UPI details.</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our platform, IP address, browser type, and device information.</li>
              </ul>
            </section>

            <section id="use" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Provide and maintain the FundKaro platform.</li>
                <li>Process transactions and pledges.</li>
                <li>Verify creator identities to prevent fraud.</li>
                <li>Communicate with you regarding campaigns, account updates, and support.</li>
                <li>Improve our platform through analytics and user feedback.</li>
              </ul>
            </section>

            <section id="share" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
              <p>We do not sell your personal information. We only share it in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>With Creators:</strong> When you back a project, we share your name, email, and shipping address with the creator so they can fulfill your reward.</li>
                <li><strong>Service Providers:</strong> Payment processors, KYC verification partners, and cloud hosting providers who assist our operations.</li>
                <li><strong>Legal Requirements:</strong> To comply with Indian laws, legal processes, or government requests, or to protect our rights and the safety of our users.</li>
              </ul>
            </section>

            <section id="security" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
              <p>We implement industry-standard security measures, including encryption (SSL/TLS), secure databases, and regular security audits, to protect your data. However, no method of transmission over the Internet is 100% secure.</p>
            </section>

            <section id="rights" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
              <p>In accordance with the Digital Personal Data Protection Act, 2023, you have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Access the personal data we hold about you.</li>
                <li>Correct any inaccuracies in your data.</li>
                <li>Request deletion of your data (subject to legal retention requirements).</li>
                <li>Withdraw consent for specific data processing activities.</li>
              </ul>
            </section>

            <section id="cookies" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">6. Cookies & Tracking</h2>
              <p>We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies, but this may limit your ability to use some features of the platform.</p>
            </section>

            <section id="thirdparty" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">7. Third-Party Services</h2>
              <p>Our platform may contain links to other websites or use third-party services. We are not responsible for the privacy practices or content of these third parties.</p>
            </section>

            <section id="children" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">8. Children&apos;s Privacy</h2>
              <p>Our services are not intended for anyone under the age of 18. We do not knowingly collect personal identifiable information from children.</p>
            </section>

            <section id="changes" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">9. Changes to This Policy</h2>
              <p>We may update our Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the &quot;Last Updated&quot; date.</p>
            </section>

            <section id="contact" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact our Grievance Officer at privacy@fundkaro.in.</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
