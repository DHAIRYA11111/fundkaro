import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const VALID_CATEGORIES = [
  "hardware", "saas", "ai_ml", "green_energy",
  "consumer", "food_beverage", "health", "education", "gaming", "art_design",
];

const VALID_SORT = ["trending", "newest", "most_funded", "ending_soon"];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;
    const q = searchParams.get("q") || undefined;
    const sort = searchParams.get("sort") || "trending";
    const status = searchParams.get("status") || "active";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(24, parseInt(searchParams.get("limit") || "12"));
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = { status };
    if (category && VALID_CATEGORIES.includes(category)) where.category = category;
    if (q) {
      where.OR = [
        { title: { contains: q } },
        { tagline: { contains: q } },
        { description: { contains: q } },
      ];
    }

    const orderBy: Record<string, string> = {
      trending: "backerCount",
      newest: "createdAt",
      most_funded: "raisedAmount",
      ending_soon: "endsAt",
    };

    const [campaigns, total] = await Promise.all([
      db.campaign.findMany({
        where,
        orderBy: { [orderBy[VALID_SORT.includes(sort) ? sort : "trending"]]: sort === "ending_soon" ? "asc" : "desc" },
        skip,
        take: limit,
        include: {
          creator: { select: { id: true, name: true, avatar: true } },
          rewards: { orderBy: { pledgeAmount: "asc" }, take: 3 },
          _count: { select: { pledges: true, comments: true } },
        },
      }),
      db.campaign.count({ where }),
    ]);

    return NextResponse.json({
      campaigns,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error("Campaigns GET error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

const CreateCampaignSchema = z.object({
  title: z.string().min(10).max(100),
  tagline: z.string().min(10).max(200),
  description: z.string().min(50),
  story: z.string().min(100),
  category: z.enum(VALID_CATEGORIES as [string, ...string[]]),
  stage: z.enum(["idea", "prototype", "production"]).default("prototype"),
  fundingModel: z.enum(["all_or_nothing", "flexible"]).default("all_or_nothing"),
  goalAmount: z.number().min(10000, "Minimum goal is ₹10,000"),
  coverImage: z.string().url(),
  location: z.string().default("India"),
  endsAt: z.string().datetime(),
  dpiitRecognized: z.boolean().default(false),
  tags: z.array(z.string()).max(10).default([]),
});

export async function POST(req: NextRequest) {
  try {
    const { getCurrentUser } = await import("@/lib/auth");
    const user = await getCurrentUser(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== "creator" && user.role !== "admin") {
      return NextResponse.json({ error: "Only creators can create campaigns" }, { status: 403 });
    }

    const body = await req.json();
    const data = CreateCampaignSchema.parse(body);

    const slug =
      data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") +
      "-" + Date.now().toString(36);

    const campaign = await db.campaign.create({
      data: {
        ...data,
        slug,
        tags: JSON.stringify(data.tags),
        endsAt: new Date(data.endsAt),
        creatorId: user.id,
        status: "draft",
      },
    });

    return NextResponse.json({ campaign }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error("Campaign create error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
