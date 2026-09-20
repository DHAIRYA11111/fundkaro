import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/auth";

const db = new PrismaClient();

async function main() {
  console.log("🌱 Seeding FundKaro database...");

  // Create demo users
  const creatorPassword = await hashPassword("Creator@1234");
  const backerPassword = await hashPassword("Backer@1234");

  const creator = await db.user.upsert({
    where: { email: "arjun@fundkaro.in" },
    update: {},
    create: {
      name: "Arjun Mehta",
      email: "arjun@fundkaro.in",
      passwordHash: creatorPassword,
      role: "creator",
      phone: "+91 98765 43210",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Arjun+Mehta",
      isKycVerified: true,
      panNumber: "ABCPM1234D",
    },
  });

  const creator2 = await db.user.upsert({
    where: { email: "priya@fundkaro.in" },
    update: {},
    create: {
      name: "Priya Sharma",
      email: "priya@fundkaro.in",
      passwordHash: creatorPassword,
      role: "creator",
      phone: "+91 87654 32109",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Priya+Sharma",
      isKycVerified: true,
    },
  });

  const backer = await db.user.upsert({
    where: { email: "ravi@fundkaro.in" },
    update: {},
    create: {
      name: "Ravi Kumar",
      email: "ravi@fundkaro.in",
      passwordHash: backerPassword,
      role: "backer",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Ravi+Kumar",
      isKycVerified: false,
    },
  });

  // Create demo campaigns
  const campaign1 = await db.campaign.upsert({
    where: { slug: "solarpulse-portable-solar-power-bank" },
    update: {},
    create: {
      slug: "solarpulse-portable-solar-power-bank",
      title: "SolarPulse — Portable Solar Power Bank for Rural India",
      tagline: "Charge your phone in 2 hours using sunlight, anywhere in India.",
      description: "A rugged, waterproof solar power bank designed specifically for rural India where grid electricity is unreliable.",
      story: `## The Problem\nOver 300 million Indians lack reliable electricity. Our portable solar power bank charges devices 40% faster than competitors using proprietary solar cells.\n\n## Our Solution\nSolarPulse uses advanced monocrystalline solar panels in a rugged, IP68-waterproof body. It charges a smartphone from 0 to 100% in just 2 hours of direct sunlight.\n\n## Why Now\nSolar panel costs have dropped 89% in the last decade. We are ready to manufacture at scale.`,
      category: "green_energy",
      stage: "prototype",
      fundingModel: "all_or_nothing",
      goalAmount: 1500000,
      raisedAmount: 1845000,
      backerCount: 312,
      coverImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
      location: "Surat, Gujarat",
      dpiitRecognized: true,
      dpiitNumber: "DIPP12345",
      isStaffPick: true,
      isTrending: true,
      tags: JSON.stringify(["solar", "rural", "hardware", "sustainability"]),
      endsAt: new Date(Date.now() + 26 * 24 * 60 * 60 * 1000),
      creatorId: creator.id,
    },
  });

  // Create reward tiers individually with upsert
  const tier1 = await db.rewardTier.findFirst({
    where: { campaignId: campaign1.id, title: "Early Bird" },
  });
  if (!tier1) {
    await db.rewardTier.create({
      data: {
        campaignId: campaign1.id,
        title: "Early Bird",
        description: "1x SolarPulse unit + thank-you postcard",
        pledgeAmount: 1499,
        estimatedDelivery: "March 2025",
        totalQuantity: 500,
        claimedQuantity: 312,
        isLimited: true,
        itemsIncluded: JSON.stringify(["1x SolarPulse 10,000mAh", "Thank-you postcard"]),
      },
    });
  }

  const tier2 = await db.rewardTier.findFirst({
    where: { campaignId: campaign1.id, title: "Family Pack" },
  });
  if (!tier2) {
    await db.rewardTier.create({
      data: {
        campaignId: campaign1.id,
        title: "Family Pack",
        description: "3x SolarPulse units + engraved names",
        pledgeAmount: 3999,
        estimatedDelivery: "March 2025",
        totalQuantity: null,
        claimedQuantity: 0,
        isLimited: false,
        itemsIncluded: JSON.stringify(["3x SolarPulse 10,000mAh", "Laser engraving"]),
      },
    });
  }

  const campaign2 = await db.campaign.upsert({
    where: { slug: "neurolingua-ai-tutor-for-indian-languages" },
    update: {},
    create: {
      slug: "neurolingua-ai-tutor-for-indian-languages",
      title: "NeuroLingua — AI Tutor for Indian Regional Languages",
      tagline: "Learn Hindi, Tamil, Telugu, Bengali & Marathi through AI-powered conversations.",
      description: "An AI-powered language learning app built specifically for India's 22 scheduled languages.",
      story: `## Vision\nIndia has 22 scheduled languages, yet most EdTech apps focus only on English. NeuroLingua uses GPT-4 level AI fine-tuned on Indian linguistic datasets to teach regional languages conversationally.\n\n## Technology\nOur AI engine uses transformer-based NLP models trained on 50M+ sentences across Indian languages, with native speaker voice synthesis.`,
      category: "ai_ml",
      stage: "production",
      fundingModel: "flexible",
      goalAmount: 800000,
      raisedAmount: 612000,
      backerCount: 189,
      coverImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800",
      location: "Chennai, Tamil Nadu",
      dpiitRecognized: true,
      isStaffPick: true,
      tags: JSON.stringify(["ai", "education", "language", "india"]),
      endsAt: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000),
      creatorId: creator2.id,
    },
  });

  // Create a sample pledge
  await db.pledge.upsert({
    where: { razorpayOrderId: "order_demo_001" },
    update: {},
    create: {
      campaignId: campaign1.id,
      backerId: backer.id,
      amount: 1499,
      tipAmount: 100,
      paymentStatus: "SUCCESS",
      razorpayOrderId: "order_demo_001",
      razorpayPaymentId: "pay_demo_001",
      paymentMethod: "upi",
    },
  });

  console.log("✅ Seed complete!");
  console.log("   Creator login: arjun@fundkaro.in / Creator@1234");
  console.log("   Backer login:  ravi@fundkaro.in  / Backer@1234");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
