import Link from "next/link";
import { ArrowRight, ShieldCheck, Lightbulb, Eye } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const team = [
    { name: "Arjun Mehta", role: "Co-founder & CEO", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun" },
    { name: "Priya Das", role: "Co-founder & CTO", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" },
    { name: "Kabir Singh", role: "Head of Design", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kabir" },
    { name: "Neha Sharma", role: "Head of Community", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neha" },
  ];

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white pt-32 pb-24 text-center px-4">
        <div className="max-w-4xl mx-auto w-full">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Mission</h1>
          <p className="text-xl md:text-2xl text-slate-300">
            Democratizing startup funding in India
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 max-w-3xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">The ChandaDedo Story</h2>
        <div className="prose prose-lg text-slate-600 space-y-6">
          <p>
            ChandaDedo was born out of a simple observation: India has no shortage of brilliant ideas, but there is a massive gap in early-stage funding. Traditional VC routes are often inaccessible to first-time founders, and bank loans require collateral that many creators simply don&apos;t have.
          </p>
          <p>
            We realized that the power to fund the next big Indian startup shouldn&apos;t lie just in boardrooms in Bengaluru or Mumbai. It should lie with the people. By building a robust, transparent, and trustworthy crowdfunding platform tailored for the Indian ecosystem, we aim to bridge this gap.
          </p>
          <p>
            Whether it&apos;s a revolutionary D2C consumer brand, a deep-tech hardware prototype, or an AI tool solving local problems, ChandaDedo empowers entrepreneurs to validate their ideas and raise capital directly from early adopters who believe in their vision.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-50 py-20 px-4">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-brand-600 mb-2">₹12.3Cr+</div>
              <div className="text-slate-600 font-medium">Raised Successfully</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-brand-600 mb-2">847</div>
              <div className="text-slate-600 font-medium">Campaigns Funded</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-brand-600 mb-2">52,300+</div>
              <div className="text-slate-600 font-medium">Active Backers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-brand-600 mb-2">156</div>
              <div className="text-slate-600 font-medium">Active Campaigns</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mb-6">
              <Eye className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Transparency</h3>
            <p className="text-slate-600">
              We believe every rupee should be tracked and accounted for. We mandate regular updates from creators and enforce strict disclosure policies.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Trust</h3>
            <p className="text-slate-600">
              Escrow protection and rigorous KYC verification build confidence. Your money is protected until a campaign successfully reaches its goal.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mb-6">
              <Lightbulb className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Innovation</h3>
            <p className="text-slate-600">
              India&apos;s best ideas deserve a fair shot at funding. We&apos;re constantly building new tools to help creators showcase their vision to the world.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-slate-50 py-20 px-4">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm text-center">
                <div className="relative w-32 h-32 mx-auto w-full mb-4 bg-slate-100 rounded-full overflow-hidden">
                  <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                <p className="text-brand-600 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 text-center max-w-4xl mx-auto w-full">
        <h2 className="text-4xl font-bold text-slate-900 mb-6">Ready to bring your idea to life?</h2>
        <p className="text-xl text-slate-600 mb-10">
          Join the movement and start your crowdfunding journey with ChandaDedo today.
        </p>
        <Link href="/start" className="btn-brand-primary px-8 py-4 text-lg shadow-lg shadow-brand-500/25">
          <span>Start a Campaign</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </main>
  );
}
